#!/usr/bin/env python3
"""
Generator słownika ulica → osiedle dla FREE HOME (na stałe).

Po co: Esti ma jedno pole „Miejscowość / dzielnica", więc osiedle (precinct)
bywa puste przy większości ofert. Ten skrypt pobiera z OpenStreetMap (Overpass)
granice osiedli (jednostki pomocnicze gminy, admin_level=9) oraz wszystkie
nazwane ulice danego miasta i przypisuje każdą ulicę do osiedla metodą
głosowania wierzchołków geometrii (osiedle, w którym leży większość punktów
ulicy). Wynik trafia do src/data/<plik>.json i jest czytany przez
src/lib/offers.ts (resolveEstate) przy buildzie — dzięki temu KAŻDA nowa oferta
z danego miasta dostaje osiedle automatycznie.

Użycie:
    python3 scripts/seed-osiedla.py                 # Głogów (domyślnie)

Rozszerzenie na kolejne miasta (Wschowa, Lubin, Polkowice): dopisz wpis do
CITIES poniżej (nazwa + admin_level granicy miasta) i scal wyniki — albo
uruchom z innym CITY. Normalizacja nazw MUSI pozostać zgodna z normName()
w src/lib/offers.ts.

Wymaga: python3 + internet. Node nie jest potrzebny.
"""
from __future__ import annotations

import json, re, sys, time, unicodedata, urllib.parse, urllib.request
from collections import Counter, defaultdict
from pathlib import Path

# --- konfiguracja miasta -----------------------------------------------------
CITY = "Głogów"
CITY_ADMIN_LEVEL = "7"      # gmina miejska Głogów
OSIEDLE_ADMIN_LEVEL = "9"   # jednostki pomocnicze (osiedla)
OUT_FILE = Path(__file__).resolve().parents[1] / "src" / "data" / "glogow-osiedla.json"

ENDPOINTS = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
]
HEADERS = {
    "User-Agent": "freehome-osiedle-seed/1.0 (real estate; +https://freehome.pl)",
    "Accept": "application/json",
}
# typy dróg, które realnie bywają adresem nieruchomości
ADDRESS_HW = {"residential", "living_street", "unclassified", "tertiary",
              "secondary", "primary", "pedestrian", "road"}
STREET_TYPE_TOKENS = {"ul", "ulica", "al", "aleja", "aleje", "pl", "plac", "os",
                      "osiedle", "rondo", "most", "brama", "skwer", "bulwar",
                      "droga", "szosa", "trakt", "deptak", "pasaz", "wybrzeze"}


def overpass(query: str) -> dict:
    data = urllib.parse.urlencode({"data": query}).encode()
    last = None
    for attempt in range(6):
        ep = ENDPOINTS[attempt % len(ENDPOINTS)]
        try:
            req = urllib.request.Request(ep, data=data, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=180) as r:
                body = r.read()
            if body[:1] != b"{":
                raise RuntimeError("non-JSON (busy/limit)")
            return json.loads(body)
        except Exception as e:  # noqa: BLE001
            last = e
            sys.stderr.write(f"  overpass retry {attempt} ({ep}): {e}\n")
            time.sleep(8 + attempt * 6)
    raise RuntimeError(f"overpass failed: {last}")


