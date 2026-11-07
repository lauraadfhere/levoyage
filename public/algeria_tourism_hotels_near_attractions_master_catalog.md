# Algeria Tourism Accommodation & Nearby Attractions Master Catalog

> **Purpose:** A production-oriented Markdown seed for the Algerian 360° travel marketplace, connecting accommodation with nearby tourism discovery. It is based on the supplied master tourism catalog and platform concept. The catalog is designed for ingestion, verification, geocoding, 360° production, SEO pages, and booking workflows.

## Critical inventory rule

This document **does not claim to contain every operating hotel in Algeria**. The supplied source explicitly treats its hotel list as a seed inventory and warns that properties can open, close, rename, or disappear from public directories. Hotel records must therefore be verified before being shown as bookable. fileciteturn1file4L884-L892

The platform should combine accommodation discovery with destinations, attractions, beaches, restaurants, activities, experiences and 360° content, so a traveler can move from discovery to virtual exploration, comparison and booking. fileciteturn1file0L12-L51

## Recommended record lifecycle

```text
DISCOVER PROPERTY
      ↓
VERIFY BUSINESS + LOCATION
      ↓
GEOCODE
      ↓
MATCH TO NEARBY TOURISM PLACES
      ↓
ADD PHOTOS + 360°
      ↓
ADD ROOMS + PRICES + AVAILABILITY
      ↓
PUBLISH
      ↓
BOOK
```

## 1. Platform data model

Every property should ultimately support:

`id` · `name_ar` · `name_fr` · `name_en` · `property_type` · `wilaya_code` · `wilaya_name` · `commune` · `address` · `latitude` · `longitude` · `description` · `images` · `360_tour` · `rating` · `review_count` · `facilities` · `rooms` · `price_range` · `contact` · `verified` · `source` · `last_verified_at` · `booking_enabled`

The source catalog defines multilingual names, wilaya/commune, category, coordinates, photos, 360° tour, opening hours, pricing, contact, verification, source, verification date and booking state as core fields. fileciteturn1file4L894-L897

## 2. Nearby-tourism matching model

Do **not** infer exact distances from this source. Once coordinates are available, the platform should calculate proximity dynamically.

Suggested proximity bands:

| Band | Suggested radius | UI label |
|---|---:|---|
| A | 0–1 km | Walking distance |
| B | 1–5 km | Very close |
| C | 5–15 km | Nearby |
| D | 15–30 km | Short trip |
| E | 30+ km | Day trip / regional attraction |

These radii are **product rules**, not facts about the listed properties. Actual distance must be calculated from verified coordinates.

## 3. Accommodation types

The platform specification calls for hotels, resorts, apartments, guesthouses, villas, hostels and residences initially, with bungalows, desert camps, eco-lodges, boutique properties, rural stays and unique accommodations as future categories. fileciteturn1file2L443-L466

## 4. Seed hotel inventory

The following properties are carried forward from the supplied source. They are **seed records, not confirmed live/bookable inventory**.

