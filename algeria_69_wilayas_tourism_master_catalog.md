# Algeria Tourism Master Catalog — 69 Wilayas
> **Purpose:** master content/catalog specification for the Algerian 360° travel and booking platform. This document is designed as the seed structure for destinations, tourism places, accommodations, experiences and partner acquisition.

## Important data note
As of 2026, Algeria's territorial organization is **69 wilayas and 1,541 communes** under Law 26-06. The official tourism ministry directory already lists tourism directorates for the newer wilayas. citeturn1search9turn0search1

This file deliberately **does not invent hotel records** to reach an arbitrary number. Hotel inventory changes, properties open/close, names change, and some accommodation businesses are not consistently indexed across public sources. The hotel section below is therefore a **verified/identified seed catalog**, not a claim that it contains every operating hotel in Algeria. For production, the partner portal and official tourism registries should be used to complete and verify the national hotel inventory. Public sources currently expose substantial but non-identical hotel inventories; for example, Tripinafrica lists 133 hotels, while Booking.com exposes a different live marketplace inventory. citeturn3search4turn3search3

## Sources and validation
- **Administrative hierarchy:** Journal Officiel / Law 26-06 and current 69-wilaya datasets. citeturn1search2turn1search9
- **Tourism administration:** Algerian Ministry of Tourism and Handicrafts directory. citeturn0search1
- **Hotel discovery:** current public booking/brand directories and tourism-industry material. citeturn3search1turn3search3turn3search4

# 1. Platform Content Model
Every tourism record should eventually support:

`name_ar` · `name_fr` · `name_en` · `wilaya` · `commune` · `category` · `description` · `coordinates` · `photos` · `360_tour` · `opening_hours` · `price_range` · `contact` · `verified` · `source` · `last_verified_at` · `booking_enabled`.

# 2. All 69 Wilayas

| Code | Wilaya | Arabic | Capital |
|---:|---|---|---|
| 01 | Adrar | أدرار | Adrar |
| 02 | Chlef | الشلف | Chlef |
| 03 | Laghouat | الأغواط | Laghouat |
| 04 | Oum El Bouaghi | أم البواقي | Oum El Bouaghi |
| 05 | Batna | باتنة | Batna |
| 06 | Béjaïa | بجاية | Béjaïa |
| 07 | Biskra | بسكرة | Biskra |
| 08 | Béchar | بشار | Béchar |
| 09 | Blida | البليدة | Blida |
| 10 | Bouira | البويرة | Bouira |
| 11 | Tamanrasset | تمنراست | Tamanrasset |
| 12 | Tébessa | تبسة | Tébessa |
| 13 | Tlemcen | تلمسان | Tlemcen |
| 14 | Tiaret | تيارت | Tiaret |
| 15 | Tizi Ouzou | تيزي وزو | Tizi Ouzou |
| 16 | Algiers | الجزائر | Alger |
| 17 | Djelfa | الجلفة | Djelfa |
| 18 | Jijel | جيجل | Jijel |
| 19 | Sétif | سطيف | Sétif |
| 20 | Saïda | سعيدة | Saïda |
| 21 | Skikda | سكيكدة | Skikda |
| 22 | Sidi Bel Abbès | سيدي بلعباس | Sidi Bel Abbès |
| 23 | Annaba | عنابة | Annaba |
| 24 | Guelma | قالمة | Guelma |
| 25 | Constantine | قسنطينة | Constantine |
| 26 | Médéa | المدية | Médéa |
| 27 | Mostaganem | مستغانم | Mostaganem |
| 28 | M'Sila | المسيلة | M'Sila |
| 29 | Mascara | معسكر | Mascara |
| 30 | Ouargla | ورقلة | Ouargla |
| 31 | Oran | وهران | Oran |
| 32 | El Bayadh | البيض | El Bayadh |
| 33 | Illizi | إليزي | Illizi |
| 34 | Bordj Bou Arréridj | برج بوعريريج | Bordj Bou Arréridj |
| 35 | Boumerdès | بومرداس | Boumerdès |
| 36 | El Tarf | الطارف | El Tarf |
| 37 | Tindouf | تندوف | Tindouf |
| 38 | Tissemsilt | تيسمسيلت | Tissemsilt |
| 39 | El Oued | الوادي | El Oued |
| 40 | Khenchela | خنشلة | Khenchela |
| 41 | Souk Ahras | سوق أهراس | Souk Ahras |
| 42 | Tipaza | تيبازة | Tipaza |
| 43 | Mila | ميلة | Mila |
| 44 | Aïn Defla | عين الدفلى | Aïn Defla |
| 45 | Naâma | النعامة | Naâma |
| 46 | Aïn Témouchent | عين تموشنت | Aïn Témouchent |
| 47 | Ghardaïa | غرداية | Ghardaïa |
| 48 | Relizane | غليزان | Relizane |
| 49 | Timimoun | تيميمون | Timimoun |
| 50 | Bordj Badji Mokhtar | برج باجي مختار | Bordj Badji Mokhtar |
| 51 | Ouled Djellal | أولاد جلال | Ouled Djellal |
| 52 | Béni Abbès | بني عباس | Béni Abbès |
| 53 | In Salah | عين صالح | In Salah |
| 54 | In Guezzam | عين قزام | In Guezzam |
| 55 | Touggourt | تقرت | Touggourt |
| 56 | Djanet | جانت | Djanet |
| 57 | El M'Ghair | المغير | El M'Ghair |
| 58 | El Meniaa | المنيعة | El Meniaa |
| 59 | Aflou | أفلو | Aflou |
| 60 | Barika | بريكة | Barika |
| 61 | El Kantara | القنطرة | El Kantara |
| 62 | Bir El Ater | بئر العاتر | Bir El Ater |
| 63 | El Aricha | العريشة | El Aricha |
| 64 | Ksar Chellala | قصر الشلالة | Ksar Chellala |
| 65 | Aïn Oussara | عين وسارة | Aïn Oussara |
| 66 | Messaad | مسعد | Messaad |
| 67 | Ksar El Boukhari | قصر البخاري | Ksar El Boukhari |
| 68 | Bou Saâda | بوسعادة | Bou Saâda |
| 69 | El Abiodh Sidi Cheikh | الأبيض سيدي الشيخ | El Abiodh Sidi Cheikh |

