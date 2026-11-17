// Drawn rail diagrams shown in pages/viewer.html?n=world. Hand-maintained:
// gen_site.py does NOT write this file. Paths are site-root relative, like
// cities.js. Web copies live in maps/intercity/diagrams/, untouched originals
// (full-res world PNG, PSD, PDF) in maps/intercity/diagrams/raw/.
//
// The WORLD map is the base: 388 MP, so it is served as a full-resolution
// tile pyramid (scripts/tile_diagram.py) rather than one <img>.
// Every other map is a clickable BOX on it that opens the map in a modal.

// printed on each map; editions differ (world 2026, South Asia 2020), so no year
const NIGHT_CREDIT = 'Jug Cerović · night-trains.com';
const LARS = "lars' transport maps · CC BY-NC-ND 4.0";

const NIGHT_WORLD = {
  title: 'Transits Schematics',
  pdf: 'maps/intercity/diagrams/night-world.pdf',
  inset: 'maps/intercity/diagrams/night-world-inset.png?v=2026s3',   // 640 px overview, bottom-right when zoomed
  tiles: {url: 'maps/intercity/diagrams/tiles/night-world/{z}/{x}/{y}.png?v=2026s3',  // ?v: bust older tiles (s3: no station symbols; Lhasa label)
          w: 28098, h: 13809, maxZoom: 7},
};