| Wilaya / City | Property | Property type | Tourism-nearby matching status | Verification |
|---|---|---|---|---|
| Algiers | El Aurassi Hotel | Hotel | Match after geocoding | Seed — verify |
| Algiers | Sofitel Algiers Hamma Garden | Hotel | Match after geocoding | Seed — verify |
| Algiers | Hyatt Regency Algiers Airport | Hotel | Match after geocoding | Seed — verify |
| Algiers | Sheraton Club des Pins Resort | Resort | Match after geocoding | Seed — verify |
| Algiers | Mercure Alger Aeroport | Hotel | Match after geocoding | Seed — verify |
| Algiers | ibis Algiers Airport | Hotel | Match after geocoding | Seed — verify |
| Algiers | Hotel El Djazair | Hotel | Match after geocoding | Seed — verify |
| Algiers | Atlantis Hotel - Algiers | Hotel | Match after geocoding | Seed — verify |
| Algiers | The Legacy Luxury Hotel | Hotel | Match after geocoding | Seed — verify |
| Algiers | Golden Tulip Opera Alger | Hotel | Match after geocoding | Seed — verify |
| Algiers | Hotel H3 Sidi Fredj | Hotel | Match after geocoding | Seed — verify |
| Algiers | Hotel Beau Rivage | Hotel | Match after geocoding | Seed — verify |
| Algiers | Hotel Welcome | Hotel | Match after geocoding | Seed — verify |
| Algiers | Hotel Royal Sahel | Hotel | Match after geocoding | Seed — verify |
| Algiers | Hotel du Port | Hotel | Match after geocoding | Seed — verify |
| Algiers | La Villa | Hotel | Match after geocoding | Seed — verify |
| Algiers | Hotel Soltane | Hotel | Match after geocoding | Seed — verify |
| Algiers | AD Hotel Pont d'Hydra | Hotel | Match after geocoding | Seed — verify |
| Algiers | AD Hotel La Madelaine | Hotel | Match after geocoding | Seed — verify |
| Algiers | Hotel El Ghanami | Hotel | Match after geocoding | Seed — verify |
| Oran | Four Points by Sheraton Oran | Hotel | Match after geocoding | Seed — verify |
| Oran | Le Méridien Oran Hotel & Convention Centre | Hotel | Match after geocoding | Seed — verify |
| Oran | Royal Hotel Oran - MGallery Collection | Hotel | Match after geocoding | Seed — verify |
| Oran | Melissa Hotel | Hotel | Match after geocoding | Seed — verify |
| Oran | Ibiris Hotel Oran | Hotel | Match after geocoding | Seed — verify |
| Oran | Hotel Falcon Thalassa | Hotel | Match after geocoding | Seed — verify |
| Oran | Hotel MF Oran | Hotel | Match after geocoding | Seed — verify |
| Oran | Hotel Micassa | Hotel | Match after geocoding | Seed — verify |
| Oran | Hotel Nigara | Hotel | Match after geocoding | Seed — verify |
| Oran | Les Ambassadeurs Oran | Hotel | Match after geocoding | Seed — verify |
| Oran | Les Andalouses Resort | Resort | Match after geocoding | Seed — verify |
| Oran | Bladi Suites | Hotel / Suites | Match after geocoding | Seed — verify |
| Oran | Hotel El Akid | Hotel | Match after geocoding | Seed — verify |
| Oran | Hotel Melissa Oran | Hotel | Match after geocoding | Seed — verify |
| Constantine | Constantine Marriott Hotel | Hotel | Match after geocoding | Seed — verify |
| Constantine | Novotel Constantine | Hotel | Match after geocoding | Seed — verify |
| Constantine | Hotel Cirta | Hotel | Match after geocoding | Seed — verify |
| Annaba | Sheraton Annaba Hotel | Hotel | Match after geocoding | Seed — verify |
| Annaba | Sabri Hotel | Hotel | Match after geocoding | Seed — verify |
| Annaba | Hotel Seybouse International | Hotel | Match after geocoding | Seed — verify |
| Béjaïa | Atlantis Bejaia Aéroport | Hotel | Match after geocoding | Seed — verify |
| Béjaïa | Hotel Golden H | Hotel | Match after geocoding | Seed — verify |
| Béjaïa | Hotel Saldae | Hotel | Match after geocoding | Seed — verify |
| Biskra | Hotel Les Zibans | Hotel | Match after geocoding | Seed — verify |
| Aïn Témouchent | Doriane Beach | Hotel | Match after geocoding | Seed — verify |
| Aïn Témouchent | Hotel Le Bateau CTM | Hotel | Match after geocoding | Seed — verify |
| Aïn Témouchent | Eden Stop Hotel | Hotel | Match after geocoding | Seed — verify |
| Tipaza | Hotel Ben Aouda | Hotel | Match after geocoding | Seed — verify |
| Skikda | Rusica Park | Hotel | Match after geocoding | Seed — verify |
| Tizi Ouzou | Hotel Bracelet d'Argent | Hotel | Match after geocoding | Seed — verify |
| Tizi Ouzou | Hotel Beloua | Hotel | Match after geocoding | Seed — verify |
| El Oued | Hotel Souf | Hotel | Match after geocoding | Seed — verify |
| El Oued | Hotel Lous | Hotel | Match after geocoding | Seed — verify |
| Ghardaïa | Hotel M'Zab | Hotel | Match after geocoding | Seed — verify |
| Djanet | Cercle de Garnison de l'Armée Djanet | Institutional accommodation | Match after geocoding | Seed — verify |
| Blida | Cercle Régional de l'Armée Blida | Institutional accommodation | Match after geocoding | Seed — verify |
| Blida | Cercle de Garnison Blida | Institutional accommodation | Match after geocoding | Seed — verify |
| Constantine | Cercle Régional de l'Armée Constantine | Institutional accommodation | Match after geocoding | Seed — verify |
| Oran | Cercle Régional de l'Armée Oran | Institutional accommodation | Match after geocoding | Seed — verify |
| Oran | CPMS de l'Armée Oran | Institutional accommodation | Match after geocoding | Seed — verify |
| Annaba | Cercle Régional de l'Armée Annaba | Institutional accommodation | Match after geocoding | Seed — verify |
| Algiers | Cercle de Garnison de l'Armée Ain Nadja | Institutional accommodation | Match after geocoding | Seed — verify |
| Chlef | Hotel La Vallee Chlef | Hotel | Match after geocoding | Seed — verify |
| Béchar | Taghit Bladi Palace | Hotel | Match after geocoding | Seed — verify |
| Biskra | Hôtel Les Zibans | Hotel | Match after geocoding | Seed — verify |

The supplied source identifies this inventory as a starting list requiring normalization, geocoding, deduplication and verification before publication. fileciteturn3file0L12-L14

## 5. Hotel-to-tourism-place catalog by wilaya

For each wilaya, the platform should show verified accommodations together with tourism places from the destination catalog. The tourism place names below are source-derived; proximity must be calculated after coordinates are verified.