## 2026 administrative reform

The eleven new wilayas are codes 59–69: Aflou, Barika, El Kantara, Bir El Ater, El Aricha, Ksar Chellala, Aïn Oussara, Messaad, Ksar El Boukhari, Bou Saâda and El Abiodh Sidi Cheikh. Their creation raised the national total from 58 to 69. citeturn1search5turn1search10

# 3. Tourism Place Catalog by Wilaya

## 01 — Adrar (أدرار)

- **Timimoun oasis (nearby, now separate wilaya)** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Kasr Ouled Aïssa** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tamantit old town** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tit oasis** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Aoulef** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Reggane** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 02 — Chlef (الشلف)

- **Ténès** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ténès coast** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Cap Ténès** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Beni Haoua** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Oued Goussine** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **El Marsa** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 03 — Laghouat (الأغواط)

- **Ain Madhi** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ksar El Hirane** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Laghouat old city** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Mekhadma palm groves** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 04 — Oum El Bouaghi (أم البواقي)

- **Ksar Sbahi** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ain Beida** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Meskiana** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Sigus Roman site** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 05 — Batna (باتنة)

- **Timgad** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Lambaesis** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ghoufi Canyon** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Balcons de Ghoufi** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Arris** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Menaa** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tazoult** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Theniet El Abed** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Belezma National Park** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 06 — Béjaïa (بجاية)

- **Cap Carbon** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Gouraya National Park** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Yemma Gouraya** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Aiguades** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Pic des Singes** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Cascades de Kefrida** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Saket** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Boulimat** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tala Guilef** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 07 — Biskra (بسكرة)

- **Sidi Okba** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tolga palm groves** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **M'Chouneche** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Biskra oasis** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Chetma waterfalls** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **El Kantara canyon** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 08 — Béchar (بشار)

- **Taghit** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Taghit dunes** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ksour of Taghit** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Béchar oasis** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Igli** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Kenadsa** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 09 — Blida (البليدة)