// `box` = [x0, y0, x1, y1] in WORLD-MAP PIXELS (the 28098 px original): the
// area the map covers, drawn as its clickable box. Get it for a new map from
// scripts/locate_diagram.py; a map in a different drawing style shares no
// features with the world map and needs a hand-set box (marked below).
// `kind`: 'region' (default -- continental maps, prominent at fit),
// 'country', 'area' (a region inside a country: a state's / oblast's / TER
// region's network, a city's suburban rail -- legend "Region"; placed by the
// metro boxes' lon/lat warp) or 'metro'. Each level has its own box colour and takes over in
// that order as you zoom in (BOX_KINDS in pages/viewer.html). 'ferry' boxes
// have their own colour and toggle but ride the relay with the Region level
// ('area'): faint, and not clickable, when another level leads.
// Adding a map = one line here; nothing else to touch.
// One box per country: a country with several maps lists them in `tabs`
// ({tab, file, title, credit} each) instead of `file`, shown as tabs in the
// modal; the first tab opens by default.
const NIGHT_MAPS = [
  {slug: 'north-america', en: 'North America', file: 'maps/intercity/diagrams/night-north-america.png',
   box: [1089, 1842, 6714, 7467]},
  {slug: 'south-america', en: 'South America', file: 'maps/intercity/diagrams/night-south-america.png',
   box: [3918, 7529, 9543, 13154]},
  {slug: 'europe', en: 'Europe', file: 'maps/intercity/diagrams/night-europe.png',
   box: [11010, 563, 16635, 6188]},
  {slug: 'africa', en: 'Africa', file: 'maps/intercity/diagrams/night-africa.png',
   box: [11541, 7194, 17167, 12820]},
  {slug: 'eurasia', en: 'Eurasia', file: 'maps/intercity/diagrams/night-eurasia.png',
   box: [14411, 1033, 20036, 6658]},
  {slug: 'south-asia', en: 'South Asia', file: 'maps/intercity/diagrams/night-south-asia.png',
   box: [17009, 3990, 22633, 9615]},
  {slug: 'east-asia', en: 'East Asia', tabs: [
     {tab: 'Night trains', file: 'maps/intercity/diagrams/night-east-asia.png'},
     {tab: 'High-speed', file: 'maps/intercity/diagrams/east-asia-hsr.jpg', title: 'East Asia high-speed railway map', credit: 'u/gzhkr (Oct 2026)'}],
   box: [19540, 3108, 25165, 8733]},
  {slug: 'australia', en: 'Australia', file: 'maps/intercity/diagrams/night-australia.png',
   box: [21590, 8771, 27215, 13450]},   // bottom trimmed: it ran past the map's edge (h 13809), only sea below Tasmania

  // ---- countries: one box each; several maps = tabs in the modal ----
  {slug: 'norway', en: 'Norway', kind: 'country', tabs: [
     {tab: 'Services', file: 'maps/intercity/diagrams/norway-lars.jpg', title: 'Rail services in Norway 2026', credit: LARS},
     {tab: 'Network', file: 'maps/intercity/diagrams/norway-banenor.jpg', title: 'Lines with regular passenger traffic', credit: 'Bane NOR (29 Jun 2026)'}],
   box: [12619, 543, 13580, 2620]},
  {slug: 'sweden', en: 'Sweden', kind: 'country', tabs: [
     {tab: 'Day', file: 'maps/intercity/diagrams/sweden-lars.jpg', title: 'Rail services in Sweden 2026 · day trains', credit: LARS},
     {tab: 'Night', file: 'maps/intercity/diagrams/sweden-night-lars.jpg', title: 'Night trains in Sweden 2026', credit: LARS}],
   box: [13123, 532, 14154, 3075]},
  {slug: 'finland', en: 'Finland', file: 'maps/intercity/diagrams/finland-lars.jpg', kind: 'country',
   title: 'Rail services in Finland 2026', credit: LARS,
   box: [13936, 839, 14755, 2229]},
  {slug: 'denmark', en: 'Denmark', file: 'maps/intercity/diagrams/denmark-lars.jpg', kind: 'country',
   title: 'Rail services in Denmark 2026', credit: LARS,
   box: [12892, 2547, 13288, 3069]},
  {slug: 'germany', en: 'Germany', kind: 'country', tabs: [
     {tab: 'Long-distance', file: 'maps/intercity/diagrams/germany-lars.jpg', title: 'Systematic long-distance services in Germany 2026', credit: LARS},
     {tab: 'Night', file: 'maps/intercity/diagrams/germany-night-lars.jpg', title: 'Long-distance night trains in Germany 2026', credit: LARS}],
   box: [12656, 2945, 13543, 4101]},
  {slug: 'netherlands', en: 'Netherlands', kind: 'country', tabs: [
     {tab: 'Network', file: 'maps/intercity/diagrams/netherlands-lars.jpg', title: 'Rail services in the Netherlands 2026 · day network', credit: LARS},
     {tab: 'NS spoorkaart', file: 'maps/intercity/diagrams/netherlands-ns-spoorkaart-2026.jpg', title: 'Spoorkaart 2026', credit: 'NS, versie 26.02 (oktober 2025); 4 pages = variants for different timetable periods, page 1 is the main one', source: 'https://www.treinreiziger.nl/nieuwe-ns-spoorkaart-is-uit/ (file: https://nieuws.ns.nl/download/8dd1a03e-ae92-4f51-99c7-928eb91b2b4d/spoorkaart2026.pdf)'}],
    
   box: [12448, 3256, 12846, 3629]},
  {slug: 'belgium', en: 'Belgium', kind: 'country', tabs: [
     {tab: 'SNCB network', file: 'maps/intercity/diagrams/belgium-sncb-2025.jpg', title: 'RESEAU VOYAGEURS / REIZIGERSNET', credit: 'SNCB/NMBS (1 Jan 2025); no licence stated', source: 'https://www.belgiantrain.be/en/travel-info/prepare-for-your-journey/leaflets/global-map-train-belgium'},
     {tab: 'Services', file: 'maps/intercity/diagrams/belgium-lars.jpg', title: 'Rail services in Belgium 2026 · Monday–Friday', credit: LARS}],
   box: [12348, 3531, 12717, 3798]},
  // Luxembourg: grown to 140 px square: the country alone is ~55 x 90 world px
  {slug: 'luxembourg', en: 'Luxembourg', file: 'maps/intercity/diagrams/luxembourg-lars.jpg', kind: 'country',
   title: 'Rail services in Luxembourg 2026 · Monday–Friday', credit: LARS,
   box: [12619, 3679, 12759, 3819]},
  {slug: 'france', en: 'France', kind: 'country', tabs: [
     {tab: 'Network', file: 'maps/intercity/diagrams/france-lars.jpg', title: 'High-speed rail in France 2026', credit: LARS},
     {tab: 'TGV Europe', file: 'maps/intercity/diagrams/france-tgv-inoui-europe.jpg', title: 'Carte des destinations en Europe depuis la France', credit: 'SNCF Voyageurs / SNCF Connect, edition July 2024 (AM0724)', source: 'https://www.sncf-connect.com/fr-be/aide/carte-reseau-trains-sncf'},
     {tab: 'OUIGO', file: 'maps/intercity/diagrams/france-ouigo.jpg', title: 'OUIGOLAND - Voyagez à partir de 19€', credit: 'SNCF Voyageurs / OUIGO, March 2026 (illustrated network map; only 1500 px)', source: 'https://www.sncf-voyageurs.com/fr/voyagez-avec-nous/en-france/ouigo/nos-destinations-ouigo/'},
     {tab: 'Intercités', file: 'maps/intercity/diagrams/france-intercites-2025.jpg', title: 'Carte des destinations INTERCITÉS', credit: 'SNCF Voyageurs / Intercités, édition janvier 2025', source: 'https://www.sncf-voyageurs.com/en/travel-with-us/in-france/intercites/our-destinations/'}],
    
   box: [11701, 3528, 12881, 4697]},
  // Switzerland: SBB official map from company.sbb.ch (the sbb.ch copies block downloads)
  {slug: 'switzerland', en: 'Switzerland', kind: 'country', tabs: [
     {tab: 'SBB long-distance', file: 'maps/intercity/diagrams/switzerland-sbb.jpg', title: 'SBB long-distance network map', credit: 'SBB (valid from 14 Dec 2025)'},
     {tab: 'lars 2026', file: 'maps/intercity/diagrams/switzerland-lars.jpg', title: 'Long-distance rail in Switzerland 2026', credit: LARS}],
   box: [12687, 3999, 13062, 4256]},
  // Italy: Frecce (Trenitalia high-speed) only; unofficial
  {slug: 'italy', en: 'Italy', kind: 'country', tabs: [
     {tab: 'Network', file: 'maps/intercity/diagrams/italy-frecce.jpg', title: 'Frecce di Trenitalia · high-speed system', credit: 'Sergio A. Mejía (Nov 2020)'}],
    
   box: [12793, 4117, 13798, 5238]},
  {slug: 'austria', en: 'Austria', kind: 'country', tabs: [
     {tab: 'Long-distance', file: 'maps/intercity/diagrams/austria-lars.jpg', title: 'Long-distance rail in Austria 2026', credit: LARS},
     {tab: 'Network', file: 'maps/intercity/diagrams/austria-oebb.jpg', title: 'ÖBB network map (Netzkarte)', credit: 'ÖBB-Infrastruktur'}],
   box: [12978, 3845, 13699, 4202]},
  {slug: 'ireland', en: 'Ireland', file: 'maps/intercity/diagrams/ireland-lars.jpg', kind: 'country',
   title: 'Rail services in Ireland 2026', credit: LARS,
   box: [11266, 2964, 11675, 3493]},
  // United Kingdom: © A. Smithers, "no reproduction without permission" (printed)
  {slug: 'uk', en: 'United Kingdom', kind: 'country', tabs: [
     {tab: 'Operators', file: 'maps/intercity/diagrams/uk-operators-smithers.jpg', title: 'United Kingdom train operators', credit: 'Andrew Smithers / Project Mapping (May 2026)'},
     {tab: 'Route diagram', file: 'maps/intercity/diagrams/uk-route-smithers.jpg', title: 'National Rail route diagram', credit: 'Andrew Smithers / Project Mapping (May 2026)'},
     {tab: 'National Rail', file: 'maps/intercity/diagrams/uk-national-rail-all-stations.jpg', title: 'National Rail All Stations Route Map', credit: 'Rail Delivery Group, Version 2.7 (17/07/2026), © RDG 2026 all rights reserved', source: 'https://www.nationalrail.co.uk/travel-information/maps-of-the-national-rail-network/'},
     {tab: 'NR principal', file: 'maps/intercity/diagrams/uk-national-rail-principal.jpg', title: 'National Rail Principal Route Map', credit: 'Rail Delivery Group, V2.2 (2026), © RDG 2026 all rights reserved', source: 'https://www.nationalrail.co.uk/travel-information/maps-of-the-national-rail-network/'}],
   box: [11485, 2372, 12331, 3782]},
  {slug: 'portugal', en: 'Portugal', kind: 'country', tabs: [
     {tab: 'Network', file: 'maps/intercity/diagrams/portugal-cp-rede-2026.jpg', title: 'Mapa de Rede / Rail Network', credit: 'CP – Comboios de Portugal (Jul 2026)'}],
    
   box: [11393, 4694, 11578, 5291]},
  {slug: 'spain', en: 'Spain', kind: 'country', tabs: [
     {tab: 'Renfe network', file: 'maps/intercity/diagrams/spain-renfe-cerovic.jpg', title: 'España Renfe · whole network', credit: 'Jug Cerović · inat.fr (Jan 2023)'},
     {tab: 'High-speed', file: 'maps/intercity/diagrams/spain-hsr-louislee.jpg', title: 'Iberian high-speed railway network · all operators', credit: 'Louis Lee (Dec 2022)'},
     {tab: 'Regional', file: 'maps/intercity/diagrams/spain-renfe.jpg', title: 'Renfe public-service network · Media Distancia + Avant', credit: 'Renfe Viajeros (2024)'}],
   box: [11585, 4550, 12450, 5400]},
  // Poland: POLREGIO regional network only; PKP Intercity map due from 13 Dec 2026
  {slug: 'poland', en: 'Poland', kind: 'country', tabs: [
     {tab: 'Network', file: 'maps/intercity/diagrams/poland-polregio.jpg', title: 'POLREGIO connections', credit: 'POLREGIO (24 Feb 2026)'},
     {tab: 'PKP Intercity', file: 'maps/intercity/diagrams/poland-pkp-intercity-2027.jpg', title: 'Schemat sieci połączeń pasażerskich PKP Intercity – Rozkład jazdy 2026/2027', credit: 'PKP Intercity (Oct 2026)'}],
   box: [13434, 3028, 14309, 3836]},
  {slug: 'czechia', en: 'Czechia', kind: 'country', tabs: [
     {tab: 'Network', file: 'maps/intercity/diagrams/czechia-cd.jpg', title: 'Jízdní řád 2026 · network', credit: 'České dráhy (14 Dec 2025)'}],
   box: [13234, 3575, 13849, 3883]},
  {slug: 'hungary', en: 'Hungary', kind: 'country', tabs: [
     {tab: 'MÁV 2026', file: 'maps/intercity/diagrams/hungary-mav-2026.jpg', title: 'Magyarország vasúti személyszállítási térképe', credit: 'MÁV-csoport (Sep 2026)'}],
   box: [13606, 3905, 14139, 4249]},
  {slug: 'slovenia', en: 'Slovenia', file: 'maps/intercity/diagrams/slovenia-sz.jpg', kind: 'country',
   title: 'Shema železniškega omrežja / SŽ Railway Network', credit: 'Slovenske železnice (Dec 2025)',
   box: [13393, 4135, 13625, 4345]},
  // Baltics: all rail services; credit as printed on the map
  {slug: 'baltics', en: 'Baltics', file: 'maps/intercity/diagrams/baltic.jpg', kind: 'country',
   title: 'Railway diagram of the Baltics', credit: 'Lars van Rossum (2024)',
   box: [13985, 2225, 14700, 3128]},
  // Serbia: Srbija Voz schematic includes the Bar line through Montenegro
  {slug: 'serbia', en: 'Serbia', kind: 'country', tabs: [
     {tab: 'Srbija Voz', file: 'maps/intercity/diagrams/serbia-srbijavoz-cerovic.jpg', title: 'Srbija Voz · network map', credit: 'Jug Cerović · inat.fr (May 2024)'},
     {tab: 'Geographic', file: 'maps/intercity/diagrams/serbia-commons.jpg', title: 'Railway map of Serbia and Kosovo', credit: 'Maximilian Dörrbecker / Wikimedia Commons · CC BY-SA 2.5'}],
   box: [13848, 4207, 14196, 4737]},
  // Bulgaria: infrastructure schematic: includes freight-only lines
  {slug: 'bulgaria', en: 'Bulgaria', file: 'maps/intercity/diagrams/bulgaria-nric.jpg', kind: 'country',
   title: 'Railway infrastructure of SE NRIC', credit: 'NRIC (rail-infra.bg)',
   box: [14151, 4448, 14620, 4826]},
  // South-east Europe: GEOGRAPHIC, infrastructure: Croatia, Bosnia, N. Macedonia, Romania, Bulgaria, Moldova
  {slug: 'south-east-europe', en: 'South-east Europe', file: 'maps/intercity/diagrams/south-east-europe-commons.jpg', kind: 'country',
   title: 'Railways in South Eastern Europe', credit: 'Maximilian Dörrbecker / Wikimedia Commons · CC BY-SA 2.5',
   box: [13407, 3899, 14760, 4897]},
  // Greece: schematic correct as of May 2022 (before the 2023 Tempi crash service changes)
  {slug: 'greece', en: 'Greece', kind: 'country', tabs: [
     {tab: 'Hellenic Train', file: 'maps/intercity/diagrams/greece-hellenic-train-network.jpg', title: 'Athens – Thessaloniki Railway map / Σιδηροδρομικός χάρτης Αθήνας - Θεσσαλονίκης', credit: 'Hellenic Train (Jun 2026); no licence stated', source: 'https://www.hellenictrain.gr/en/athens-thessaloniki/'},
     {tab: 'Northern Greece', file: 'maps/intercity/diagrams/greece-hellenic-train-north.jpg', title: 'Northern Greece Railway Map / Σιδηροδρομικός Χάρτης Βόρειας Ελλάδας', credit: 'Hellenic Train (Jun 2026); no licence stated', source: 'https://www.hellenictrain.gr/en/northern-greece-network/'},
     {tab: 'Central Greece', file: 'maps/intercity/diagrams/greece-hellenic-train-central.jpg', title: 'Railway Map of Central Greece / Σιδηροδρομικός Χάρτης Κεντρικής Ελλάδας', credit: 'Hellenic Train (Jun 2026); no licence stated', source: 'https://www.hellenictrain.gr/en/central-greece-rail-network/'},
     {tab: 'Peloponnese', file: 'maps/intercity/diagrams/greece-hellenic-train-peloponnese.jpg', title: 'Railway Map of Peloponnese / Σιδηροδρομικός Χάρτης Πελοποννήσου', credit: 'Hellenic Train (Jun 2026); no licence stated', source: 'https://www.hellenictrain.gr/en/southern-greece-rail-network/'},
     {tab: 'Schematic', file: 'maps/intercity/diagrams/greece-mallis.jpg', title: 'Passenger Railways of Greece v0.2', credit: 'Philip Mallis · CC BY-SA 4.0 (May 2022)'},
     {tab: 'Geographic', file: 'maps/intercity/diagrams/greece-commons.jpg', title: 'Railway map of Greece', credit: 'Maximilian Dörrbecker / Wikimedia Commons · CC BY-SA 2.5'}],
   box: [14016, 4738, 14474, 5201]},
  // Türkiye: schematic: author warns some stations may be wrong
  {slug: 'turkey', en: 'Türkiye', kind: 'country', tabs: [
     {tab: 'Schematic', file: 'maps/intercity/diagrams/turkey-schematic.jpg', title: 'Türkiye\'nin tüm tren hatları · all train lines', credit: 'ADDurmus104 · CC BY-SA (Feb 2026)'},
     {tab: 'Geographic', file: 'maps/intercity/diagrams/turkey-commons.jpg', title: 'Rail transport map of Türkiye', credit: 'Maximilian Dörrbecker / Wikimedia Commons · CC BY-SA 2.5'}],
   box: [14382, 4735, 16199, 5326]},
  // Georgia: non-commercial use with credit
  {slug: 'georgia', en: 'Georgia', file: 'maps/intercity/diagrams/georgia-transportlab.jpg', kind: 'country',
   title: 'Route map of Georgian Railway', credit: 'Aleksandrs Znovs · TransportLab (Jun 2023)',
   box: [15796, 4654, 16150, 4834]},
  // Azerbaijan: unofficial, domestic services
  {slug: 'azerbaijan', en: 'Azerbaijan', file: 'maps/intercity/diagrams/azerbaijan.jpg', kind: 'country',
   title: 'Unofficial ADY network map v1.0', credit: 'TheGlacierVortex (Feb 2025)',
   box: [16138, 4678, 16579, 5159]},
  // India: redrawn 2022 from an Indian Railways map of 01 Apr 2022; Commons flags it for an update
  {slug: 'india', en: 'India', kind: 'country', tabs: [
     {tab: 'Network', file: 'maps/intercity/diagrams/india-commons.jpg', title: 'Railway network map of India · schematic', credit: 'PlaneMad / Wikimedia Commons · CC BY-SA 3.0'}],
    
   box: [18304, 5632, 20602, 8083]},
  // Bangladesh: Geographic tab: Commons
  {slug: 'bangladesh', en: 'Bangladesh', kind: 'country', tabs: [
     {tab: 'Schematic', file: 'maps/intercity/diagrams/bangladesh-schematic.jpg', title: 'Bangladesh Railway infographic map', credit: 'u/giantskyman (Sep 2023)'},
     {tab: 'Geographic', file: 'maps/intercity/diagrams/bangladesh-commons.jpg', title: 'Bangladesh Railway connectivity', credit: 'Nasif05 / Wikimedia Commons · CC BY 4.0 (Jun 2025)'}],
   box: [19902, 6430, 20287, 6836]},
  // Thailand: SRT services: r/TransitDiagrams, predates the 2023 move to Krung Thep Aphiwat; Projects: Thai language, unconfirmed author
  {slug: 'thailand', en: 'Thailand', kind: 'country', tabs: [
     {tab: 'SRT services', file: 'maps/intercity/diagrams/thailand-srt.jpg', title: 'State Railway of Thailand · passenger services', credit: 'u/copecopeson (2022)'},
     {tab: 'Projects', file: 'maps/intercity/diagrams/thailand.jpg', title: 'Thailand rail network & projects', credit: ''}],
   box: [20837, 6899, 21418, 8292]},
  // Laos: the one line: Laos-China Railway (Vientiane extension marked future)
  {slug: 'laos', en: 'Laos', file: 'maps/intercity/diagrams/laos-kunming-vientiane.jpg', kind: 'country',
   title: '昆明—万象高铁 · Kunming–Vientiane railway', credit: 'u/NatterHi (Sep 2026)',
   box: [21113, 6832, 21253, 7202]},
  // Indonesia: Java (FDTJ) octilinear, every station; the other two GEOGRAPHIC
  {slug: 'indonesia', en: 'Indonesia', kind: 'country', tabs: [
     {tab: 'Java', file: 'maps/intercity/diagrams/indonesia-java-fdtj.jpg', title: 'Java and Madura railway network map', credit: 'FDTJ (Transport for Jakarta) via Seat61 (May 2022)'},
     {tab: 'Java (geographic)', file: 'maps/intercity/diagrams/indonesia-java.jpg', title: 'Jaringan Jalur Kereta Api Jawa dan Madura', credit: 'RaFaDa20631 / Wikimedia Commons · CC BY-SA 4.0'},
     {tab: 'Sumatra', file: 'maps/intercity/diagrams/indonesia-sumatra.jpg', title: 'Jaringan Jalur Kereta Api Sumatra', credit: 'RaFaDa20631 / Wikimedia Commons · CC BY-SA 4.0'}],
   box: [20742, 8347, 22274, 9594]},
  // China: HSR: © Tao Anjun, all rights reserved, used with permission (per site owner, 31 Oct 2026); downscaled 14070 -> 9600 px only. All lines: GEOGRAPHIC (no current conventional schematic found)
  {slug: 'china-hsr', en: 'China', kind: 'country', tabs: [
     {tab: 'High-speed', file: 'maps/intercity/diagrams/china-hsr-taoanjun.jpg', title: '中国高速铁路运营路线图 · China high-speed rail', credit: '陶岸君 Tao Anjun (14 Jan 2025)'},
     {tab: 'Conventional', file: 'maps/intercity/diagrams/china-conventional-meth.jpg', title: '中国铁路普速客运线网图 · conventional passenger lines', credit: 'Meth (-Meth-@bilibili), © all rights reserved (Sep 2023)'},
     {tab: 'All lines', file: 'maps/intercity/diagrams/china-all-commons.jpg', title: 'Rail map of China (detailed) · all lines incl. conventional', credit: 'Ibicdlcod / Wikimedia Commons · CC BY-SA 4.0 (Sep 2026)'}],
   box: [19649, 3942, 23788, 7409]},
  // Mongolia: GEOGRAPHIC
  {slug: 'mongolia', en: 'Mongolia', file: 'maps/intercity/diagrams/mongolia-commons.jpg', kind: 'country',
   title: 'Schienennetz Mongolei', credit: 'NordNordWest / Wikimedia Commons · CC BY-SA 3.0 de',
   box: [21140, 3716, 22131, 4589]},
  // North Korea: GEOGRAPHIC
  {slug: 'north-korea', en: 'North Korea', file: 'maps/intercity/diagrams/north-korea-commons.jpg', kind: 'country',
   title: 'Rail infrastructure in North Korea (2020)', credit: 'Jontiben / Wikimedia Commons · CC BY-SA 4.0',
   box: [23039, 4573, 23606, 5221]},
  // South Korea: High-speed: KTX + SRT only (pre Oct 2024 openings); Korail: GEOGRAPHIC
  {slug: 'south-korea', en: 'South Korea', kind: 'country', tabs: [
     {tab: 'High-speed', file: 'maps/intercity/diagrams/south-korea-hsr.jpg', title: '고속철도 운행계통 노선도 · KTX & SRT services', credit: 'Sarah Park-Kim · CC BY-NC-SA (Jul 2024)'},
     {tab: 'Korail network', file: 'maps/intercity/diagrams/south-korea-korail.jpg', title: '철도노선도 · Korail route map', credit: 'Korail (01 Jan 2026)'}],
   box: [23260, 5175, 23532, 5578]},
  // Japan: JR network map is GEOGRAPHIC (stylised); no whole-JR schematic exists
  {slug: 'japan', en: 'Japan', kind: 'country', tabs: [
     {tab: 'Shinkansen', file: 'maps/intercity/diagrams/japan-shinkansen-47rail.jpg', title: 'Shinkansen route map', credit: 'Himawari Design Lab / 47RAIL (Dec 2024)'},
     {tab: 'JR network', file: 'maps/intercity/diagrams/japan-jr.jpg', title: 'Nationwide JR Route Map', credit: 'JR Group / Japan Rail Pass (Apr 2026)'}],
   box: [23548, 4152, 24974, 5995]},
  {slug: 'taiwan', en: 'Taiwan', kind: 'country', tabs: [
     {tab: 'Network', file: 'maps/intercity/diagrams/taiwan-47rail.jpg', title: '日式台灣鐵路路線圖 Ver. 7.0', credit: 'Himawari Design Lab / 47RAIL (2024) · CC BY-NC-SA 4.0'},
     {tab: 'TRA network', file: 'maps/intercity/diagrams/taiwan-tra.jpg', title: '臺灣鐵路觀光地圖 TPASS', credit: '國營臺灣鐵路股份有限公司 Taiwan Railway (Jan 2024)'}],
   box: [22706, 6524, 22883, 6724]},
  {slug: 'australia-rail', en: 'Australia', file: 'maps/intercity/diagrams/australia-railmaps.jpg', kind: 'country',
   title: 'Australian Rail Map', credit: 'railmaps.com.au (Feb 2026)',
   box: [22100, 9712, 25824, 12594]},
  // New Zealand: semi-schematic; 2021 services
  {slug: 'new-zealand', en: 'New Zealand', file: 'maps/intercity/diagrams/new-zealand.jpg', kind: 'country',
   title: 'Passenger Trains of New Zealand', credit: 'u/Random_pigeon42 (Jul 2021)',
   box: [27053, 12242, 27631, 13043]},
  // Saudi Arabia: only 2020 px; legend colours of Eastern / Northern look swapped
  {slug: 'saudi-arabia', en: 'Saudi Arabia', file: 'maps/intercity/diagrams/saudi-arabia.jpg', kind: 'country',
   title: 'Saudi Arabian Railways v1.0', credit: 'u/ALPat17 (Apr 2023)',
   box: [15422, 5788, 16633, 6948]},
  // United States: Amtrak official map is GEOGRAPHIC
  {slug: 'usa', en: 'United States', kind: 'country', tabs: [
     {tab: 'Amtrak services', file: 'maps/intercity/diagrams/usa-amtrak-2026.jpg', title: 'Amtrak train services · as of 17 Jan 2026', credit: 'u/mappydude (Jan 2026)'},
     {tab: 'High-speed & intercity', file: 'maps/intercity/diagrams/usa-dnhn-2026.jpg', title: 'Three custom Amtrak diagrams · West / Midwest & South-east / East', credit: 'Donghoon Yi (@dnhn.design), unofficial, non-commercial (May 2026)'},
     {tab: 'Amtrak network', file: 'maps/intercity/diagrams/usa-amtrak.jpg', title: 'The Amtrak Network', credit: 'Amtrak (Aug 2025)'}],
   box: [1141, 3749, 6279, 6607]},
  // Canada: official VIA map is semi-schematic
  {slug: 'canada', en: 'Canada', kind: 'country', tabs: [
     {tab: 'VIA network', file: 'maps/intercity/diagrams/canada-via-network.jpg', title: 'VIA Rail Canada route map · all stations', credit: 'u/mappydude (summer 2025)'},
     {tab: 'Corridor', file: 'maps/intercity/diagrams/canada-via-corridor.jpg', title: 'Southern Ontario and Quebec', credit: 'u/mappydude (summer 2025)'},
     {tab: 'VIA official', file: 'maps/intercity/diagrams/canada-via.jpg', title: 'VIA Rail network', credit: 'VIA Rail Canada'}],
   box: [708, 2603, 6783, 4612]},
  // Mexico: national: end points only, no El Insurgente; Tren Maya GEOGRAPHIC
  {slug: 'mexico', en: 'Mexico', kind: 'country', tabs: [
     {tab: 'National network', file: 'maps/intercity/diagrams/mexico-national.jpg', title: 'Red Nacional de los Ferrocarriles Mexicanos 2026', credit: 'u/caliberal (Feb 2026)'},
     {tab: 'Tren Maya', file: 'maps/intercity/diagrams/mexico-tren-maya.jpg', title: 'Tren Maya', credit: 'Trainspotting34, Rajix4 / Wikimedia Commons · CC BY-SA 4.0 (2024)'}],
   box: [2498, 6095, 4638, 7440]},
  // Chile: includes freight, tourist and planned lines
  {slug: 'chile', en: 'Chile', file: 'maps/intercity/diagrams/chile-commons.jpg', kind: 'country',
   title: 'Mapa ferroviario Chile 2023', credit: 'LuisCG11 / Wikimedia Commons · CC BY-SA 4.0',
   box: [5834, 10287, 6152, 12950]},
  // Argentina: GEOGRAPHIC; Mar 2023, before the 2024 service cuts
  {slug: 'argentina', en: 'Argentina', file: 'maps/intercity/diagrams/argentina-trenes.jpg', kind: 'country',
   title: 'Servicios Larga Distancia', credit: 'Trenes Argentinos (2023)',
   box: [6087, 11144, 7281, 12877]},
  // Israel: Commons track diagram is Hebrew only; Konovalov is bilingual but Nov 2022 (no Eastern Railway)
  {slug: 'israel', en: 'Israel', kind: 'country', tabs: [
     {tab: 'Network 2026', file: 'maps/intercity/diagrams/israel-commons.jpg', title: 'מפת קווי הרכבת בישראל · Israel rail lines', credit: 'IKhitron / Wikimedia Commons · CC BY-SA 4.0 (Jun 2026)'}],
   box: [15198, 5694, 15338, 5909]},
  // Iraq: fan-made: the map says IRR was not involved
  {slug: 'iraq', en: 'Iraq', file: 'maps/intercity/diagrams/iraq-commons.jpg', kind: 'country',
   title: 'Iraqi Republic Railways network schematic', credit: 'JohnnyDoobydoo / Wikimedia Commons · CC0 (Apr 2026)',
   box: [15781, 5267, 16409, 6077]},
  // Iran: GEOGRAPHIC (GIS map); newer RAI editions exist but their sites did not load
  {slug: 'iran', en: 'Iran', file: 'maps/intercity/diagrams/iran-rai.jpg', kind: 'country',
   title: 'GIS map of Iran Railway (1399)', credit: 'RAI / Wikimedia Commons · CC BY-SA 4.0 (Apr 2020)',
   box: [16065, 5055, 17600, 6565]},
  // Turkmenistan: straightened lines on a simplified outline, junction and border stations
  {slug: 'turkmenistan', en: 'Turkmenistan', file: 'maps/intercity/diagrams/turkmenistan-commons.jpg', kind: 'country',
   title: 'Netzkarte Turkmenistan 2022', credit: 'Reinhard Dietrich / Wikimedia Commons · CC BY-SA 4.0 (Jun 2022)',
   box: [16768, 4644, 17832, 5252]},
  // Uzbekistan: GEOGRAPHIC, official; no year printed
  {slug: 'uzbekistan', en: 'Uzbekistan', file: 'maps/intercity/diagrams/uzbekistan-uty.jpg', kind: 'country',
   title: 'O\'zbekiston temir yo\'llari · network scheme', credit: 'O\'zbekiston temir yo\'llari / Wikimedia Commons',
   box: [17271, 4449, 18580, 5318]},
  // Egypt: GEOGRAPHIC; no high-speed lines yet
  {slug: 'egypt', en: 'Egypt', file: 'maps/intercity/diagrams/egypt-commons.jpg', kind: 'country',
   title: 'Railways in Egypt', credit: 'Jkan997, Sgh45 / Wikimedia Commons · CC BY-SA 3.0 (Aug 2025)',
   box: [14514, 5859, 15132, 6665]},
  // Tunisia: GEOGRAPHIC, official; artwork undated
  {slug: 'tunisia', en: 'Tunisia', file: 'maps/intercity/diagrams/tunisia-sncft.jpg', kind: 'country',
   title: 'شبكة الخطوط الحديدية التونسية · SNCFT network', credit: 'SNCFT',
   box: [12864, 5206, 13122, 5671]},
  // Algeria: GEOGRAPHIC
  {slug: 'algeria', en: 'Algeria', kind: 'country', tabs: [
     {tab: 'Network 2026', file: 'maps/intercity/diagrams/algeria-commons.jpg', title: 'Algérie · Réseau ferroviaire en 2026', credit: 'Poudou99 / Wikimedia Commons · CC BY 4.0 (Feb 2026)'},
     {tab: 'SNTF', file: 'maps/intercity/diagrams/algeria-sntf.jpg', title: 'Réseau ferré national', credit: 'SNTF'}],
   box: [11351, 5221, 12980, 6363]},
  // Senegal: one line: TER Dakar - AIBD
  {slug: 'senegal', en: 'Senegal', file: 'maps/intercity/diagrams/senegal-ter.jpg', kind: 'country',
   title: 'TER Dakar – AIBD', credit: 'PBrieux / Wikimedia Commons · CC BY-SA 4.0 (Mar 2021)',
   box: [10690, 7340, 10980, 7580]},
  // Nigeria: GEOGRAPHIC
  {slug: 'nigeria', en: 'Nigeria', file: 'maps/intercity/diagrams/nigeria-commons.jpg', kind: 'country',
   title: 'Railway map of Nigeria', credit: 'Tototo30 + OpenStreetMap contributors / Wikimedia Commons · CC BY-SA 4.0 (Apr 2021)',
   box: [12422, 7616, 13374, 8424]},
  // East Africa: East Africa GEOGRAPHIC (status 2021); Tanzania schematic Jan 2022, no SGR, CC BY-NC-ND
  {slug: 'east-africa', en: 'East Africa', kind: 'country', tabs: [
     {tab: 'East Africa', file: 'maps/intercity/diagrams/east-africa-commons.jpg', title: 'East African Rail', credit: 'Classical geographer / Wikimedia Commons · CC BY-SA 4.0 (Sep 2021)'},
     {tab: 'Tanzania', file: 'maps/intercity/diagrams/tanzania.jpg', title: 'Rail Network of Tanzania · Mtandao wa Reli la Tanzania', credit: 'Tony Paoli · CC BY-NC-ND 4.0 (Jan 2022)'}],
   box: [14740, 8718, 15683, 9368]},
  // Morocco: only 2400 px; fan-made despite the ONCF logo
  {slug: 'morocco', en: 'Morocco', file: 'maps/intercity/diagrams/morocco-oncf.jpg', kind: 'country',
   title: 'ONCF voyages · Al Boraq, Al Atlas, TNR', credit: 'Kara Fischer (u/thetransitgirl) (Mar 2026)',
   box: [11309, 5377, 12070, 5909]},
  // Mozambique: GEOGRAPHIC
  {slug: 'mozambique', en: 'Mozambique', file: 'maps/intercity/diagrams/mozambique-commons.jpg', kind: 'country',
   title: 'Mapa do sistema ferroviário de Moçambique', credit: 'Hallel / Wikimedia Commons · CC BY 3.0 (Aug 2021)',
   box: [14928, 9874, 15753, 11241]},
  // Zimbabwe: GEOGRAPHIC
  {slug: 'zimbabwe', en: 'Zimbabwe', file: 'maps/intercity/diagrams/zimbabwe-commons.jpg', kind: 'country',
   title: 'Schienennetz von Simbabwe', credit: 'NordNordWest / Wikimedia Commons · CC BY-SA 3.0 de (Apr 2022)',
   box: [14461, 10372, 15087, 10849]},
  // Russia: GEOGRAPHIC: passenger trains per day on every section (long-distance and suburban)
  {slug: 'russia', en: 'Russia', kind: 'country', tabs: [
     {tab: 'Network', file: 'maps/intercity/diagrams/russia-passenger.jpg', title: 'Железнодорожная сеть России · passenger trains per day', credit: 'Milkrast2025 / Wikimedia Commons · CC BY-SA 4.0 (2022)'}],
    
   box: [13321, 444, 25189, 4814]},
  // Kazakhstan: GEOGRAPHIC, simplified
  {slug: 'kazakhstan', en: 'Kazakhstan', file: 'maps/intercity/diagrams/kazakhstan-commons.jpg', kind: 'country',
   title: 'Railway map of Kazakhstan', credit: 'Maximilian Dörrbecker (Chumwa) / Wikimedia Commons · CC BY-SA 2.5 (2024)',
   box: [16330, 2966, 19565, 4767]},
  // Kyrgyzstan: map page from an ADB report; no Balykchy–Kochkor extension (2024–25)
  {slug: 'kyrgyzstan', en: 'Kyrgyzstan', file: 'maps/intercity/diagrams/kyrgyzstan-adb.jpg', kind: 'country',
   title: 'Kyrgyz Republic railway network 2019', credit: 'Asian Development Bank / CAREC (2021)',
   box: [18432, 4567, 18851, 4903]},
  // Tajikistan: map page from an ADB report; existing and proposed lines
  {slug: 'tajikistan', en: 'Tajikistan', file: 'maps/intercity/diagrams/tajikistan-adb.jpg', kind: 'country',
   title: 'Tajikistan railway network 2019', credit: 'Asian Development Bank / CAREC (2021)',
   box: [18167, 4894, 18320, 5301]},
  // Belarus: semi-schematic
  {slug: 'belarus', en: 'Belarus', file: 'maps/intercity/diagrams/belarus-2019.jpg', kind: 'country',
   title: 'Map of railways in Belarus', credit: 'Homoatrox / Wikimedia Commons · CC BY-SA 4.0 (2019) · enlarged',
   box: [14205, 2816, 14944, 3464]},
  // Ukraine: SCHEMATIC; June 2021, before the invasion: includes services now cut
  {slug: 'ukraine', en: 'Ukraine', file: 'maps/intercity/diagrams/ukraine-passenger.jpg', kind: 'country',
   title: 'Схема пасажирського сполучення Укрзалізниці · 2021', credit: 'Jarrynew / Wikimedia Commons · CC BY-SA 4.0 (Jun 2021)',
   box: [14047, 3469, 15554, 4377]},
  // Romania: GEOGRAPHIC
  {slug: 'romania', en: 'Romania', kind: 'country', tabs: [
     {tab: 'Network', file: 'maps/intercity/diagrams/romania-commons.jpg', title: 'Railway map of Romania', credit: 'Maximilian Dörrbecker (Chumwa) / Wikimedia Commons · CC BY-SA 2.5 (2019)'},
     {tab: 'Line numbers', file: 'maps/intercity/diagrams/romania-lines.jpg', title: 'România feroviară · CFR lines', credit: 'Aero Avalon / Wikimedia Commons · CC BY-SA 4.0 (May 2021)'}],
   box: [13981, 4009, 14694, 4523]},
  // Moldova: GEOGRAPHIC, simplified
  {slug: 'moldova', en: 'Moldova', file: 'maps/intercity/diagrams/moldova-commons.jpg', kind: 'country',
   title: 'Railway map of Moldova', credit: 'Maximilian Dörrbecker (Chumwa) / Wikimedia Commons · CC BY-SA 2.5 (2019) · enlarged',
   box: [14569, 3961, 14773, 4267]},
  // Armenia: network diagram, Armenian labels
  {slug: 'armenia', en: 'Armenia', file: 'maps/intercity/diagrams/armenia-scr.jpg', kind: 'country',
   title: 'South Caucasus Railway network', credit: 'South Caucasus Railway / uic.am (2021) · enlarged',
   box: [16008, 4818, 16291, 5104]},
  // Afghanistan: GEOGRAPHIC; lines in operation, under construction and planned
  {slug: 'afghanistan', en: 'Afghanistan', file: 'maps/intercity/diagrams/afghanistan-commons.jpg', kind: 'country',
   title: 'Schienenverkehr in Afghanistan', credit: 'Ziegelbrenner / Wikimedia Commons · CC BY-SA 4.0 (Aug 2024)',
   box: [17617, 5233, 18295, 5920]},
  // Pakistan: network map revised 2016; schematic 2009
  {slug: 'pakistan', en: 'Pakistan', kind: 'country', tabs: [
     {tab: 'Network', file: 'maps/intercity/diagrams/pakistan-commons.jpg', title: 'Pakistan Railways network map', credit: 'Adnanrail / Wikimedia Commons · CC BY-SA 3.0 (2016)'},
     {tab: 'Schematic', file: 'maps/intercity/diagrams/pakistan-schematic.jpg', title: 'Pakistan railway network · schematic', credit: 'Nomi887, Brainlara73 / Wikimedia Commons · CC BY-SA 3.0 (2009) · enlarged'}],
   box: [17600, 5603, 18739, 6575]},
  // Brazil: GEOGRAPHIC, official; whole network (EFVM and EFC carry the passengers)
  {slug: 'brazil', en: 'Brazil', file: 'maps/intercity/diagrams/brazil-valec.jpg', kind: 'country',
   title: 'Mapa Ferroviário do Brasil', credit: 'VALEC / Wikimedia Commons · CC BY 4.0 (2019)',
   box: [6959, 8914, 9190, 11879]},
  // Peru: GEOGRAPHIC
  {slug: 'peru', en: 'Peru', kind: 'country', tabs: [
     {tab: 'Network', file: 'maps/intercity/diagrams/peru-mtc.jpg', title: 'Red ferroviaria del Perú (MTC)', credit: 'Sr L / Wikimedia Commons · CC BY-SA 4.0 (2017)'},
     {tab: 'Passenger', file: 'maps/intercity/diagrams/peru-passenger.jpg', title: 'Railways in Peru · passenger routes in red', credit: 'Jkan997 / Wikimedia Commons · CC BY-SA 3.0 (2014)'}],
   box: [5505, 9727, 6088, 10421]},
  // Colombia: GEOGRAPHIC; active and inactive lines
  {slug: 'colombia', en: 'Colombia', file: 'maps/intercity/diagrams/colombia-commons.jpg', kind: 'country',
   title: 'Mapa de Colombia · ferrocarriles', credit: 'Milenioscuro / Wikimedia Commons · CC BY-SA 3.0 (2022)',
   box: [5339, 7820, 5807, 8546]},
  // Cuba: SCHEMATIC passenger network
  {slug: 'cuba', en: 'Cuba', kind: 'country', tabs: [
     {tab: 'Network', file: 'maps/intercity/diagrams/cuba-schematic.jpg', title: 'Esquema del ferrocarril de Cuba', credit: 'Alabrada / Wikimedia Commons · CC BY-SA 4.0 (2013)'}],
    
   box: [4773, 6722, 5620, 7042]},
  // Costa Rica: SCHEMATIC; Incofer commuter services
  {slug: 'costa-rica', en: 'Costa Rica', file: 'maps/intercity/diagrams/costa-rica-interurbano.jpg', kind: 'country',
   title: 'Interurbano · Incofer services', credit: 'Roqz / Wikimedia Commons · CC BY-SA 4.0 (2020)',
   box: [4673, 7852, 4813, 7992]},
  // Vietnam: GEOGRAPHIC, official tourism map
  {slug: 'vietnam', en: 'Vietnam', file: 'maps/intercity/diagrams/vietnam-train.jpg', kind: 'country',
   title: 'Vietnam railway map', credit: 'vietnamtourism.com · Natural Earth (Oct 2026)',
   box: [21325, 6679, 21795, 7911]},
  // Malaysia: SCHEMATIC on the state outline, official
  {slug: 'malaysia', en: 'Malaysia', file: 'maps/intercity/diagrams/malaysia-ktmb.jpg', kind: 'country',
   title: 'KTMB train network', credit: 'Keretapi Tanah Melayu Berhad (2025) · enlarged',
   box: [20950, 8127, 21326, 8696]},
  // Myanmar: GEOGRAPHIC, clean
  {slug: 'myanmar', en: 'Myanmar', file: 'maps/intercity/diagrams/myanmar-commons.jpg', kind: 'country',
   title: 'Railway map of Myanmar', credit: 'Maximilian Dörrbecker (Chumwa) / Wikimedia Commons · CC BY-SA 2.5 (2018) · enlarged',
   box: [20419, 6319, 20847, 7604]},
  // Philippines: GEOGRAPHIC; active, inactive and under construction
  {slug: 'philippines', en: 'Philippines', file: 'maps/intercity/diagrams/philippines-pnr.jpg', kind: 'country',
   title: 'PNR rail map', credit: 'ByteMega / Wikimedia Commons · CC BY-SA 4.0 (2024)',
   box: [22754, 7235, 23167, 7627]},
  // Ethiopia: SCHEMATIC network plan; only Addis–Djibouti carries passengers
  {slug: 'ethiopia', en: 'Ethiopia', file: 'maps/intercity/diagrams/ethiopia-plan.jpg', kind: 'country',
   title: 'Ethiopian railway network plan', credit: 'Turtlewong / Wikimedia Commons · CC BY-SA 4.0 (2018)',
   box: [15240, 7559, 16088, 8539]},
  // Kenya: GEOGRAPHIC, official; small original
  {slug: 'kenya', en: 'Kenya', file: 'maps/intercity/diagrams/kenya-krc.jpg', kind: 'country',
   title: 'Railway network in Kenya', credit: 'Kenya Railways Corporation (2021) · enlarged',
   box: [15172, 8738, 15658, 9129]},
  // Zambia: simplified, official; small original
  {slug: 'zambia', en: 'Zambia', file: 'maps/intercity/diagrams/zambia-zrl.jpg', kind: 'country',
   title: 'ZRL network', credit: 'Zambia Railways Limited (2021) · enlarged',
   box: [14222, 9553, 15100, 10474]},
  // Bolivia: GEOGRAPHIC; small original
  {slug: 'bolivia', en: 'Bolivia', file: 'maps/intercity/diagrams/bolivia-commons.jpg', kind: 'country',
   title: 'Railways in Bolivia', credit: 'Wikimedia Commons · enlarged',
   box: [6140, 10205, 7118, 10812]},
  // Uruguay: GEOGRAPHIC; freight only since 2026
  {slug: 'uruguay', en: 'Uruguay', file: 'maps/intercity/diagrams/uruguay-commons.jpg', kind: 'country',
   title: 'Red ferroviaria del Uruguay', credit: 'Wikimedia Commons (2022) · enlarged',
   box: [7018, 11544, 7434, 12160]},
  // Venezuela: GEOGRAPHIC, 2007 drawing; only Caracas–Cúa runs
  {slug: 'venezuela', en: 'Venezuela', file: 'maps/intercity/diagrams/venezuela-commons.jpg', kind: 'country',
   title: 'Sistema ferroviario de Venezuela', credit: 'Chabacano / Wikimedia Commons · CC BY-SA 3.0 (2007)',
   box: [6063, 7883, 6637, 8153]},
  // Ecuador: GEOGRAPHIC; passenger trains ceased in 2020
  {slug: 'ecuador', en: 'Ecuador', file: 'maps/intercity/diagrams/ecuador-commons.jpg', kind: 'country',
   title: 'Railways in Ecuador', credit: 'Jkan997 / Wikimedia Commons · CC BY-SA 3.0 (2014)',
   box: [5099, 8721, 5319, 9089]},
  // Panama: GEOGRAPHIC; the Panama Canal Railway
  {slug: 'panama', en: 'Panama', file: 'maps/intercity/diagrams/panama-canal-railway.jpg', kind: 'country',
   title: 'Panama Canal Railway', credit: 'Jkan997 / Wikimedia Commons · CC BY-SA 3.0 (2012)',
   box: [5046, 7978, 5186, 8118]},
  // Guatemala: GEOGRAPHIC; network inactive
  {slug: 'guatemala', en: 'Guatemala', file: 'maps/intercity/diagrams/guatemala-commons.jpg', kind: 'country',
   title: 'Guatemala railways', credit: 'Jkan997 / Wikimedia Commons · CC BY-SA 3.0 (2012)',
   box: [3943, 7407, 4339, 7601]},
  // Paraguay: GEOGRAPHIC; no regular passenger service
  {slug: 'paraguay', en: 'Paraguay', file: 'maps/intercity/diagrams/paraguay-commons.jpg', kind: 'country',
   title: 'Chemins de fer du Paraguay', credit: 'Rolgiati / Wikimedia Commons · CC BY 3.0 (2014) · enlarged',
   box: [7043, 11042, 7240, 11269]},
  // Sudan: GEOGRAPHIC
  {slug: 'sudan', en: 'Sudan', file: 'maps/intercity/diagrams/sudan-commons.jpg', kind: 'country',
   title: 'Railways in Sudan', credit: 'Jkan997 / Wikimedia Commons · CC BY 3.0 (2011)',
   box: [14326, 6782, 15595, 8075]},
  // Angola: GEOGRAPHIC
  {slug: 'angola', en: 'Angola', file: 'maps/intercity/diagrams/angola-commons.jpg', kind: 'country',
   title: 'Railways in Angola', credit: 'Jkan997 / Wikimedia Commons · CC BY-SA 3.0 (2011)',
   box: [13274, 9575, 14415, 10409]},
  // Namibia: GEOGRAPHIC
  {slug: 'namibia', en: 'Namibia', file: 'maps/intercity/diagrams/namibia-commons.jpg', kind: 'country',
   title: 'Namibia rail network', credit: 'Htonl / Wikimedia Commons · CC BY-SA 2.0 (2012)',
   box: [13558, 10363, 13932, 11448]},
  // Botswana: GEOGRAPHIC; passenger trains reportedly suspended Feb 2026
  {slug: 'botswana', en: 'Botswana', file: 'maps/intercity/diagrams/botswana-commons.jpg', kind: 'country',
   title: 'Botswana rail network', credit: 'Htonl / Wikimedia Commons · CC BY-SA 2.0 (2012)',
   box: [14458, 10645, 14657, 11144]},
  // Sri Lanka: GEOGRAPHIC
  {slug: 'sri-lanka', en: 'Sri Lanka', file: 'maps/intercity/diagrams/sri-lanka-commons.jpg', kind: 'country',
   title: 'Sri Lanka railways', credit: 'MissMJ / Wikimedia Commons · CC0 (2011)',
   box: [19173, 7909, 19402, 8285]},
  // Cambodia: GEOGRAPHIC, rail only; small original
  {slug: 'cambodia', en: 'Cambodia', file: 'maps/intercity/diagrams/cambodia-railway.jpg', kind: 'country',
   title: 'Royal Railway of Cambodia', credit: 'north-vietnam.com (2021) · enlarged',
   box: [21166, 7568, 21402, 7869]},
  // Slovakia: GEOGRAPHIC; by electrification; dotted lines have no regular passenger service
  {slug: 'slovakia', en: 'Slovakia', kind: 'country', tabs: [
     {tab: 'Network', file: 'maps/intercity/diagrams/slovakia-2026.jpg', title: 'Railways of Slovakia 2026', credit: 'Poganyp / Wikimedia Commons · CC BY-SA 4.0 (Oct 2026)'}],
   box: [13641, 3759, 14159, 4021]},
  // Montenegro: SCHEMATIC of the ŽPCG passenger lines; the yellow links are bus connections
  {slug: 'montenegro', en: 'Montenegro', file: 'maps/intercity/diagrams/montenegro-schematic.jpg', kind: 'country',
   title: 'ŽPCG passenger lines', credit: 'MapperGuy87 / Wikimedia Commons · CC0 (Apr 2026)',
   box: [13805, 4562, 13945, 4730]},
  // Croatia: GEOGRAPHIC 2018, line numbers; freight-only and closed lines marked
  {slug: 'croatia', en: 'Croatia', file: 'maps/intercity/diagrams/croatia-bosnia-commons.jpg', kind: 'country',
   title: 'Railway map of Croatia and Bosnia and Herzegovina', credit: 'Maximilian Dörrbecker (Chumwa) / Wikimedia Commons · CC BY-SA 2.5 (Dec 2018)',
   box: [13400, 4145, 13871, 4610]},
  // Bosnia and Herzegovina: GEOGRAPHIC, whole network; passenger service now mainly Sarajevo–Mostar–Čapljina and around Banja Luka / Doboj
  {slug: 'bosnia', en: 'Bosnia and Herzegovina', file: 'maps/intercity/diagrams/bosnia-commons.jpg', kind: 'country',
   title: 'Railway map of Croatia and Bosnia and Herzegovina', credit: 'Maximilian Dörrbecker (Chumwa) / Wikimedia Commons · CC BY-SA 2.5 (Dec 2018)',
   box: [13576, 4305, 13915, 4606]},
  // Albania: GEOGRAPHIC 2019; today only Durrës–Elbasan carries passengers (Tirana–Durrës being rebuilt)
  {slug: 'albania', en: 'Albania', file: 'maps/intercity/diagrams/albania-commons.jpg', kind: 'country',
   title: 'Railway map of Albania', credit: 'Maximilian Dörrbecker (Chumwa) / Wikimedia Commons · CC BY-SA 2.5 (Apr 2019) · enlarged',
   box: [13843, 4646, 13995, 4927]},
  // North Macedonia: GEOGRAPHIC 2009, the newest found; Veles–Štip–Kočani and international trains suspended
  {slug: 'north-macedonia', en: 'North Macedonia', file: 'maps/intercity/diagrams/north-macedonia-commons.jpg', kind: 'country',
   title: 'Railway map of Macedonia', credit: 'Maximilian Dörrbecker (Chumwa) / Wikimedia Commons · CC BY-SA 2.5 (Sep 2009) · enlarged',
   box: [13989, 4685, 14167, 4878]},
  // South Africa: Shosholoza Meyl long-distance routes as of 2012 — suspended since 2024; the national network map
  {slug: 'south-africa', en: 'South Africa', kind: 'country', tabs: [
     {tab: 'Long-distance (2012)', file: 'maps/intercity/diagrams/south-africa-shosholoza.jpg', title: 'Shosholoza Meyl routes 2012', credit: 'Htonl / Wikimedia Commons · CC BY-SA 4.0 (Jun 2012)'},
     {tab: 'Network', file: 'maps/intercity/diagrams/south-africa-network.jpg', title: 'South Africa rail network', credit: 'Htonl / Wikimedia Commons · CC BY-SA 4.0 (2012)'}],
   box: [13737, 10751, 15083, 12040]},

  // ---- ferries: kind 'ferry' (its own toggle; shown in the Ferries and Transits modes) ----
  // Files ferry-*.jpg; originals in raw/ferry-*, each one's source URL, page and
  // licence in raw/ferry-sources.json. Boxes: the area each map covers (lat/lon)
  // pushed through raw/warp_anchors.json, the warp build_metro_boxes.py fits;
  // Hong Kong / PRD hand-set onto the HK, Macau and Shenzhen metro boxes (the
  // warp sat ~70 px west of them there).
  // Croatia: jadrolinija.hr/en/travels; PDFs of 16-20 Mar 2026 (vector, rendered)
  {slug: 'ferry-croatia', en: 'Jadrolinija', kind: 'ferry', tabs: [
     {tab: 'All routes', file: 'maps/intercity/diagrams/ferry-croatia-jadrolinija.jpg', title: 'Jadrolinija · all routes', credit: 'Jadrolinija (Mar 2026)'},
     {tab: 'Rijeka', file: 'maps/intercity/diagrams/ferry-croatia-rijeka-jadrolinija.jpg', title: 'Jadrolinija · Rijeka district', credit: 'Jadrolinija (Mar 2026)'},
     {tab: 'Zadar', file: 'maps/intercity/diagrams/ferry-croatia-zadar-jadrolinija.jpg', title: 'Jadrolinija · Zadar district', credit: 'Jadrolinija (Mar 2026)'},
     {tab: 'Šibenik', file: 'maps/intercity/diagrams/ferry-croatia-sibenik-jadrolinija.jpg', title: 'Jadrolinija · Šibenik district', credit: 'Jadrolinija (Mar 2026)'},
     {tab: 'Split', file: 'maps/intercity/diagrams/ferry-croatia-split-jadrolinija.jpg', title: 'Jadrolinija · Split district', credit: 'Jadrolinija (Mar 2026)'},
     {tab: 'Dubrovnik', file: 'maps/intercity/diagrams/ferry-croatia-dubrovnik-jadrolinija.jpg', title: 'Jadrolinija · Dubrovnik district', credit: 'Jadrolinija (Mar 2026)'}],
   box: [13357, 4309, 13839, 4868]},
  // Stena Line: stenaline.com/about-us/route-network; © Stena Line; downscaled 10957x12306 -> 9600 px
  {slug: 'ferry-stena-line', en: 'Stena Line', file: 'maps/intercity/diagrams/ferry-stena-line.jpg', kind: 'ferry',
   title: 'Stena Line route network', credit: 'Stena Line (21 Apr 2026)',
   box: [11584, 1398, 14109, 5463]},
  {slug: 'ferry-irish-ferries', en: 'Irish Ferries', file: 'maps/intercity/diagrams/ferry-irish-ferries-commons.jpg', kind: 'ferry',
   title: 'Irish Ferries routes', credit: 'SarahBx / Wikimedia Commons · CC BY-SA 4.0 (Jul 2025)',
   box: [11604, 3215, 12355, 3774]},
  // Brittany / Condor / Steam Packet: 2010-11 Commons drawings, routes since changed in places
  {slug: 'ferry-brittany', en: 'Brittany Ferries', file: 'maps/intercity/diagrams/ferry-brittany-commons.jpg', kind: 'ferry',
   title: 'Brittany Ferries route map', credit: 'Philphos / Wikimedia Commons · public domain (Oct 2010)',
   box: [11430, 3418, 12187, 4588]},
  {slug: 'ferry-condor', en: 'Condor Ferries', file: 'maps/intercity/diagrams/ferry-condor-commons.jpg', kind: 'ferry',
   title: 'Condor Ferries route map', credit: 'NordNordWest, Philphos / Wikimedia Commons · CC BY-SA 3.0 (Oct 2010)',
   box: [11914, 3587, 12112, 3908]},
  {slug: 'ferry-isle-of-man', en: 'Isle of Man', file: 'maps/intercity/diagrams/ferry-steam-packet-commons.jpg', kind: 'ferry',
   title: 'Isle of Man Steam Packet routes', credit: 'Philphos, Trex2001 / Wikimedia Commons · public domain (Aug 2011)',
   box: [11621, 3060, 11939, 3253]},
  {slug: 'ferry-color-line', en: 'Color Line', file: 'maps/intercity/diagrams/ferry-color-line-commons.jpg', kind: 'ferry',
   title: 'Color Line routes, February 2026', credit: 'Entbert / Wikimedia Commons · CC BY-SA 3.0 (Feb 2026)',
   box: [12877, 2186, 13152, 3097]},
  // Marmara: İDO routes, 2010; enlarged 1336 -> 2600 px
  {slug: 'ferry-marmara', en: 'Sea of Marmara', file: 'maps/intercity/diagrams/ferry-marmara-commons.jpg', kind: 'ferry',
   title: 'Sea of Marmara ferry routes (İDO)', credit: 'Welkinridge / Wikimedia Commons · public domain (May 2010) · enlarged',
   box: [14488, 4802, 14748, 4965]},
  // Hong Kong: Kaito map from td.gov.hk (22 Jul 2025, 3 pages), used with permission
  {slug: 'ferry-hong-kong', en: 'Hong Kong ferries', kind: 'ferry', tabs: [
     {tab: 'Inner Harbour', file: 'maps/intercity/diagrams/ferry-hk-inner-harbour-commons.jpg', title: '香港港內線渡輪 · Hong Kong Inner Harbour Ferry Service', credit: 'Cypp0847 / Wikimedia Commons · CC BY-SA 4.0 (Jan 2022)'},
     {tab: 'Franchised & licensed', file: 'maps/intercity/diagrams/ferry-hk-routes-commons.jpg', title: '專營及持牌渡輪服務 · Franchised and licensed ferry services', credit: 'Cypp0847, OpenStreetMap contributors / Wikimedia Commons · CC BY-SA 2.0 (Oct 2019)'},
     {tab: 'Kaito · Sai Kung', file: 'maps/intercity/diagrams/ferry-hk-kaito-td-1.jpg', title: 'Map of Kaito Ferry Services · Sai Kung District', credit: 'Transport Department, HKSAR Government (22 Jul 2025)'},
     {tab: 'Kaito · Harbour & south', file: 'maps/intercity/diagrams/ferry-hk-kaito-td-2.jpg', title: 'Map of Kaito Ferry Services', credit: 'Transport Department, HKSAR Government (22 Jul 2025)'},
     {tab: 'Kaito · North-east', file: 'maps/intercity/diagrams/ferry-hk-kaito-td-3.jpg', title: 'Map of Kaito Ferry Services', credit: 'Transport Department, HKSAR Government (22 Jul 2025)'}],
   box: [22257, 6787, 22357, 6887]},   // hand-set: around the Hong Kong metro box
  {slug: 'ferry-prd', en: 'TurboJET', file: 'maps/intercity/diagrams/ferry-prd-turbojet.jpg', kind: 'ferry',
   title: '噴射飛航 TurboJET · Hong Kong, Macau, Shenzhen, Zhuhai', credit: 'TurboJET · Shun Tak-China Travel Ship Management',
   box: [22095, 6722, 22350, 6936]},   // hand-set: Macau, Shenzhen and Hong Kong metro boxes
  // Japan: the route map spread of the JLC 2026 pamphlet (data as of 1 Jun 2026), right half
  {slug: 'ferry-japan', en: 'Japan long-distance ferries', file: 'maps/intercity/diagrams/ferry-japan-jlc.jpg', kind: 'ferry',
   title: '航路案内 · long-distance ferry routes', credit: '日本長距離フェリー協会 Japan Long Course Ferry Service Association (1 Jun 2026)',
   box: [23521, 4524, 25068, 5884]},
  // Indonesia: no newer passenger network map found (pelni.co.id, Kemenhub, Commons checked; asdp.id not used)
  {slug: 'ferry-indonesia', en: 'Pelni', kind: 'ferry', tabs: [
     {tab: 'PELNI', file: 'maps/intercity/diagrams/ferry-pelni-2025.jpg', title: 'Jaringan Trayek Kapal Penumpang 2025 / 2025 Passenger Ship Route Network', credit: 'PT PELNI (Persero), Annual Report 2025 (pp. 122-123, two pages joined); no licence stated'},
     {tab: 'PELNI Perintis', file: 'maps/intercity/diagrams/ferry-pelni-perintis-2025.jpg', title: 'Jaringan Trayek Nasional Kapal Perintis 2025 / 2025 National Pioneer Ship Route Network', credit: 'PT PELNI (Persero), Annual Report 2025 (pp. 126-127, two pages joined); no licence stated'}],
    
   box: [20430, 8241, 24827, 9817]},
  // Sydney: transportnsw.info/routes/ferry; "Copyright © 2025 Transport for NSW" printed, no open licence stated
  {slug: 'ferry-sydney', en: 'Sydney Harbour', file: 'maps/intercity/diagrams/ferry-sydney-harbour-tfnsw.jpg', kind: 'ferry',
   title: 'Around Sydney Harbour with public transport', credit: 'Transport for NSW (Oct 2025) · © Transport for NSW',
   box: [25430, 11929, 25490, 11989]},
  // BC Ferries: bcferries.com/routes-fares/discover-route-map (the Feb 2020 edition it still serves)
  {slug: 'ferry-bc', en: 'BC Ferries', file: 'maps/intercity/diagrams/ferry-bc-ferries.jpg', kind: 'ferry',
   title: 'BC Ferries route map', credit: 'BC Ferries (Feb 2020)',
   box: [663, 3072, 1411, 3962]},
  {slug: 'ferry-marine-atlantic', en: 'Marine Atlantic', file: 'maps/intercity/diagrams/ferry-marine-atlantic-commons.jpg', kind: 'ferry',
   title: 'Marine Atlantic routes', credit: 'Yug, STyx, Philphos / Wikimedia Commons · CC BY-SA 3.0 (Mar 2011)',
   box: [6895, 3846, 7641, 4196]},
  {slug: 'ferry-washington', en: 'Washington State Ferries', file: 'maps/intercity/diagrams/ferry-washington-commons.jpg', kind: 'ferry',
   title: 'Ferries in Washington (state)', credit: 'Dennis Bratland / Wikimedia Commons · CC BY-SA 4.0 (Nov 2018)',
   box: [1327, 3882, 1437, 4071]},
  // NYC Ferry: ferry.nyc/routes-and-schedules; © NYC Ferry
  {slug: 'ferry-nyc', en: 'NYC Ferry', file: 'maps/intercity/diagrams/ferry-nyc-ferry.jpg', kind: 'ferry',
   title: 'NYC Ferry system map', credit: 'NYC Ferry (Dec 2025)',
   box: [5672, 4815, 5732, 4875]},
  {slug: 'ferry-usa', en: 'US ferries', file: 'maps/intercity/diagrams/ferry-usa-commons.jpg', kind: 'ferry',
   title: 'Ferry routes in the United States', credit: 'Wikideas1 / Wikimedia Commons · CC0 (Jan 2025)',
   box: [1160, 3778, 6527, 6661]},
  // Scotland: CalMac publishes no route map any more (only an interactive web map):
  // the 2014 Commons map stands in, marked out of date
  {slug: 'ferry-scotland', en: 'Scottish ferries', kind: 'ferry', tabs: [
     {tab: 'West coast (2014)', file: 'maps/intercity/diagrams/ferry-scotland-2014.jpg', title: 'Passenger Ferries', credit: 'Cnbrb / Wikimedia Commons · CC BY-SA 3.0 (2014; out of date -- CalMac publishes no route map now)', source: 'https://commons.wikimedia.org/wiki/File:Scotland_ferries_map.png'}],
   box: [11505, 2396, 11756, 2982]},
  {slug: 'ferry-orkney', en: 'Orkney ferries', kind: 'ferry', tabs: [
     {tab: 'Orkney inter-island', file: 'maps/intercity/diagrams/ferry-orkney.jpg', title: 'Orkney Ferries route map', credit: 'Orkney Ferries Ltd (as on its site, Nov 2026); no licence stated', source: 'https://www.orkneyferries.co.uk/'}],
   box: [11860, 2269, 11976, 2403]},
  {slug: 'ferry-shetland', en: 'Shetland ferries', kind: 'ferry', tabs: [
     {tab: 'Shetland inter-island', file: 'maps/intercity/diagrams/ferry-shetland.jpg', title: 'Shetland inter-island route map', credit: 'Shetland Islands Council Ferry Services (as on its site, Nov 2026; published only this small); no licence stated', source: 'https://www.shetland.gov.uk/homepage/189/route-map'}],
   box: [12025, 1991, 12130, 2201]},
  {slug: 'ferry-norway', en: 'Norway ferries', kind: 'ferry', tabs: [
     {tab: 'Hurtigruten', file: 'maps/intercity/diagrams/ferry-norway-hurtigruten.jpg', title: 'Trajet de l\'Hurtigruten (Norwegian edition)', credit: 'Sardon and Aldebaran, Wikimedia Commons, CC BY-SA 4.0 (geographic, not schematic); vector original saved alongside as norway-hurtigruten-route.svg'},
     {tab: 'Vestland boats', file: 'maps/intercity/diagrams/ferry-norway-skyss-vestland.jpg', title: 'Vestland Båt', credit: 'Skyss, © Truls Lange Civitas, edition 2026-08-05'},
     {tab: 'Nordland ferries', file: 'maps/intercity/diagrams/ferry-norway-nordland-ferries.jpg', title: 'Ferger i Nordland / Ferries in Nordland', credit: 'Reis Nordland / Nordland fylkeskommune, © Truls Lange Civitas, edition 2025-06-25', source: 'https://www.reisnordland.no/linjekart'},
     {tab: 'Nordland express boats', file: 'maps/intercity/diagrams/ferry-norway-nordland-expressboats.jpg', title: 'Hovedforbindelser i Nordland / Main connections in Nordland', credit: 'Reis Nordland / Nordland fylkeskommune, © Truls Lange Civitas, edition 2025-04-28'}],
   box: [12543, 79, 14913, 2278]},
  {slug: 'ferry-moscow-river', en: 'Moscow river', kind: 'ferry', tabs: [
     {tab: 'Moscow river', file: 'maps/intercity/diagrams/ferry-moscow-river.jpg', title: 'Регулярный водный транспорт Москвы', credit: 'Moscow Transport Department (mos.ru), edition 17 Jun 2026'}],
   box: [15437, 2761, 15597, 2921]},
  {slug: 'ferry-zhoushan', en: 'Shengsi ferries', kind: 'ferry', tabs: [
     {tab: 'Shengsi ferries', file: 'maps/intercity/diagrams/ferry-zhoushan-shengsi.jpg', title: '嵊泗县交通航线示意图 / Shengsi county traffic route', credit: 'Official terminal wall map, photographed by Reyn Fox 2017; CC BY-SA 4.0'}],
   box: [22899, 5896, 23059, 6056]},
  {slug: 'ferry-philippines', en: 'Philippine ferries', kind: 'ferry', tabs: [
     {tab: 'Philippines', file: 'maps/intercity/diagrams/ferry-philippines.jpg', title: 'Philippines transport map – Ferries, buses and airports between the main islands', credit: 'philippinestransport.com, updated 14 Nov 2026; CC BY 4.0 (Wikimedia Commons)'}],
   box: [22432, 6839, 23549, 8427]},
  {slug: 'ferry-foehr-amrum', en: 'Föhr–Amrum', kind: 'ferry', tabs: [
     {tab: 'Föhr–Amrum WDR', file: 'maps/intercity/diagrams/ferry-foehr-amrum-wdr.jpg', title: 'Fahrplan 2026 – Föhr, Amrum, Halligen', credit: 'Wyker Dampfschiffs-Reederei Föhr-Amrum GmbH, 2026 edition (map is a panel on page 1)'}],
   box: [12850, 2964, 13010, 3124]},
  {slug: 'ferry-bodensee', en: 'Lake Constance', kind: 'ferry', tabs: [
     {tab: 'Bodensee BSB', file: 'maps/intercity/diagrams/ferry-bodensee-bsb.jpg', title: 'Tageskarten zones map – Überlinger-See-Zone / Obersee-Zone / 2-Länder-Zone (BSB Fahrplan 2027, p. 17)', credit: 'Bodensee-Schiffsbetriebe GmbH, Fahrplan 2027 (Stand 11/2026), layout kommata.net'}],
   box: [12904, 3933, 13064, 4093]},
  {slug: 'ferry-aland', en: 'Åland', kind: 'ferry', tabs: [
     {tab: 'Åland archipelago', file: 'maps/intercity/diagrams/ferry-aland.jpg', title: 'Skärgårdstrafikens körtider / Archipelago-traffic traveltimes', credit: 'Ålandstrafiken / Ålands landskapsregering, Turlistor 2024 v1.0 (Dec 2023)'}],
   box: [13852, 2068, 14016, 2228]},
  {slug: 'ferry-finnlines', en: 'Finnlines', kind: 'ferry', tabs: [
     {tab: 'Finnlines', file: 'maps/intercity/diagrams/ferry-finnlines.jpg', title: 'Schedules – More than 170 weekly freight departures and 80 passenger departures', credit: 'Finnlines, Finnlines News 1/2026 (June 2026), p. 16'}],
   box: [13104, 2099, 14362, 3171]},
  {slug: 'ferry-thun-brienz', en: 'Thun & Brienz', kind: 'ferry', tabs: [
     {tab: 'Lake Thun', file: 'maps/intercity/diagrams/ferry-bls-thun.jpg', title: 'Übersicht Thunersee / Overview Lake Thun; Übersicht Brienzersee / Overview Lake Brienz', credit: 'BLS Schifffahrt AG, Fahrplan 2027 (13.12.2026–11.12.2027), pp. 3 and 11'},
     {tab: 'Lake Brienz', file: 'maps/intercity/diagrams/ferry-bls-brienz.jpg', title: 'Übersicht Thunersee / Overview Lake Thun; Übersicht Brienzersee / Overview Lake Brienz', credit: 'BLS Schifffahrt AG, Fahrplan 2027 (13.12.2026–11.12.2027), pp. 3 and 11'}],
   box: [12778, 4063, 12938, 4223]},
  {slug: '47rail-akita', en: 'Akita (47RAIL)', kind: 'area', tabs: [
     {tab: 'Akita', file: 'maps/intercity/diagrams/japan-47rail-akita.jpg', title: 'ヨンナナ路線図 秋田県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2023)'}],
   box: [24425, 4900, 24585, 5092]},
  {slug: '47rail-chiba', en: 'Chiba (47RAIL)', kind: 'area', tabs: [
     {tab: 'Chiba', file: 'maps/intercity/diagrams/japan-47rail-chiba.jpg', title: 'ヨンナナ路線図 千葉県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2025 rev.)'}],
   box: [24435, 5371, 24595, 5531]},
  {slug: '47rail-ehime', en: 'Ehime (47RAIL)', kind: 'area', tabs: [
     {tab: 'Ehime', file: 'maps/intercity/diagrams/japan-47rail-ehime.jpg', title: 'ヨンナナ路線図 愛媛県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2025)'}],
   box: [23763, 5595, 23923, 5755]},
  {slug: '47rail-fukui', en: 'Fukui (47RAIL)', kind: 'area', tabs: [
     {tab: 'Fukui', file: 'maps/intercity/diagrams/japan-47rail-fukui.jpg', title: 'ヨンナナ路線図 福井県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2024)'}],
   box: [24075, 5336, 24235, 5496]},
  {slug: '47rail-fukushima', en: 'Fukushima (47RAIL)', kind: 'area', tabs: [
     {tab: 'Fukushima', file: 'maps/intercity/diagrams/japan-47rail-fukushima.jpg', title: 'ヨンナナ路線図 福島県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2023)'}],
   box: [24414, 5177, 24595, 5337]},
  {slug: '47rail-gifu', en: 'Gifu (47RAIL)', kind: 'area', tabs: [
     {tab: 'Gifu', file: 'maps/intercity/diagrams/japan-47rail-gifu.jpg', title: 'ヨンナナ路線図 岐阜県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2024)'}],
   box: [24150, 5339, 24310, 5499]},
  {slug: '47rail-gunma', en: 'Gunma (47RAIL)', kind: 'area', tabs: [
     {tab: 'Gunma', file: 'maps/intercity/diagrams/japan-47rail-gunma.jpg', title: 'ヨンナナ路線図 群馬県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2025)'}],
   box: [24337, 5266, 24497, 5426]},
  {slug: '47rail-ibaraki', en: 'Ibaraki (47RAIL)', kind: 'area', tabs: [
     {tab: 'Ibaraki', file: 'maps/intercity/diagrams/japan-47rail-ibaraki.jpg', title: 'ヨンナナ路線図 茨城県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2025)'}],
   box: [24438, 5284, 24598, 5444]},
  {slug: '47rail-ishikawa', en: 'Ishikawa (47RAIL)', kind: 'area', tabs: [
     {tab: 'Ishikawa', file: 'maps/intercity/diagrams/japan-47rail-ishikawa.jpg', title: 'ヨンナナ路線図 石川県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2024)'}],
   box: [24127, 5236, 24287, 5396]},
  {slug: '47rail-kagawa', en: 'Kagawa (47RAIL)', kind: 'area', tabs: [
     {tab: 'Kagawa', file: 'maps/intercity/diagrams/japan-47rail-kagawa.jpg', title: 'ヨンナナ路線図 香川県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2025)'}],
   box: [23866, 5532, 24026, 5692]},
  {slug: '47rail-kagoshima', en: 'Kagoshima (47RAIL)', kind: 'area', tabs: [
     {tab: 'Kagoshima', file: 'maps/intercity/diagrams/japan-47rail-kagoshima.jpg', title: 'ヨンナナ路線図 鹿児島県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2025)'}],
   box: [23576, 5787, 23736, 5947]},
  {slug: '47rail-kochi', en: 'Kochi (47RAIL)', kind: 'area', tabs: [
     {tab: 'Kochi', file: 'maps/intercity/diagrams/japan-47rail-kochi.jpg', title: 'ヨンナナ路線図 高知県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2024)'}],
   box: [23818, 5618, 23983, 5778]},
  {slug: '47rail-mie', en: 'Mie (47RAIL)', kind: 'area', tabs: [
     {tab: 'Mie', file: 'maps/intercity/diagrams/japan-47rail-mie.jpg', title: 'ヨンナナ路線図 三重県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2025 rev.)'}],
   box: [24096, 5482, 24256, 5647]},
  {slug: '47rail-miyazaki', en: 'Miyazaki (47RAIL)', kind: 'area', tabs: [
     {tab: 'Miyazaki', file: 'maps/intercity/diagrams/japan-47rail-miyazaki.jpg', title: 'ヨンナナ路線図 宮崎県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2025)'}],
   box: [23630, 5738, 23790, 5898]},
  {slug: '47rail-nagano', en: 'Nagano (47RAIL)', kind: 'area', tabs: [
     {tab: 'Nagano', file: 'maps/intercity/diagrams/japan-47rail-nagano.jpg', title: 'ヨンナナ路線図 長野県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2025 rev.)'}],
   box: [24245, 5291, 24405, 5488]},
  {slug: '47rail-nagasaki', en: 'Nagasaki (47RAIL)', kind: 'area', tabs: [
     {tab: 'Nagasaki', file: 'maps/intercity/diagrams/japan-47rail-nagasaki.jpg', title: 'ヨンナナ路線図 長崎県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2025)'}],
   box: [23506, 5651, 23666, 5811]},
  {slug: '47rail-nara', en: 'Nara (47RAIL)', kind: 'area', tabs: [
     {tab: 'Nara', file: 'maps/intercity/diagrams/japan-47rail-nara.jpg', title: 'ヨンナナ路線図 奈良県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2025)'}],
   box: [24045, 5506, 24205, 5666]},
  {slug: '47rail-niigata', en: 'Niigata (47RAIL)', kind: 'area', tabs: [
     {tab: 'Niigata', file: 'maps/intercity/diagrams/japan-47rail-niigata.jpg', title: 'ヨンナナ路線図 新潟県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2025 rev.)'}],
   box: [24264, 5126, 24494, 5322]},
  {slug: '47rail-oita', en: 'Oita (47RAIL)', kind: 'area', tabs: [
     {tab: 'Oita', file: 'maps/intercity/diagrams/japan-47rail-oita.jpg', title: 'ヨンナナ路線図 大分県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2023)'}],
   box: [23637, 5628, 23797, 5788]},
  {slug: '47rail-okayama', en: 'Okayama (47RAIL)', kind: 'area', tabs: [
     {tab: 'Okayama', file: 'maps/intercity/diagrams/japan-47rail-okayama.jpg', title: 'ヨンナナ路線図 岡山県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2023)'}],
   box: [23859, 5449, 24019, 5609]},
  {slug: '47rail-saitama', en: 'Saitama (47RAIL)', kind: 'area', tabs: [
     {tab: 'Saitama', file: 'maps/intercity/diagrams/japan-47rail-saitama.jpg', title: 'ヨンナナ路線図 埼玉県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2024)'}],
   box: [24357, 5318, 24517, 5478]},
  {slug: '47rail-shiga', en: 'Shiga (47RAIL)', kind: 'area', tabs: [
     {tab: 'Shiga', file: 'maps/intercity/diagrams/japan-47rail-shiga.jpg', title: 'ヨンナナ路線図 滋賀県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2024)'}],
   box: [24070, 5403, 24230, 5563]},
  {slug: '47rail-shimane', en: 'Shimane (47RAIL)', kind: 'area', tabs: [
     {tab: 'Shimane', file: 'maps/intercity/diagrams/japan-47rail-shimane.jpg', title: 'ヨンナナ路線図 島根県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2025)'}],
   box: [23725, 5442, 23901, 5602]},
  {slug: '47rail-shizuoka', en: 'Shizuoka (47RAIL)', kind: 'area', tabs: [
     {tab: 'Shizuoka', file: 'maps/intercity/diagrams/japan-47rail-shizuoka.jpg', title: 'ヨンナナ路線図 静岡県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2025)'}],
   box: [24263, 5414, 24423, 5574]},
  {slug: '47rail-tochigi', en: 'Tochigi (47RAIL)', kind: 'area', tabs: [
     {tab: 'Tochigi', file: 'maps/intercity/diagrams/japan-47rail-tochigi.jpg', title: 'ヨンナナ路線図 栃木県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2025)'}],
   box: [24405, 5249, 24565, 5409]},
  {slug: '47rail-tokushima', en: 'Tokushima (47RAIL)', kind: 'area', tabs: [
     {tab: 'Tokushima', file: 'maps/intercity/diagrams/japan-47rail-tokushima.jpg', title: 'ヨンナナ路線図 徳島県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2025)'}],
   box: [23885, 5559, 24045, 5719]},
  {slug: '47rail-tottori', en: 'Tottori (47RAIL)', kind: 'area', tabs: [
     {tab: 'Tottori', file: 'maps/intercity/diagrams/japan-47rail-tottori.jpg', title: 'ヨンナナ路線図 鳥取県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2025)'}],
   box: [23863, 5393, 24023, 5553]},
  {slug: '47rail-toyama', en: 'Toyama (47RAIL)', kind: 'area', tabs: [
     {tab: 'Toyama', file: 'maps/intercity/diagrams/japan-47rail-toyama.jpg', title: 'ヨンナナ路線図 富山県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2024)'}],
   box: [24174, 5251, 24334, 5411]},
  {slug: '47rail-wakayama', en: 'Wakayama (47RAIL)', kind: 'area', tabs: [
     {tab: 'Wakayama', file: 'maps/intercity/diagrams/japan-47rail-wakayama.jpg', title: 'ヨンナナ路線図 和歌山県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2024)'}],
   box: [24010, 5547, 24170, 5707]},
  {slug: '47rail-yamaguchi', en: 'Yamaguchi (47RAIL)', kind: 'area', tabs: [
     {tab: 'Yamaguchi', file: 'maps/intercity/diagrams/japan-47rail-yamaguchi.jpg', title: 'ヨンナナ路線図 山口県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2024)'}],
   box: [23651, 5519, 23811, 5679]},
  {slug: '47rail-yamanashi', en: 'Yamanashi (47RAIL)', kind: 'area', tabs: [
     {tab: 'Yamanashi', file: 'maps/intercity/diagrams/japan-47rail-yamanashi.jpg', title: 'ヨンナナ路線図 山梨県', credit: '47RAIL JP / Himawari Design Lab · free edition, personal use (Ver. 2025)'}],
   box: [24298, 5366, 24458, 5526]},
  // ---- regional diagrams: their own boxes, placed by the warp (16 Nov 2026) ----
  {slug: 'ru-north-west', en: 'North-West Russia', kind: 'area', tabs: [
     {tab: 'North-West suburban', file: 'maps/intercity/diagrams/russia-szppk-all.jpg', title: 'Схема движения поездов пригородного сообщения полигона обслуживания АО «СЗППК»', credit: 'АО «Северо-Западная пригородная пассажирская компания» (СЗППК), current edition (site, Nov 2026); no licence stated', source: 'https://ppk-piter.ru/passenger/schema/'}],
   box: [14162, 481, 15831, 2893]},
  {slug: 'ru-st-petersburg', en: 'St Petersburg', kind: 'area', tabs: [
     {tab: 'SPb suburban', file: 'maps/intercity/diagrams/russia-szppk-spb-lenobl.jpg', title: 'Город Санкт-Петербург и Ленинградская область', credit: 'АО «СЗППК», current edition; no licence stated', source: 'https://ppk-piter.ru/'}],
   box: [14582, 1873, 15312, 2439]},
  {slug: 'ru-karelia', en: 'Karelia', kind: 'area', tabs: [
     {tab: 'Karelia suburban', file: 'maps/intercity/diagrams/russia-szppk-karelia.jpg', title: 'Республика Карелия', credit: 'АО «СЗППК», current edition; no licence stated', source: 'https://ppk-piter.ru/'}],
   box: [14542, 1033, 15501, 2047]},
  {slug: 'ru-murmansk', en: 'Murmansk', kind: 'area', tabs: [
     {tab: 'Murmansk suburban', file: 'maps/intercity/diagrams/russia-szppk-murmansk.jpg', title: 'Мурманская область', credit: 'АО «СЗППК», current edition; no licence stated', source: 'https://ppk-piter.ru/'}],
   box: [14243, 487, 15645, 1208]},
  {slug: 'ru-novgorod', en: 'Novgorod', kind: 'area', tabs: [
     {tab: 'Novgorod suburban', file: 'maps/intercity/diagrams/russia-szppk-novgorod.jpg', title: 'Новгородская область', credit: 'АО «СЗППК», current edition; no licence stated', source: 'https://ppk-piter.ru/'}],
   box: [14760, 2219, 15363, 2633]},
  {slug: 'ru-pskov', en: 'Pskov', kind: 'area', tabs: [
     {tab: 'Pskov suburban', file: 'maps/intercity/diagrams/russia-szppk-pskov.jpg', title: 'Псковская область', credit: 'АО «СЗППК», current edition; no licence stated', source: 'https://ppk-piter.ru/'}],
   box: [14537, 2301, 14952, 2866]},
  // Moscow: CPPK's official map (2023: the newest reachable -- central-ppk.ru refuses;
  // a May 2023 copy via the Internet Archive; D1/D2 only, before MCD-3/4) replaces
  // Ilya Birman's v164 (Nov 2019) of the same map; mos.ru's MCD graphic shows D1-D4;
  // Moscow Metro's in-car map (Aug 2024, metro + D1-D4 with their suburban ends) from
  // mcd.mosmetro.ru via the Internet Archive (the site does not answer from abroad).
  // No CPPK whole-region scheme with D3/D4 is archived: its Schm_RUS.jpg of Sep 2025
  // is still the D1/D2 edition
  {slug: 'ru-moscow', en: 'Moscow suburban', kind: 'area', tabs: [
     {tab: 'Moscow suburban', file: 'maps/intercity/diagrams/russia-moscow-cppk-2023.jpg', title: 'Пригородные поезда Москвы и области', credit: 'АО «ЦППК», after Ilya Birman’s design (May 2023; before MCD-3/4); no licence stated', source: 'https://central-ppk.ru/new/passengers/schemas/'},
     {tab: 'MCD D1–D4', file: 'maps/intercity/diagrams/russia-moscow-mcd.jpg', title: 'Московские центральные диаметры (D1–D4), city section', credit: 'mos.ru, Moscow city government (current, Nov 2026); no licence stated', source: 'https://www.mos.ru/city/projects/diametry/'},
     {tab: 'Metro + MCD', file: 'maps/intercity/diagrams/russia-moscow-metro-mcd-2024.jpg', title: 'Схема метро и МЦД (в вагонах МЦД)', credit: 'ГУП «Московский метрополитен» (Aug 2024; archived copy of May 2025); no licence stated', source: 'https://mcd.mosmetro.ru/wagons-map.pdf'}],
   box: [15247, 2605, 15759, 3049]},
  {slug: 'ru-kaliningrad', en: 'Kaliningrad suburban', kind: 'area', tabs: [
     {tab: 'Kaliningrad suburban', file: 'maps/intercity/diagrams/russia-kaliningrad-kppk-2026.jpg', title: 'Схема движения пригородных поездов', credit: 'АО «КППК» (2026, with Elizavetinskaya; published only 724 px); no licence stated', source: 'https://kppk39.ru/passengers/obshchaya-informatsiya/skhema-prigorodnogo-dvizheniya/'}],
   box: [13866, 2953, 14164, 3105]},
  {slug: 'ru-novosibirsk', en: 'Novosibirsk', kind: 'area', tabs: [
     {tab: 'Novosibirsk suburban', file: 'maps/intercity/diagrams/russia-novosibirsk-express-prigorod.jpg', title: 'Схема пригородного сообщения в Новосибирской области / Scheme of suburban communication in the Novosibirsk region', credit: 'АО «Экспресс-пригород»; zone scheme incl. Yurga, valid from 29.03.2026 (without Novogutovo); CMYK JPEG; no licence stated', source: 'https://express-prigorod.ru/passazhiram/scheme/'}],
   box: [18730, 2645, 19638, 3238]},
  {slug: 'ru-samara', en: 'Samara', kind: 'area', tabs: [
     {tab: 'Samara suburban', file: 'maps/intercity/diagrams/russia-samara-sppk.jpg', title: 'Схема движения пригородных поездов / Scheme suburban trains', credit: 'АО «Самарская пригородная пассажирская компания»; current site edition; no licence stated', source: 'https://samppk.ru/passengers/traffic-scheme/'}],
   box: [16145, 3008, 16787, 3318]},
  {slug: 'ru-volga-vyatka', en: 'Volga-Vyatka', kind: 'area', tabs: [
     {tab: 'Volga-Vyatka suburban', file: 'maps/intercity/diagrams/russia-volga-vyatka-vvppk.jpg', title: 'Схематичное расположение остановочных пунктов на полигоне обслуживания АО «ВВППК»', credit: 'АО «Волго-Вятская пригородная пассажирская компания»; current site; LOW-RES 1500x1060 (only version found); no licence stated', source: 'https://vvppk.ru/kompaniya/zona-obsluzhivaniya/'}],
   box: [15528, 1939, 16948, 3078]},
  {slug: 'ru-rostov', en: 'Rostov', kind: 'area', tabs: [
     {tab: 'Rostov suburban', file: 'maps/intercity/diagrams/russia-rostov-skppk.jpg', title: 'Схема движения пригородных поездов / Scheme of suburban trains (Rostov)', credit: 'АО «Северо-Кавказская ППК» (СКППК); current site; no licence stated', source: 'https://skppk.ru/passazhiram/chemy-obrascheniya-prigorodnyh-poezdov'}],
   box: [15464, 3323, 15913, 4248]},
  {slug: 'ru-mineralnye-vody', en: 'Mineralnye Vody', kind: 'area', tabs: [
     {tab: 'Mineralnye Vody suburban', file: 'maps/intercity/diagrams/russia-mineralnye-vody-skppk.jpg', title: 'Схема движения пригородных поездов / Scheme of suburban trains (Mineralnye Vody)', credit: 'АО «СКППК»; current site; no licence stated', source: 'https://skppk.ru/passazhiram/chemy-obrascheniya-prigorodnyh-poezdov'}],
   box: [15721, 3920, 16145, 4687]},
  {slug: 'ru-dagestan', en: 'Dagestan', kind: 'area', tabs: [
     {tab: 'Dagestan suburban', file: 'maps/intercity/diagrams/russia-dagestan-skppk.jpg', title: 'Схема движения пригородных поездов / Scheme of suburban trains (Dagestan)', credit: 'АО «СКППК»; 2025 edition (img0001-2025); no licence stated', source: 'https://skppk.ru/passazhiram/chemy-obrascheniya-prigorodnyh-poezdov'}],
   box: [15998, 4231, 16442, 4855]},
  {slug: 'ru-sverdlovsk', en: 'Sverdlovsk', kind: 'area', tabs: [
     {tab: 'Sverdlovsk suburban', file: 'maps/intercity/diagrams/russia-sverdlovsk-svrpk.jpg', title: 'Схема маршрутов курсирования пригородных поездов Свердловской пригородной компании на полигоне Свердловской железной дороги', credit: 'АО «Свердловская пригородная компания»; current site; CMYK JPEG; no licence stated', source: 'https://www.svrpk.ru/for-passengers/trains-and-routes/traffic-scheme/'}],
   box: [17072, 1787, 18759, 3145]},
  {slug: 'ru-chelyabinsk', en: 'Chelyabinsk', kind: 'area', tabs: [
     {tab: 'Chelyabinsk suburban', file: 'maps/intercity/diagrams/russia-chelyabinsk-svrpk.jpg', title: 'Схема маршрутов курсирования пригородных поездов Свердловской пригородной компании на полигоне Южно-Уральской железной дороги', credit: 'АО «Свердловская пригородная компания»; current site; no licence stated', source: 'https://www.svrpk.ru/for-passengers/trains-and-routes/traffic-scheme/'}],
   box: [16440, 2753, 17782, 3658]},
  {slug: 'ru-kazan', en: 'Kazan', kind: 'area', tabs: [
     {tab: 'Kazan suburban', file: 'maps/intercity/diagrams/russia-tatarstan-sodruzhestvo.jpg', title: 'Схема движения пригородных поездов на полигоне обслуживания ППК АО «Содружество»', credit: 'АО «Содружество» (Kazan); edition April 2026 (shema042026); no licence stated', source: 'https://sodruzhestvoppk.ru/passazhiram/shema-dvizheniya-poezdov'}],
   box: [16080, 2594, 16935, 3152]},
  {slug: 'ru-krasnoyarsk', en: 'Krasnoyarsk', kind: 'area', tabs: [
     {tab: 'Krasnoyarsk city train', file: 'maps/intercity/diagrams/russia-krasnoyarsk-city-train.jpg', title: 'Схема движения городской электрички', credit: 'АО «Краспригород»; fares from 01.10.2025; no licence stated', source: 'https://www.kraspg.ru/passenger/gorodskaya-elektrichka/skhema'}],
   box: [20155, 2709, 20315, 2869]},
  {slug: 'ru-ufa', en: 'Bashkortostan', kind: 'area', tabs: [
     {tab: 'Ufa suburban', file: 'maps/intercity/diagrams/russia-bashkortostan-bppc.jpg', title: 'Карта движения пригородных поездов — Республика Башкортостан', credit: 'АО «Башкортостанская ППК»; rendered by me from the operator\'s live interactive SVG map (Nov 2026); no licence stated', source: 'https://bppc.ru/map/'}],
   box: [16726, 2724, 17467, 3461]},
  {slug: 'ru-irkutsk', en: 'Irkutsk', kind: 'area', tabs: [
     {tab: 'Irkutsk suburban', file: 'maps/intercity/diagrams/russia-irkutsk-buryatia-baikal-ppk.jpg', title: 'План-схема полигона деятельности АО «Байкальская ППК» с границами участков по обслуживанию пассажиров', credit: 'АО «Байкальская пригородная пассажирская компания»; current site; no licence stated', source: 'https://irkppk.ru/passengers/schemes'}],
   box: [19811, 1460, 22589, 3793]},
  {slug: 'ru-perm', en: 'Perm', kind: 'area', tabs: [
     {tab: 'Perm suburban', file: 'maps/intercity/diagrams/russia-perm-ppk.jpg', title: 'Интерактивная карта — АО «Пермская пригородная компания» (схема от Пермь II)', credit: 'АО «Пермская пригородная компания»; current site SVG (rendered to PNG by me, fallback font); no licence stated', source: 'https://ppk59.ru/map/'}],
   box: [16639, 1854, 17386, 2828]},
  {slug: 'de-bayern', en: 'Bayern', kind: 'area', tabs: [
     {tab: 'Bayern', file: 'maps/intercity/diagrams/germany-bayern.jpg', title: 'Liniennetzplan Bayern – Regionalzüge und S-Bahnen', credit: 'Bayerische Eisenbahngesellschaft (2026)'}],
   box: [12920, 3627, 13402, 4079]},
  {slug: 'de-nrw', en: 'Nordrhein-Westfalen', kind: 'area', tabs: [
     {tab: 'NRW', file: 'maps/intercity/diagrams/germany-nrw.jpg', title: 'NRW-Regionalverkehrsplan 2026', credit: 'NRW transport authorities (Dec 2025)'}],
   box: [12672, 3349, 13022, 3678]},
  {slug: 'de-bw', en: 'Baden-Württemberg', kind: 'area', tabs: [
     {tab: 'Baden-Württemberg', file: 'maps/intercity/diagrams/germany-bw-bwegt.jpg', title: 'Liniennetzkarte Regionalverkehr (bwegt)', credit: 'Ministerium für Verkehr BW · design Rick Eichner (Jun 2025)'}],
   box: [12780, 3738, 13095, 4042]},
  {slug: 'de-niedersachsen', en: 'Niedersachsen', kind: 'area', tabs: [
     {tab: 'Niedersachsen', file: 'maps/intercity/diagrams/germany-niedersachsen.jpg', title: 'Liniennetzplan Nahverkehr Niedersachsen', credit: 'LNVG · design Baumgardt Consultants (Dec 2025)'}],
   box: [12765, 3155, 13196, 3544]},
  {slug: 'de-berlin-brandenburg', en: 'Berlin-Brandenburg', kind: 'area', tabs: [
     {tab: 'Berlin-Brandenburg', file: 'maps/intercity/diagrams/germany-berlin-brandenburg.jpg', title: 'Liniennetz des Regionalverkehrs Brandenburg und Berlin', credit: 'DB Regio Nordost / VBB (Dec 2025)'}],
   box: [13163, 3206, 13492, 3524]},
  {slug: 'de-sachsen', en: 'Sachsen', kind: 'area', tabs: [
     {tab: 'Sachsen', file: 'maps/intercity/diagrams/germany-sachsen.jpg', title: 'Liniennetzplan der Eisenbahnen in Sachsen (SPNV)', credit: 'VVO / ZVNL / ZVON / VMS / VVV (Dec 2025)'}],
   box: [13214, 3477, 13526, 3684]},
  {slug: 'de-sachsen-anhalt', en: 'Sachsen-Anhalt', kind: 'area', tabs: [
     {tab: 'Sachsen-Anhalt', file: 'maps/intercity/diagrams/germany-sachsen-anhalt.jpg', title: 'Sachsen-Anhalt. Verbunden. (mein-Takt)', credit: 'NASA / Land Sachsen-Anhalt (Dec 2025)'}],
   box: [13102, 3275, 13342, 3583]},
  {slug: 'de-thueringen', en: 'Thüringen', kind: 'area', tabs: [
     {tab: 'Thüringen', file: 'maps/intercity/diagrams/germany-thueringen.jpg', title: 'Liniennetzplan Thüringen', credit: 'Freistaat Thüringen (Dec 2025)'}],
   box: [13032, 3478, 13289, 3684]},
  {slug: 'de-schleswig-holstein', en: 'Schleswig-Holstein', kind: 'area', tabs: [
     {tab: 'Schleswig-Holstein', file: 'maps/intercity/diagrams/germany-schleswig-holstein.jpg', title: 'Bahnlinien in Schleswig-Holstein', credit: 'NAH.SH (Dec 2025)'}],
   box: [12935, 3002, 13158, 3236]},
  {slug: 'de-hessen', en: 'Hessen', kind: 'area', tabs: [
     {tab: 'Hessen', file: 'maps/intercity/diagrams/germany-hessen.jpg', title: 'Liniennetzplan Hessen • Transit Map', credit: 'NVV / RMV / VRN · design Baumgardt Consultants (Dec 2025)'}],
   box: [12807, 3476, 13078, 3794]},
  {slug: 'de-rheinland-pfalz', en: 'Rheinland-Pfalz', kind: 'area', tabs: [
     {tab: 'Rheinland-Pfalz', file: 'maps/intercity/diagrams/germany-rheinland-pfalz.jpg', title: 'Liniennetzplan Rheinland-Pfalz', credit: 'Land Rheinland-Pfalz / move RLP (Dec 2025)'}],
   box: [12672, 3587, 12918, 3854]},
  {slug: 'de-mecklenburg-vorpommern', en: 'Mecklenburg-Vorpommern', kind: 'area', tabs: [
     {tab: 'Mecklenburg-Vorp.', file: 'maps/intercity/diagrams/germany-mecklenburg-vorpommern.jpg', title: 'Liniennetz des Regionalverkehrs Mecklenburg-Vorpommern', credit: 'DB Regio Nordost / VMV (Dec 2025)'}],
   box: [13098, 3066, 13459, 3272]},
  {slug: 'de-hamburg', en: 'Hamburg', kind: 'area', tabs: [
     {tab: 'Hamburg', file: 'maps/intercity/diagrams/germany-hamburg-hvv.jpg', title: 'hvv Schnellbahn-/Regionalverkehr', credit: 'hvv (Dec 2025)'}],
   box: [12977, 3111, 13137, 3271]},
  {slug: 'at-ostregion', en: 'Ostregion', kind: 'area', tabs: [
     {tab: 'Ostregion VOR', file: 'maps/intercity/diagrams/austria-ostregion-vor.jpg', title: 'Nahverkehr Ostregion', credit: 'ÖBB-PV / VOR (Sep 2026)'}],
   box: [13437, 3830, 13700, 4142]},
  {slug: 'at-steiermark', en: 'Steiermark', kind: 'area', tabs: [
     {tab: 'Steiermark', file: 'maps/intercity/diagrams/austria-steiermark.jpg', title: 'S-Bahn / RegioBahn Steiermark', credit: 'ÖBB / GKB / StB'}],
   box: [13359, 3996, 13604, 4175]},
  {slug: 'at-tirol', en: 'Tirol', kind: 'area', tabs: [
     {tab: 'Tirol', file: 'maps/intercity/diagrams/austria-tirol.jpg', title: 'Liniennetzplan Nahverkehr Tirol', credit: 'Verkehrsverbund Tirol (Oct 2024)'}],
   box: [13052, 3990, 13289, 4150]},
  {slug: 'at-salzburg', en: 'Salzburg', kind: 'area', tabs: [
     {tab: 'Salzburg', file: 'maps/intercity/diagrams/austria-salzburg.jpg', title: 'Bahnnetz Land Salzburg und angrenzende Regionen', credit: 'Salzburger Verkehrsverbund / ÖBB (Nov 2025)'}],
   box: [13222, 3962, 13404, 4126]},
  {slug: 'at-oberoesterreich', en: 'Oberösterreich', kind: 'area', tabs: [
     {tab: 'S-Bahn OÖ', file: 'maps/intercity/diagrams/austria-oberoesterreich.jpg', title: 'Linien-Netz S-Bahn OÖ', credit: 'ÖBB'}],
   box: [13282, 3866, 13495, 4051]},
  {slug: 'at-kaernten', en: 'Kärnten', kind: 'area', tabs: [
     {tab: 'S-Bahn Kärnten', file: 'maps/intercity/diagrams/austria-kaernten.jpg', title: 'S-Bahn Kärnten', credit: 'ÖBB / Kärntner Linien'}],
   box: [13279, 4071, 13523, 4231]},
  {slug: 'at-vorarlberg', en: 'Vorarlberg', kind: 'area', tabs: [
     {tab: 'Vorarlberg', file: 'maps/intercity/diagrams/austria-vorarlberg.jpg', title: 'Bahnnetz Vorarlberg und angrenzende Regionen', credit: 'ÖBB'}],
   box: [12958, 3979, 13118, 4139]},
  {slug: 'ch-zuerich', en: 'Zürich S-Bahn', kind: 'area', tabs: [
     {tab: 'ZVV Zürich', file: 'maps/intercity/diagrams/switzerland-zvv.jpg', title: 'S-Bahnen, Busse und Schiffe', credit: 'Zürcher Verkehrsverbund (Dec 2025)'}],
   box: [12841, 3967, 13001, 4127]},
  {slug: 'ch-bern', en: 'S-Bahn Bern', kind: 'area', tabs: [
     {tab: 'S-Bahn Bern', file: 'maps/intercity/diagrams/switzerland-bern-sbahn.jpg', title: 'Liniennetz S-Bahn Bern', credit: 'BLS / RBS · design Julia Curty (Dec 2025)'}],
   box: [12739, 4040, 12899, 4200]},
  {slug: 'ch-basel', en: 'Basel trireno', kind: 'area', tabs: [
     {tab: 'Basel trireno', file: 'maps/intercity/diagrams/switzerland-basel-trireno.jpg', title: 'S-Bahn trinational', credit: 'trireno (Dec 2025)'}],
   box: [12747, 3955, 12907, 4115]},
  {slug: 'ch-leman-express', en: 'Léman Express', kind: 'area', tabs: [
     {tab: 'Léman Express', file: 'maps/intercity/diagrams/switzerland-leman-express.jpg', title: 'Plan de réseau Léman Express', credit: 'Lémanis SA (Dec 2025)'}],
   box: [12661, 4142, 12821, 4302]},
  {slug: 'ch-vaud', en: 'RER Vaud', kind: 'area', tabs: [
     {tab: 'RER Vaud', file: 'maps/intercity/diagrams/switzerland-rer-vaud.jpg', title: 'Réseau Express Régional Vaud', credit: 'CFF SA (Dec 2025)'}],
   box: [12676, 4088, 12836, 4248]},
  {slug: 'ch-ticino', en: 'TILO Ticino', kind: 'area', tabs: [
     {tab: 'TILO Ticino', file: 'maps/intercity/diagrams/switzerland-tilo.jpg', title: 'Piano dei servizi TILO', credit: 'TILO (2026)'}],
   box: [12861, 4109, 13021, 4269]},
  {slug: 'fr-hauts-de-france', en: 'Hauts-de-France', kind: 'area', tabs: [
     {tab: 'TER HdF', file: 'maps/intercity/diagrams/france-ter-hauts-de-france-2026.jpg', title: 'Mes lignes TER Hauts-de-France', credit: 'SNCF Voyageurs / Région Hauts-de-France, édition décembre 2025 (SA2026)', source: 'https://en.wikipedia.org/wiki/TER_Hauts-de-France (file: https://mmt.vsct.fr/sites/default/files/swt/CHDF/2025-12/Plan%20SA26.pdf)'}],
   box: [12274, 3584, 12536, 3869]},
  {slug: 'fr-centre', en: 'Centre-Val de Loire', kind: 'area', tabs: [
     {tab: 'Rémi', file: 'maps/intercity/diagrams/france-ter-centre-remi.jpg', title: 'Votre réseau de transport en région Centre-Val de Loire (réseau multimodal Rémi)', credit: 'Région Centre-Val de Loire / Rémi, 2022 map (file Oct 2023)', source: 'https://mmt.vsct.fr/sites/default/files/swt/CCVL/2023-10/80x120_CARTE-REGIONALE-2022_agrandi3_NewCharte2.pdf'}],
   box: [12194, 3848, 12486, 4186]},
  {slug: 'fr-occitanie', en: 'Occitanie', kind: 'area', tabs: [
     {tab: 'liO Occitanie', file: 'maps/intercity/diagrams/france-occitanie-lio-hg.jpg', title: 'Plan du réseau liO - page 1 = whole-region plan, page 2 = Haute-Garonne detail', credit: 'Région Occitanie / liO, édition septembre 2026 (trains + coaches)', source: 'https://www.lio-occitanie.fr/horaires-et-plans/ (file: storage.googleapis.com/is-wp-90-prod/uploads-prod/2026/08/290726liO_depliant_plans_reseau_departementalises_H-G_600x420mm.pdf)'}],
   box: [12151, 4329, 12626, 4697]},
  {slug: 'fr-nouvelle-aquitaine', en: 'Nouvelle-Aquitaine', kind: 'area', tabs: [
     {tab: 'TER N-Aquitaine', file: 'maps/intercity/diagrams/france-ter-nouvelle-aquitaine.jpg', title: 'Plan du réseau TER en Nouvelle-Aquitaine', credit: 'SNCF Voyageurs / Région Nouvelle-Aquitaine, décembre 2022', source: 'https://transports.nouvelle-aquitaine.fr/se-deplacer/horaires-et-plans'}],
   box: [12001, 4070, 12446, 4640]},
  {slug: 'fr-grand-est', en: 'Grand Est', kind: 'area', tabs: [
     {tab: 'TER Fluo', file: 'maps/intercity/diagrams/france-ter-grand-est.jpg', title: 'Le réseau TER Fluo', credit: 'SNCF Voyageurs - Communication TER Grand Est / Région Grand Est, septembre 2023', source: 'https://mmt.vsct.fr/sites/default/files/swt/CGRE/2023-09/Carte%20reseau%20Grand%20Est%20-%20septembre%202023%20%5BA3%5D%20-%20Copie.pdf'}],
   box: [12440, 3695, 12878, 4060]},
  {slug: 'fr-normandie', en: 'Normandie', kind: 'area', tabs: [
     {tab: 'Nomad Train', file: 'maps/intercity/diagrams/france-ter-normandie.jpg', title: 'Plan du réseau Nomad Train', credit: 'SNCF Voyageurs / Région Normandie, juillet 2024', source: 'https://sncf-ter-normandie.latitude-cartagene.com/assets/carte_region.pdf (linked from en.wikipedia TER Normandie)'}],
   box: [11997, 3700, 12357, 3953]},
  {slug: 'fr-bretagne', en: 'Bretagne', kind: 'area', tabs: [
     {tab: 'TER BreizhGo', file: 'maps/intercity/diagrams/france-ter-bretagne.jpg', title: 'BreizhGo - Le réseau de transport de la Région Bretagne', credit: 'Région Bretagne / BreizhGo, 2021', source: 'https://mmt.vsct.fr/sites/default/files/swt/CBRE/2021-09/carte-reseau-breizhgo.pdf (linked from en.wikipedia TER Bretagne)'}],
   box: [11733, 3860, 12100, 4073]},
  {slug: 'fr-pays-de-la-loire', en: 'Pays de la Loire', kind: 'area', tabs: [
     {tab: 'Aléop TER', file: 'maps/intercity/diagrams/france-ter-pays-de-la-loire.jpg', title: 'Carte des lignes régionales de transport des Pays de la Loire', credit: 'Région Pays de la Loire / Aléop / SNCF Voyageurs, juillet 2024', source: 'https://mmt.vsct.fr/sites/default/files/swt/CPDL/2024-09/Carte%20du%20r%C3%A9seau%20Septembre%202024_0.pdf'}],
   box: [11927, 3896, 12282, 4197]},
  {slug: 'fr-bourgogne-franche-comte', en: 'Bourgogne-Franche-Comté', kind: 'area', tabs: [
     {tab: 'TER Mobigo', file: 'maps/intercity/diagrams/france-ter-bfc.jpg', title: 'Réseau ferroviaire et routier TER Bourgogne-Franche-Comté', credit: 'SNCF / Région Bourgogne-Franche-Comté / Mobigo, 2021', source: 'https://mmt.vsct.fr/sites/default/files/swt/CBFC/2021-11/carte_reseau_ter_bourgogne_franche_comte.pdf'}],
   box: [12436, 3920, 12803, 4220]},
  {slug: 'fr-auvergne-rhone-alpes', en: 'Auvergne-Rhône-Alpes', kind: 'area', tabs: [
     {tab: 'TER AURA', file: 'maps/intercity/diagrams/france-ter-aura.jpg', title: 'Réseau TER et Cars Auvergne-Rhône-Alpes', credit: 'SNCF Études & Cartographie / Région AURA, 2018-2019 (old; no newer found)', source: 'https://mmt.vsct.fr/sites/default/files/swt/CARA/2021-11/Carte_reseau_TER_Auvergne-Rhone-Alpes_40x60_1.pdf'}],
   box: [12366, 4122, 12815, 4470]},
  {slug: 'fr-paca', en: 'Provence-Alpes-Côte d\'Azur', kind: 'area', tabs: [
     {tab: 'TER ZOU', file: 'maps/intercity/diagrams/france-ter-paca.jpg', title: 'Carte du réseau TER Sud (ZOU)', credit: 'SNCF / Région Sud, 2019-2020 (old; no newer found)', source: 'https://mmt.vsct.fr/sites/default/files/swt/CPAC/2021-10/carte-reseau-TER-2020_tcm65-18531_tcm65-248750.pdf'}],
   box: [12550, 4345, 12860, 4593]},
  // Belgium's S-trains (SNCB/NMBS, weekday service maps; each in its city's language)
  {slug: 'be-brussels', en: 'S-train Brussels', kind: 'area', tabs: [
     {tab: 'S Brussels', file: 'maps/intercity/diagrams/belgium-s-brussels.jpg', title: 'BRUSSEL - BRUXELLES · Weekdienst / Service de semaine', credit: 'SNCB/NMBS with STIB/MIVB (12/2025); no licence stated', source: 'https://www.belgiantrain.be/en/travel-info/train-offer/s-train'}],
   box: [12492, 3587, 12588, 3646]},
  {slug: 'be-antwerpen', en: 'S-train Antwerp', kind: 'area', tabs: [
     {tab: 'S Antwerpen', file: 'maps/intercity/diagrams/belgium-s-antwerpen.jpg', title: 'ANTWERPEN · Weekdienst', credit: 'SNCB/NMBS with De Lijn (12/2026); no licence stated', source: 'https://www.belgiantrain.be/en/travel-info/train-offer/s-train'}],
   box: [12510, 3536, 12603, 3595]},
  {slug: 'be-gent', en: 'S-train Ghent', kind: 'area', tabs: [
     {tab: 'S Gent', file: 'maps/intercity/diagrams/belgium-s-gent.jpg', title: 'GENT · Weekdienst', credit: 'SNCB/NMBS with De Lijn (12/2026); no licence stated', source: 'https://www.belgiantrain.be/en/travel-info/train-offer/s-train'}],
   box: [12438, 3564, 12526, 3616]},
  {slug: 'be-liege', en: 'S-train Liège', kind: 'area', tabs: [
     {tab: 'S Liège', file: 'maps/intercity/diagrams/belgium-s-liege.jpg', title: 'LIÈGE MÉTROPOLE · Service semaine', credit: 'SNCB/NMBS with TEC (12/2026); no licence stated', source: 'https://www.belgiantrain.be/en/travel-info/train-offer/s-train'}],
   box: [12613, 3614, 12700, 3669]},
  {slug: 'be-charleroi', en: 'S-train Charleroi', kind: 'area', tabs: [
     {tab: 'S Charleroi', file: 'maps/intercity/diagrams/belgium-s-charleroi.jpg', title: 'CHARLEROI MÉTROPOLE · Service de semaine', credit: 'SNCB/NMBS with TEC (12/2026); no licence stated', source: 'https://www.belgiantrain.be/en/travel-info/train-offer/s-train'}],
   box: [12511, 3644, 12584, 3696]},
  {slug: 'gr-athens', en: 'Athens suburban', kind: 'area', tabs: [
     {tab: 'Proastiakos', file: 'maps/intercity/diagrams/greece-athens-suburban.jpg', title: 'Athens Suburban & Regional Rail Network / Προαστιακές & Περιφερειακές Γραμμές Αθήνας', credit: 'Hellenic Train (Jul 2026); no licence stated', source: 'https://www.hellenictrain.gr/en/athens-suburban-railway/'}],
   box: [14163, 5126, 14273, 5197]},
  {slug: 'es-madrid', en: 'Cercanías Madrid', kind: 'area', tabs: [
     {tab: 'Cercanías Madrid', file: 'maps/intercity/diagrams/spain-cercanias-madrid.jpg', title: 'Cercanías Madrid', credit: 'Renfe, enero 2025', source: 'https://www.renfe.com/es/es/cercanias/cercanias-madrid/mapas'}],
   box: [11765, 4818, 11925, 4978]},
  {slug: 'es-rodalies', en: 'Rodalies', kind: 'area', tabs: [
     {tab: 'Rodalies', file: 'maps/intercity/diagrams/spain-rodalies-catalunya.jpg', title: 'Rodalies de Catalunya - Servei de rodalia de Barcelona', credit: 'Renfe / Generalitat de Catalunya, June 2025', source: 'https://www.renfe.com/es/es/cercanias/rodalies-catalunya/mapas'}],
   box: [12187, 4612, 12465, 4911]},
  {slug: 'es-valencia', en: 'Cercanías Valencia', kind: 'area', tabs: [
     {tab: 'Cercanías Valencia', file: 'maps/intercity/diagrams/spain-cercanias-valencia.jpg', title: 'Cercanías Valencia', credit: 'Renfe, junio 2025', source: 'https://www.renfe.com/es/es/cercanias/cercanias-valencia/mapas'}],
   box: [12032, 4956, 12192, 5116]},
  {slug: 'es-bilbao', en: 'Cercanías Bilbao', kind: 'area', tabs: [
     {tab: 'Cercanías Bilbao', file: 'maps/intercity/diagrams/spain-cercanias-bilbao.jpg', title: 'Cercanías Bilbao', credit: 'Renfe, mayo 2026', source: 'https://www.renfe.com/es/es/cercanias/cercanias-bilbao/mapas'}],
   box: [11829, 4496, 11989, 4656]},
  {slug: 'es-asturias', en: 'Cercanías Asturias', kind: 'area', tabs: [
     {tab: 'Cercanías Asturias', file: 'maps/intercity/diagrams/spain-cercanias-asturias.jpg', title: 'Cercanías Asturias', credit: 'Renfe, enero 2026', source: 'https://www.renfe.com/es/es/cercanias/cercanias-asturias/mapas'}],
   box: [11558, 4502, 11784, 4662]},
  {slug: 'es-sevilla', en: 'Cercanías Sevilla', kind: 'area', tabs: [
     {tab: 'Cercanías Sevilla', file: 'maps/intercity/diagrams/spain-cercanias-sevilla.jpg', title: 'Cercanías Sevilla', credit: 'Renfe, abril 2025', source: 'https://www.renfe.com/es/es/cercanias/cercanias-sevilla/mapas'}],
   box: [11579, 5163, 11739, 5323]},
  {slug: 'es-malaga', en: 'Cercanías Málaga', kind: 'area', tabs: [
     {tab: 'Cercanías Málaga', file: 'maps/intercity/diagrams/spain-cercanias-malaga.jpg', title: 'Cercanías Málaga', credit: 'Renfe, abril 2025', source: 'https://www.renfe.com/es/es/cercanias/cercanias-malaga/mapas'}],
   box: [11693, 5245, 11853, 5405]},
  {slug: 'es-cadiz', en: 'Cercanías Cádiz', kind: 'area', tabs: [
     {tab: 'Cercanías Cádiz', file: 'maps/intercity/diagrams/spain-cercanias-cadiz.jpg', title: 'Cercanías Cádiz', credit: 'Renfe, abril 2025', source: 'https://www.renfe.com/es/es/cercanias/cercanias-cadiz/mapas'}],
   box: [11567, 5239, 11727, 5399]},
  {slug: 'es-cantabria', en: 'Cercanías Cantabria', kind: 'area', tabs: [
     {tab: 'Cercanías Cantabria', file: 'maps/intercity/diagrams/spain-cercanias-cantabria.jpg', title: 'Cercanías Cantabria', credit: 'Renfe, julio 2025', source: 'https://www.renfe.com/es/es/cercanias/cercanias-cantabria/mapas'}],
   box: [11743, 4514, 11903, 4674]},
  {slug: 'es-san-sebastian', en: 'Cercanías San Sebastián', kind: 'area', tabs: [
     {tab: 'Cercanías S.Sebastián', file: 'maps/intercity/diagrams/spain-cercanias-san-sebastian.jpg', title: 'Cercanías San Sebastián', credit: 'Renfe, abril 2025', source: 'https://www.renfe.com/es/es/cercanias/cercanias-san-sebastian/mapas'}],
   box: [11921, 4506, 12081, 4666]},
  {slug: 'es-murcia', en: 'Cercanías Murcia/Alicante', kind: 'area', tabs: [
     {tab: 'Cercanías Murcia', file: 'maps/intercity/diagrams/spain-cercanias-murcia-alicante.jpg', title: 'Cercanías Murcia/Alicante', credit: 'Renfe, agosto 2025', source: 'https://www.renfe.com/es/es/cercanias/cercanias-murcia-alicante/mapas'}],
   box: [12007, 5107, 12167, 5267]},
  {slug: 'es-zaragoza', en: 'Cercanías Zaragoza', kind: 'area', tabs: [
     {tab: 'Cercanías Zaragoza', file: 'maps/intercity/diagrams/spain-cercanias-zaragoza.jpg', title: 'Cercanías Zaragoza', credit: 'Renfe, agosto 2025', source: 'https://www.renfe.com/es/es/cercanias/cercanias-zaragoza/mapas'}],
   box: [12028, 4708, 12188, 4868]},
  {slug: 'pl-mazowieckie', en: 'Koleje Mazowieckie', kind: 'area', tabs: [
     {tab: 'Koleje Mazowieckie', file: 'maps/intercity/diagrams/poland-koleje-mazowieckie.jpg', title: 'Schemat linii kolejowych obsługiwanych przez Koleje Mazowieckie', credit: 'Koleje Mazowieckie (Aug 2026)'}],
   box: [13830, 3197, 14239, 3552]},
  {slug: 'pl-slaskie', en: 'Koleje Śląskie', kind: 'area', tabs: [
     {tab: 'Koleje Śląskie', file: 'maps/intercity/diagrams/poland-koleje-slaskie.jpg', title: 'Schemat linii komunikacyjnych ważny od 30 VIII 2026', credit: 'Koleje Śląskie (Aug 2026)'}],
   box: [13754, 3534, 13968, 3775]},
  {slug: 'pl-dolny-slask', en: 'Dolny Śląsk', kind: 'area', tabs: [
     {tab: 'Dolny Śląsk', file: 'maps/intercity/diagrams/poland-dolny-slask.jpg', title: 'Schemat sieci kolejowej – Dolny Śląsk', credit: 'UMWD / Koleje Dolnośląskie (2025/2026 v3.1)'}],
   box: [13475, 3443, 13763, 3692]},
  {slug: 'cz-prague', en: 'PID Praha', kind: 'area', tabs: [
     {tab: 'PID Praha', file: 'maps/intercity/diagrams/czechia-pid-trains.jpg', title: 'Vlakové linky / Train lines', credit: 'PID Pražská integrovaná doprava (Aug 2026)'}],
   box: [13370, 3609, 13544, 3769]},
  {slug: 'cz-ostrava', en: 'ODIS Ostrava', kind: 'area', tabs: [
     {tab: 'ODIS Ostrava', file: 'maps/intercity/diagrams/czechia-odis.jpg', title: 'Schéma železničních linek Esko IDS Moravskoslezského kraje', credit: 'KODIS / ODIS (Jun 2026)'}],
   box: [13699, 3638, 13874, 3798]},
  {slug: 'hu-budapest', en: 'Budapest suburban', kind: 'area', tabs: [
     {tab: 'Budapest suburban', file: 'maps/intercity/diagrams/hungary-budapest-suburban.jpg', title: 'Budapest és környékének vasúti hálózata', credit: 'MÁV-csoport (Oct 2026)'}],
   box: [13744, 3962, 13904, 4122]},
  {slug: 'sk-bratislava', en: 'Bratislava IDS BK', kind: 'area', tabs: [
     {tab: 'Bratislava IDS BK', file: 'maps/intercity/diagrams/slovakia-bratislava-idsbk.jpg', title: 'Vlakové linky – Schéma vlakových liniek IDS BK', credit: 'IDS BK (Mar 2026)'}],
   box: [13623, 3849, 13783, 4009]},
  {slug: 'it-lombardia', en: 'Lombardia', kind: 'area', tabs: [
     {tab: 'Trenord regional', file: 'maps/intercity/diagrams/italy-trenord-regionale-2025.jpg', title: 'Servizio ferroviario regionale | Regional rail network', credit: 'Regione Lombardia / Trenord, 12/2025', source: 'https://www.trenord.it/linee-e-orari/il-nostro-servizio/linee-regionali/'}],
   box: [12915, 4130, 13210, 4392]},
  {slug: 'it-milano', en: 'Milan S-lines', kind: 'area', tabs: [
     {tab: 'Milan suburban', file: 'maps/intercity/diagrams/italy-trenord-suburbana-2025.jpg', title: 'Servizio ferroviario suburbano (Linee S)', credit: 'Regione Lombardia / Trenord, 12/2025', source: 'https://www.trenord.it/linee-e-orari/il-nostro-servizio/linee-suburbane-e-urbane/'}],
   box: [12894, 4190, 13054, 4350]},
  {slug: 'it-torino', en: 'SFM Torino', kind: 'area', tabs: [
     {tab: 'SFM Torino', file: 'maps/intercity/diagrams/italy-piemonte-sfm-torino-2026.jpg', title: 'sfm servizio ferroviario metropolitano - Linee / Network', credit: 'Regione Piemonte / AMP / Trenitalia, edizione settembre 2026', source: 'https://www.trenitalia.com/it/regionale/piemonte/sfm-torino-trenitalia.html (file: https://www.trenitalia.com/content/dam/trenitalia/allegati/info/trasporto-regionale/2026_SETTEMBRE_SFM_MAPPA_01.pdf)'}],
   box: [12774, 4277, 12934, 4437]},
  // Italy's regions (Trenitalia's Carta dei Servizi 2026 index where nothing larger is published) and lakes (17 Nov 2026)
  {slug: 'it-lazio', en: "Lazio FL lines", kind: 'area', tabs: [
     {tab: "FL Lazio", file: "maps/intercity/diagrams/italy-lazio-fl.jpg", title: "Ferrovie regionali del Lazio", credit: "Trenitalia (May 2023); no licence stated", source: "https://www.trenitalia.com/"}],
   box: [13195, 4612, 13413, 4808]},
  {slug: 'it-suedtirol', en: "South Tyrol", kind: 'area', tabs: [
     {tab: "Südtirol rail", file: "maps/intercity/diagrams/italy-suedtirol-rail.jpg", title: "Zugnetz Südtirol / Rete ferroviaria Alto Adige", credit: "südtirolmobil (2021, still current link); no licence stated", source: "https://www.suedtirolmobil.info/"}],
   box: [13087, 4073, 13290, 4227]},
  {slug: 'it-emilia-romagna', en: "Emilia-Romagna", kind: 'area', tabs: [
     {tab: "Emilia-Romagna", file: "maps/intercity/diagrams/italy-emilia-romagna-tper.jpg", title: "Trenitalia Tper · rete regionale", credit: "Trenitalia Tper (2019; the 2025 edition is published only 700 px); no licence stated", source: "https://www.trenitalia-tper.it/"}],
   box: [12982, 4307, 13341, 4509]},
  {slug: 'it-toscana', en: "Toscana", kind: 'area', tabs: [
     {tab: "Toscana", file: "maps/intercity/diagrams/italy-toscana-carta2026.jpg", title: "Indice grafico delle linee · Toscana", credit: "Trenitalia, Carta dei Servizi 2026 (index of lines; published small); no licence stated", source: "https://www.trenitalia.com/"},
     {tab: "On-board map", file: "maps/intercity/diagrams/italy-toscana-onboard-2026.jpg", title: "Trenitalia Toscana network map (photo on board)", credit: "Photo on a Trenitalia train / Wikimedia Commons · CC BY-SA 4.0 (Sep 2026)", source: "https://commons.wikimedia.org/"}],
   box: [13022, 4392, 13289, 4650]},
  {slug: 'it-napoli', en: "Circumvesuviana", kind: 'area', tabs: [
     {tab: "Circumvesuviana", file: "maps/intercity/diagrams/italy-circumvesuviana.jpg", title: "EAV Circumvesuviana network", credit: "Unofficial / Wikimedia Commons · CC0 (Feb 2025)", source: "https://commons.wikimedia.org/"}],
   box: [13409, 4839, 13468, 4905]},
  {slug: 'it-calabria', en: "Calabria", kind: 'area', tabs: [
     {tab: "Calabria", file: "maps/intercity/diagrams/italy-calabria-network.jpg", title: "Rete ferroviaria della Calabria (RFI + Ferrovie della Calabria)", credit: "Wikimedia Commons · CC BY-SA 4.0 (Sep 2026; geographic)", source: "https://commons.wikimedia.org/"},
     {tab: "Trenitalia lines", file: "maps/intercity/diagrams/italy-calabria-carta2026.jpg", title: "Indice grafico delle linee · Calabria", credit: "Trenitalia, Carta dei Servizi 2026 (index of lines; published small); no licence stated", source: "https://www.trenitalia.com/"}],
   box: [13503, 4950, 13659, 5200]},
  {slug: 'it-abruzzo', en: "Abruzzo", kind: 'area', tabs: [
     {tab: "Abruzzo", file: "maps/intercity/diagrams/italy-abruzzo-carta2026.jpg", title: "Indice grafico delle linee · Abruzzo", credit: "Trenitalia, Carta dei Servizi 2026 (index of lines; published small); no licence stated", source: "https://www.trenitalia.com/"}],
   box: [13330, 4588, 13494, 4752]},
  {slug: 'it-basilicata', en: "Basilicata", kind: 'area', tabs: [
     {tab: "Basilicata", file: "maps/intercity/diagrams/italy-basilicata-carta2026.jpg", title: "Indice grafico delle linee · Basilicata", credit: "Trenitalia, Carta dei Servizi 2026 (index of lines; published small); no licence stated", source: "https://www.trenitalia.com/"}],
   box: [13496, 4827, 13644, 4989]},
  {slug: 'it-liguria', en: "Liguria", kind: 'area', tabs: [
     {tab: "Liguria", file: "maps/intercity/diagrams/italy-liguria-carta2026.jpg", title: "Indice grafico delle linee · Liguria", credit: "Trenitalia, Carta dei Servizi 2026 (index of lines; published small); no licence stated", source: "https://www.trenitalia.com/"}],
   box: [12838, 4367, 13070, 4509]},
  {slug: 'it-molise', en: "Molise", kind: 'area', tabs: [
     {tab: "Molise", file: "maps/intercity/diagrams/italy-molise-carta2026.jpg", title: "Indice grafico delle linee · Molise", credit: "Trenitalia, Carta dei Servizi 2026 (index of lines; published small); no licence stated", source: "https://www.trenitalia.com/"}],
   box: [13401, 4687, 13517, 4804]},
  {slug: 'it-puglia', en: "Puglia", kind: 'area', tabs: [
     {tab: "Puglia", file: "maps/intercity/diagrams/italy-puglia-carta2026.jpg", title: "Indice grafico delle linee · Puglia", credit: "Trenitalia, Carta dei Servizi 2026 (index of lines; published small); no licence stated", source: "https://www.trenitalia.com/"}],
   box: [13463, 4707, 13793, 5006]},
  {slug: 'it-sardegna', en: "Sardegna", kind: 'area', tabs: [
     {tab: "Sardegna", file: "maps/intercity/diagrams/italy-sardegna-carta2026.jpg", title: "Indice grafico delle linee · Sardegna", credit: "Trenitalia, Carta dei Servizi 2026 (index of lines; published small); no licence stated", source: "https://www.trenitalia.com/"}],
   box: [12898, 4763, 13066, 5054]},
  {slug: 'it-sicilia', en: "Sicilia", kind: 'area', tabs: [
     {tab: "Sicilia", file: "maps/intercity/diagrams/italy-sicilia-carta2026.jpg", title: "Indice grafico delle linee · Sicilia", credit: "Trenitalia, Carta dei Servizi 2026 (index of lines; published small); no licence stated", source: "https://www.trenitalia.com/"}],
   box: [13257, 5138, 13517, 5339]},
  {slug: 'it-trentino', en: "Trentino", kind: 'area', tabs: [
     {tab: "Trentino", file: "maps/intercity/diagrams/italy-trentino-carta2026.jpg", title: "Indice grafico delle linee · Trentino", credit: "Trenitalia, Carta dei Servizi 2026 (index of lines; published small); no licence stated", source: "https://www.trenitalia.com/"}],
   box: [13097, 4140, 13259, 4295]},
  {slug: 'it-umbria', en: "Umbria", kind: 'area', tabs: [
     {tab: "Umbria", file: "maps/intercity/diagrams/italy-umbria-carta2026.jpg", title: "Indice grafico delle linee · Umbria", credit: "Trenitalia, Carta dei Servizi 2026 (index of lines; published small); no licence stated", source: "https://www.trenitalia.com/"}],
   box: [13218, 4500, 13364, 4650]},
  {slug: 'it-veneto', en: "Veneto", kind: 'area', tabs: [
     {tab: "Veneto", file: "maps/intercity/diagrams/italy-veneto-carta2026.jpg", title: "Indice grafico delle linee · Veneto", credit: "Trenitalia, Carta dei Servizi 2026 (index of lines; published small); no licence stated", source: "https://www.trenitalia.com/"}],
   box: [13109, 4123, 13368, 4414]},
  {slug: 'ferry-como', en: "Lake Como", kind: 'ferry', tabs: [
     {tab: "Lake Como", file: "maps/intercity/diagrams/ferry-italy-como.jpg", title: "Lake Como · rete di navigazione", credit: "Navigazione Laghi (route map from its site, Nov 2026; drawn from the web page's SVG); no licence stated", source: "https://www.navigazionelaghi.it/"}],
   box: [12966, 4181, 13004, 4239]},
  {slug: 'ferry-garda', en: "Lake Garda", kind: 'ferry', tabs: [
     {tab: "Lake Garda", file: "maps/intercity/diagrams/ferry-italy-garda.jpg", title: "Lake Garda · rete di navigazione", credit: "Navigazione Laghi (route map from its site, Nov 2026; drawn from the web page's SVG); no licence stated", source: "https://www.navigazionelaghi.it/"}],
   box: [13110, 4216, 13157, 4282]},
  {slug: 'ferry-maggiore', en: "Lake Maggiore", kind: 'ferry', tabs: [
     {tab: "Lake Maggiore", file: "maps/intercity/diagrams/ferry-italy-maggiore.jpg", title: "Lake Maggiore · rete di navigazione", credit: "Navigazione Laghi (route map from its site, Nov 2026; drawn from the web page's SVG); no licence stated", source: "https://www.navigazionelaghi.it/"}],
   box: [12912, 4188, 12952, 4257]},
  {slug: 'ferry-orta', en: "Lake Orta", kind: 'ferry', tabs: [
     {tab: "Lake Orta", file: "maps/intercity/diagrams/ferry-italy-orta.jpg", title: "Lago d'Orta · navigazione", credit: "Navigazione Lago d'Orta (timetable from 1 Apr 2025); no licence stated", source: "https://www.navigazionelagodorta.it/"}],
   box: [12903, 4232, 12912, 4253]},
  {slug: 'ferry-iseo', en: "Lake Iseo", kind: 'ferry', tabs: [
     {tab: "Lake Iseo", file: "maps/intercity/diagrams/ferry-italy-iseo.jpg", title: "Lago d'Iseo · approdi e zone tariffarie (piers and fare zones)", credit: "Navigazione Lago d'Iseo (winter 2026/27 timetable, p. 7); no licence stated", source: "https://www.navigazionelagoiseo.it/"}],
   box: [13054, 4213, 13081, 4249]},
  {slug: 'pt-lisboa', en: 'Lisbon suburban', kind: 'area', tabs: [
     {tab: 'Lisbon suburban', file: 'maps/intercity/diagrams/portugal-lisboa-cp-metro.jpg', title: 'Comboios Urbanos de Lisboa - ligação CP / Metro', credit: 'CP - Comboios de Portugal, current edition', source: 'https://www.cp.pt/info/urbanos'},
     {tab: 'Lisbon zones', file: 'maps/intercity/diagrams/portugal-lisboa-urbanos.jpg', title: 'Mapa de Zonas e Municípios / Map of Routes, Zones and Municipalities', credit: 'CP - Comboios de Portugal, current edition (includes Mafra/Jerumelo regional branch)', source: 'https://www.cp.pt/info/urbanos'}],
   box: [11346, 5000, 11506, 5160]},
  {slug: 'pt-porto', en: 'Porto suburban', kind: 'area', tabs: [
     {tab: 'Porto suburban', file: 'maps/intercity/diagrams/portugal-porto-urbanos.jpg', title: 'Comboios Urbanos do Porto', credit: 'CP - Comboios de Portugal, current edition', source: 'https://www.cp.pt/info/pt/porto'}],
   box: [11348, 4736, 11508, 4896]},
  {slug: 'gb-scotland', en: 'ScotRail', kind: 'area', tabs: [
     {tab: 'ScotRail', file: 'maps/intercity/diagrams/uk-scotrail-national-2026.jpg', title: 'ScotRail national route map', credit: 'ScotRail, September 2026', source: 'https://www.scotrail.co.uk/plan-your-journey/our-routes'},
     {tab: 'ScotRail Central', file: 'maps/intercity/diagrams/uk-scotrail-central-2026.jpg', title: 'ScotRail Central Belt route map', credit: 'ScotRail, September 2026', source: 'https://www.scotrail.co.uk/plan-your-journey/our-routes'}],
   box: [11519, 2387, 12133, 3081]},
  {slug: 'gb-wales', en: 'Transport for Wales', kind: 'area', tabs: [
     {tab: 'TfW Rail', file: 'maps/intercity/diagrams/uk-tfw-network-2026.jpg', title: 'Transport for Wales rail & bus network map', credit: 'Transport for Wales, May 2026', source: 'https://tfw.wales/our-network/map'}],
   box: [11705, 3215, 11973, 3517]},
  {slug: 'gb-northern', en: 'Northern', kind: 'area', tabs: [
     {tab: 'Northern', file: 'maps/intercity/diagrams/uk-northern-network-2025.jpg', title: 'Northern Network Map 2025', credit: 'Northern Trains, designed by Transport Designed, 2025', source: 'https://www.projectmapping.co.uk/Reviews/northern_trains_maps.html (copy of northernrailway.co.uk file, which is behind a bot check)'}],
   box: [11878, 3005, 12194, 3304]},
  {slug: 'us-chicago', en: 'Metra', kind: 'area', tabs: [
     {tab: 'Metra', file: 'maps/intercity/diagrams/usa-metra-fare-zones-2025.jpg', title: 'Metra Fare Zones', credit: 'Metra, February 2025', source: 'https://metra.com/document/fare-zone-mappdf'}],
   box: [4356, 4674, 4516, 4844]},
  {slug: 'us-new-jersey', en: 'NJ Transit', kind: 'area', tabs: [
     {tab: 'NJ Transit', file: 'maps/intercity/diagrams/usa-njtransit-rail-2026.jpg', title: 'Rail System Map', credit: 'NJ Transit, May 2026, © 2026 NJ Transit Corporation', source: 'https://www.njtransit.com/accessibility/System-Map'}],
   box: [5557, 4776, 5717, 5067]},
  {slug: 'us-boston', en: 'MBTA Commuter Rail', kind: 'area', tabs: [
     {tab: 'MBTA Commuter Rail', file: 'maps/intercity/diagrams/usa-mbta-commuter-rail-2025.jpg', title: 'Commuter Rail Map', credit: 'MBTA, v.42f, 24 March 2025', source: 'https://www.mbta.com/maps'}],
   box: [5856, 4557, 6016, 4717]},
  {slug: 'us-philadelphia', en: 'SEPTA', kind: 'area', tabs: [
     {tab: 'SEPTA Regional Rail', file: 'maps/intercity/diagrams/usa-septa-regional-rail-v1-1.jpg', title: 'Regional Rail (concept Regional Rail map)', credit: 'SEPTA, v1.1 (2026)', source: 'https://wwww.septa.org/maps/'},
     {tab: 'SEPTA Rail Transit', file: 'maps/intercity/diagrams/usa-septa-regional-rail-2026.jpg', title: 'Regional Rail & Rail Transit', credit: 'SEPTA, file dated Sept 2026 (map © 2024)', source: 'https://wwww.septa.org/maps/'}],
   box: [5487, 4882, 5647, 5042]},
  {slug: 'in-kolkata', en: 'Kolkata suburban', kind: 'area', tabs: [
     {tab: 'Kolkata suburban', file: 'maps/intercity/diagrams/india-kolkata-suburban.jpg', title: 'Map of Kolkata Suburban Railway', credit: 'Dilip kabiraj (Wikimedia), 28 Nov 2025, CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Kolkata_Suburban_Railway.png'}],
   box: [19868, 6702, 20028, 6862]},
  {slug: 'cu-havana', en: 'Havana suburban', kind: 'area', tabs: [
     {tab: 'Havana suburban', file: 'maps/intercity/diagrams/cuba-havana-suburban.jpg', title: 'Esquema ferrocarril Habana (suburban rail)', credit: 'Alabrada (Wikimedia), 2012, CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Esquema_ferrocarril_habana.png'}],
   box: [4863, 6653, 5023, 6813]},
  {slug: 'jp-hokkaido', en: 'JR Hokkaido', kind: 'area', tabs: [
     {tab: 'JR Hokkaido', file: 'maps/intercity/diagrams/japan-jr-hokkaido.jpg', title: 'JR Hokkaido Route Map / JR北海道鉄道路線図', credit: 'JR Hokkaido (1 Apr 2026)'}],
   box: [24436, 4298, 24966, 4811]},
  {slug: 'jp-tokai', en: 'JR Central', kind: 'area', tabs: [
     {tab: 'JR Central', file: 'maps/intercity/diagrams/japan-jr-central.jpg', title: '鉄道路線図 Railway Map', credit: 'JR東海 JR Central (Oct 2025)'},
     {tab: 'Meitetsu', file: 'maps/intercity/diagrams/japan-meitetsu.jpg', title: '名鉄線 路線案内図 Meitetsu Line Network', credit: '名古屋鉄道 Meitetsu (16 Mar 2024)'}],
   box: [24120, 5344, 24432, 5651]},
  {slug: 'jp-kinki', en: 'Kinki', kind: 'area', tabs: [
     {tab: 'JR West Kinki', file: 'maps/intercity/diagrams/japan-jr-west-kinki.jpg', title: 'JR線 近畿エリア路線図 JR Line Route Map', credit: 'JR西日本 JR West (14 Mar 2026)'},
     {tab: 'Kansai railways', file: 'maps/intercity/diagrams/japan-kansai-railways.jpg', title: 'Full Kansai Route Map', credit: 'Network for Kansai Inbound Tourism (Mar 2024)'}],
   box: [23969, 5419, 24187, 5680]},
  {slug: 'jp-okayama', en: 'Okayama', kind: 'area', tabs: [
     {tab: 'JR West Okayama', file: 'maps/intercity/diagrams/japan-jr-west-okayama.jpg', title: 'LINE INFORMATION 路線案内図', credit: 'JR西日本 JR West (14 Mar 2026)'}],
   box: [23859, 5449, 24019, 5609]},
  {slug: 'jp-hiroshima', en: 'Hiroshima', kind: 'area', tabs: [
     {tab: 'JR West Hiroshima', file: 'maps/intercity/diagrams/japan-jr-west-hiroshima.jpg', title: '広島シティネットワークエリア 路線図', credit: 'JR西日本 JR West'}],
   box: [23657, 5499, 23909, 5659]},
  {slug: 'jp-sanin', en: 'San\'in', kind: 'area', tabs: [
     {tab: 'JR West San\'in', file: 'maps/intercity/diagrams/japan-jr-west-sanin.jpg', title: 'JR山陰エリア(鳥取・島根)路線図', credit: 'JR西日本 JR West'}],
   box: [23725, 5439, 24008, 5602]},
  {slug: 'jp-jr-west-north', en: 'JR West Kinki & Hokuriku', kind: 'area', tabs: [
     {tab: 'JR West north', file: 'maps/intercity/diagrams/japan-jr-west-network-kinki-hokuriku.jpg', title: 'JR西日本路線図 (近畿・北陸エリア)', credit: 'JR西日本 JR West (Nov 2026)'}],
   box: [23946, 5242, 24307, 5603]},
  {slug: 'jp-jr-west-west', en: 'JR West Chugoku & Shikoku', kind: 'area', tabs: [
     {tab: 'JR West west', file: 'maps/intercity/diagrams/japan-jr-west-network-chugoku-shikoku.jpg', title: 'JR西日本路線図 (中国・四国エリア)', credit: 'JR西日本 JR West (Nov 2026)'}],
   box: [23641, 5439, 24008, 5658]},
  {slug: 'jp-shikoku', en: 'JR Shikoku', kind: 'area', tabs: [
     {tab: 'JR Shikoku', file: 'maps/intercity/diagrams/japan-jr-shikoku.jpg', title: 'JR四国 路線図 Shikoku Railway Route Map', credit: 'JR四国 JR Shikoku (1 May 2025)'}],
   box: [23765, 5576, 24026, 5757]},
  {slug: 'jp-kyushu', en: 'JR Kyushu', kind: 'area', tabs: [
     {tab: 'JR Kyushu', file: 'maps/intercity/diagrams/japan-jr-kyushu.jpg', title: 'JR九州 路線図 Route Map', credit: 'JR九州 JR Kyushu (Jan 2026)'}],
   box: [23550, 5621, 23797, 5928]},
  {slug: 'jp-tokyo', en: 'Tokyo area', kind: 'area', tabs: [
     {tab: 'Suica/PASMO network', file: 'maps/intercity/diagrams/japan-tokyo-suica-pasmo-en.jpg', title: 'Suica/PASMO Network Map (every operator, English)', credit: 'JR東日本 East Japan Railway (1 Apr 2026); no licence stated', source: 'https://www.jreast.co.jp/multi/downloads'},
     {tab: 'Tokyo area', file: 'maps/intercity/diagrams/japan-kanto-railways.jpg', title: '東京の鉄道の路線図', credit: 'Naoki Hashimoto / Wikimedia Commons · CC0 (Aug 2024)'}],
   box: [24383, 5355, 24543, 5515]},
  // JR East's own route maps (www.jreast.co.jp/map/, saved by the owner 17 Nov 2026;
  // the timetable site's 2023 Kanto / Tohoku copies were superseded and removed).
  // English first where JR East has one.
  // Boxes from each map's lon/lat extent through the metro boxes' warp (build_abstract.warp_fn)
  {slug: 'jp-jr-east-kanto', en: 'JR East Kanto', kind: 'area', tabs: [
     {tab: 'Network (English)', file: 'maps/intercity/diagrams/japan-jr-east-network-en.jpg', title: 'JR EAST GROUP Railway Lines Network', credit: 'JR東日本 East Japan Railway (14 Mar 2026); no reproduction for publication without permission', source: 'https://www.jreast.co.jp/e/info/map_a4ol.pdf'},
     {tab: 'Kanto–Koshinetsu', file: 'maps/intercity/diagrams/japan-jr-east-kanto-koshinetsu.jpg', title: 'JR東日本路線図 (MAP1 関東・甲信越)', credit: 'JR東日本 East Japan Railway (Oct 2026); no licence stated', source: 'https://www.jreast.co.jp/map/'}],
   box: [24338, 5288, 24584, 5521]},
  {slug: 'jp-jr-east-tohoku', en: 'JR East Tohoku', kind: 'area', tabs: [
     {tab: 'Tohoku', file: 'maps/intercity/diagrams/japan-jr-east-tohoku-2026.jpg', title: 'JR東日本路線図 (MAP2 東北)', credit: 'JR東日本 East Japan Railway (Oct 2026); no licence stated', source: 'https://www.jreast.co.jp/map/'},
     {tab: 'South Tohoku', file: 'maps/intercity/diagrams/japan-jr-east-south-tohoku.jpg', title: 'JR東日本 南東北路線図 South-Tohoku Route Map', credit: 'JR東日本 East Japan Railway (1 Feb 2023); no licence stated', source: 'https://www.jreast.co.jp/map/'}],
   box: [24405, 4778, 24683, 5294]},
  {slug: 'jp-jr-east-shinetsu', en: 'JR East Niigata & Nagano', kind: 'area', tabs: [
     {tab: 'Shin\'etsu', file: 'maps/intercity/diagrams/japan-jr-east-shinetsu.jpg', title: 'JR東日本 路線図 信越エリア', credit: 'JR東日本 East Japan Railway (Mar 2025); no licence stated', source: 'https://timetables.jreast.co.jp/'},
     {tab: 'Kanto–Koshinetsu', file: 'maps/intercity/diagrams/japan-jr-east-kanto-koshinetsu.jpg', title: 'JR東日本路線図 (MAP1 関東・甲信越)', credit: 'JR東日本 East Japan Railway (Oct 2026); no licence stated', source: 'https://www.jreast.co.jp/map/'}],
   box: [24252, 5064, 24514, 5409]},
  {slug: 'jp-fukuoka', en: 'Fukuoka', kind: 'area', tabs: [
     {tab: 'Nishitetsu', file: 'maps/intercity/diagrams/japan-nishitetsu.jpg', title: '西鉄電車 路線図 Nishitetsu rail route map', credit: '西日本鉄道 Nishitetsu'}],
   box: [23549, 5613, 23709, 5773]},
  {slug: 'jp-kanto-koshinetsu', en: 'Kanto & Koshinetsu', kind: 'area', tabs: [
     {tab: 'Kanto–Koshinetsu', file: 'maps/intercity/diagrams/japan-jr-west-kanto-koshinetsu.jpg', title: 'JR西日本路線図 (関東・甲信越エリア)', credit: 'JR西日本 JR West (Nov 2026)'}],
   box: [24236, 5126, 24581, 5519]},
];

