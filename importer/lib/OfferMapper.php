<?php
/**
 * Mapuje pojedynczy węzeł <offer> z XML EstiCRM na wiersz tabeli `offers`
 * oraz listę zdjęć. Tu mieszka cała wiedza o strukturze pól Esti.
 */

declare(strict_types=1);

final class OfferMapper
{
    public function __construct(
        private Dictionaries $dict,
        private array $config
    ) {
    }

    /**
     * @return array{row: array<string,mixed>, pictures: list<array{filename:string,type:?int,position:int}>, action: string}
     */
    public function map(\SimpleXMLElement $o): array
    {
        $statusId       = $this->int($o, 'status');
        $offerExport    = $this->int($o, 'offerExport') === 1;
        $transactionId  = $this->int($o, 'transaction');

        $row = [
            'esti_id'         => (int) $this->str($o, 'id'),
            'number'          => $this->str($o, 'number') ?? (string) $this->str($o, 'id'),
            'company_id'      => $this->int($o, 'companyId'),
            'office_id'       => $this->int($o, 'officeId'),

            'main_type_id'    => $this->int($o, 'mainTypeId'),
            'type_name'       => $this->str($o, 'typeName'),
            'transaction_id'  => $transactionId,
            'transaction'     => $this->normTransaction($transactionId),
            'market'          => $this->dict->label('market', $this->str($o, 'market')),
            'status_id'       => $statusId,
            'agreement'       => $this->dict->label('agreement', $this->str($o, 'agreementType')),

            'offer_export'    => $offerExport ? 1 : 0,
            'portal_promote'  => $this->int($o, 'portalPromote') === 1 ? 1 : 0,

            'price'           => $this->dec($o, 'price'),
            'price_currency'  => $this->dict->label('currency', $this->str($o, 'priceCurrency')) ?? 'PLN',
            'price_permeter'  => $this->dec($o, 'pricePermeter'),

            'area_total'      => $this->dec($o, 'areaTotal'),
            'area_usable'     => $this->dec($o, 'areaUsable'),
            'area_plot'       => $this->dec($o, 'areaPlot'),

            'rooms'           => $this->int($o, 'apartmentRoomNumber'),
            'floor_no'        => $this->int($o, 'apartmentFloor'),
            'building_floors' => $this->int($o, 'buildingFloornumber'),
            'building_year'   => $this->int($o, 'buildingYear'),

            'lat'             => $this->dec($o, 'locationLatitude'),
            'lng'             => $this->dec($o, 'locationLongitude'),

            'city'            => $this->str($o, 'locationCityName'),
            'street'          => $this->str($o, 'locationStreetName'),
            'street_type'     => $this->str($o, 'locationStreetType'),
            'precinct'        => $this->str($o, 'locationPrecinctName'),
            'district'        => $this->str($o, 'locationDistrictName'),
            'province'        => $this->str($o, 'locationProvinceName'),
            'place'           => $this->str($o, 'locationPlaceName'),

            'description'      => $this->str($o, 'description'),
            'description_html' => $this->str($o, 'descriptionWebsite'),
            'tags'             => $this->str($o, 'tagList'),

            'contact_id'      => $this->int($o, 'contactId'),
            'contact_name'    => $this->fullName($o),
            'contact_phone'   => $this->str($o, 'contactPhone'),
            'contact_email'   => $this->str($o, 'contactEmail'),
            'agent_slug'      => $this->mapAgent($this->str($o, 'contactEmail')),

            'add_date'        => $this->datetime($o, 'addDate'),
            'update_date'     => $this->datetime($o, 'updateDate'),

            'is_active'       => $this->isPublishable($statusId, $offerExport) ? 1 : 0,
            'last_seen_at'    => gmdate('Y-m-d H:i:s'),
            'imported_at'     => gmdate('Y-m-d H:i:s'),
        ];

        // Akcja synchronizacji: <action>update</action> / <action>delete</action>
        $action = strtolower($this->str($o, 'action') ?? 'update');

        return [
            'row'      => $row,
            'pictures' => $this->pictures($o),
            'action'   => $action,
        ];
    }

    public function isPublishable(?int $statusId, bool $offerExport): bool
    {
        $allowed = $this->config['publish_status_ids'] ?? [3];
        if ($statusId === null || !in_array($statusId, $allowed, true)) {
            return false;
        }
        if (($this->config['require_offer_export'] ?? true) && !$offerExport) {
            return false;
        }
        return true;
    }

    /** @return list<array{filename:string,type:?int,position:int}> */
    private function pictures(\SimpleXMLElement $o): array
    {
        $out = [];
        if (!isset($o->pictures)) {
            return $out;
        }
        $i = 0;
        foreach ($o->pictures->picture as $pic) {
            $filename = trim((string) $pic);
            if ($filename === '') {
                continue;
            }
            $type = isset($pic['type']) ? (int) $pic['type'] : null;
            $out[] = ['filename' => $filename, 'type' => $type, 'position' => $i++];
        }
        return $out;
    }

    private function mapAgent(?string $email): ?string
    {
        if ($email === null) {
            return null;
        }
        $map = $this->config['agent_map'] ?? [];
        return $map[strtolower($email)] ?? ($map[$email] ?? null);
    }

    private function fullName(\SimpleXMLElement $o): ?string
    {
        $name = trim(($this->str($o, 'contactFirstname') ?? '') . ' ' . ($this->str($o, 'contactLastname') ?? ''));
        return $name === '' ? null : $name;
    }

    private function normTransaction(?int $id): ?string
    {
        return match ($id) {
            131     => 'sprzedaz',
            132     => 'wynajem',
            133     => 'kupno',
            134     => 'najem',
            default => null,
        };
    }

    // --- niskopoziomowe odczyty z XML ------------------------------------

    private function str(\SimpleXMLElement $o, string $field): ?string
    {
        if (!isset($o->{$field})) {
            return null;
        }
        $v = trim((string) $o->{$field});
        return $v === '' ? null : $v;
    }

    private function int(\SimpleXMLElement $o, string $field): ?int
    {
        $v = $this->str($o, $field);
        return ($v === null || !is_numeric($v)) ? null : (int) $v;
    }

    private function dec(\SimpleXMLElement $o, string $field): ?float
    {
        $v = $this->str($o, $field);
        return ($v === null || !is_numeric($v)) ? null : (float) $v;
    }

    private function datetime(\SimpleXMLElement $o, string $field): ?string
    {
        $v = $this->str($o, $field);
        if ($v === null) {
            return null;
        }
        $ts = strtotime($v);
        return $ts === false ? null : gmdate('Y-m-d H:i:s', $ts);
    }
}