- **Chréa National Park** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Chréa ski area** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Chréa cedar forests** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Mouzaïa** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Blida old city** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Sidi Moussa** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 10 — Bouira (البويرة)

- **Tikjda** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Djurdjura National Park** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Lake Agoulmim** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Lakhdaria** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Chorfa** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 11 — Tamanrasset (تمنراست)

- **Assekrem** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Hoggar Mountains** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Atakor** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Aguellal** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tamanrasset market** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tahaggart** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 12 — Tébessa (تبسة)

- **Thebaida / Tebessa Roman ruins** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Arch of Caracalla** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Basilica of St Crispina** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Kouif** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Hammamet** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 13 — Tlemcen (تلمسان)

- **Tlemcen old city** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Mansourah** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Mansourah Minaret** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **El Mechouar** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Sidi Boumediene complex** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Lalla Setti Plateau** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **El Ourit waterfalls** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tlemcen National Park** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Honaïne** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Nedroma** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Marsa Ben M'Hidi** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 14 — Tiaret (تيارت)

- **Tagdemt** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Frenda** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Medrissa** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tiaret rock art sites** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 15 — Tizi Ouzou (تيزي وزو)

- **Yakouren forest** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tigzirt** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Dellys coast (nearby)** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Lalla Khedidja** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Djurdjura** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ath Yenni** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Boghni** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 16 — Algiers (الجزائر)

- **Casbah of Algiers** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Martyrs' Memorial** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Jardin d'Essai du Hamma** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Notre Dame d'Afrique** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ketchaoua Mosque** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Grande Poste** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Palais des Raïs** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Bardo National Museum** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Museum of Fine Arts** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **El Madania** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Sidi Fredj** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tipaza day trip** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 17 — Djelfa (الجلفة)

- **Ain Naga rock art** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Zaccar** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Djelfa steppe** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Moudjbara** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Charef** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 18 — Jijel (جيجل)

- **Jijel Corniche** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Grotte Merveilleuse** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Grotte de Ziama Mansouriah** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Taza National Park** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **El Aouana** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Texenna** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Kissir** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Caves and coastal cliffs** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 19 — Sétif (سطيف)

- **Djemila** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Djemila Roman city** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Sétif city center** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ain El Fouara fountain** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Babor Mountains** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Béni Aziz** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 20 — Saïda (سعيدة)

- **Hammam Rabi** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Saida thermal springs** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tiffrit** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ain El Hadjar** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 21 — Skikda (سكيكدة)

- **Stora** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Filfila** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Collo** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Skikda Corniche** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Kettani beach** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Rusica Park** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **El Marsa** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 22 — Sidi Bel Abbès (سيدي بلعباس)

- **Sidi Bel Abbès city** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tabia** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Telagh** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ras El Ma** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 23 — Annaba (عنابة)

- **Basilica of St Augustine** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Sidi Bou Merouane Mosque** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Hippo Regius** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Seraïdi** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Cap de Garde** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Aïn Achir Beach** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Chetaïbi** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 24 — Guelma (قالمة)

- **Hammam Debagh** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Roman Theatre of Guelma** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Thibilis** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Guelma thermal springs** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Hammam Ouled Ali** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 25 — Constantine (قسنطينة)

- **Sidi M'Cid Bridge** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Constantine Casbah** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Palace of Ahmed Bey** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Emir Abdelkader Mosque** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Monument aux Morts** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Gorges of the Rhumel** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Mellah Slimane Bridge** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 26 — Médéa (المدية)

- **Médéa old city** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Berrouaghia** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tamesguida** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Chiffa Gorge** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ben Chicao** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 27 — Mostaganem (مستغانم)

- **Sablettes Beach** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Salamandre** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Stidia** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Kharouba** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Cap Ivi** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Aïn Nouissy** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Mostaganem Corniche** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 28 — M'Sila (المسيلة)

- **Bou Saâda** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Maâdid** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Kalâa of Beni Hammad** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Magra** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ain El Melh** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 29 — Mascara (معسكر)

