"use client";

import Script from "next/script";
import { GA_ID, CONSENT_KEY } from "@/lib/analytics";

/**
 * Wstrzykuje Google Analytics 4 z Consent Mode v2.
 *
 * Zasada działania (RODO-first):
 *  1. Bez NEXT_PUBLIC_GA_ID komponent nie renderuje nic — zero skryptów Google.
 *  2. Gdy ID jest ustawione, ładujemy gtag.js, ale Consent Mode startuje z
 *     WSZYSTKIM ustawionym na „denied". GA nie zapisuje wtedy cookies ani nie
 *     zbiera danych identyfikujących — działa jedynie modelowanie zgodne z UE.
 *  3. Pomiar włącza się dopiero po świadomej zgodzie z banera cookies
 *     (CookieConsent), który wywołuje gtag('consent','update', …). Wcześniejszą
 *     zgodę z poprzedniej wizyty odczytujemy z localStorage przy starcie.
 */
export default function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      {/* Biblioteka gtag.js — pobierana w tle, po wstępnej hydratacji strony. */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      {/* Inicjalizacja: domyślnie wszystkie zgody „denied" (Consent Mode v2).
          Kolejka dataLayer zapełnia się synchronicznie, więc consent default
          trafia tam ZANIM gtag.js przetworzy 'config'. */}
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          try {
            if (localStorage.getItem('${CONSENT_KEY}') === 'granted') {
              gtag('consent', 'update', { analytics_storage: 'granted' });
            }
          } catch (e) {}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