### 01 — Adrar (أدرار)

**Capital:** Adrar

**Tourism places in the supplied catalog:**
- Timimoun oasis (nearby, now separate wilaya)
- Kasr Ouled Aïssa
- Tamantit old town
- Tit oasis
- Aoulef
- Reggane

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 02 — Chlef (الشلف)

**Capital:** Chlef

**Tourism places in the supplied catalog:**
- Ténès
- Ténès coast
- Cap Ténès
- Beni Haoua
- Oued Goussine
- El Marsa

**Seed accommodation records in the supplied hotel list:**
- Hotel La Vallee Chlef — **verify current operation, exact address and coordinates before publication**.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 03 — Laghouat (الأغواط)

**Capital:** Laghouat

**Tourism places in the supplied catalog:**
- Ain Madhi
- Ksar El Hirane
- Laghouat old city
- Mekhadma palm groves

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 04 — Oum El Bouaghi (أم البواقي)

**Capital:** Oum El Bouaghi

**Tourism places in the supplied catalog:**
- Ksar Sbahi
- Ain Beida
- Meskiana
- Sigus Roman site

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 05 — Batna (باتنة)

**Capital:** Batna

**Tourism places in the supplied catalog:**
- Timgad
- Lambaesis
- Ghoufi Canyon
- Balcons de Ghoufi
- Arris
- Menaa
- Tazoult
- Theniet El Abed
- Belezma National Park

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 06 — Béjaïa (بجاية)

**Capital:** Béjaïa

**Tourism places in the supplied catalog:**
- Cap Carbon
- Gouraya National Park
- Yemma Gouraya
- Aiguades
- Pic des Singes
- Cascades de Kefrida
- Saket
- Boulimat
- Tala Guilef

**Seed accommodation records in the supplied hotel list:**
- Atlantis Bejaia Aéroport — **verify current operation, exact address and coordinates before publication**.
- Hotel Golden H — **verify current operation, exact address and coordinates before publication**.
- Hotel Saldae — **verify current operation, exact address and coordinates before publication**.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 07 — Biskra (بسكرة)

**Capital:** Biskra

**Tourism places in the supplied catalog:**
- Sidi Okba
- Tolga palm groves
- M'Chouneche
- Biskra oasis
- Chetma waterfalls
- El Kantara canyon

**Seed accommodation records in the supplied hotel list:**
- Hotel Les Zibans — **verify current operation, exact address and coordinates before publication**.
- Hôtel Les Zibans — **verify current operation, exact address and coordinates before publication**.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 08 — Béchar (بشار)

**Capital:** Béchar

**Tourism places in the supplied catalog:**
- Taghit
- Taghit dunes
- Ksour of Taghit
- Béchar oasis
- Igli
- Kenadsa

**Seed accommodation records in the supplied hotel list:**
- Taghit Bladi Palace — **verify current operation, exact address and coordinates before publication**.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 09 — Blida (البليدة)

**Capital:** Blida

**Tourism places in the supplied catalog:**
- Chréa National Park
- Chréa ski area
- Chréa cedar forests
- Mouzaïa
- Blida old city
- Sidi Moussa

**Seed accommodation records in the supplied hotel list:**
- Cercle Régional de l'Armée Blida — **verify current operation, exact address and coordinates before publication**.
- Cercle de Garnison Blida — **verify current operation, exact address and coordinates before publication**.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 10 — Bouira (البويرة)

**Capital:** Bouira

**Tourism places in the supplied catalog:**
- Tikjda
- Djurdjura National Park
- Lake Agoulmim
- Lakhdaria
- Chorfa

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 11 — Tamanrasset (تمنراست)

**Capital:** Tamanrasset

**Tourism places in the supplied catalog:**
- Assekrem
- Hoggar Mountains
- Atakor
- Aguellal
- Tamanrasset market
- Tahaggart

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 12 — Tébessa (تبسة)

**Capital:** Tébessa

**Tourism places in the supplied catalog:**
- Thebaida / Tebessa Roman ruins
- Arch of Caracalla
- Basilica of St Crispina
- Kouif
- Hammamet

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 13 — Tlemcen (تلمسان)

**Capital:** Tlemcen

**Tourism places in the supplied catalog:**
- Tlemcen old city
- Mansourah
- Mansourah Minaret
- El Mechouar
- Sidi Boumediene complex
- Lalla Setti Plateau
- El Ourit waterfalls
- Tlemcen National Park
- Honaïne
- Nedroma
- Marsa Ben M'Hidi

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 14 — Tiaret (تيارت)

**Capital:** Tiaret

**Tourism places in the supplied catalog:**
- Tagdemt
- Frenda
- Medrissa
- Tiaret rock art sites

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 15 — Tizi Ouzou (تيزي وزو)

**Capital:** Tizi Ouzou

**Tourism places in the supplied catalog:**
- Yakouren forest
- Tigzirt
- Dellys coast (nearby)
- Lalla Khedidja
- Djurdjura
- Ath Yenni
- Boghni