- **Bordj El Menaïl?** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Mascara old city** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Bouhanifia thermal springs** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ghriss** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Mohammadia** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 30 — Ouargla (ورقلة)

- **Ouargla old ksar** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Bamendil** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **N'Goussa** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ouargla oasis** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Hassi Messaoud** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 31 — Oran (وهران)

- **Santa Cruz Fort** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Santa Cruz Chapel** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Sidi El Houari** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ahmed Zabana National Museum** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Front de Mer** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Place du 1er Novembre** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ain El Turk** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Les Andalouses** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Canastel** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Madagh Beach** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Arzew** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 32 — El Bayadh (البيض)

- **El Bayadh plateau** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Brezina** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Brézina dam** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ksar El Barka** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Boualem** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 33 — Illizi (إليزي)

- **Djanet region** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tassili n'Ajjer** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tadrart Rouge** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tin Merzouga** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Sefar** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Issendjel** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 34 — Bordj Bou Arréridj (برج بوعريريج)

- **El Achir** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ras El Oued** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Bordj city** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Mansoura** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 35 — Boumerdès (بومرداس)

- **Boumerdès coast** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Cap Djinet** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Zemmouri El Bahri** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Dellys** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Figuier Beach** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Boudouaou** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 36 — El Tarf (الطارف)

- **El Kala National Park** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Lake El Kala** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Lake Oubeira** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Lake Tonga** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **El Kala beaches** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Cap Rosa** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Berkane** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 37 — Tindouf (تندوف)

- **Tindouf** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Oum El Assel** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Sahara landscapes** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tin Amouks** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 38 — Tissemsilt (تيسمسيلت)

- **Theniet El Had National Park** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Theniet El Had cedar forest** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Bordj Emir Abdelkader** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Boucaid** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 39 — El Oued (الوادي)

- **El Oued old city** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Souf architecture** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Grand Erg Oriental** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Guemar** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Nakhla oasis** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Magrane** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 40 — Khenchela (خنشلة)

- **Babar** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Chélia Mountain** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Khenchela thermal springs** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Kais** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Yabous** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 41 — Souk Ahras (سوق أهراس)

- **Madaure** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Madaurus Roman site** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Sidi Fredj** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ouled Moumen** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 42 — Tipaza (تيبازة)

- **Tipasa Roman ruins** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Chenoua Mountain** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tipaza coast** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Sidi Rached** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Bou Ismaïl** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Koléa** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Damous** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Cherchell** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Royal Mausoleum of Mauretania** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 43 — Mila (ميلة)

- **Mila old city** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Old Mila** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Barrage de Beni Haroun** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ferdjioua** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Grarem** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 44 — Aïn Defla (عين الدفلى)

- **Miliana** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Miliana old town** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Zaccar mountain** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **El Abadia** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Theniet El Had access** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 45 — Naâma (النعامة)

- **Aïn Sefra** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tiout oasis** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Boussemghoun** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Sfissifa** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Moghrar oasis** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Cheikh Bouamama mausoleum** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 46 — Aïn Témouchent (عين تموشنت)

- **Beni Saf** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Rachgoun Beach** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Hammam Bou Hadjar** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Terga** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Madagh** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Sassel** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 47 — Ghardaïa (غرداية)

- **Ghardaïa M'Zab Valley** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Beni Isguen** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **El Atteuf** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Melika** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Bou Noura** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Metlili** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Guerrara** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 48 — Relizane (غليزان)

- **Mazouna** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Relizane city** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Zemmoura** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Oued Rhiou** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 49 — Timimoun (تيميمون)

- **Timimoun oasis** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Red Oasis** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ksar of Timimoun** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Foggaret Ezzaouia** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tinerkouk** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 50 — Bordj Badji Mokhtar (برج باجي مختار)

- **Bordj Badji Mokhtar** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Timiaouine** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Sahara border landscapes** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 51 — Ouled Djellal (أولاد جلال)

- **Ouled Djellal oasis** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Sidi Khaled** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Besbes** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 52 — Béni Abbès (بني عباس)

- **Béni Abbès oasis** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Saoura valley** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Sidi Othmane hermitage** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **El Ouata** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Kerzaz** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 53 — In Salah (عين صالح)

