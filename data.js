/* ============================================================
   PASSEPORT — data module
   Everything static: languages, level test, vocab seeds, topics
   ============================================================ */

const LANGS = {
  en: { code:'en', flag:'🇬🇧', name:'Anglais', speakCode:'en-US' },
  es: { code:'es', flag:'🇪🇸', name:'Espagnol', speakCode:'es-ES' },
};

const PASSIONS = {
  foot:      { label:'Football',       emoji:'⚽' },
  manga:     { label:'Mangas & Animes', emoji:'🥋' },
  jeuxvideo: { label:'Jeux vidéo',      emoji:'🎮' },
  cuisine:   { label:'Cuisine',         emoji:'🍳' },
  voyage:    { label:'Voyage',          emoji:'✈️' },
};

/* ---------- LEVEL TEST ----------
   ~15 graded questions per language, from A2 to C1.
   Each: prompt, 4 options, correct index, level weight.
   Scoring maps # correct (weighted by level) to a CEFR estimate. */

const LEVEL_TEST = {
  en: [
    { lvl:'A2', q:'She ___ to work every day by bus.', opts:['go','goes','going','gone'], a:1 },
    { lvl:'A2', q:'There aren\'t ___ apples left.', opts:['some','any','much','a'], a:1 },
    { lvl:'A2', q:'I saw a good film ___ weekend.', opts:['last','ago','since','yet'], a:0 },
    { lvl:'B1', q:'If it rains tomorrow, we ___ stay home.', opts:['will','would','are','have'], a:0 },
    { lvl:'B1', q:'I\'ve lived here ___ five years.', opts:['since','during','for','ago'], a:2 },
    { lvl:'B1', q:'He\'s the person ___ helped me.', opts:['which','who','whose','whom'], a:1 },
    { lvl:'B1', q:'You ___ smoke here — it\'s forbidden.', opts:['mustn\'t','don\'t have to','needn\'t','couldn\'t'], a:0 },
    { lvl:'B2', q:'By the time we arrived, the film ___.', opts:['started','has started','had started','was starting'], a:2 },
    { lvl:'B2', q:'I wish I ___ more time to travel.', opts:['have','had','would have','will have'], a:1 },
    { lvl:'B2', q:'The report needs ___ before Friday.', opts:['finishing','to finishing','finish','finished'], a:0 },
    { lvl:'B2', q:'She spoke ___ that everyone understood.', opts:['so clearly','such clearly','too clearly','clear enough'], a:0 },
    { lvl:'C1', q:'___ had I sat down when the phone rang.', opts:['No sooner','Hardly ever','Rarely','Only just'], a:0 },
    { lvl:'C1', q:'The proposal was turned ___ by the board.', opts:['down','over','off','in'], a:0 },
    { lvl:'C1', q:'He\'d rather you ___ tell anyone about this.', opts:['don\'t','didn\'t','wouldn\'t','not'], a:1 },
    { lvl:'C1', q:'Choose the most natural: "It\'s high time we ___."', opts:['leave','left','are leaving','will leave'], a:1 },
  ],
  es: [
    { lvl:'A2', q:'Yo ___ café todas las mañanas.', opts:['bebo','bebe','bebes','beber'], a:0 },
    { lvl:'A2', q:'¿___ está la estación, por favor?', opts:['Cómo','Dónde','Cuándo','Qué'], a:1 },
    { lvl:'A2', q:'Ayer ___ al cine con amigos.', opts:['voy','iba','fui','iré'], a:2 },
    { lvl:'B1', q:'Si tuviera dinero, ___ un coche.', opts:['compro','compraría','compraré','compre'], a:1 },
    { lvl:'B1', q:'En 2019 ___ un año en Madrid.', opts:['vivo','viví','viviré','viviendo'], a:1 },
    { lvl:'B1', q:'Quiero que tú ___ conmigo.', opts:['vienes','vengas','vendrás','venir'], a:1 },
    { lvl:'B1', q:'El libro ___ leí era interesante.', opts:['que','cual','quien','cuyo'], a:0 },
    { lvl:'B2', q:'Cuando llegué, la película ya ___.', opts:['empezó','ha empezado','había empezado','empezaba'], a:2 },
    { lvl:'B2', q:'Ojalá ___ más tiempo libre.', opts:['tengo','tenga','tuviera','tendré'], a:2 },
    { lvl:'B2', q:'Me molesta que ___ tan tarde.', opts:['llegas','llegues','llegarás','llegar'], a:1 },
    { lvl:'B2', q:'Habló tan rápido ___ no entendí nada.', opts:['que','como','tan','tanto'], a:0 },
    { lvl:'C1', q:'De ___ sabido antes, no habría aceptado.', opts:['haber lo','haberlo','habiéndolo','haberle'], a:1 },
    { lvl:'C1', q:'No creo que ___ razón en esto.', opts:['tienes','tengas','tendrás','tuvieras'], a:1 },
    { lvl:'C1', q:'El asunto quedó ___ resolver.', opts:['por','para','de','a'], a:0 },
    { lvl:'C1', q:'Elige lo más natural: "Como si ___ un experto."', opts:['es','sea','fuera','será'], a:2 },
  ],
};