**Seed accommodation records in the supplied hotel list:**
- Hotel Bracelet d'Argent — **verify current operation, exact address and coordinates before publication**.
- Hotel Beloua — **verify current operation, exact address and coordinates before publication**.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 16 — Algiers (الجزائر)

**Capital:** Alger

**Tourism places in the supplied catalog:**
- Casbah of Algiers
- Martyrs' Memorial
- Jardin d'Essai du Hamma
- Notre Dame d'Afrique
- Ketchaoua Mosque
- Grande Poste
- Palais des Raïs
- Bardo National Museum
- Museum of Fine Arts
- El Madania
- Sidi Fredj
- Tipaza day trip

**Seed accommodation records in the supplied hotel list:**
- El Aurassi Hotel — **verify current operation, exact address and coordinates before publication**.
- Sofitel Algiers Hamma Garden — **verify current operation, exact address and coordinates before publication**.
- Hyatt Regency Algiers Airport — **verify current operation, exact address and coordinates before publication**.
- Sheraton Club des Pins Resort — **verify current operation, exact address and coordinates before publication**.
- Mercure Alger Aeroport — **verify current operation, exact address and coordinates before publication**.
- ibis Algiers Airport — **verify current operation, exact address and coordinates before publication**.
- Hotel El Djazair — **verify current operation, exact address and coordinates before publication**.
- Atlantis Hotel - Algiers — **verify current operation, exact address and coordinates before publication**.
- The Legacy Luxury Hotel — **verify current operation, exact address and coordinates before publication**.
- Golden Tulip Opera Alger — **verify current operation, exact address and coordinates before publication**.
- Hotel H3 Sidi Fredj — **verify current operation, exact address and coordinates before publication**.
- Hotel Beau Rivage — **verify current operation, exact address and coordinates before publication**.
- Hotel Welcome — **verify current operation, exact address and coordinates before publication**.
- Hotel Royal Sahel — **verify current operation, exact address and coordinates before publication**.
- Hotel du Port — **verify current operation, exact address and coordinates before publication**.
- La Villa — **verify current operation, exact address and coordinates before publication**.
- Hotel Soltane — **verify current operation, exact address and coordinates before publication**.
- AD Hotel Pont d'Hydra — **verify current operation, exact address and coordinates before publication**.
- AD Hotel La Madelaine — **verify current operation, exact address and coordinates before publication**.
- Hotel El Ghanami — **verify current operation, exact address and coordinates before publication**.
- Cercle de Garnison de l'Armée Ain Nadja — **verify current operation, exact address and coordinates before publication**.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 17 — Djelfa (الجلفة)

**Capital:** Djelfa

**Tourism places in the supplied catalog:**
- Ain Naga rock art
- Zaccar
- Djelfa steppe
- Moudjbara
- Charef

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 18 — Jijel (جيجل)

**Capital:** Jijel

**Tourism places in the supplied catalog:**
- Jijel Corniche
- Grotte Merveilleuse
- Grotte de Ziama Mansouriah
- Taza National Park
- El Aouana
- Texenna
- Kissir
- Caves and coastal cliffs

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 19 — Sétif (سطيف)

**Capital:** Sétif

**Tourism places in the supplied catalog:**
- Djemila
- Djemila Roman city
- Sétif city center
- Ain El Fouara fountain
- Babor Mountains
- Béni Aziz

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 20 — Saïda (سعيدة)

**Capital:** Saïda

**Tourism places in the supplied catalog:**
- Hammam Rabi
- Saida thermal springs
- Tiffrit
- Ain El Hadjar

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 21 — Skikda (سكيكدة)

**Capital:** Skikda

**Tourism places in the supplied catalog:**
- Stora
- Filfila
- Collo
- Skikda Corniche
- Kettani beach
- Rusica Park
- El Marsa

**Seed accommodation records in the supplied hotel list:**
- Rusica Park — **verify current operation, exact address and coordinates before publication**.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 22 — Sidi Bel Abbès (سيدي بلعباس)

**Capital:** Sidi Bel Abbès

**Tourism places in the supplied catalog:**
- Sidi Bel Abbès city
- Tabia
- Telagh
- Ras El Ma

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 23 — Annaba (عنابة)

**Capital:** Annaba

**Tourism places in the supplied catalog:**
- Basilica of St Augustine
- Sidi Bou Merouane Mosque
- Hippo Regius
- Seraïdi
- Cap de Garde
- Aïn Achir Beach
- Chetaïbi

**Seed accommodation records in the supplied hotel list:**
- Sheraton Annaba Hotel — **verify current operation, exact address and coordinates before publication**.
- Sabri Hotel — **verify current operation, exact address and coordinates before publication**.
- Hotel Seybouse International — **verify current operation, exact address and coordinates before publication**.
- Cercle Régional de l'Armée Annaba — **verify current operation, exact address and coordinates before publication**.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 24 — Guelma (قالمة)

**Capital:** Guelma