- **In Salah oasis** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tidikelt** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Foggaret Ezzaouia** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Aïn Salah old ksour** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 54 — In Guezzam (عين قزام)

- **In Guezzam** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Sahara landscapes** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tanezrouft gateway** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 55 — Touggourt (تقرت)

- **Touggourt old ksar** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Touggourt oasis** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Megarine** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Temacine** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tamelaht** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 56 — Djanet (جانت)

- **Djanet oasis** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tassili n'Ajjer** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tadrart Rouge** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Sefar** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Djanet canyon** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Essendilene** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 57 — El M'Ghair (المغير)

- **El M'Ghair oasis** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Djamaa** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Oued Righ** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 58 — El Meniaa (المنيعة)

- **El Meniaa oasis** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **El Goléa / El Meniaa old ksar** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **M'Zab–Sahara transition** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 59 — Aflou (أفلو)

- **Aflou plateau** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Djebel Amour** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Aflou steppe** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 60 — Barika (بريكة)

- **Barika** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Zana** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Steppe landscapes** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 61 — El Kantara (القنطرة)

- **El Kantara gorge** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **El Kantara oasis** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Red Bridge** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 62 — Bir El Ater (بئر العاتر)

- **Bir El Ater** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Tébessa southern landscapes** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Bir El Ater steppe** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 63 — El Aricha (العريشة)

- **El Aricha** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **El Aricha steppe** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **western high plateaus** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 64 — Ksar Chellala (قصر الشلالة)

- **Ksar Chellala** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **High Plateaus landscapes** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **steppe heritage** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 65 — Aïn Oussara (عين وسارة)

- **Aïn Oussara** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Djelfa high plateaus** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **steppe landscapes** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 66 — Messaad (مسعد)

- **Messaad** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Messaad oasis** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ouled Nail heritage** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 67 — Ksar El Boukhari (قصر البخاري)

- **Ksar El Boukhari** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Chiffa–Médéa highlands** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Cheliff valley** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 68 — Bou Saâda (بوسعادة)

- **Bou Saâda oasis** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Moulin Ferrero** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Nasreddine Dinet Museum** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ouled Nail heritage** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Ain El Melh** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

## 69 — El Abiodh Sidi Cheikh (الأبيض سيدي الشيخ)

- **El Abiodh Sidi Cheikh** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **Cheikh Sidi Cheikh mausoleum** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.
- **El Bayadh–Sahara landscapes** — tourism discovery candidate; classify as `attraction`, `destination`, `nature`, `heritage`, `beach`, `oasis`, or `experience` after verification.

# 4. Accommodation / Hotel Seed Catalog

The following names are a starting inventory identified from current public sources and tourism-industry material. They must be normalized, geocoded, deduplicated and verified before being published as bookable inventory. Some older directory records may no longer be active. A 2023 public list, for example, contains many additional establishments and room counts, while current booking sources expose a changing subset. citeturn3search2turn3search3

