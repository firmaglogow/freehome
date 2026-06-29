-- =====================================================================
--  FREE HOME — schemat bazy MySQL pod import ofert z EstiCRM (XML)
--  Uruchom raz w phpMyAdmin (panel cPanel) po założeniu bazy.
--  Kodowanie: utf8mb4 (polskie znaki, emoji w opisach itp.)
-- =====================================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- ---------------------------------------------------------------------
-- offers — jedna oferta z EstiCRM = jeden wiersz
-- Klucz główny = esti_id (<id> z XML), bo to on jest stały przy synchronizacji.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS offers (
  esti_id           BIGINT UNSIGNED NOT NULL,            -- <id> (wewnętrzny identyfikator Esti)
  number            VARCHAR(32)      NOT NULL,           -- <number> (numer publiczny oferty)
  company_id        INT              NULL,
  office_id         INT              NULL,

  main_type_id      INT              NULL,               -- <mainTypeId> (1=Dom, 2=Mieszkanie, 3=Działka...)
  type_name         VARCHAR(190)     NULL,               -- <typeName> ("Mieszkanie", "Dom (Wolnostojący)")
  transaction_id    INT              NULL,               -- <transaction> (131=sprzedaż, 132=wynajem)
  transaction       VARCHAR(32)      NULL,               -- znormalizowane: "sprzedaz" / "wynajem"
  market            VARCHAR(32)      NULL,               -- <market> ("pierwotny"/"wtórny")
  status_id         INT              NULL,               -- <status> (3 = "Aktywna publikacja")
  agreement         VARCHAR(64)      NULL,               -- <agreementType> ("wyłączność" itp.)

  offer_export      TINYINT(1)       NOT NULL DEFAULT 0, -- <offerExport>
  portal_promote    TINYINT(1)       NOT NULL DEFAULT 0, -- <portalPromote> (wyróżniona)

  price             DECIMAL(14,2)    NULL,
  price_currency    VARCHAR(8)       NULL DEFAULT 'PLN',
  price_permeter    DECIMAL(14,2)    NULL,

  area_total        DECIMAL(10,2)    NULL,               -- <areaTotal>
  area_usable       DECIMAL(10,2)    NULL,               -- <areaUsable>
  area_plot         DECIMAL(10,2)    NULL,               -- <areaPlot>

  rooms             INT              NULL,               -- <apartmentRoomNumber>
  floor_no          INT              NULL,               -- <apartmentFloor>
  building_floors   INT              NULL,               -- <buildingFloornumber>
  building_year     INT              NULL,               -- <buildingYear>

  -- Rynek pierwotny: powiązanie oferty z inwestycją deweloperską
  investment_id     BIGINT UNSIGNED  NULL,               -- <investmentId> (klucz inwestycji w Esti)
  investment_name   VARCHAR(255)     NULL,               -- <investmentName>
  residential_id    BIGINT UNSIGNED  NULL,               -- <residentialId> (budynek/etap)

  lat               DECIMAL(10,6)    NULL,               -- <locationLatitude>
  lng               DECIMAL(10,6)    NULL,               -- <locationLongitude>

  city              VARCHAR(190)     NULL,               -- <locationCityName>
  street            VARCHAR(190)     NULL,               -- <locationStreetName>
  street_type       VARCHAR(32)      NULL,               -- <locationStreetType> ("ul.")
  precinct          VARCHAR(190)     NULL,               -- <locationPrecinctName> (dzielnica/osiedle)
  district          VARCHAR(190)     NULL,               -- <locationDistrictName>
  province          VARCHAR(190)     NULL,               -- <locationProvinceName>
  place             VARCHAR(190)     NULL,               -- <locationPlaceName>

  description       MEDIUMTEXT       NULL,               -- <description> (czysty tekst)
  description_html  MEDIUMTEXT       NULL,               -- <descriptionWebsite> (z <br />)
  tags              TEXT             NULL,               -- <tagList>
  video_url         VARCHAR(255)     NULL,               -- <videoLink> (YouTube — film z prezentacji)

  contact_id        INT              NULL,               -- <contactId>
  contact_name      VARCHAR(190)     NULL,               -- imię + nazwisko opiekuna z Esti
  contact_phone     VARCHAR(64)      NULL,
  contact_email     VARCHAR(190)     NULL,
  agent_slug        VARCHAR(64)      NULL,               -- zmapowany slug z naszego people (site.ts)

  add_date          DATETIME         NULL,               -- <addDate>
  update_date       DATETIME         NULL,               -- <updateDate>

  is_active         TINYINT(1)       NOT NULL DEFAULT 1, -- nasza flaga publikacji (status+export+nieusunięta)
  last_seen_at      DATETIME         NULL,               -- ostatnia paczka, w której oferta wystąpiła
  imported_at       DATETIME         NOT NULL,

  PRIMARY KEY (esti_id),
  KEY idx_number       (number),
  KEY idx_active       (is_active),
  KEY idx_type         (main_type_id),
  KEY idx_transaction  (transaction_id),
  KEY idx_city         (city),
  KEY idx_investment   (investment_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- offer_pictures — galeria zdjęć (kolejność z XML)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS offer_pictures (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  esti_id     BIGINT UNSIGNED NOT NULL,
  filename    VARCHAR(190)    NOT NULL,                  -- np. "11275759.jpg"
  type        INT             NULL,                      -- atrybut type="..." z <picture>
  position    INT             NOT NULL DEFAULT 0,        -- kolejność w galerii
  PRIMARY KEY (id),
  UNIQUE KEY uq_pic (esti_id, filename),
  KEY idx_pic_offer (esti_id),
  CONSTRAINT fk_pic_offer FOREIGN KEY (esti_id)
    REFERENCES offers (esti_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- import_log — historia importów (diagnostyka, monitoring crona)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS import_log (
  id                 BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  package            VARCHAR(255)    NULL,               -- nazwa pliku ZIP
  export_mode        VARCHAR(32)     NULL,               -- "incremental" / "full"
  offers_total       INT             NOT NULL DEFAULT 0, -- ofert w paczce
  offers_upserted    INT             NOT NULL DEFAULT 0, -- dodane/zaktualizowane
  offers_deleted     INT             NOT NULL DEFAULT 0, -- action=delete
  offers_deactivated INT             NOT NULL DEFAULT 0, -- wygaszone (full: brak w paczce)
  status             VARCHAR(32)     NOT NULL DEFAULT 'ok', -- "ok" / "error"
  message            TEXT            NULL,
  started_at         DATETIME        NULL,
  finished_at        DATETIME        NULL,
  PRIMARY KEY (id),
  KEY idx_log_started (started_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