**Tourism places in the supplied catalog:**
- Hammam Debagh
- Roman Theatre of Guelma
- Thibilis
- Guelma thermal springs
- Hammam Ouled Ali

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 25 — Constantine (قسنطينة)

**Capital:** Constantine

**Tourism places in the supplied catalog:**
- Sidi M'Cid Bridge
- Constantine Casbah
- Palace of Ahmed Bey
- Emir Abdelkader Mosque
- Monument aux Morts
- Gorges of the Rhumel
- Mellah Slimane Bridge

**Seed accommodation records in the supplied hotel list:**
- Constantine Marriott Hotel — **verify current operation, exact address and coordinates before publication**.
- Novotel Constantine — **verify current operation, exact address and coordinates before publication**.
- Hotel Cirta — **verify current operation, exact address and coordinates before publication**.
- Cercle Régional de l'Armée Constantine — **verify current operation, exact address and coordinates before publication**.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 26 — Médéa (المدية)

**Capital:** Médéa

**Tourism places in the supplied catalog:**
- Médéa old city
- Berrouaghia
- Tamesguida
- Chiffa Gorge
- Ben Chicao

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 27 — Mostaganem (مستغانم)

**Capital:** Mostaganem

**Tourism places in the supplied catalog:**
- Sablettes Beach
- Salamandre
- Stidia
- Kharouba
- Cap Ivi
- Aïn Nouissy
- Mostaganem Corniche

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 28 — M'Sila (المسيلة)

**Capital:** M'Sila

**Tourism places in the supplied catalog:**
- Bou Saâda
- Maâdid
- Kalâa of Beni Hammad
- Magra
- Ain El Melh

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 29 — Mascara (معسكر)

**Capital:** Mascara

**Tourism places in the supplied catalog:**
- Bordj El Menaïl?
- Mascara old city
- Bouhanifia thermal springs
- Ghriss
- Mohammadia

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 30 — Ouargla (ورقلة)

**Capital:** Ouargla

**Tourism places in the supplied catalog:**
- Ouargla old ksar
- Bamendil
- N'Goussa
- Ouargla oasis
- Hassi Messaoud

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 31 — Oran (وهران)

**Capital:** Oran

**Tourism places in the supplied catalog:**
- Santa Cruz Fort
- Santa Cruz Chapel
- Sidi El Houari
- Ahmed Zabana National Museum
- Front de Mer
- Place du 1er Novembre
- Ain El Turk
- Les Andalouses
- Canastel
- Madagh Beach
- Arzew

**Seed accommodation records in the supplied hotel list:**
- Four Points by Sheraton Oran — **verify current operation, exact address and coordinates before publication**.
- Le Méridien Oran Hotel & Convention Centre — **verify current operation, exact address and coordinates before publication**.
- Royal Hotel Oran - MGallery Collection — **verify current operation, exact address and coordinates before publication**.
- Melissa Hotel — **verify current operation, exact address and coordinates before publication**.
- Ibiris Hotel Oran — **verify current operation, exact address and coordinates before publication**.
- Hotel Falcon Thalassa — **verify current operation, exact address and coordinates before publication**.
- Hotel MF Oran — **verify current operation, exact address and coordinates before publication**.
- Hotel Micassa — **verify current operation, exact address and coordinates before publication**.
- Hotel Nigara — **verify current operation, exact address and coordinates before publication**.
- Les Ambassadeurs Oran — **verify current operation, exact address and coordinates before publication**.
- Les Andalouses Resort — **verify current operation, exact address and coordinates before publication**.
- Bladi Suites — **verify current operation, exact address and coordinates before publication**.
- Hotel El Akid — **verify current operation, exact address and coordinates before publication**.
- Hotel Melissa Oran — **verify current operation, exact address and coordinates before publication**.
- Cercle Régional de l'Armée Oran — **verify current operation, exact address and coordinates before publication**.
- CPMS de l'Armée Oran — **verify current operation, exact address and coordinates before publication**.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 32 — El Bayadh (البيض)

**Capital:** El Bayadh

**Tourism places in the supplied catalog:**
- El Bayadh plateau
- Brezina
- Brézina dam
- Ksar El Barka
- Boualem

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 33 — Illizi (إليزي)

**Capital:** Illizi

**Tourism places in the supplied catalog:**
- Djanet region
- Tassili n'Ajjer
- Tadrart Rouge
- Tin Merzouga
- Sefar
- Issendjel

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 34 — Bordj Bou Arréridj (برج بوعريريج)

**Capital:** Bordj Bou Arréridj

**Tourism places in the supplied catalog:**
- El Achir
- Ras El Oued
- Bordj city
- Mansoura

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 35 — Boumerdès (بومرداس)

**Capital:** Boumerdès

**Tourism places in the supplied catalog:**
- Boumerdès coast
- Cap Djinet
- Zemmouri El Bahri
- Dellys
- Figuier Beach
- Boudouaou

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 36 — El Tarf (الطارف)

**Capital:** El Tarf