| Wilaya / City | Property |
|---|---|
| Algiers | El Aurassi Hotel |
| Algiers | Sofitel Algiers Hamma Garden |
| Algiers | Hyatt Regency Algiers Airport |
| Algiers | Sheraton Club des Pins Resort |
| Algiers | Mercure Alger Aeroport |
| Algiers | ibis Algiers Airport |
| Algiers | Hotel El Djazair |
| Algiers | Atlantis Hotel - Algiers |
| Algiers | The Legacy Luxury Hotel |
| Algiers | Golden Tulip Opera Alger |
| Algiers | Hotel H3 Sidi Fredj |
| Algiers | Hotel Beau Rivage |
| Algiers | Hotel Welcome |
| Algiers | Hotel Royal Sahel |
| Algiers | Hotel du Port |
| Algiers | La Villa |
| Algiers | Hotel Soltane |
| Algiers | AD Hotel Pont d'Hydra |
| Algiers | AD Hotel La Madelaine |
| Algiers | Hotel El Ghanami |
| Oran | Four Points by Sheraton Oran |
| Oran | Le Méridien Oran Hotel & Convention Centre |
| Oran | Royal Hotel Oran - MGallery Collection |
| Oran | Melissa Hotel |
| Oran | Ibiris Hotel Oran |
| Oran | Hotel Falcon Thalassa |
| Oran | Hotel MF Oran |
| Oran | Hotel Micassa |
| Oran | Hotel Nigara |
| Oran | Les Ambassadeurs Oran |
| Oran | Les Andalouses Resort |
| Oran | Bladi Suites |
| Oran | Hotel El Akid |
| Oran | Hotel Melissa Oran |
| Constantine | Constantine Marriott Hotel |
| Constantine | Novotel Constantine |
| Constantine | Hotel Cirta |
| Annaba | Sheraton Annaba Hotel |
| Annaba | Sabri Hotel |
| Annaba | Hotel Seybouse International |
| Béjaïa | Atlantis Bejaia Aéroport |
| Béjaïa | Hotel Golden H |
| Béjaïa | Hotel Saldae |
| Biskra | Hotel Les Zibans |
| Aïn Témouchent | Doriane Beach |
| Aïn Témouchent | Hotel Le Bateau CTM |
| Aïn Témouchent | Eden Stop Hotel |
| Tipaza | Hotel Ben Aouda |
| Skikda | Rusica Park |
| Tizi Ouzou | Hotel Bracelet d'Argent |
| Tizi Ouzou | Hotel Beloua |
| El Oued | Hotel Souf |
| El Oued | Hotel Lous |
| Ghardaïa | Hotel M'Zab |
| Djanet | Cercle de Garnison de l'Armée Djanet |
| Blida | Cercle Régional de l'Armée Blida |
| Blida | Cercle de Garnison Blida |
| Constantine | Cercle Régional de l'Armée Constantine |
| Oran | Cercle Régional de l'Armée Oran |
| Oran | CPMS de l'Armée Oran |
| Annaba | Cercle Régional de l'Armée Annaba |
| Algiers | Cercle de Garnison de l'Armée Ain Nadja |
| Chlef | Hotel La Vallee Chlef |
| Béchar | Taghit Bladi Palace |
| Biskra | Hôtel Les Zibans |

# 5. Hotel Inventory Expansion Plan

To reach a genuinely comprehensive national hotel inventory, do **not** generate fictional names. Use the following acquisition pipeline:

1. Import the official tourism-sector establishment directory where licensing/establishment data is available.
2. Collect partner-submitted properties through the Partner Center.
3. Cross-check public hotel directories and booking marketplaces.
4. Deduplicate by business name, phone, address and coordinates.
5. Verify operating status.
6. Assign the correct 2026 wilaya and commune.
7. Add room types and capacity.
8. Request 360° media from partners.
9. Mark the property `verified=true` only after validation.
10. Record `last_verified_at` for every record.

# 6. Tourism Categories to Populate for Every Wilaya

- Hotels
- Resorts
- Apartments
- Guesthouses
- Villas
- Hostels
- Desert camps
- Oases
- Beaches
- Mountains
- National parks
- Forests
- Lakes
- Waterfalls
- Thermal springs
- Roman sites
- Ottoman heritage
- Islamic architecture
- Kasbahs and ksour
- Museums
- Mausoleums
- Caves
- Gorges
- Archaeological sites
- Markets
- Craft villages
- Restaurants
- Cafés
- Local food experiences
- Guided tours
- Hiking
- Diving
- Boat trips
- Desert excursions
- Quad/4x4 experiences
- Photography spots
- Family activities
- Cultural experiences
- Festivals
- 360° virtual tours

# 7. Recommended Content Record Types

## `destination`

Required: `id`, `name_ar`, `name_fr`, `name_en`, `wilaya_code`, `wilaya_name`, `commune`, `description`, `latitude`, `longitude`, `images`, `verified`, `source`, `last_verified_at`.

## `city`

Required: `id`, `name_ar`, `name_fr`, `name_en`, `wilaya_code`, `wilaya_name`, `commune`, `description`, `latitude`, `longitude`, `images`, `verified`, `source`, `last_verified_at`.

## `commune`

