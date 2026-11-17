// One naming convention for intercity lines, whatever the source tagged.
// OSM names come in every national style ("Skoryi poezd 012Ia <<Iamal>>:
// Moskva - Novyi Urengoi", "Ligne de Clisson à Cholet", "Linia kolejowa nr
// 209 A - B", "IC 8", "Chengdu–Kunming railway"); every card reads the same:
//   ref    the service / line number            012Я · IC 8 · 209
//   title  the route, Latin script, "A – B"     Moskva-Iaroslavskaia – Novyi Urengoi
//   brand  the train or line name, if any       Iamal · TGV InOui · Rajdhani Express
//   via    the stops named between the ends     via Kozani
//   native the route in its own script          Москва-Ярославская – Новый Уренгой
//   ends   [first, last] stop of the route, or null
// A line with no route in its name keeps its proper name as the title
// ("Fife Circle Line", "Transgabonais"). Render-only: the data is untouched.
(function(){
  const NONLATIN = /[^\u0000-ʯḀ-ỿ -⁯←-⇿«»„“”‘’]/;
  const latin = s => !NONLATIN.test(s);
  // route separators: arrows anywhere, dashes with spaces, an en/em dash
  // between words (a bare hyphen is part of a station name: Dresden-Neustadt)
  const SEP = /\s*(?:<=>|<->|=>|<=|->|<-|→|⇒|⇔|↔|⟶|>)\s*|\s+(?:--|—|–|−|-|=)\s+|(?<=\p{L})[–—−](?=\p{L})/u;
  // class words that are not names: "fast train", "suburban train", "line no."
  const CLASS = new RegExp('^(?:' + [
    'skoryi poezd', 'skoryy poezd', 'prigorodnyi elektropoezd', 'prigorodnyi poezd', 'prigorodnyy poezd',
    'passazhirskii poezd', 'firmennyi poezd', 'elektropoezd', 'dizel\'?-?poezd(?:-ekspress)?', 'poezd',
    'скорый поезд', 'пригородный электропоезд', 'пригородный поезд', 'пассажирский поезд', 'фирменный поезд',
    'электропоезд', 'дизель-?поезд(?:-экспресс)?', 'поезд', 'рельсовый автобус',
    'fast train', 'suburban electric train', 'suburban train', 'passenger train', 'commuter train', 'express train',
    'yo\'lovchi poyezdi', 'tezyurar poyezd', 'train', 'treno', 'tren', 'τρένο', 'vlak', 'pociąg',
    'zhelezop\'?tna liniia', 'железопътна линия', 'linia kolejowa nr', 'linia kolejowa', 'linia',
    'secția', 'sectia', 'bahnstrecke', 'railway line', 'rail line', 'ferrovia', 'linha', 'línea', 'linea',
    'ligne', 'ramal', 'uzkokoleika', 'узкоколейка', 'ferrobus', 'chemin de fer de', 'chemin de fer',
    'antic ferrocarril', 'antiguo ferrocarril', 'antigo caminho de ferro', 'tuyến đường sắt', 'đường sắt',
    'jalur kereta api', 'jalur ka', "vysokoskorostnaia zheleznodorozhnaia magistral'?",
    "zheleznodorozhnaia magistral'?", 'zheleznodorozhnaia liniia', 'uzkokoleinaia zheleznaia doroga',
    'prigorodnoe zheleznodorozhnoe soobshchenie', 'peregon', 'poyizd', 'поїзд', 'перегон',
    'ferrocarril de', 'ferrocarril', 'spoorlijn', 'železniční trať', 'trať', 'vasútvonal', 'дільниця', 'участок', 'lie che', '列车', 'no\\.?', '№'
  ].join('|') + ')(?=[\\s:.\\d]|$)\\s*', 'iu');
  const TAIL = /\s+(?:mgr|d[əe]mir ?yolu|demiryolları|vasútvonal|spoorlijn|spoorweg|jernbane|järnväg|jernbanelinje|rautatie|kolej|pruga|železnica|železniční trať|trať|ferrocarril|chemin de fer|caminho de ferro|eisenbahn|eisenbahnstrecke|ferrovia|linha férrea|demiryolu hattı|high[\s-]?speed (?:railway|rail|line)|high[\s-]?speed|intercity railway|passenger dedicated (?:line|railway)|passenger (?:railway|line)|hs[lr]|pdl|railway line|railway|rail line|railroad|line railway|yht hattı|hattı|hatti|jernbane|bahn|sgr|line|branch|coast line|outbound|inbound|\(?(?:down|up)\)?)$/i;
  const CODE = /(?:^|\s)((?:[A-Z]{1,4}[\s-]?)?\d{1,5}[A-Za-zА-Яа-яЁё]{0,3}\+?(?:\/\d{1,5}[A-Za-zА-Яа-яЁё]{0,3})*)$/u;
  const LEAD_CODE = /^((?:[A-Z]{1,3}[\s-]?)?\d{1,5}[A-Za-zА-Яа-яЁё]{0,2}(?:[,/]\s?\d{1,5}[A-Za-zА-Яа-яЁё]{0,2})*)(?:\s*\([^)]*\))?(?:\s+(?=\p{L})|(?=[^\p{Script=Latin}\d\s/,]))/u;

  const CYR = {а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'yo',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',
    н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'kh',ц:'ts',ч:'ch',ш:'sh',щ:'shch',ъ:'',ы:'y',
    ь:'',э:'e',ю:'yu',я:'ya',і:'i',ї:'yi',є:'ye',ґ:'g',ў:'w',ә:'a',ғ:'gh',қ:'q',ң:'ng',ө:'o',ұ:'u',ү:'u',һ:'h',ҳ:'h',ҷ:'j'};
  const GRK = {α:'a',β:'v',γ:'g',δ:'d',ε:'e',ζ:'z',η:'i',θ:'th',ι:'i',κ:'k',λ:'l',μ:'m',ν:'n',ξ:'x',
    ο:'o',π:'p',ρ:'r',σ:'s',ς:'s',τ:'t',υ:'y',φ:'f',χ:'ch',ψ:'ps',ω:'o'};
  // Georgian (national system) and Armenian
  const KA = {ა:'a',ბ:'b',გ:'g',დ:'d',ე:'e',ვ:'v',ზ:'z',თ:'t',ი:'i',კ:'k',ლ:'l',მ:'m',ნ:'n',ო:'o',პ:'p',ჟ:'zh',
    რ:'r',ს:'s',ტ:'t',უ:'u',ფ:'p',ქ:'k',ღ:'gh',ყ:'q',შ:'sh',ჩ:'ch',ც:'ts',ძ:'dz',წ:'ts',ჭ:'ch',ხ:'kh',ჯ:'j',ჰ:'h'};
  const HY = {ա:'a',բ:'b',գ:'g',դ:'d',ե:'e',զ:'z',է:'e',ը:'y',թ:'t',ժ:'zh',ի:'i',լ:'l',խ:'kh',ծ:'ts',կ:'k',հ:'h',
    ձ:'dz',ղ:'gh',ճ:'ch',մ:'m',յ:'y',ն:'n',շ:'sh',ո:'o',չ:'ch',պ:'p',ջ:'j',ռ:'r',ս:'s',վ:'v',տ:'t',ր:'r',ց:'ts',
    ւ:'v',փ:'p',ք:'k',օ:'o',ֆ:'f',և:'ev'};
  // Cyrillic, Greek, Georgian and Armenian are spelled out in Latin; other
  // scripts are left as they are (no title is better than a wrong one)
  function translit(s, bg){
    const t = bg ? Object.assign({}, CYR, {ъ: 'a', щ: 'sht'}) : CYR;
    let out = '', first = true;
    // Georgian capitals (Mtavruli) as Mkhedruli; Armenian "ու" is u
    s = s.replace(/[Ა-Ჿ]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0xBC0))
         .replace(/ու/g, 'u').replace(/Ու/g, 'U');
    for (const ch of s.normalize('NFD').replace(/[̀-ͯ]/g, m => '')){
      if (KA[ch] !== undefined){                 // Georgian has no case: a word starts with a capital
        const r = KA[ch]; out += first ? r[0].toUpperCase() + r.slice(1) : r; first = false; continue;
      }
      first = !/\p{L}/u.test(ch);
      const lo = ch.toLowerCase(), r = t[lo] ?? GRK[lo] ?? HY[lo];
      out += r == null ? ch : (ch !== lo && r ? r[0].toUpperCase() + r.slice(1) : r);
    }
    return out;
  }
  const canTranslit = s => !/[^\u0000-ɏͰ-ϿЀ-ӿԱ-ևა-ჿᲐ-Ჿ -⁯←-⇿«»„“”‘’]/.test(s);

  // Ukrainian: the official national romanisation (Cabinet of Ministers,
  // 2010) -- Київ Kyiv, Львів Lviv, П'ятихатки Piatykhatky, Харків Kharkiv --
  // not the scholarly letter-by-letter "Kiyiv", "L'viv". Є Ї Й Ю Я are Ye Yi
  // Y Yu Ya at the start of a word, ie i i iu ia elsewhere; ь and ' go; зг is zgh.
  const UK = {а: 'a', б: 'b', в: 'v', г: 'h', ґ: 'g', д: 'd', е: 'e', ж: 'zh', з: 'z', и: 'y', і: 'i', к: 'k', л: 'l',
    м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch',
    ь: '', ы: 'y', э: 'e', ё: 'io', ъ: ''};
  const UK_INIT = {є: ['ye', 'ie'], ї: ['yi', 'i'], й: ['y', 'i'], ю: ['yu', 'iu'], я: ['ya', 'ia']};
  window.ukRoman = s => {
    if (!s || !/[Ѐ-ӿ]/.test(s)) return s;
    // train-type words and station abbreviations are not part of a place name
    s = s.replace(/\s*\((?:електричка|дизель-поїзд)\)/gi, '').replace(/\s*(?:Приміський|Пасажирський|Швидкий|Регіональний)\s+поїзд/gi, '')
         .replace(/-?Пас\.?(?=\s|$|-|,)/g, '').replace(/Голов\.?(?=\s|$|-|,)/g, 'Головний').replace(/['ʼ’`]/g, '');
    let out = '', start = true, prev = '';
    for (const ch of s){
      const lo = ch.toLowerCase(), up = ch !== lo;
      let r = UK_INIT[lo] ? UK_INIT[lo][start ? 0 : 1] : UK[lo];
      if (lo === 'г' && prev === 'з') r = 'gh';             // зг is zgh (Zghurivka), not zh
      prev = lo;
      if (r === undefined){ out += ch; start = !/\p{L}/u.test(ch); continue; }
      out += up && r ? r[0].toUpperCase() + r.slice(1) : r;
      start = false;
    }
    return out.replace(/\s{2,}/g, ' ').trim();
  };

  // (an OSM tag left in a name -- "Lebak Bulus (railways)" -- comes off too)
  const tidy = s => s.replace(/\s*\((?:railways?|rail|train station)\)/gi, '').replace(/\s+/g, ' ').replace(/^[\s,:;.\-–]+|[\s,:;.\-–<>=]+$/g, '').trim();
  const cap = s => s ? s[0].toUpperCase() + s.slice(1) : s;

  // one name -> {ref, brand, stops[]} (stops: the named route, ends first-last)
  function parse(raw){
    // "B@rd@-Agdam d@mir yolu": '@' stands for the Azerbaijani schwa
    raw = String(raw || '').replace(/(?<=\p{L})@|@(?=\p{L})/gu, 'ə').replace(/#\s?(?=\d)/g, '');
    raw = raw.replace(/"([^"]{2,40})"/g, '«$1»').replace(/^[.\s]+/, '');   // ".italo"
    raw = raw.replace(/^([a-z])(?=[a-z]*\s)/, m => m.toUpperCase());     // "11th street"; "kwaMashu" stays            // Train 201 "Armenia": the train's name
    let s = tidy(String(raw || '').replace(/<<|«|„|“/g, '«').replace(/>>|»|”/g, '»')
                                  .replace(/(high|double|single|narrow)[–—‐](speed|track|gauge)/gi, '$1-$2'));
    let ref = '', brand = '', stops = null;
    s = tidy(s.replace(/\s*<[^<>=]*[^<>=\s]>/g, ' ').replace(/\s*<[A-Z][^<>]*$/, ''));
    const q = s.match(/«([^»]+)»/);                      // a train's own name: «Iamal»
    if (q){ brand = tidy(q[1]); s = tidy(s.replace(q[0], ' ')); }
    // "label: route" / "label (route)"
    let label = s, route = '';
    let m = s.match(/^(.{1,70}?)\s*(?::\s+|：\s*)(.+)$/);
    if (m && SEP.test(m[2])){ label = m[1]; route = m[2]; }
    else if ((m = s.match(/^(.*?)\s*\(([^()]+)\)\s*$/)) && SEP.test(m[2])){ label = m[1]; route = m[2]; }
    else {
      // French: "(Voie 1 de la) ligne de A à B", "voie unique de A à B"
      m = s.match(/^(?:[Vv]oie\s+(?:\d+|unique)\s+(?:de\s+la\s+)?)?(?:[Ll]igne\s+|[Cc]hemin de [Ff]er\s+)?(?:de\s+la\s+|de\s+|d['’]|du\s+)(.+?)\s+(?:à|au|aux)\s+(.+?)(?:\s*\(.*\))?$/);
      if (m && /^(?:voie|ligne|chemin de fer)/i.test(s)) return {ref, brand, stops: [m[1], m[2]].map(tidy).map(cap)};
      // English: "Elgin to Cairnie Coast Line"
      m = s.match(/^(.+?)\s+to\s+(.+?)$/);
      if (m && !/\d/.test(m[1])) return {ref, brand, stops: [m[1], m[2].replace(TAIL, '')].map(tidy)};
      label = ''; route = s;
    }
    // the label: class words off, the number kept as ref, the rest is the brand
    let lb = tidy(label);
    for (let i = 0; i < 4; i++) lb = lb.replace(CLASS, '');
    lb = tidy(lb.replace(TAIL, ''));
    m = lb.match(CODE);
    if (m){ ref = m[1]; lb = tidy(lb.slice(0, lb.length - m[0].length)); }
    if (lb && !brand) brand = lb;
    // the route: class words and a leading number off, then split at the separators
    let rt = route;
    for (let i = 0; i < 4; i++) rt = rt.replace(CLASS, '');
    if ((m = rt.match(LEAD_CODE)) && SEP.test(rt.slice(m[0].length))){ ref = ref || m[1]; rt = rt.slice(m[0].length); }
    rt = tidy(rt.replace(TAIL, '').replace(TAIL, ''));
    let parts = rt.split(SEP).map(tidy).filter(Boolean);
    // a bare hyphen only separates when a class word said "this is a line"
    // ("Ferrovia Milano-Saronno", "Silkeborg-Herning Jernbane")
    // ("Ferrovia Milano-Saronno", "Silkeborg-Herning Jernbane"), or when the
    // whole name is just two places ("Tampere-Jyväskylä")
    // -- never a prefix word: "Trans-Manchurian", "Inter-City", "North-South"
    // are names, not two places
    if (parts.length < 2 && !/high-speed|double-track|single-track|narrow-gauge/i.test(rt) &&
        !/^(?:Trans|Inter|Intra|Pan|Circum|Cross|Sino|Indo|Euro|Afro|Anglo|Franco|Austro|Hispano|Greater|(?:North|South)(?:east|west)?|East|West)-/i.test(rt) &&
        (rt !== tidy(route) || !/\s/.test(rt)) && /^\p{Lu}[\p{L} .']*-\p{Lu}[\p{L} .']*$/u.test(rt))
      parts = rt.split('-').map(tidy);
    if (parts.length >= 2 && parts.every(p => p.length <= 48 && /^['’]?\p{L}|^\d+\s*km/u.test(p))){
      stops = parts.map(p => cap(p.replace(/\s*\((?:partie|section)[^)]*\)$/i, '')));
    } else if (brand && SEP.test(brand)){                 // «Серпневе I — Арциз»: the quotes held the route
      stops = brand.split(SEP).map(tidy).filter(Boolean); brand = '';
    } else if (!label){
      // no route at all: the whole thing is a name, as written -- only a
      // class word in front ("Passazhirskii poezd 513S") or a number at the
      // end ("TER S06") comes off
      let nm = route;
      for (let i = 0; i < 4; i++) nm = nm.replace(CLASS, '');
      nm = tidy(nm);
      const classed = nm !== tidy(route);
      if ((m = nm.match(LEAD_CODE))){ ref = ref || m[1]; nm = tidy(nm.slice(m[0].length)); }
      else if ((m = nm.match(CODE)) && !/\b(?:stage|phase|line|section|part|lot|tunnel|corridor|koridor|magistrala)$/i.test(nm.slice(0, m.index).trim())){
        ref = ref || m[1]; nm = tidy(nm.slice(0, m.index));
      }
      brand = brand || (nm && (classed && !ref ? tidy(route) : nm));
      brand = brand.replace(/\s+(?:d[əe]mir ?yolu|demiryolu|demiryolları|železnica|rautatie|eisenbahn|jernbane|järnväg|spoorweg|zheleznaia doroga|zheleznaya doroga|железная дорога)$/i, ' Railway')
                   .replace(/(^|\s)dairəvi(?=\s)/i, '$1Circular')
                   .replace(/\s+(?:vasútvonal|spoorlijn|jernbanelinje|železniční trať|trať)$/i, ' Railway Line');
    }
    return {ref, brand, stops};
  }

  // English-led Latin forms of Chinese / Japanese / Korean names and spaced
  // pinyin (assets/latin_names.js, scripts/build_latin_names.py)
  const LN = () => window.LATIN_NAMES || {};
  // a station or place name in Latin: the names table, else Cyrillic / Greek /
  // Georgian / Armenian spelled out (Москва -> Moskva, 1727 км -> 1727 km)
  window.latinName = s => {
    if (!s) return s;
    // then the translated stations of the scripts below cannot spell out
    // (Urdu, Persian, Arabic, Thai, Bengali, Hebrew...: assets/station_names_en.js)
    let r = (window.STATION_EN || {})[s] || LN()[s];      // the translations only cover names the table left unresolved
    if (!r) r = !latin(s) && canTranslit(s) ? translit(s, false).replace(/\bkm\b/i, 'km') : s;
    return r.replace(/^Pyeongyang/, 'Pyongyang');
  };
  // the operator's English name first (東日本旅客鉄道株式会社 -> East Japan
  // Railway Company (JR East)), never a romanisation of it -- a Japanese name
  // read as Chinese came out "Dongribenlvkezhidaozhushihuishe"
  window.opName = s => (s && ((window.STATION_EN || {})[s] || ((window.STATION_EN || {})[LN()[s]]) || LN()[s])) || s;
  // Russian / Belarusian / Kazakh names that arrive already romanised the
  // scholarly way ("Moskva-Iaroslavskaia", "Novyi Urengoi") in the common
  // English forms: Moscow-Yaroslavskaya, Novy Urengoy. Only used for places in
  // those countries (RU_CC): "Via", "Maria" elsewhere are left alone.
  const RU_CC = new Set(['RU', 'BY', 'KZ', 'KG']);
  const RU_EXO = {Moskva: 'Moscow', 'Sankt-Peterburg': 'Saint Petersburg', 'Sankt Peterburg': 'Saint Petersburg',
    Ekaterinburg: 'Yekaterinburg', 'Nizhnii Novgorod': 'Nizhny Novgorod', Erofei: 'Yerofey', Elets: 'Yelets',
    Evpatoriia: 'Yevpatoria', Eisk: 'Yeysk', Ekaterinoslav: 'Yekaterinoslav', Arkhangel: 'Arkhangelsk',
    Alma: 'Alma', 'Nur-Sultan': 'Astana'};
  window.ruEnglish = t => {
    if (!t || !/[a-z]/i.test(t)) return t;
    // a name already romanised from its Cyrillic (scripts/build_ru_english.py:
    // station_names_en) is left alone -- the guesses below would undo it
    // ("Priozyornaya" -> "Pryozyornaya"); an old romanisation it knows is swapped in
    const SE = window.STATION_EN || {};
    const done = window.__RU_DONE || (window.__RU_DONE = new Set(Object.values(SE)));
    if (done.has(t)) return t;
    if (/ – /.test(t)) return t.split(' – ').map(p => SE[p] || (done.has(p) ? p : window.ruEnglish(p))).join(' – ');
    if (SE[t]) return SE[t];
    for (const [k, v] of Object.entries(RU_EXO)) if (k.includes(' ') || k.includes('-')) t = t.split(k).join(v);
    return t.replace(/[ʹʺ'’](?=[a-z\s\-–)]|$)/gi, '')            // soft / hard signs
      .replace(/\b\p{L}[\p{L}]*/gu, w => {
        if (RU_EXO[w]) return RU_EXO[w];
        let x = w.replace(/^Ia/, 'Ya').replace(/^Iu/, 'Yu').replace(/^Io/, 'Yo')
                 .replace(/iia/g, 'iya').replace(/ia/g, 'ya').replace(/iu/g, 'yu').replace(/io(?=[^n])/g, 'yo')
                 .replace(/iisk/g, 'iysk').replace(/(?:yi|ii|iy)$/, 'y').replace(/ei$/, 'ey').replace(/oi$/, 'oy').replace(/ai$/, 'ay');
        return x;
      });
  };
  window.ruCountry = cc => RU_CC.has(cc);
  // Turkish names in plain English spelling (İstanbul, Eskişehir ->
  // Istanbul, Eskisehir): English leads, as everywhere on the site
  const TR_MAP = {'İ': 'I', 'ı': 'i', 'Ş': 'S', 'ş': 's', 'Ç': 'C', 'ç': 'c', 'Ğ': 'G', 'ğ': 'g', 'Ö': 'O', 'ö': 'o', 'Ü': 'U', 'ü': 'u', 'Â': 'A', 'â': 'a', 'Î': 'I', 'î': 'i', 'Û': 'U', 'û': 'u'};
  window.trEnglish = t => t ? String(t).replace(/[İıŞşÇçĞğÖöÜüÂâÎîÛû]/g, ch => TR_MAP[ch]) : t;
  // English spelling for the other countries whose Latin alphabets English
  // does not keep: their established English names first (Bakı -> Baku,
  // Samarqand -> Samarkand, Hà Nội -> Hanoi), then the usual English
  // romanisation letter by letter
  const EXO = {
    AZ: {'Bakı': 'Baku', 'Gəncə': 'Ganja', 'Şəki': 'Sheki', 'Naxçıvan': 'Nakhchivan', 'Sumqayıt': 'Sumgait', 'Lənkəran': 'Lankaran',
         'Mingəçevir': 'Mingachevir', 'Abşeron': 'Absheron', 'Qazax': 'Gazakh', 'Qəbələ': 'Gabala', 'Ağdam': 'Aghdam', 'Agdam': 'Aghdam',
         'Şirvan': 'Shirvan', 'Xaçmaz': 'Khachmaz', 'Yevlax': 'Yevlakh', 'Hacıqabul': 'Hajigabul', 'Kürdəmir': 'Kurdamir', 'Ucar': 'Ujar',
         'Şamaxı': 'Shamakhi', 'Quba': 'Quba', 'Qusar': 'Qusar', 'Zaqatala': 'Zaqatala', 'Biləcəri': 'Bilajari', 'Ələt': 'Alat', 'Culfa': 'Julfa'},
    UZ: {'Toshkent': 'Tashkent', 'Samarqand': 'Samarkand', 'Buxoro': 'Bukhara', 'Xiva': 'Khiva', 'Qarshi': 'Karshi', 'Andijon': 'Andijan',
         'Fargʻona': 'Fergana', "Farg'ona": 'Fergana', 'Navoiy': 'Navoi', 'Termiz': 'Termez', 'Urganch': 'Urgench', 'Guliston': 'Gulistan',
         'Jizzax': 'Jizzakh', 'Qoʻqon': 'Kokand', "Qo'qon": 'Kokand', 'Margʻilon': 'Margilan', 'Qoʻngʻirot': 'Kungrad'},
    TM: {'Aşgabat': 'Ashgabat', 'Türkmenabat': 'Turkmenabat', 'Türkmenbaşy': 'Turkmenbashi', 'Daşoguz': 'Dashoguz'},
    TR: {'İstanbul': 'Istanbul', 'İzmir': 'Izmir'},
    VN: {'Hà Nội': 'Hanoi', 'Hồ Chí Minh': 'Ho Chi Minh City', 'Sài Gòn': 'Saigon', 'Huế': 'Hue', 'Đà Nẵng': 'Da Nang',
         'Hải Phòng': 'Haiphong', 'Lào Cai': 'Lao Cai'}};
  // English words in a line's name are never respelt ("ADY express")
  const KEEP = /^(?:Express|Railway|Railways|Line|Mainline|Circular|Station|Junction|North|South|East|West|Central|International|Airport|Port|New|Old|Main|Branch|Route|Night|Train)$/;
  const AZL = [['Ə', 'A'], ['ə', 'a'], ['İ', 'I'], ['ı', 'i'], ['Ş', 'Sh'], ['ş', 'sh'], ['Ç', 'Ch'], ['ç', 'ch'], ['Ğ', 'Gh'], ['ğ', 'gh'],
               ['Ö', 'O'], ['ö', 'o'], ['Ü', 'U'], ['ü', 'u'], ['X', 'Kh'], ['x', 'kh'], ['Q', 'G'], ['q', 'g'], ['C', 'J'], ['c', 'j']];
  const UZL = [['ʻ', ''], ['ʼ', ''], ['X', 'Kh'], ['x', 'kh'], ['Q', 'K'], ['q', 'k']];
  const TML = [['Ä', 'A'], ['ä', 'a'], ['Ň', 'N'], ['ň', 'n'], ['Ž', 'Zh'], ['ž', 'zh'], ['Ş', 'Sh'], ['ş', 'sh'], ['Ç', 'Ch'], ['ç', 'ch'],
               ['Ý', 'Y'], ['ý', 'y'], ['Ö', 'O'], ['ö', 'o'], ['Ü', 'U'], ['ü', 'u']];
  const perWord = (t, pairs) => t.replace(/[\p{L}ʻʼ']+/gu, w => {
    // only place names: capitalised, not an English word, not an acronym (ADY)
    if (!/^\p{Lu}/u.test(w) || KEEP.test(w) || (w.length > 1 && w === w.toUpperCase())) return w;
    for (const [a, b] of pairs) w = w.split(a).join(b);
    return w; });
  const exo = (t, cc) => { for (const [k, v] of Object.entries(EXO[cc] || {})) t = t.split(k).join(v); return t; };
  window.localEnglish = (t, ccs) => {
    if (!t) return t;
    let r = String(t);
    const cs = new Set(ccs || []);
    for (const cc of cs) r = exo(r, cc);
    if (cs.has('AZ')) r = perWord(r, AZL);
    if (cs.has('UZ')) r = perWord(r, UZL);
    if (cs.has('TM')) r = perWord(r, TML);
    if (cs.has('TR')) r = trEnglish(r);
    if (cs.has('VN')) r = r.replace(/[đĐ]/g, c => c === 'đ' ? 'd' : 'D').normalize('NFD').replace(/[̀-ͯ]/g, '');
    return r;
  };
  window.LOCAL_EN_CC = new Set(['AZ', 'UZ', 'TM', 'TR', 'VN']);
  window.trCountry = cc => window.LOCAL_EN_CC.has(cc);
  // a text's Chinese / Japanese / Korean names in English (a schedule's
  // "北京朝阳 – 哈尔滨西" -> "Beijing Chaoyang – Harbin West"); a name the
  // tables do not know stays as written
  window.enText = t => t ? String(t).replace(/[㐀-鿿가-힯぀-ヿ]+/g, m => {
    const r = window.latinName(m);
    return /[㐀-鿿가-힯぀-ヿ]/.test(r) ? m : r;
  }) : t;
  let GSET = null;
  window.lineLabel = function(c){
    let name = String(c.name || ''), native = String(c.native || '');
    // OSM's official English name (name:en, scripts/fetch_osm_tags.py) leads;
    // the local name becomes the native line when it differs
    if (c.name_en && latin(c.name_en)){
      if (!native || latin(native)) native = latin(name) ? native : name;
      name = c.name_en;
    }
    // a garbled name (letter-by-letter romanisation, broken characters) is not
    // used: the route comes from the line's stations (LINE_ENDS)
    if (window.GARBLED_LINES && (GSET || (GSET = new Set(window.GARBLED_LINES))).has(c.slug) && window.LINE_ENDS && window.LINE_ENDS[c.slug]){
      const ccs_ = c.countries || [], ruL = ccs_.some(k => RU_CC.has(k)), ukL = ccs_.includes('UA');
      // the same English spelling as every other title (it skipped it: "Sankt-Peterburg-Glavnyi")
      const e = window.LINE_ENDS[c.slug].map(x => {
        let r = ukL && /[Ѐ-ӿ]/.test(x) ? ukRoman(x) : window.latinName ? window.latinName(x) : x;
        if (ruL) r = ruEnglish(r);
        return localEnglish(r, ccs_); });
      const pn = native && !latin(native) ? parse(native) : null;
      const nat = pn ? (pn.stops ? pn.stops[0] + ' – ' + pn.stops[pn.stops.length - 1] : native) : '';
      return {title: e[0] + ' – ' + e[1], ref: parse(name).ref || '', brand: '', via: '', native: nat, ends: e};
    }
    if (LN()[name]){ if (!native && !latin(name)) native = name; name = LN()[name]; }
    else if (native && !latin(name) && LN()[native]) name = LN()[native];
    // a name with another script appended ("Ethio-Djibouti Railway سكة ...")
    // or a garbled transliteration of it ("IRR Western Line khT lsk@ ..."):
    // the Latin part the native name starts with
    const pre = native.match(/^([\p{Script=Latin}\d][\p{Script=Latin}\d .'’-]{2,}?)\s+(?=\p{L})(?!\p{Script=Latin})/u);
    if (pre && /\p{L}{2}/u.test(pre[1]) && name.startsWith(pre[1]) && name.length > pre[1].length) name = pre[1];
    name = tidy(name.replace(/[֐-ࣿ฀-๿][֐-ࣿ฀-๿\s@]*/g, ' '));
    const a = parse(name), b = native && native !== c.name ? parse(native) : {ref: '', brand: '', stops: null};
    // a route's places by their translated names where the script cannot be
    // spelled out (Urdu, Persian, Arabic...: assets/station_names_en.js)
    const SE = window.STATION_EN || {};
    if (a.stops) a.stops = a.stops.map(x => SE[x] || x);
    const bNative = b.stops ? b.stops.slice() : null;     // as written, for the native line
    if (b.stops) b.stops = b.stops.map(x => SE[x] || x);
    let stops = a.stops, from = 'name';
    // Ukraine: titled from the Ukrainian name in the official romanisation
    // (Київ – Львів -> Kyiv – Lviv), not the scholarly "Kiyiv-L'viv" of the name tag
    if ((c.countries || []).includes('UA') && b.stops && /[Ѐ-ӿ]/.test(b.stops.join(' '))){
      stops = b.stops.map(x => ukRoman(x)).filter(Boolean); from = 'native'; }
    else if ((c.countries || []).includes('UA') && !b.stops && b.brand && /[Ѐ-ӿ]/.test(b.brand)){
      // one name ("141: Київ-Львів"): two places joined by a hyphen are a route
      const parts = b.brand.split(/(?<=\p{L})-(?=\p{Lu})/u);
      stops = (parts.length === 2 ? parts : [b.brand]).map(x => ukRoman(x));
      if (stops.length < 2){ a.brand = stops[0]; stops = null; } else from = 'native'; }
    if (stops && !latin(stops.join(' ')) && canTranslit(stops.join(' ')))
      stops = stops.map(x => translit(x, (c.countries || []).includes('BG')));
    if (!stops && b.stops){
      if (latin(b.stops.join(' '))){ stops = b.stops; from = 'native'; }
      else {
        const bg = (c.countries || []).includes('BG');
        let rest = a.brand && latin(a.brand) ? a.brand : '';
        stops = b.stops.map(x => latin(x) ? x : canTranslit(x) ? translit(x, bg)
                                   : rest ? (([x, rest] = [rest, '']), x) : x);
        if (!latin(stops.join(' '))) stops = null; else { from = 'translit'; if (a.brand && stops.includes(a.brand)) a.brand = ''; }
      }
    }
    if (!stops && window.LINE_ENDS && window.LINE_ENDS[c.slug]){
      stops = window.LINE_ENDS[c.slug].map(x => window.latinName ? window.latinName(x) : x); from = 'ends';
    }
    // the ref as on the ticket: the native spelling of the same number (012Я, not 012Ia)
    let ref = a.ref || b.ref;
    if (a.ref && b.ref && a.ref.replace(/\D/g, '') === b.ref.replace(/\D/g, '')) ref = b.ref;
    let brand = a.brand;
    if (brand && stops && stops.some(s => s === brand)) brand = '';
    if (!brand && b.brand && latin(b.brand)) brand = b.brand;
    if (brand && ref && brand === ref) brand = '';
    // a brand that only repeats the name the title was made from, or a stop
    const flat = x => x.toLowerCase().replace(/[\s\-–—−]+/g, ' ').trim();
    const same = (x, y) => flat(x.replace(SEP, ' ')) === flat(y.replace(SEP, ' '));
    if (brand && ((from === 'name' && same(brand, name)) || (stops && stops.some(x => same(x, brand))))) brand = '';
    let title, via = '';
    if (stops){
      title = stops[0] === stops[stops.length - 1] && stops.length > 2
        ? stops[0] + ' – ' + stops[Math.floor(stops.length / 2)] + ' (loop)'
        : stops[0] + ' – ' + stops[stops.length - 1];
      const mid = stops.slice(1, -1);
      if (mid.length) via = 'via ' + mid.slice(0, 2).join(', ') + (mid.length > 2 ? ` +${mid.length - 2}` : '');
    } else {
      title = brand || ref || name || native;
      if (title === brand) brand = '';
      if (title === ref) ref = '';                     // "IC 8" once, as the title
    }
    title = cap(title);
    // Chinese line names run the pinyin together: "Jinweigaosu Line" is the
    // Jinwei High-Speed Line, "Haqikezhuan Line" its passenger-dedicated line
    title = title.replace(/^(\p{Lu}\p{Ll}+?)gaosu(?: Line)?$/u, '$1 High-Speed Line')
                 .replace(/^(\p{Lu}\p{Ll}+?)kezhuan(?: Line)?$/u, '$1 Passenger Line')
                 .replace(/^(\p{Lu}\p{Ll}+?)lianluo(?: Line)?$/u, '$1 Link Line')
                 .replace(/\bhigh[\s-]?speed\b/gi, 'High-Speed');
    if (brand && same(brand, title)) brand = '';
    // the kind chip already says High-Speed / Intercity: not again in the name
    // ("Jinggang High-Speed Line" -> "Jinggang Line", "Baolan HSR" -> "Baolan Line")
    const KIND_WORDS = c.kind === 'hsr'
      ? /\s*(?:\bhigh[\s\u2011-]?speed\b(?=\s+(?:line|railway|railroad)\b|\s*$)|\bHS[LR]\b|\bPDL\b|\bLAV\b|\bLGV\b|\bNBS\b|\bYHT\b|\bSchnellfahrstrecke\b|\bNeubaustrecke\b|\balta velocidad\b|\bpassenger(?:\s+dedicated)?(?=\s+(?:line|railway)\b))/gi
      : c.kind === 'intercity' || c.kind === 'conventional'
        ? /\s*\bintercity(?=\s+(?:line|railway)\b)/gi : null;
    const unkind = t => {
      if (!KIND_WORDS || !t) return t;
      let u = t.replace(KIND_WORDS, '').replace(/\s{2,}/g, ' ').trim();
      if (/^[\d\W]/.test(u)) return t;             // a name, not a number, must be left (HSL 4 stays)
      if (u && !/\b(line|railway|rail|railroad|link|branch|loop|section|bahn|express)\b/i.test(u) && !u.includes(' – ') &&
          /\b(?:line|railway|HS[LR]|PDL|rail)\b/i.test(t)) u += /railway/i.test(t) ? ' Railway' : ' Line';
      return u || t;
    };
    title = unkind(title); brand = unkind(brand);
    // the native line: its route the same way, only when it says something
    // the title does not (another script, or other words)
    let nat = '';
    if (native && !latin(native)){
      nat = bNative ? bNative[0] + ' – ' + bNative[bNative.length - 1] : (b.brand || native);
    }
    // a local-language line name ("Linha da Beira Baixa") reads in English
    // (assets/title_en.js, scripts/build_title_en.cjs); the original stays
    // underneath as the native line
    const en = window.TITLE_EN && window.TITLE_EN[c.slug];
    if (en && en !== title){ if (!nat) nat = title; title = en; }
    // a title that named somewhere else (a bundle piece kept its parent's
    // name: "Vyborg – Khiitola" on a Vladivostok train): the line's own first
    // and last stations (assets/title_from_stops.js, find_title_mismatch.py)
    if ((c.countries || []).some(k => RU_CC.has(k))){ title = ruEnglish(title); via = ruEnglish(via); brand = ruEnglish(brand); }
    // the local spelling the English one replaced (Bakı – Ağdam above Baku –
    // Aghdam) becomes the native line, as another script's name does
    { const lc = c.countries || [], was = title; title = localEnglish(title, lc); via = localEnglish(via, lc); brand = localEnglish(brand, lc);
      if (!nat && was !== title) nat = was; }
    const own = window.TITLE_FROM_STOPS && window.TITLE_FROM_STOPS[c.slug];
    if (own){ nat = ''; title = window.latinName(own[0]) + ' – ' + window.latinName(own[1]); via = '';     // the old name was wrong: not shown
      if ((c.countries || []).some(k => RU_CC.has(k))) title = ruEnglish(title);
      const was = title; title = localEnglish(title, c.countries || []); if (was !== title) nat = was; }
    if (nat && (c.countries || []).includes('UA'))
      nat = nat.replace(/\s*\((?:електричка|дизель-поїзд)\)/gi, '').replace(/\s*(?:Приміський|Пасажирський|Швидкий|Регіональний)\s+поїзд/gi, '').trim();
    // no native name in the data: the end stations' local names
    // (assets/native_titles.js), turned to run the same way as the title
    if (!nat && window.NATIVE_TITLES && NATIVE_TITLES[c.slug]){
      const [na, nb, ea, eb] = NATIVE_TITLES[c.slug];
      const key = x => (window.latinName(x) || '').toLowerCase().replace(/[^a-z]/g, '').slice(0, 5);
      const t0 = title.toLowerCase().replace(/[^a-z]/g, '').slice(0, 5);
      // the title starts where the native's last station is: turned round
      nat = t0 && key(eb) && t0 === key(eb) && t0 !== key(ea) ? `${nb} – ${na}` : `${na} – ${nb}`;
    }
    if (nat === title) nat = '';
    const ends = stops ? [stops[0], stops[stops.length - 1]] : null;
    return {title, ref, brand, via, native: nat, ends};
  };
})();