**Tourism places in the supplied catalog:**
- El Kala National Park
- Lake El Kala
- Lake Oubeira
- Lake Tonga
- El Kala beaches
- Cap Rosa
- Berkane

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 37 — Tindouf (تندوف)

**Capital:** Tindouf

**Tourism places in the supplied catalog:**
- Tindouf
- Oum El Assel
- Sahara landscapes
- Tin Amouks

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 38 — Tissemsilt (تيسمسيلت)

**Capital:** Tissemsilt

**Tourism places in the supplied catalog:**
- Theniet El Had National Park
- Theniet El Had cedar forest
- Bordj Emir Abdelkader
- Boucaid

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 39 — El Oued (الوادي)

**Capital:** El Oued

**Tourism places in the supplied catalog:**
- El Oued old city
- Souf architecture
- Grand Erg Oriental
- Guemar
- Nakhla oasis
- Magrane

**Seed accommodation records in the supplied hotel list:**
- Hotel Souf — **verify current operation, exact address and coordinates before publication**.
- Hotel Lous — **verify current operation, exact address and coordinates before publication**.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 40 — Khenchela (خنشلة)

**Capital:** Khenchela

**Tourism places in the supplied catalog:**
- Babar
- Chélia Mountain
- Khenchela thermal springs
- Kais
- Yabous

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 41 — Souk Ahras (سوق أهراس)

**Capital:** Souk Ahras

**Tourism places in the supplied catalog:**
- Madaure
- Madaurus Roman site
- Sidi Fredj
- Ouled Moumen

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 42 — Tipaza (تيبازة)

**Capital:** Tipaza

**Tourism places in the supplied catalog:**
- Tipasa Roman ruins
- Chenoua Mountain
- Tipaza coast
- Sidi Rached
- Bou Ismaïl
- Koléa
- Damous
- Cherchell
- Royal Mausoleum of Mauretania

**Seed accommodation records in the supplied hotel list:**
- Hotel Ben Aouda — **verify current operation, exact address and coordinates before publication**.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 43 — Mila (ميلة)

**Capital:** Mila

**Tourism places in the supplied catalog:**
- Mila old city
- Old Mila
- Barrage de Beni Haroun
- Ferdjioua
- Grarem

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 44 — Aïn Defla (عين الدفلى)

**Capital:** Aïn Defla

**Tourism places in the supplied catalog:**
- Miliana
- Miliana old town
- Zaccar mountain
- El Abadia
- Theniet El Had access

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 45 — Naâma (النعامة)

**Capital:** Naâma

**Tourism places in the supplied catalog:**
- Aïn Sefra
- Tiout oasis
- Boussemghoun
- Sfissifa
- Moghrar oasis
- Cheikh Bouamama mausoleum

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 46 — Aïn Témouchent (عين تموشنت)

**Capital:** Aïn Témouchent

**Tourism places in the supplied catalog:**
- Beni Saf
- Rachgoun Beach
- Hammam Bou Hadjar
- Terga
- Madagh
- Sassel

**Seed accommodation records in the supplied hotel list:**
- Doriane Beach — **verify current operation, exact address and coordinates before publication**.
- Hotel Le Bateau CTM — **verify current operation, exact address and coordinates before publication**.
- Eden Stop Hotel — **verify current operation, exact address and coordinates before publication**.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 47 — Ghardaïa (غرداية)

**Capital:** Ghardaïa

**Tourism places in the supplied catalog:**
- Ghardaïa M'Zab Valley
- Beni Isguen
- El Atteuf
- Melika
- Bou Noura
- Metlili
- Guerrara

**Seed accommodation records in the supplied hotel list:**
- Hotel M'Zab — **verify current operation, exact address and coordinates before publication**.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 48 — Relizane (غليزان)

**Capital:** Relizane

**Tourism places in the supplied catalog:**
- Mazouna
- Relizane city
- Zemmoura
- Oued Rhiou

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 49 — Timimoun (تيميمون)

**Capital:** Timimoun

**Tourism places in the supplied catalog:**
- Timimoun oasis
- Red Oasis
- Ksar of Timimoun
- Foggaret Ezzaouia
- Tinerkouk

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 50 — Bordj Badji Mokhtar (برج باجي مختار)

**Capital:** Bordj Badji Mokhtar

**Tourism places in the supplied catalog:**
- Bordj Badji Mokhtar
- Timiaouine
- Sahara border landscapes

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 51 — Ouled Djellal (أولاد جلال)

**Capital:** Ouled Djellal

**Tourism places in the supplied catalog:**
- Ouled Djellal oasis
- Sidi Khaled
- Besbes

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 52 — Béni Abbès (بني عباس)

**Capital:** Béni Abbès

**Tourism places in the supplied catalog:**
- Béni Abbès oasis
- Saoura valley
- Sidi Othmane hermitage
- El Ouata
- Kerzaz

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 53 — In Salah (عين صالح)

**Capital:** In Salah