Required: `id`, `name_ar`, `name_fr`, `name_en`, `wilaya_code`, `wilaya_name`, `commune`, `description`, `latitude`, `longitude`, `images`, `verified`, `source`, `last_verified_at`.

## `attraction`

Required: `id`, `name_ar`, `name_fr`, `name_en`, `wilaya_code`, `wilaya_name`, `commune`, `description`, `latitude`, `longitude`, `images`, `verified`, `source`, `last_verified_at`.

## `hotel`

Required: `id`, `name_ar`, `name_fr`, `name_en`, `wilaya_code`, `wilaya_name`, `commune`, `description`, `latitude`, `longitude`, `images`, `verified`, `source`, `last_verified_at`.

## `resort`

Required: `id`, `name_ar`, `name_fr`, `name_en`, `wilaya_code`, `wilaya_name`, `commune`, `description`, `latitude`, `longitude`, `images`, `verified`, `source`, `last_verified_at`.

## `apartment`

Required: `id`, `name_ar`, `name_fr`, `name_en`, `wilaya_code`, `wilaya_name`, `commune`, `description`, `latitude`, `longitude`, `images`, `verified`, `source`, `last_verified_at`.

## `guesthouse`

Required: `id`, `name_ar`, `name_fr`, `name_en`, `wilaya_code`, `wilaya_name`, `commune`, `description`, `latitude`, `longitude`, `images`, `verified`, `source`, `last_verified_at`.

## `restaurant`

Required: `id`, `name_ar`, `name_fr`, `name_en`, `wilaya_code`, `wilaya_name`, `commune`, `description`, `latitude`, `longitude`, `images`, `verified`, `source`, `last_verified_at`.

## `activity`

Required: `id`, `name_ar`, `name_fr`, `name_en`, `wilaya_code`, `wilaya_name`, `commune`, `description`, `latitude`, `longitude`, `images`, `verified`, `source`, `last_verified_at`.

## `experience`

Required: `id`, `name_ar`, `name_fr`, `name_en`, `wilaya_code`, `wilaya_name`, `commune`, `description`, `latitude`, `longitude`, `images`, `verified`, `source`, `last_verified_at`.

## `beach`

Required: `id`, `name_ar`, `name_fr`, `name_en`, `wilaya_code`, `wilaya_name`, `commune`, `description`, `latitude`, `longitude`, `images`, `verified`, `source`, `last_verified_at`.

## `mountain`

Required: `id`, `name_ar`, `name_fr`, `name_en`, `wilaya_code`, `wilaya_name`, `commune`, `description`, `latitude`, `longitude`, `images`, `verified`, `source`, `last_verified_at`.

## `park`

Required: `id`, `name_ar`, `name_fr`, `name_en`, `wilaya_code`, `wilaya_name`, `commune`, `description`, `latitude`, `longitude`, `images`, `verified`, `source`, `last_verified_at`.

## `museum`

Required: `id`, `name_ar`, `name_fr`, `name_en`, `wilaya_code`, `wilaya_name`, `commune`, `description`, `latitude`, `longitude`, `images`, `verified`, `source`, `last_verified_at`.

## `heritage_site`

Required: `id`, `name_ar`, `name_fr`, `name_en`, `wilaya_code`, `wilaya_name`, `commune`, `description`, `latitude`, `longitude`, `images`, `verified`, `source`, `last_verified_at`.

## `archaeological_site`

Required: `id`, `name_ar`, `name_fr`, `name_en`, `wilaya_code`, `wilaya_name`, `commune`, `description`, `latitude`, `longitude`, `images`, `verified`, `source`, `last_verified_at`.

## `oasis`

Required: `id`, `name_ar`, `name_fr`, `name_en`, `wilaya_code`, `wilaya_name`, `commune`, `description`, `latitude`, `longitude`, `images`, `verified`, `source`, `last_verified_at`.

## `thermal_site`

Required: `id`, `name_ar`, `name_fr`, `name_en`, `wilaya_code`, `wilaya_name`, `commune`, `description`, `latitude`, `longitude`, `images`, `verified`, `source`, `last_verified_at`.

## `360_tour`