// Extra tabs for a METRO box (night_metro_boxes.js is generated, so they live
// here), keyed by the metro's slug. The metro's own map stays the first tab.
const NIGHT_METRO_TABS = {
  // Night trains from 18 European hubs: Cerovic's city maps (night-trains.com/files/
  // night-trains-map-<city>.png), current as of the live site on 31 Oct 2026.
  // Refetch: python scripts/refetch_nighttrains.py
  'amsterdam': [{tab: 'Night trains', file: 'maps/intercity/diagrams/hubs/night-trains-map-amsterdam.png',
    title: 'Night trains from Amsterdam', sub: '', credit: NIGHT_CREDIT}],
  'berlin': [{tab: 'Night trains', file: 'maps/intercity/diagrams/hubs/night-trains-map-berlin.png',
    title: 'Night trains from Berlin', sub: '', credit: NIGHT_CREDIT}],
  'brussels': [{tab: 'Night trains', file: 'maps/intercity/diagrams/hubs/night-trains-map-brussels.png',
    title: 'Night trains from Brussels', sub: '', credit: NIGHT_CREDIT}],
  'budapest': [{tab: 'Night trains', file: 'maps/intercity/diagrams/hubs/night-trains-map-budapest.png',
    title: 'Night trains from Budapest', sub: '', credit: NIGHT_CREDIT}],
  'cologne': [{tab: 'Night trains', file: 'maps/intercity/diagrams/hubs/night-trains-map-cologne.png',
    title: 'Night trains from Cologne', sub: '', credit: NIGHT_CREDIT}],
  'florence': [{tab: 'Night trains', file: 'maps/intercity/diagrams/hubs/night-trains-map-florence.png',
    title: 'Night trains from Florence', sub: '', credit: NIGHT_CREDIT}],
  'hamburg': [{tab: 'Night trains', file: 'maps/intercity/diagrams/hubs/night-trains-map-hamburg.png',
    title: 'Night trains from Hamburg', sub: '', credit: NIGHT_CREDIT}],
  'london': [{tab: 'Night trains', file: 'maps/intercity/diagrams/hubs/night-trains-map-london.png',
    title: 'Night trains from London', sub: '', credit: NIGHT_CREDIT}],
  'milan': [{tab: 'Night trains', file: 'maps/intercity/diagrams/hubs/night-trains-map-milan.png',
    title: 'Night trains from Milan', sub: '', credit: NIGHT_CREDIT}],
  'munich': [{tab: 'Night trains', file: 'maps/intercity/diagrams/hubs/night-trains-map-munich.png',
    title: 'Night trains from Munich', sub: '', credit: NIGHT_CREDIT}],
  'paris': [{tab: 'Night trains', file: 'maps/intercity/diagrams/hubs/night-trains-map-paris.png',
    title: 'Night trains from Paris', sub: '', credit: NIGHT_CREDIT}],
  'praga': [{tab: 'Night trains', file: 'maps/intercity/diagrams/hubs/night-trains-map-prague.png',
    title: 'Night trains from Prague', sub: '', credit: NIGHT_CREDIT}],
  'rome': [{tab: 'Night trains', file: 'maps/intercity/diagrams/hubs/night-trains-map-rome.png',
    title: 'Night trains from Rome', sub: '', credit: NIGHT_CREDIT}],
  'stockholm': [{tab: 'Night trains', file: 'maps/intercity/diagrams/hubs/night-trains-map-stockholm.png',
    title: 'Night trains from Stockholm', sub: '', credit: NIGHT_CREDIT}],
  'venice-mestre': [{tab: 'Night trains', file: 'maps/intercity/diagrams/hubs/night-trains-map-venice.png',
    title: 'Night trains from Venice', sub: '', credit: NIGHT_CREDIT}],
  'vienna': [{tab: 'Night trains', file: 'maps/intercity/diagrams/hubs/night-trains-map-vienna.png',
    title: 'Night trains from Vienna', sub: '', credit: NIGHT_CREDIT}],
  'warsaw': [{tab: 'Night trains', file: 'maps/intercity/diagrams/hubs/night-trains-map-warsaw.png',
    title: 'Night trains from Warsaw', sub: '', credit: NIGHT_CREDIT}],
  'zurich': [{tab: 'Night trains', file: 'maps/intercity/diagrams/hubs/night-trains-map-zurich.png',
    title: 'Night trains from Zurich', sub: '', credit: NIGHT_CREDIT}],
  'saint-petersburg': [
    {tab: 'Trams', file: 'maps/intercity/diagrams/spb-trams-mironova-2024.jpg',
     title: 'Трамваи | Trams · Saint Petersburg', sub: '', credit: 'Bella Mironova (2024)'},
    {tab: 'Tram history', file: 'maps/intercity/diagrams/spb-tram-network-ryzhakov-2024.jpg',
     title: 'Схема трамвайной сети Санкт-Петербурга · every line since 1907', sub: '',
     credit: 'Evgeny Ryzhakov (2024), after Robert Leichsenring (2007)'}
  ],
};