**Tourism places in the supplied catalog:**
- In Salah oasis
- Tidikelt
- Foggaret Ezzaouia
- Aïn Salah old ksour

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 54 — In Guezzam (عين قزام)

**Capital:** In Guezzam

**Tourism places in the supplied catalog:**
- In Guezzam
- Sahara landscapes
- Tanezrouft gateway

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 55 — Touggourt (تقرت)

**Capital:** Touggourt

**Tourism places in the supplied catalog:**
- Touggourt old ksar
- Touggourt oasis
- Megarine
- Temacine
- Tamelaht

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 56 — Djanet (جانت)

**Capital:** Djanet

**Tourism places in the supplied catalog:**
- Djanet oasis
- Tassili n'Ajjer
- Tadrart Rouge
- Sefar
- Djanet canyon
- Essendilene

**Seed accommodation records in the supplied hotel list:**
- Cercle de Garnison de l'Armée Djanet — **verify current operation, exact address and coordinates before publication**.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 57 — El M'Ghair (المغير)

**Capital:** El M'Ghair

**Tourism places in the supplied catalog:**
- El M'Ghair oasis
- Djamaa
- Oued Righ

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 58 — El Meniaa (المنيعة)

**Capital:** El Meniaa

**Tourism places in the supplied catalog:**
- El Meniaa oasis
- El Goléa / El Meniaa old ksar
- M'Zab–Sahara transition

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 59 — Aflou (أفلو)

**Capital:** Aflou

**Tourism places in the supplied catalog:**
- Aflou plateau
- Djebel Amour
- Aflou steppe

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 60 — Barika (بريكة)

**Capital:** Barika

**Tourism places in the supplied catalog:**
- Barika
- Zana
- Steppe landscapes

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 61 — El Kantara (القنطرة)

**Capital:** El Kantara

**Tourism places in the supplied catalog:**
- El Kantara gorge
- El Kantara oasis
- Red Bridge

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 62 — Bir El Ater (بئر العاتر)

**Capital:** Bir El Ater

**Tourism places in the supplied catalog:**
- Bir El Ater
- Tébessa southern landscapes
- Bir El Ater steppe

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 63 — El Aricha (العريشة)

**Capital:** El Aricha

**Tourism places in the supplied catalog:**
- El Aricha
- El Aricha steppe
- western high plateaus

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 64 — Ksar Chellala (قصر الشلالة)

**Capital:** Ksar Chellala

**Tourism places in the supplied catalog:**
- Ksar Chellala
- High Plateaus landscapes
- steppe heritage

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 65 — Aïn Oussara (عين وسارة)

**Capital:** Aïn Oussara

**Tourism places in the supplied catalog:**
- Aïn Oussara
- Djelfa high plateaus
- steppe landscapes

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 66 — Messaad (مسعد)

**Capital:** Messaad

**Tourism places in the supplied catalog:**
- Messaad
- Messaad oasis
- Ouled Nail heritage

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 67 — Ksar El Boukhari (قصر البخاري)

**Capital:** Ksar El Boukhari

**Tourism places in the supplied catalog:**
- Ksar El Boukhari
- Chiffa–Médéa highlands
- Cheliff valley

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 68 — Bou Saâda (بوسعادة)

**Capital:** Bou Saâda

**Tourism places in the supplied catalog:**
- Bou Saâda oasis
- Moulin Ferrero
- Nasreddine Dinet Museum
- Ouled Nail heritage
- Ain El Melh

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

### 69 — El Abiodh Sidi Cheikh (الأبيض سيدي الشيخ)

**Capital:** El Abiodh Sidi Cheikh

**Tourism places in the supplied catalog:**
- El Abiodh Sidi Cheikh
- Cheikh Sidi Cheikh mausoleum
- El Bayadh–Sahara landscapes

**Seed accommodation records in the supplied hotel list:**
- No seed hotel was listed for the capital in the supplied hotel table.
- Continue acquisition through official tourism-sector directories, partner onboarding and public-directory cross-checking.

**Recommended property-page modules:**
- Nearby attractions
- Beaches / nature / heritage where applicable
- Restaurants and cafés
- Activities and local experiences
- 360° locations
- Map and route
- Booking availability

## 6. Tourism categories to connect to hotels

The supplied master catalog identifies a broad taxonomy including hotels, resorts, apartments, guesthouses, villas, hostels, desert camps, oases, beaches, mountains, national parks, forests, lakes, waterfalls, thermal springs, Roman sites, Ottoman heritage, Islamic architecture, kasbahs/ksour, museums, mausoleums, caves, gorges, archaeological sites, markets, craft villages, restaurants, cafés, food experiences, guided tours, hiking, diving, boat trips, desert excursions, quad/4x4 experiences, photography spots, family activities, cultural experiences, festivals and 360° tours. fileciteturn3file0L99-L140

## 7. Property page: 'Stay near what you want to see'

Each property page should include a dedicated nearby-tourism module:

```text
HOTEL / PROPERTY
│
├── Photos
├── 360° Tour
├── Rooms + Availability
├── Facilities
├── Reviews
├── Map
│
└── NEARBY
    ├── Attractions
    ├── Beaches
    ├── Heritage
    ├── Nature
    ├── Restaurants
    ├── Activities
    └── Experiences
```

This directly follows the platform concept: property pages should combine photography, 360° tours, property information, location, facilities, rooms, pricing, availability, reviews, policies and nearby places. fileciteturn1file3L677-L715

## 8. 360° tourism connection

The 360° system should cover not only hotels but also beaches, museums, historical sites, old cities, mountains, Sahara locations, attractions, restaurants and activities. fileciteturn1file1L218-L250

For a hotel with a 360° tour, recommended linked scenes are:

- Lobby
- Reception
- Standard room
- Deluxe room
- Bathroom
- Restaurant
- Pool
- Garden / outdoor areas
- Sea / mountain / city view where applicable
- Nearby attraction previews

## 9. Search and filters

Recommended filters from the platform concept:

- Destination
- Price
- Property type
- Rating
- Distance
- Facilities
- Breakfast
- Pool
- Parking
- Beach access
- Family friendly
- Business facilities
- Cancellation policy
- Instant booking
- 360° availability

These filters are specified in the supplied platform concept. fileciteturn1file8L1482-L1521

## 10. AI nearby-stay queries

The AI layer should transform natural-language requests into structured hotel + tourism searches. Examples:

> Find a family hotel in Béjaïa near the beach with a pool and breakfast.

> Find a hotel near Timgad and other Roman sites, with a 360° tour.

> Show me accommodation near the best beaches in Oran and nearby restaurants.

> I want to stay near Assekrem and book a desert experience.

The supplied concept explicitly proposes AI search for family hotels near beaches and AI recommendations that connect to real platform objects. fileciteturn1file2L567-L615

## 11. Acquisition pipeline for missing hotels

To make this catalog genuinely comprehensive:

1. Import official tourism-sector establishment data where legally and technically available.
2. Collect partner-submitted properties through Partner Center.
3. Cross-check public hotel directories and booking marketplaces.
4. Deduplicate using business name, phone, address and coordinates.
5. Verify operating status.
6. Assign the correct 2026 wilaya and commune.
7. Add room types and capacity.
8. Request 360° media from partners.
9. Set `verified=true` only after validation.
10. Record `last_verified_at` for every record.

This is the exact expansion approach specified in the supplied master catalog. fileciteturn3file0L84-L97

## 12. Recommended database entities

```text
Algeria
└── Wilaya
    └── City / Commune
        └── Tourist Area
            ├── Property
            │   ├── Room
            │   ├── Availability
            │   ├── Pricing
            │   ├── 360° Scenes
            │   └── Reviews
            ├── Attraction
            ├── Beach
            ├── Restaurant
            ├── Activity
            └── Experience
```

The platform concept uses this connected destination/property model so the same data can power search, maps, AI, content and booking. fileciteturn1file0L106-L140

## 13. SEO page generation

The catalog should generate useful pages such as:

- Hotels in Oran near beaches
- Hotels near Santa Cruz
- Hotels in Algiers near Casbah
- Hotels near Timgad
- Hotels near Djemila
- Hotels near Cap Carbon
- Hotels near Chréa
- Hotels near Tikjda
- Hotels near Ghardaïa attractions
- Hotels near Taghit dunes
- Hotels near Djanet attractions
- Hotels near Assekrem

The supplied platform concept explicitly calls for destination/property SEO pages, including hotels by city, hotels near beaches, Sahara tours and destination guides. fileciteturn1file0L56-L74

## 14. Verification status vocabulary

| Status | Meaning |
|---|---|
| `seed` | Identified in the supplied source; not yet fully verified |
| `discovered` | Found through additional acquisition research |
| `verified` | Business, address and operating status checked |
| `360_verified` | Property has verified 360° content |
| `bookable` | Live booking inventory and reservation flow validated |
| `inactive` | Confirmed no longer operating / unavailable |
| `needs_review` | Conflicting or incomplete information |

## 15. Final product principle

The goal is not merely to create a list of hotels. Each accommodation should become an entry point into a complete destination ecosystem:

```text
HOTEL
  ↓
360° PROPERTY
  ↓
NEARBY TOURISM PLACES
  ↓
RESTAURANTS + ACTIVITIES
  ↓
AI ITINERARY
  ↓
BOOK
  ↓
TRIP
  ↓
REVIEW
```

This matches the platform's core positioning: **Discover → Explore in 360° → Compare → Book → Travel → Review**, with AI connecting discovery, comparison and planning. fileciteturn1file7L1290-L1330

## Source files used

- `algeria_69_wilayas_tourism_master_catalog(1).md`
- `algerian_360_travel_booking_platform_concept(1).md`

## Important implementation note

Before production launch, enrich each hotel with verified coordinates and live operational data, then compute actual proximity to attractions. Do not label a property as 'near' a tourism place solely because both records belong to the same wilaya.