Required: `id`, `name_ar`, `name_fr`, `name_en`, `wilaya_code`, `wilaya_name`, `commune`, `description`, `latitude`, `longitude`, `images`, `verified`, `source`, `last_verified_at`.

## `travel_guide`

Required: `id`, `name_ar`, `name_fr`, `name_en`, `wilaya_code`, `wilaya_name`, `commune`, `description`, `latitude`, `longitude`, `images`, `verified`, `source`, `last_verified_at`.

## `itinerary`

Required: `id`, `name_ar`, `name_fr`, `name_en`, `wilaya_code`, `wilaya_name`, `commune`, `description`, `latitude`, `longitude`, `images`, `verified`, `source`, `last_verified_at`.

# 8. 360° Data Requirements

Every eligible property or attraction should support:

- 360° cover image
- 360° scene list
- Hotspots
- Room-to-room navigation
- Property information cards
- Map position
- Booking CTA
- Photo gallery
- Accessibility metadata
- Arabic/French/English descriptions

# 9. Recommended National Database Structure

```text
Algeria
├── 69 Wilayas
│   ├── Dairas
│   │   └── 1,541 Communes
│   │       ├── Destinations
│   │       ├── Attractions
│   │       ├── Hotels
│   │       ├── Restaurants
│   │       ├── Activities
│   │       └── 360° Experiences
│   └── Travel Guides
└── National Experiences
```

# 10. Production Data Quality Rules

### Never fabricate inventory

A property should not be created simply to make the catalog reach 1,000 records. Use `status=pending_verification` for discovered but unverified businesses.

### Deduplication

Normalize names and compare:

- Phone number
- Address
- Coordinates
- Website
- Business registration information when available
- Partner account

### Lifecycle

`discovered → imported → pending_verification → verified → published → suspended/closed`

### Availability

A hotel existing in a directory does **not** mean it is bookable. Keep `listed`, `verified`, `available`, and `bookable` as separate states.

# 11. SEO Destination Structure

Generate destination pages such as:

- `/algeria/algiers`
- `/algeria/oran`
- `/algeria/bejaia`
- `/algeria/tlemcen`
- `/algeria/djanet`
- `/algeria/timimoun`
- `/algeria/ghardaia`
- `/algeria/tipaza`
- `/algeria/constantine`
- `/algeria/biskra`

Then generate category pages:

- `/hotels/oran`
- `/360/oran`
- `/things-to-do/oran`
- `/beaches/bejaia`
- `/desert/djanet`
- `/heritage/tlemcen`

# 12. Suggested Initial Coverage Targets

| Dataset | Target |
|---|---:|
| Wilayas | 69 |
| Communes | 1,541 |
| Tourism destinations/POIs | 1,000+ after verification |
| Accommodation records | Complete national registry target |
| 360° properties | 100 pilot properties |
| Restaurants | 500+ initial target |
| Activities | 250+ initial target |
| Travel guides | 100+ |
| AI itineraries | 50+ templates |

# 13. How This Fits the Product

The catalog is not a static directory. It is the geographic/content foundation of the platform:

```text
WILAYA
  ↓
COMMUNE
  ↓
DESTINATION / PLACE
  ↓
HOTEL / RESTAURANT / ACTIVITY
  ↓
360° EXPERIENCE
  ↓
DISCOVERY
  ↓
COMPARISON
  ↓
BOOKING
  ↓
TRIP
```

# 14. Final Recommendation

Use this file as the **master Algeria tourism catalog specification and seed dataset**, not as a fake claim of exhaustive live inventory. The 69-wilaya administrative base is current for 2026, while the hotel/POI inventory must remain a continuously verified marketplace dataset. The Ministry of Tourism's directory and the official administrative reform should be treated as primary reference points; public booking directories and tourism-industry lists should be used for discovery and cross-checking. citeturn0search1turn1search9turn3search0

The next database version should import the complete 69-wilaya / 1,541-commune hierarchy from a verified administrative dataset and then attach every tourism POI, hotel, restaurant and activity to the correct commune. A public dataset based on the Journal Officiel provides the complete 69-wilaya and 1,541-commune hierarchy in JSON/CSV/SQL/XLSX formats. citeturn1search2turn1search3