/* ---------- VOCABULARY ----------
   The word bank lives in vocab.js (VOCAB_BANK_RAW, VOCAB_CATEGORIES). */

/* ---------- PRACTICAL SCENARIOS ---------- */
const SCENARIOS = [
  { id:'airport',    label:'À l\'aéroport',            cat:'voyage', role:{en:'an airport check-in officer', es:'un empleado de facturación del aeropuerto'} },
  { id:'hotel',      label:'Réserver un hôtel',        cat:'voyage', role:{en:'a hotel receptionist', es:'un recepcionista de hotel'} },
  { id:'directions', label:'Demander son chemin',      cat:'voyage', role:{en:'a friendly local giving directions', es:'un lugareño amable dando indicaciones'} },
  { id:'restaurant', label:'Au restaurant',            cat:'voyage', role:{en:'a restaurant waiter', es:'un camarero de restaurante'} },
  { id:'smalltalk',  label:'Small talk collègue',      cat:'pro',    role:{en:'a colleague making small talk', es:'un compañero de trabajo charlando'} },
  { id:'meeting',    label:'Se présenter en réunion',  cat:'pro',    role:{en:'a meeting host', es:'el anfitrión de una reunión'} },
  { id:'interview',  label:'Entretien d\'embauche',    cat:'pro',    role:{en:'a job interviewer', es:'un entrevistador de trabajo'} },
];

/* ---------- RESOURCES ---------- */
const RESOURCES = {
  en: [
    {t:'BBC Learning English — 6 Minute English', d:'Podcast court, sujets variés.', tag:'Général', icon:'🎧'},
    {t:'Luke\'s English Podcast', d:'Anglais britannique naturel, immersif.', tag:'Général', icon:'🎧'},
    {t:'Business English Pod', d:'Vocabulaire et situations pro.', tag:'Pro', icon:'💼'},
    {t:'BBC Sport (YouTube)', d:'Analyses foot en anglais.', tag:'Foot', icon:'⚽'},
    {t:'IGN / GameSpot (YouTube)', d:'Reviews jeux vidéo.', tag:'Jeux vidéo', icon:'🎮'},
    {t:'Binging with Babish', d:'Recettes commentées, très visuel.', tag:'Cuisine', icon:'🍳'},
  ],
  es: [
    {t:'Notes in Spanish', d:'Podcast par niveaux, très clair.', tag:'Général', icon:'🎧'},
    {t:'Español con Juan', d:'Immersion en espagnol naturel.', tag:'Général', icon:'🎧'},
    {t:'RTVE / El País (audio)', d:'Actualité en espagnol.', tag:'Général', icon:'📰'},
    {t:'DjMaRiiO (YouTube)', d:'Foot & FIFA en espagnol.', tag:'Foot', icon:'⚽'},
    {t:'Cocina con Carmen', d:'Recettes en espagnol.', tag:'Cuisine', icon:'🍳'},
  ],
};

/* ---------- CEFR TARGET HOURS (from B1 baseline to B2 solid) ---------- */
const TARGET_HOURS = 175;

/* ---------- WEEKLY PHASE PROGRAMS ----------
   Which language on which weekday, per mode.
   0=Sun ... 6=Sat */
const MODES = {
  solo_en:  { label:'Anglais seul (max vitesse)', plan:{0:'en',1:'en',2:'en',3:'en',4:'en',5:'en',6:'en'}, dormant:['es'] },
  en_focus: { label:'Anglais fort + Espagnol 1j', plan:{0:'en',1:'en',2:'en',3:'es',4:'en',5:'en',6:'en'}, dormant:[] },
  en_lead:  { label:'Anglais 5j / Espagnol 2j',   plan:{0:'es',1:'en',2:'en',3:'es',4:'en',5:'en',6:'en'}, dormant:[] },
  balanced: { label:'Équilibré',                  plan:{0:'es',1:'en',2:'es',3:'en',4:'es',5:'en',6:'en'}, dormant:[] },
};