def norm(s: str | None) -> str:
    """Identyczna z normName() w src/lib/offers.ts."""
    s = (s or "").lower().strip().replace("ł", "l")
    s = "".join(c for c in unicodedata.normalize("NFD", s)
                if unicodedata.category(c) != "Mn")
    s = re.sub(r"[^a-z0-9 ]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def strip_type(n: str) -> str:
    t = n.split(" ")
    return " ".join(t[1:]) if len(t) > 1 and t[0] in STREET_TYPE_TOKENS else n


def stitch(ways):
    segs = [w[:] for w in ways if len(w) >= 2]
    rings = []
    while segs:
        cur = segs.pop(0)
        changed = True
        while changed and cur[0] != cur[-1]:
            changed = False
            for i, s in enumerate(segs):
                if s[0] == cur[-1]:
                    cur += s[1:]; segs.pop(i); changed = True; break
                if s[-1] == cur[-1]:
                    cur += s[::-1][1:]; segs.pop(i); changed = True; break
                if s[-1] == cur[0]:
                    cur = s[:-1] + cur; segs.pop(i); changed = True; break
                if s[0] == cur[0]:
                    cur = s[::-1][:-1] + cur; segs.pop(i); changed = True; break
        rings.append(cur)
    return rings


def in_ring(x, y, ring):
    inside = False; n = len(ring); j = n - 1
    for i in range(n):
        xi, yi = ring[i]; xj, yj = ring[j]
        if ((yi > y) != (yj > y)) and (x < (xj - xi) * (y - yi) / (yj - yi) + xi):
            inside = not inside
        j = i
    return inside


def main():
    print(f"== {CITY}: pobieram granice osiedli (admin_level={OSIEDLE_ADMIN_LEVEL})…")
    polys = overpass(f'''[out:json][timeout:120];
area["name"="{CITY}"]["boundary"="administrative"]["admin_level"="{CITY_ADMIN_LEVEL}"]->.g;
relation["boundary"="administrative"]["admin_level"="{OSIEDLE_ADMIN_LEVEL}"](area.g);
out geom;''')["elements"]
    time.sleep(3)
    print(f"== {CITY}: pobieram nazwane ulice…")
    streets = overpass(f'''[out:json][timeout:120];
area["name"="{CITY}"]["boundary"="administrative"]["admin_level"="{CITY_ADMIN_LEVEL}"]->.g;
way["highway"]["name"](area.g);
out geom;''')["elements"]

    osiedla, bboxes = {}, {}
    for e in polys:
        name = e["tags"]["name"]
        outer, inner = [], []
        for m in e.get("members", []):
            if m["type"] != "way" or "geometry" not in m:
                continue
            coords = [(p["lon"], p["lat"]) for p in m["geometry"]]
            (outer if m.get("role") == "outer" else inner).append(coords)
        rings = [r for r in stitch(outer) + stitch(inner) if len(r) >= 4]
        osiedla[name] = rings
        xs = [p[0] for r in rings for p in r]; ys = [p[1] for r in rings for p in r]
        bboxes[name] = (min(xs), min(ys), max(xs), max(ys))
    print(f"   osiedli: {len(osiedla)}")

    def osiedle_of(x, y):
        for name, rings in osiedla.items():
            bx0, by0, bx1, by1 = bboxes[name]
            if not (bx0 <= x <= bx1 and by0 <= y <= by1):
                continue
            if sum(1 for r in rings if in_ring(x, y, r)) % 2 == 1:
                return name
        return None

    votes = defaultdict(Counter)
    for e in streets:
        if e["tags"].get("highway") not in ADDRESS_HW:
            continue
        name = e["tags"].get("name")
        if not name:
            continue
        for p in e.get("geometry", []):
            o = osiedle_of(p["lon"], p["lat"])
            if o:
                votes[name][o] += 1

    name_osiedle = {n: c.most_common(1)[0][0] for n, c in votes.items() if c}
    full_map = {norm(n): o for n, o in name_osiedle.items()}
    groups = defaultdict(set)
    for n, o in name_osiedle.items():
        groups[strip_type(norm(n))].add(o)
    stripped = {k: next(iter(v)) for k, v in groups.items() if len(v) == 1}
    ulice = {**stripped, **full_map}
    ulice = {k: v for k, v in sorted(ulice.items()) if k}

    out = {
        "_meta": {
            "source": f"OpenStreetMap (Overpass) — admin_level={OSIEDLE_ADMIN_LEVEL} osiedla, {CITY}",
            "method": "głosowanie wierzchołków geometrii ulicy nad poligonami osiedli",
            "city": CITY,
            "generated": time.strftime("%Y-%m-%d"),
            "note": ("Auto-wygenerowane przez scripts/seed-osiedla.py. "
                     "Można ręcznie poprawiać wpisy (znormalizowana nazwa ulicy -> osiedle)."),
        },
        "osiedla": sorted(set(ulice.values())),
        "ulice": ulice,
    }
    OUT_FILE.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"== zapisano {OUT_FILE.relative_to(OUT_FILE.parents[2])}: "
          f"{len(out['osiedla'])} osiedli, {len(ulice)} kluczy ulic")
    print("   rozkład:", dict(Counter(name_osiedle.values())))


if __name__ == "__main__":
    main()
