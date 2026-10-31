/* ============================================================
   PASSEPORT — app logic (localStorage, static, PWA)
   ============================================================ */

/* ---------- storage ---------- */
const DB = {
  get(k, fb){ try{ const v = localStorage.getItem('pp_'+k); return v===null ? fb : JSON.parse(v); }catch(e){ return fb; } },
  set(k, v){ try{ localStorage.setItem('pp_'+k, JSON.stringify(v)); }catch(e){ console.error(e); } },
};

/* ---------- date helpers ----------
   Local calendar dates (YYYY-MM-DD). v4 used UTC, so a session between
   midnight and 1-2 am in France counted for the previous day. */
const pad2 = n=> String(n).padStart(2,'0');
const isoLocal = d=> `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
const parseISO = iso=>{ const [y,m,d]=iso.split('-').map(Number); return new Date(y, m-1, d, 12); }; // noon: DST-safe
const todayISO = ()=> isoLocal(new Date());
const addDays = (iso,n)=>{ const d=parseISO(iso); d.setDate(d.getDate()+n); return isoLocal(d); };

/* ---------- global state ---------- */
let S = null;          // whole app state
let activeLang = 'en'; // current language code
let currentScreen = 'today';
let timer = { start:null };

/* default per-language state */
function defaultLangState(code){
  return {
    level: null,            // set after test: 'A2'|'B1'|'B2'|'C1'
    tested: false,
    deck: [],               // filled from vocab.js by syncDeck()
    removed: [],            // bank words the user deleted (normalized terms)
    newLog: {},             // date -> new words introduced that day
    newExtra: {},           // date -> extra new words requested that day
    errors: [],             // {label, example, count, lastSeen}
    progress: { totalMinutes:0, dailyLog:{}, streak:0, lastActiveDate:null, sessionsLog:[] },
  };
}

function loadState(){
  S = DB.get('state', null);
  if(!S){
    S = {
      onboarded:false,
      mode:'solo_en',
      dailyMinutes:50,
      passions:['foot','manga','jeuxvideo','cuisine','voyage'],
      langs: { en: defaultLangState('en'), es: defaultLangState('es') },
    };
    DB.set('state', S);
  }
  if(!S.newPerDay) S.newPerDay = 10;
  // ensure both langs exist, then bring decks up to date with the bank (v4 -> v5 safe)
  ['en','es'].forEach(c=>{ if(!S.langs[c]) S.langs[c]=defaultLangState(c); syncDeck(c); });
  S.version = 5;
  DB.set('state', S);
  activeLang = DB.get('activeLang', 'en');
}
function save(){ DB.set('state', S); }
const L = ()=> S.langs[activeLang];

/* ============================================================
   BOOT
   ============================================================ */
function boot(){
  loadState();
  registerSW();
  if(!S.onboarded){
    startOnboarding();
  } else {
    showApp();
  }
  document.querySelectorAll('.tab').forEach(t=> t.addEventListener('click', ()=> switchScreen(t.dataset.screen)));
  document.getElementById('topbar-lang').addEventListener('click', openLangSheet);
  window.addEventListener('beforeunload', stopTimer);
}

function showApp(){
  document.getElementById('onboarding').style.display='none';
  document.getElementById('app').style.display='flex';
  syncTopbar();
  switchScreen('today');
}

function syncTopbar(){
  document.getElementById('active-flag').textContent = LANGS[activeLang].flag;
  document.getElementById('active-lang-name').textContent = LANGS[activeLang].name;
  document.getElementById('topbar-streak').textContent = '🔥 ' + L().progress.streak;
}

/* ============================================================
   TIME + STREAK
   ============================================================ */
function startTimer(){ timer.start = Date.now(); }
function stopTimer(){
  if(!timer.start) return;
  const mins = (Date.now()-timer.start)/60000;
  timer.start = null;
  if(mins < 0.1) return;
  logMinutes(mins);
}
function logMinutes(mins){
  const t = todayISO(); const p = L().progress;
  p.totalMinutes += mins;
  p.dailyLog[t] = (p.dailyLog[t]||0) + mins;
  creditDay(t);
  save(); syncTopbar();
}
/* Guarantees streak + activity credit for `today`, independent of wall-clock timer.
   Called by any completed activity so a session always counts. */
function creditDay(t){
  const p = L().progress;
  if(p.lastActiveDate === t) return;              // already credited today
  if(p.lastActiveDate === addDays(t,-1)) p.streak += 1;   // consecutive day
  else p.streak = 1;                               // first day or gap -> reset to 1
  p.lastActiveDate = t;
}

/* ============================================================
   ONBOARDING + LEVEL TEST
   ============================================================ */
let testState = null;

function startOnboarding(){
  document.getElementById('app').style.display='none';
  const ov = document.getElementById('onboarding');
  ov.style.display='block';
  renderWelcome();
}

function renderWelcome(){
  const el = document.getElementById('onboarding-inner');
  el.innerHTML = `
    <div style="text-align:center; margin-bottom:26px;">
      <img src="icon-192.png" alt="Passeport" style="width:88px; height:88px; border-radius:20px; box-shadow:var(--shadow-lg);" onerror="this.style.display='none'">
      <h1 style="font-size:30px; margin-top:14px;">Passeport</h1>
      <p style="color:var(--ink-soft); margin-top:8px;">Ton copilote pour apprendre les langues, à ton rythme, chaque jour.</p>
    </div>
    <div class="qcard">
      <h3>On commence par l'anglais</h3>
      <p class="sub" style="margin-top:6px;">Un test rapide (~15 questions) évalue ton niveau réel pour que rien ne soit trop facile ni trop dur. L'espagnol pourra s'ajouter plus tard, sans te ralentir.</p>
      <button class="btn btn-primary btn-block" style="margin-top:18px;" onclick="beginTest('en')">Faire le test de niveau</button>
      <button class="btn btn-ghost btn-block" style="margin-top:10px;" onclick="skipTest('en')">Je connais mon niveau, passer</button>
    </div>
    <p style="text-align:center; font-size:12px; color:var(--ink-soft); margin-top:18px;">Tes données restent sur ton téléphone. Rien n'est envoyé.</p>
  `;
}

function beginTest(code){
  testState = { code, i:0, score:0, weighted:0, maxWeighted:0, answered:false };
  LEVEL_TEST[code].forEach(q=>{ testState.maxWeighted += lvlWeight(q.lvl); });
  renderQuestion();
}
function lvlWeight(l){ return {A2:1, B1:2, B2:3, C1:4}[l] || 1; }

function renderQuestion(){
  const { code, i } = testState;
  const bank = LEVEL_TEST[code];
  const q = bank[i];
  const el = document.getElementById('onboarding-inner');
  el.innerHTML = `
    <div class="qcard">
      <div class="qprog"><div class="qprog-fill" style="width:${(i/bank.length)*100}%"></div></div>
      <p class="sub" style="margin-bottom:4px;">Question ${i+1} / ${bank.length} · niveau ${q.lvl}</p>
      <h3 style="font-size:19px; margin-bottom:18px; line-height:1.4;">${q.q}</h3>
      <div id="qopts"></div>
    </div>`;
  const wrap = document.getElementById('qopts');
  q.opts.forEach((opt,idx)=>{
    const b = document.createElement('button');
    b.className='qopt'; b.textContent = opt;
    b.onclick = ()=> answerQuestion(idx, b);
    wrap.appendChild(b);
  });
}

function answerQuestion(idx, btn){
  if(testState.answered) return;
  testState.answered = true;
  const { code, i } = testState;
  const q = LEVEL_TEST[code][i];
  const opts = document.querySelectorAll('#qopts .qopt');
  opts.forEach((o,k)=>{
    o.style.pointerEvents='none';
    if(k===q.a) o.classList.add('correct');
    if(k===idx && idx!==q.a) o.classList.add('wrong');
  });
  if(idx===q.a){ testState.score++; testState.weighted += lvlWeight(q.lvl); }
  setTimeout(nextQuestion, 750);
}
function nextQuestion(){
  testState.answered = false;
  testState.i++;
  if(testState.i >= LEVEL_TEST[testState.code].length) finishTest();
  else renderQuestion();
}

function estimateCEFR(weighted, maxWeighted){
  const ratio = weighted / maxWeighted;
  if(ratio < 0.25) return 'A2';
  if(ratio < 0.48) return 'B1';
  if(ratio < 0.72) return 'B2';
  return 'C1';
}

function finishTest(){
  const { code, score, weighted, maxWeighted } = testState;
  const level = estimateCEFR(weighted, maxWeighted);
  S.langs[code].level = level;
  S.langs[code].tested = true;
  save();
  const bank = LEVEL_TEST[code];
  const el = document.getElementById('onboarding-inner');
  el.innerHTML = `
    <div class="qcard">
      <div class="ring-wrap">
        <p class="sub">Ton niveau estimé en ${LANGS[code].name.toLowerCase()}</p>
        <div class="level-badge">${level}</div>
        <div class="level-sub">${score}/${bank.length} bonnes réponses</div>
      </div>
      <div class="info-box">Ce niveau pilotera tout : la difficulté du vocabulaire, et surtout les prompts générés pour tes conversations avec ChatGPT ou Claude (débit, complexité, type de correction).</div>
      <button class="btn btn-primary btn-block" style="margin-top:18px;" onclick="finishOnboarding()">Continuer</button>
    </div>`;
}

function skipTest(code){
  const el = document.getElementById('onboarding-inner');
  el.innerHTML = `
    <div class="qcard">
      <h3>Quel est ton niveau en ${LANGS[code].name.toLowerCase()} ?</h3>
      <label class="field">Niveau CEFR</label>
      <select class="sel" id="manual-level">
        <option value="A2">A2 — Élémentaire</option>
        <option value="B1" selected>B1 — Intermédiaire</option>
        <option value="B2">B2 — Intermédiaire avancé</option>
        <option value="C1">C1 — Avancé</option>
      </select>
      <button class="btn btn-primary btn-block" style="margin-top:18px;" onclick="setManualLevel('${code}')">Valider</button>
    </div>`;
}
function setManualLevel(code){
  S.langs[code].level = document.getElementById('manual-level').value;
  S.langs[code].tested = true;
  save();
  finishOnboarding();
}

function finishOnboarding(){
  // ask passions + daily time quickly
  const el = document.getElementById('onboarding-inner');
  el.innerHTML = `
    <div class="qcard">
      <h3>Dernière étape</h3>
      <label class="field">Tes centres d'intérêt (sujets de conversation)</label>
      <div class="chips" id="ob-passions"></div>
      <label class="field">Temps par jour</label>
      <select class="sel" id="ob-time">
        <option value="40">40 min</option>
        <option value="50" selected>50 min</option>
        <option value="60">60 min</option>
        <option value="75">1h15+</option>
      </select>
      <button class="btn btn-primary btn-block" style="margin-top:20px;" onclick="completeOnboarding()">C'est parti</button>
    </div>`;
  const wrap = document.getElementById('ob-passions');
  Object.entries(PASSIONS).forEach(([k,m])=>{
    const c=document.createElement('button');
    c.className='chip'+(S.passions.includes(k)?' selected':''); c.dataset.k=k;
    c.innerHTML=`${m.emoji} ${m.label}`;
    c.onclick=()=> c.classList.toggle('selected');
    wrap.appendChild(c);
  });
}
function completeOnboarding(){
  S.passions = Array.from(document.querySelectorAll('#ob-passions .chip.selected')).map(c=>c.dataset.k);
  if(S.passions.length===0) S.passions=['voyage'];
  S.dailyMinutes = parseInt(document.getElementById('ob-time').value,10);
  S.onboarded = true;
  activeLang = 'en';
  DB.set('activeLang','en');
  save();
  showApp();
  toast('Bienvenue ! Ton programme est prêt.');
}

/* ============================================================
   DAILY PLAN (phase-aware language of the day)
   ============================================================ */
function langOfToday(){
  const mode = MODES[S.mode] || MODES.solo_en;
  const dow = new Date().getDay();
  return mode.plan[dow] || 'en';
}
function isDormant(code){
  const mode = MODES[S.mode] || MODES.solo_en;
  return mode.dormant.includes(code);
}

/* ============================================================
   SCREEN ROUTER
   ============================================================ */
function switchScreen(name){
  stopTimer();
  currentScreen = name;
  document.querySelectorAll('.tab').forEach(t=> t.classList.toggle('active', t.dataset.screen===name));
  const el = document.getElementById('screen');
  el.scrollTop = 0;
  if(name==='today') renderToday(el);
  if(name==='vocab') renderVocab(el);
  if(name==='practice') renderPractice(el);
  if(name==='progress') renderProgress(el);
  if(name==='settings') renderSettings(el);
}

/* ---------- TODAY ---------- */
function renderToday(el){
  const suggested = langOfToday();
  const showSwitchNote = suggested !== activeLang && !isDormant(suggested);
  const p = L().progress;
  const due = dueReviews().length;
  const nNew = Math.min(newAllowance(), newQueue().length);
  const dt = new Date().toLocaleDateString('fr-FR',{weekday:'long', day:'numeric', month:'long'});

  el.innerHTML = `
    <div class="plan-hero">
      <div class="lang-badge">${LANGS[activeLang].flag} ${LANGS[activeLang].name} · niveau ${L().level||'—'}</div>
      <h2>${cap(dt)}</h2>
      <div class="phase-note">${MODES[S.mode].label} · objectif ${S.dailyMinutes} min</div>
    </div>
    ${showSwitchNote ? `<div class="card" style="background:var(--gold-tint); border-color:#E8D5A8;">
      <div class="sub" style="color:#8A6423;">📅 Aujourd'hui, ton planning suggère plutôt <b>${LANGS[suggested].name}</b>.</div>
      <button class="btn btn-gold btn-sm" style="margin-top:10px;" onclick="quickSwitch('${suggested}')">Passer à ${LANGS[suggested].name}</button>
    </div>` : ''}
    <div id="today-tasks"></div>
    <div class="card">
      <h3>Ta progression</h3>
      <div class="pbar" style="margin-top:10px;"><div class="pbar-fill" style="width:${pct()}%"></div></div>
      <div class="pmeta"><span>${(p.totalMinutes/60).toFixed(1)}h / ${TARGET_HOURS}h</span><span>${etaText()}</span></div>
    </div>`;

  const tasks = [
    { icon:'📇', tt:'Réviser le vocabulaire', td: (due+nNew)>0?`${due} à réviser · ${nNew} nouveau${nNew>1?'x':''}`:'À jour ✓', screen:'vocab' },
    { icon:'🗣️', tt:'Conversation guidée', td:'Génère un prompt pour ChatGPT/Claude', screen:'practice' },
    { icon:'✍️', tt:'Production écrite', td:'Écris une phrase, fais-la corriger', screen:'practice' },
  ];
  const tw = document.getElementById('today-tasks');
  tasks.forEach(t=>{
    const d=document.createElement('div'); d.className='task';
    d.innerHTML=`<div class="ico">${t.icon}</div><div class="tx"><div class="tt">${t.tt}</div><div class="td">${t.td}</div></div>
      <svg class="chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>`;
    d.onclick=()=> switchScreen(t.screen);
    tw.appendChild(d);
  });
}
function quickSwitch(code){ setActiveLang(code); switchScreen('today'); }

function pct(){ return Math.min(100, (L().progress.totalMinutes/60/TARGET_HOURS)*100).toFixed(1); }
function weeklyPaceHours(){
  let sum=0; for(let i=0;i<7;i++){ sum += L().progress.dailyLog[addDays(todayISO(),-i)]||0; }
  const h=sum/60; return h>0.3 ? h : (S.dailyMinutes*6)/60;
}
function etaText(){
  const left = TARGET_HOURS - L().progress.totalMinutes/60;
  if(left<=0) return 'B2 atteint 🎉';
  const wk = Math.ceil(left/Math.max(0.5, weeklyPaceHours()));
  return `≈ ${wk} sem. restantes`;
}

/* ============================================================
   VOCAB ENGINE (v5)
   - The bank (vocab.js) is synced into each deck by term, so
     progress on existing words is never lost.
   - New words are introduced gradually (S.newPerDay per day),
     ordered by tested level, then interleaved across categories.
   - Categories follow the passions; imported words come first.
   ============================================================ */
const LEVEL_ORDER = { A2:['B1','B2','C1'], B1:['B1','B2','C1'], B2:['B2','B1','C1'], C1:['C1','B2','B1'] };
const normTerm = s=> String(s==null?'':s).toLowerCase().normalize('NFC').replace(/\s+/g,' ').trim();
const slugify = s=> String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'') || 'w';
const daysBetween = (a,b)=> Math.round((parseISO(b)-parseISO(a))/86400000);
const screenEl = ()=> document.getElementById('screen');

const _bankCache = {};
function bankWords(code){
  if(_bankCache[code]) return _bankCache[code];
  const out=[];
  const raw = (typeof VOCAB_BANK_RAW!=='undefined' && VOCAB_BANK_RAW[code]) || {};
  Object.entries(raw).forEach(([cat, block])=>{
    block.split('\n').forEach(line=>{
      const p=line.split(' | ').map(x=>x.trim());
      if(p.length<4 || !p[1]) return;
      out.push({ level:p[0], term:p[1], fr:p[2], example:p[3], category:cat });
    });
  });
  return (_bankCache[code]=out);
}
function catLabel(cat){ const m=VOCAB_CATEGORIES[cat]; return m?m.label:(cat||''); }
function catEmoji(cat){ const m=VOCAB_CATEGORIES[cat]; return m?m.emoji:'•'; }

function newCard(code, w, ids, extra){
  const base = code+'_'+slugify(w.term); let id=base, n=2;
  while(ids.has(id)) id = base+'-'+(n++);
  ids.add(id);
  return Object.assign({ id, en:w.term, fr:w.fr, example:w.example||'', category:w.category, level:w.level||'B1',
    interval:0, repetition:0, easeFactor:2.5, dueDate:null, isNew:true }, extra||{});
}

/* Adds bank words missing from the deck, refreshes the texts of bank
   words, and upgrades v4 cards. Never touches review progress. */
function syncDeck(code){
  const ls = S.langs[code];
  ls.deck = ls.deck || [];
  ls.removed = ls.removed || [];
  ls.newLog = ls.newLog || {};
  ls.newExtra = ls.newExtra || {};
  const removed = new Set(ls.removed);
  const ids = new Set(ls.deck.map(c=>c.id));
  const byTerm = new Map(ls.deck.map(c=>[normTerm(c.en), c]));
  // v4 -> v5: cards never reviewed become "new" and are introduced gradually
  ls.deck.forEach(c=>{
    if(c.isNew===undefined){
      c.isNew = (c.repetition===0 && c.interval===0);
      if(c.isNew) c.dueDate = null;
    }
  });
  let added=0;
  bankWords(code).forEach(w=>{
    const k=normTerm(w.term);
    if(removed.has(k)) return;
    const c=byTerm.get(k);
    if(c){
      if(!c.user){ c.fr=w.fr; c.example=w.example; c.category=w.category; c.level=w.level; }
      return;
    }
    const card=newCard(code, w, ids);
    ls.deck.push(card); byTerm.set(k, card); added++;
  });
  const cutoff = addDays(todayISO(), -30);
  [ls.newLog, ls.newExtra].forEach(o=> Object.keys(o).forEach(d=>{ if(d<cutoff) delete o[d]; }));
  return added;
}

function activeCats(){
  const set=new Set(Object.keys(VOCAB_CATEGORIES).filter(k=>VOCAB_CATEGORIES[k].always));
  (S.passions||[]).forEach(p=>set.add(p));
  return set;
}
/* Ordered queue of words not yet introduced. */
function newQueue(){
  const cats=activeCats();
  const order = LEVEL_ORDER[L().level] || LEVEL_ORDER.B1;
  const lvlRank = l=>{ const i=order.indexOf(l); return i<0?order.length:i; };
  const catKeys = Object.keys(VOCAB_CATEGORIES);
  const pos={}, user=[], rest=[];
  L().deck.forEach(c=>{
    if(!c.isNew) return;
    if(c.user){ user.push(c); return; }
    if(!cats.has(c.category)) return;
    const g=c.level+'/'+c.category;
    pos[g]=pos[g]||0;
    rest.push({ c, r:lvlRank(c.level), p:pos[g]++, k:catKeys.indexOf(c.category) });
  });
  rest.sort((a,b)=> a.r-b.r || a.p-b.p || a.k-b.k);
  return user.concat(rest.map(x=>x.c));
}
function newPerDay(){ return S.newPerDay || 10; }
function newAllowance(){
  const t=todayISO(), ls=L();
  return Math.max(0, newPerDay() + (ls.newExtra[t]||0) - (ls.newLog[t]||0));
}
function dueReviews(){
  const t=todayISO();
  return L().deck.filter(c=>!c.isNew && c.dueDate && c.dueDate<=t).sort((a,b)=> a.dueDate<b.dueDate?-1:a.dueDate>b.dueDate?1:0);
}
function todaysNew(){ return newQueue().slice(0, newAllowance()); }
function moreNew(){ const t=todayISO(); L().newExtra[t]=(L().newExtra[t]||0)+5; save(); renderVocab(screenEl()); }

/* ---------- VOCAB HOME ---------- */
let reviewQ=[], reviewI=0, revealed=false, vocabMode='home', reviewsGradedThisSession=0;
function renderVocab(el){
  if(vocabMode==='review'){ renderReview(el); return; }
  if(vocabMode==='sort'){ renderSort(el); return; }
  if(vocabMode==='import'){ renderImport(el); return; }
  if(vocabMode==='manage'){ renderManage(el); return; }
  const due=dueReviews().length, nq=newQueue(), allow=newAllowance();
  const nToday=Math.min(allow, nq.length);
  const unsorted=nq.filter(c=>!c.sorted).length;
  const total=due+nToday;
  el.innerHTML = `
    <div class="screen-head"><h1>Vocabulaire</h1><p>Répétition espacée, calibrée à ton niveau ${L().level||''}.</p></div>
    <div class="card">
      <h3>Session du jour</h3>
      <p class="sub">${total>0?`${due} à réviser · ${nToday} nouveau${nToday>1?'x':''}`:(nq.length?'Fini pour aujourd\'hui ✓':'Tout est à jour ✓')}</p>
      <button class="btn btn-primary btn-block" style="margin-top:14px;" ${total===0?'disabled':''} onclick="startReview()">${total>0?'Commencer':'Rien à réviser'}</button>
      ${allow===0 && nq.length>0?`<button class="btn btn-ghost btn-block btn-sm" style="margin-top:10px;" onclick="moreNew()">＋ 5 mots de plus aujourd'hui</button>`:''}
      <div class="mini">${newPerDay()} nouveaux mots par jour · réglable dans Réglages</div>
    </div>
    ${unsorted>0?`<div class="card" style="background:var(--blue-tint); border-color:#C4DBE9;">
      <h3>Écarter les mots que tu connais</h3>
      <p class="sub" style="color:#2C5566;">Passe en revue les ${Math.min(15,unsorted)} prochains mots, un tap par mot : ceux que tu connais sortent de la file.</p>
      <button class="btn btn-blue btn-block" style="margin-top:12px;" onclick="startSort()">Trier (rapide)</button>
    </div>`:''}
    <div class="card">
      <h3>Ajouter des mots</h3>
      <p class="sub">Fais générer des mots par ChatGPT ou Claude sur le thème de ton choix, ou importe ceux de ta dernière conversation.</p>
      <button class="btn btn-ghost btn-block" style="margin-top:12px;" onclick="openImport()">＋ Ajouter des mots</button>
    </div>
    <div class="card">
      <h3>Ta banque (${L().deck.length} mots)</h3>
      <div id="deck-preview" style="margin-top:8px;"></div>
      <button class="btn btn-ghost btn-block btn-sm" style="margin-top:12px;" onclick="openManage()">Voir et gérer mes mots</button>
    </div>`;
  renderDeckPreview();
}
function renderDeckPreview(){
  const box=document.getElementById('deck-preview'); if(!box) return;
  const cats=activeCats(), stats={};
  L().deck.forEach(c=>{
    const s=stats[c.category]=stats[c.category]||{n:0, seen:0};
    s.n++; if(!c.isNew) s.seen++;
  });
  const keys=Object.keys(VOCAB_CATEGORIES).filter(k=>stats[k]).concat(Object.keys(stats).filter(k=>!VOCAB_CATEGORIES[k]));
  box.innerHTML = keys.map(k=>{
    const s=stats[k], off=!cats.has(k);
    return `<div class="cat-row${off?' off':''}"><span>${catEmoji(k)} ${esc(catLabel(k))}${off?' <span class="sub">· hors programme</span>':''}</span><span class="cr-n">${s.seen} / ${s.n}</span></div>`;
  }).join('') + `<div class="mini">mots vus / mots dans la catégorie. Les catégories suivent tes centres d'intérêt (Réglages).</div>`;
}

/* ---------- SORT (quick "I already know this") ---------- */
let sortQ=[], sortI=0, sortStats=null;
function startSort(){
  sortQ=newQueue().filter(c=>!c.sorted).slice(0,15);
  if(!sortQ.length){ toast('Rien à trier pour l\'instant.'); return; }
  sortI=0; sortStats={known:0, vague:0, learn:0}; vocabMode='sort'; renderSort(screenEl());
}
function renderSort(el){
  if(sortI>=sortQ.length){ endSort(); return; }
  const c=sortQ[sortI];
  el.innerHTML=`
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <button class="btn btn-ghost btn-sm" onclick="endSort()">← Terminer</button>
      <span class="sub">${sortI+1} / ${sortQ.length}</span>
    </div>
    <div class="fc"><span class="cat">${catEmoji(c.category)} ${esc(catLabel(c.category))}</span><span class="lvl">${esc(c.level||'')}</span>
      <div class="word">${esc(c.en)}</div><div class="ex">${esc(c.fr)}</div></div>
    <p class="sub" style="text-align:center; margin-top:16px;">Tu connais déjà ce mot ?</p>
    <div style="display:flex; flex-direction:column; gap:10px; margin-top:10px;">
      <button class="btn btn-primary btn-block" onclick="gradeSort('known')">✓ Je le connais bien</button>
      <button class="btn btn-blue btn-block" onclick="gradeSort('vague')">🤔 Vaguement</button>
      <button class="btn btn-ghost btn-block" onclick="gradeSort('learn')">🆕 À apprendre</button>
    </div>`;
}
function gradeSort(v){
  const c=sortQ[sortI];
  if(v==='known'){ c.isNew=false; c.repetition=3; c.interval=60; c.easeFactor=2.6; c.dueDate=addDays(todayISO(),60); delete c.sorted; }
  else if(v==='vague'){ c.isNew=false; c.repetition=1; c.interval=3; c.dueDate=addDays(todayISO(),3); delete c.sorted; }
  else c.sorted=true;
  sortStats[v]++; save();
  sortI++;
  renderSort(screenEl());
}
function endSort(){
  const s=sortStats; sortStats=null; sortQ=[];
  vocabMode='home'; renderVocab(screenEl());
  if(s && s.known+s.vague+s.learn>0) toast(`${s.known+s.vague} mot(s) écarté(s) · ${s.learn} à apprendre`);
}

/* ---------- REVIEW SESSION ---------- */
function startReview(){
  reviewQ=dueReviews().concat(todaysNew());
  if(!reviewQ.length){ toast('Rien à réviser pour l\'instant.'); return; }
  reviewI=0; reviewsGradedThisSession=0; vocabMode='review'; startTimer(); renderReview(screenEl());
}
function renderReview(el){
  if(reviewI>=reviewQ.length){ endReview(); return; }
  revealed=false;
  const c=reviewQ[reviewI];
  const tag=`<span class="cat">${catEmoji(c.category)} ${esc(catLabel(c.category))}</span>`;
  const front = c.isNew
    ? `${tag}<span class="lvl new">Nouveau · ${esc(c.level||'')}</span><div class="word">${esc(c.en)}</div><div class="hint">Nouveau mot : devine le sens, puis touche pour vérifier</div>`
    : `${tag}<span class="lvl">${esc(c.level||'')}</span><div class="word">${esc(c.fr)}</div><div class="hint">Comment dit-on ça ? Touche pour révéler</div>`;
  el.innerHTML=`
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <button class="btn btn-ghost btn-sm" onclick="endReview()">← Quitter</button>
      <span class="sub">${reviewI+1} / ${reviewQ.length}</span>
    </div>
    <div class="fc" id="fc" onclick="reveal()">${front}</div>
    <div id="fc-controls"></div>`;
}
function reveal(){
  if(revealed) return; revealed=true;
  const c=reviewQ[reviewI];
  document.getElementById('fc').innerHTML=`<span class="cat">${catEmoji(c.category)} ${esc(catLabel(c.category))}</span><span class="lvl${c.isNew?' new':''}">${c.isNew?'Nouveau · ':''}${esc(c.level||'')}</span>
    <div class="word">${esc(c.en)}</div><div class="fr">${esc(c.fr)}</div>${c.example?`<div class="ex">${esc(c.example)}</div>`:''}`;
  document.getElementById('fc-controls').innerHTML=`
    <div class="fc-grid">
      <button class="fc-b again" onclick="grade(1)">Encore</button>
      <button class="fc-b hard" onclick="grade(3)">Difficile</button>
      <button class="fc-b good" onclick="grade(4)">Bien</button>
      <button class="fc-b easy" onclick="grade(5)">Facile</button>
    </div>
    <button class="btn btn-ghost btn-sm btn-block" style="margin-top:12px;" onclick="grade(9)">Je connais déjà — ne plus demander</button>`;
}
function grade(q){
  const c=reviewQ[reviewI];
  const wasNew=c.isNew;
  if(q===9){ c.repetition=4; c.interval=90; c.easeFactor=Math.max(c.easeFactor,2.6); c.dueDate=addDays(todayISO(),90); }
  else sm2(c,q);
  if(wasNew){
    c.isNew=false; delete c.sorted;
    // a word you already knew doesn't use up today's quota of new words
    if(q!==9){ const t=todayISO(); L().newLog[t]=(L().newLog[t]||0)+1; }
  }
  reviewsGradedThisSession++;
  save();
  reviewI++;
  if(reviewI>=reviewQ.length){ endReview(); toast('Session terminée, bien joué !'); return; }
  renderReview(screenEl());
}
function sm2(card,q){
  if(q>=3){
    if(card.repetition===0) card.interval=1;
    else if(card.repetition===1) card.interval=6;
    else card.interval=Math.round(card.interval*card.easeFactor);
    card.repetition+=1;
  } else { card.repetition=0; card.interval=1; }
  card.easeFactor=Math.max(1.3, card.easeFactor+(0.1-(5-q)*(0.08+(5-q)*0.02)));
  card.dueDate=addDays(todayISO(), card.interval);
}
function endReview(){
  stopTimer();
  // Guarantee the day counts and a minimum credit, even if wall-clock elapsed was tiny
  if(reviewsGradedThisSession > 0){
    const t = todayISO();
    if((L().progress.dailyLog[t]||0) < 0.5){ L().progress.totalMinutes += 0.5; L().progress.dailyLog[t]=(L().progress.dailyLog[t]||0)+0.5; }
    creditDay(t); save(); syncTopbar();
  }
  reviewsGradedThisSession = 0; reviewQ=[];
  vocabMode='home'; renderVocab(screenEl());
}

/* ---------- IMPORT (words generated by ChatGPT / Claude) ---------- */
const THEME_DESC = {
  essentiels:'everyday expressions, phrasal verbs and common idioms',
  nuance:'linking words and expressions to give opinions, agree, disagree and nuance an argument',
  pro:'work and office life (meetings, emails, projects, job interviews)',
  voyage:'travel (airports, hotels, getting around, sightseeing)',
  foot:'football (matches, tactics, transfers, commentary)',
  manga:'manga and anime (stories, characters, watching and reading)',
  jeuxvideo:'video games (gameplay, gamer slang, the industry)',
  cuisine:'cooking (techniques, utensils, tastes, recipes)',
};
const IMPORT_FORMAT = 'term | French translation | short example sentence';
let imp = { theme:null, items:[], cat:'perso' };

function openImport(){ vocabMode='import'; imp.items=[]; if(currentScreen==='vocab') renderVocab(screenEl()); else switchScreen('vocab'); }
function backToVocab(){ vocabMode='home'; renderVocab(screenEl()); }

function renderImport(el){
  const themes=['essentiels','nuance','pro'].concat((S.passions||[]).filter(p=>VOCAB_CATEGORIES[p]));
  el.innerHTML=`
    <div style="margin-bottom:12px;"><button class="btn btn-ghost btn-sm" onclick="backToVocab()">← Vocab</button></div>
    <div class="screen-head"><h1>Ajouter des mots</h1><p>L'IA propose, tu choisis. Les mots ajoutés passent en priorité dans tes prochaines sessions.</p></div>
    <div class="card">
      <h3>1. Fais générer des mots</h3>
      <p class="sub">Choisis un thème (ou écris le tien), puis copie le prompt dans ChatGPT ou Claude. Tu peux sauter cette étape si tu as déjà une liste.</p>
      <div class="chips" id="imp-themes">${themes.map(k=>`<button class="chip${imp.theme===k?' selected':''}" data-k="${k}" onclick="pickImpTheme('${k}')">${catEmoji(k)} ${esc(catLabel(k))}</button>`).join('')}</div>
      <input class="inp" id="imp-custom" style="margin-top:12px;" placeholder="Ou un thème libre : la Formule 1, le jardinage…" oninput="onImpCustom()">
      <label class="field">Nombre de mots</label>
      <select class="sel" id="imp-n">${[10,15,20,30].map(n=>`<option value="${n}" ${n===15?'selected':''}>${n}</option>`).join('')}</select>
      <button class="btn btn-blue btn-block" style="margin-top:14px;" onclick="buildGenPrompt()">Créer le prompt</button>
      <div id="imp-prompt-wrap" style="display:none;">
        <div class="prompt-box" id="pg-out"></div>
        <button class="btn btn-primary btn-block" style="margin-top:12px;" onclick="copyPrompt()">📋 Copier le prompt</button>
      </div>
    </div>
    <div class="card">
      <h3>2. Colle la réponse de l'IA</h3>
      <p class="sub">Une ligne par mot : <b>mot | traduction | exemple</b>. Ça marche aussi avec la liste donnée en fin de conversation, et tu peux taper un mot à la main.</p>
      <textarea class="ta" id="imp-text" placeholder="to wind down | décompresser | I read before bed to wind down."></textarea>
      <button class="btn btn-primary btn-block" style="margin-top:10px;" onclick="parseImportText()">Analyser</button>
      <div id="imp-preview"></div>
    </div>`;
}
function pickImpTheme(k){
  imp.theme = imp.theme===k ? null : k;
  document.querySelectorAll('#imp-themes .chip').forEach(c=>c.classList.toggle('selected', c.dataset.k===imp.theme));
  if(imp.theme){ const i=document.getElementById('imp-custom'); if(i) i.value=''; }
}
function onImpCustom(){
  if(document.getElementById('imp-custom').value.trim()){ imp.theme=null; document.querySelectorAll('#imp-themes .chip').forEach(c=>c.classList.remove('selected')); }
}
function genPrompt(themeKey, custom, n){
  const langName = activeLang==='es' ? 'Spanish (as spoken in Spain)' : 'English';
  const lvl = L().level || 'B1';
  const theme = custom || THEME_DESC[themeKey] || catLabel(themeKey);
  const have = L().deck.filter(c=> custom ? c.user : (c.category===themeKey || c.user)).map(c=>c.en).slice(0,150);
  const excl = have.length ? `\nDo not include any of these, which I already have: ${have.join('; ')}.` : '';
  return `I'm a French speaker learning ${langName}, currently at ${lvl} level (CEFR). Give me ${n} useful ${langName} words or expressions about: ${theme}.
Pick ones that fit my level (a bit above is fine, nothing too basic). Prefer natural, frequently used expressions, collocations and phrasal verbs over rare words.${excl}
Reply ONLY with ${n} lines, no title, no numbering, no extra text, exactly in this format:
${IMPORT_FORMAT}`;
}
function buildGenPrompt(){
  const custom=document.getElementById('imp-custom').value.trim();
  if(!custom && !imp.theme){ toast('Choisis un thème ou écris le tien.'); return; }
  const n=parseInt(document.getElementById('imp-n').value,10)||15;
  document.getElementById('pg-out').textContent = genPrompt(imp.theme, custom, n);
  imp.cat = custom ? 'perso' : imp.theme;
  const w=document.getElementById('imp-prompt-wrap'); w.style.display='block';
  w.scrollIntoView({behavior:'smooth', block:'nearest'});
}

/* Tolerant parser: accepts "a | b | c", markdown tables, bullets,
   numbering, bold, and falls back to tabs or spaced dashes. */
function parseImport(text){
  const out=[];
  String(text||'').split(/\r?\n/).forEach(raw=>{
    let l=raw.trim();
    if(!l) return;
    if(/^\|?\s*:?-{3,}/.test(l)) return;                         // table separator
    l=l.replace(/\*\*|__|`/g,'');                                  // markdown emphasis
    l=l.replace(/^(\d+\s*[.)]\s*|[-*•·–—]\s+)/,'');                // numbering / bullets
    l=l.replace(/^\|/,'').replace(/\|\s*$/,'').trim();             // table borders
    let parts;
    if(l.includes('|')) parts=l.split('|');
    else if(l.includes('\t')) parts=l.split('\t');
    else if(/\s[–—]\s/.test(l)) parts=l.split(/\s[–—]\s/);
    else return;
    parts=parts.map(p=>p.trim().replace(/^["«“'](.*)["»”']$/,'$1').trim());
    const term=parts[0], fr=parts[1]||'', example=parts.slice(2).filter(Boolean).join(', ');
    if(!term || !fr) return;
    if(/^(terms?|words?|mots?|termes?|expressions?|palabras?|términos?)$/i.test(term)) return;   // header row
    out.push({ term:term.slice(0,80), fr:fr.slice(0,120), example:example.slice(0,220) });
  });
  return out;
}
function parseImportText(){
  const items=parseImport(document.getElementById('imp-text').value);
  if(!items.length){ toast('Aucune ligne reconnue. Format : mot | traduction | exemple'); return; }
  const have=new Set(L().deck.map(c=>normTerm(c.en))), seen=new Set();
  imp.items=items.map(it=>{ const k=normTerm(it.term); const dup=have.has(k)||seen.has(k); seen.add(k); return Object.assign(it,{dup, on:!dup}); });
  renderImportPreview();
}
function renderImportPreview(){
  const box=document.getElementById('imp-preview'); if(!box) return;
  const nOk=imp.items.filter(x=>!x.dup).length;
  const cats=Object.keys(VOCAB_CATEGORIES);
  box.innerHTML=`
    <div class="divider"></div>
    <h3 style="font-size:15px;">${imp.items.length} mot(s) trouvé(s)${nOk<imp.items.length?` · ${imp.items.length-nOk} déjà dans ta banque`:''}</h3>
    <label class="field">Ranger dans</label>
    <select class="sel" id="imp-cat">${cats.map(k=>`<option value="${k}" ${k===(imp.cat||'perso')?'selected':''}>${catEmoji(k)} ${esc(catLabel(k))}</option>`).join('')}</select>
    <div style="margin-top:8px;">${imp.items.map((x,i)=>`
      <label class="imp-row${x.dup?' dup':''}">
        <input type="checkbox" ${x.on?'checked':''} ${x.dup?'disabled':''} onchange="toggleImp(${i}, this.checked)">
        <div><b>${esc(x.term)}</b> — ${esc(x.fr)}${x.example?`<div class="we">${esc(x.example)}</div>`:''}${x.dup?'<div class="tagdup">déjà dans ta banque</div>':''}</div>
      </label>`).join('')}</div>
    <button class="btn btn-primary btn-block" style="margin-top:14px;" id="imp-go" onclick="confirmImport()"></button>`;
  updateImpButton();
}
function toggleImp(i,on){ imp.items[i].on=on; updateImpButton(); }
function updateImpButton(){
  const b=document.getElementById('imp-go'); if(!b) return;
  const n=imp.items.filter(x=>x.on && !x.dup).length;
  b.textContent = n ? `Ajouter ${n} mot${n>1?'s':''}` : 'Aucun mot sélectionné';
  b.disabled = n===0;
}
function confirmImport(){
  const cat=document.getElementById('imp-cat').value;
  const ids=new Set(L().deck.map(c=>c.id));
  const lvl=L().level||'B1';
  let n=0;
  imp.items.filter(x=>x.on && !x.dup).forEach(x=>{
    L().deck.push(newCard(activeLang, {term:x.term, fr:x.fr, example:x.example, category:cat, level:lvl}, ids, {user:true, added:todayISO()}));
    const k=normTerm(x.term);
    L().removed = L().removed.filter(r=>r!==k);
    n++;
  });
  save();
  imp.items=[]; vocabMode='home'; renderVocab(screenEl());
  toast(`${n} mot(s) ajouté(s), en priorité dans tes prochaines sessions.`);
}

/* ---------- MANAGE (browse / search / delete) ---------- */
let mg={ q:'', cat:'all', limit:60 };
function openManage(){ vocabMode='manage'; mg.limit=60; renderVocab(screenEl()); }
function renderManage(el){
  const cats=Object.keys(VOCAB_CATEGORIES);
  el.innerHTML=`
    <div style="margin-bottom:12px;"><button class="btn btn-ghost btn-sm" onclick="backToVocab()">← Vocab</button></div>
    <div class="screen-head"><h1>Mes mots</h1><p>${L().deck.length} mots · ${LANGS[activeLang].name}</p></div>
    <input class="inp" id="mg-q" placeholder="Rechercher un mot ou une traduction" value="${esc(mg.q)}" oninput="mg.q=this.value; mg.limit=60; renderManageList()">
    <select class="sel" id="mg-cat" style="margin-top:10px;" onchange="mg.cat=this.value; mg.limit=60; renderManageList()">
      <option value="all">Toutes les catégories</option>
      ${cats.map(k=>`<option value="${k}" ${mg.cat===k?'selected':''}>${catEmoji(k)} ${esc(catLabel(k))}</option>`).join('')}
    </select>
    <div class="card" style="margin-top:12px; padding:4px 16px;" id="mg-list"></div>`;
  renderManageList();
}
function cardStatus(c){
  const t=todayISO();
  if(c.isNew) return (c.user || activeCats().has(c.category)) ? 'À découvrir' : 'Hors programme (centre d\'intérêt non coché)';
  if(!c.dueDate || c.dueDate<=t) return 'À réviser aujourd\'hui';
  const d=daysBetween(t, c.dueDate);
  return `Prochaine révision dans ${d} j`;
}
function renderManageList(){
  const box=document.getElementById('mg-list'); if(!box) return;
  const q=normTerm(mg.q);
  const all=L().deck.filter(c=> (mg.cat==='all'||c.category===mg.cat) && (!q || normTerm(c.en).includes(q) || normTerm(c.fr).includes(q)));
  const list=all.slice(0, mg.limit);
  if(!all.length){ box.innerHTML='<div class="empty">Aucun mot trouvé.</div>'; return; }
  box.innerHTML = list.map(c=>`
    <div class="word-row">
      <div class="wr-tx">
        <div class="wr-term">${esc(c.en)} ${c.level?`<span class="badge">${esc(c.level)}</span>`:''}${c.user?'<span class="badge user">ajouté</span>':''}</div>
        <div class="wr-fr">${esc(c.fr)}</div>
        <div class="wr-meta">${catEmoji(c.category)} ${esc(catLabel(c.category))} · ${cardStatus(c)}</div>
      </div>
      <button class="wr-del" aria-label="Supprimer ${esc(c.en)}" onclick="deleteCard('${c.id}')">✕</button>
    </div>`).join('') +
    (all.length>list.length?`<button class="btn btn-ghost btn-block btn-sm" style="margin:12px 0;" onclick="mg.limit+=100; renderManageList()">Afficher plus (${all.length-list.length} restants)</button>`:'');
}
function deleteCard(id){
  const ls=L(); const c=ls.deck.find(x=>x.id===id); if(!c) return;
  if(!confirm(`Supprimer « ${c.en} » de ta banque ?`)) return;
  ls.deck=ls.deck.filter(x=>x.id!==id);
  if(!c.user){ const k=normTerm(c.en); if(!ls.removed.includes(k)) ls.removed.push(k); }
  save(); renderManageList();
  toast('Mot supprimé.');
}

/* ---------- PRACTICE / PROMPT GENERATOR ---------- */
let practiceTab='oral';
function renderPractice(el){
  el.innerHTML=`
    <div class="screen-head"><h1>Prompts guidés</h1><p>Générés pour ton niveau ${L().level||''}, tes passions et tes erreurs. À copier dans ChatGPT ou Claude.</p></div>
    <div class="seg">
      <button class="${practiceTab==='oral'?'active':''}" onclick="setPracticeTab('oral')">Oral</button>
      <button class="${practiceTab==='written'?'active':''}" onclick="setPracticeTab('written')">Écrit</button>
      <button class="${practiceTab==='correct'?'active':''}" onclick="setPracticeTab('correct')">Correction</button>
    </div>
    <div id="practice-body"></div>`;
  renderPracticeBody();
}
function setPracticeTab(t){ practiceTab=t; renderPractice(document.getElementById('screen')); }
function renderPracticeBody(){
  const b=document.getElementById('practice-body');
  if(practiceTab==='correct'){
    b.innerHTML=`
      <div class="card">
        <h3>Prompt de correction</h3>
        <p class="sub">Colle ce prompt + ton texte dans ChatGPT/Claude pour une correction expliquée et adaptée à ton niveau.</p>
        <div class="prompt-box" id="pg-out">${esc(correctionPrompt())}</div>
        <button class="btn btn-primary btn-block" style="margin-top:12px;" onclick="copyPrompt()">📋 Copier</button>
        <div class="copy-hint">Ajoute ton texte à la suite après l'avoir collé.</div>
        <button class="btn btn-ghost btn-block btn-sm" style="margin-top:12px;" onclick="openImport()">📥 Importer les mots proposés par l'IA</button>
      </div>
      <div class="card">
        <h3>Reporter mes erreurs</h3>
        <p class="sub">Après correction, note ici les 2-3 erreurs récurrentes signalées. Elles seront réinjectées dans tes prochains prompts.</p>
        <textarea class="ta" id="err-input" placeholder="Ex: confusion present perfect / past simple"></textarea>
        <button class="btn btn-ghost btn-block btn-sm" style="margin-top:10px;" onclick="addManualError()">Ajouter à mes points faibles</button>
      </div>`;
    return;
  }
  // oral or written: pick topic
  b.innerHTML=`
    <div class="card">
      <h3>1. Choisis ton sujet</h3>
      <div class="seg" style="margin-top:12px;">
        <button class="active" id="tt-passion" onclick="setTopicType('passion')">Passion</button>
        <button id="tt-practical" onclick="setTopicType('practical')">Scénario</button>
      </div>
      <div class="chips" id="topic-chips"></div>
    </div>
    <div class="card" id="prompt-card" style="display:none;">
      <h3>2. Copie ce prompt</h3>
      <div class="prompt-box" id="pg-out"></div>
      <button class="btn btn-primary btn-block" style="margin-top:12px;" onclick="copyPrompt()">📋 Copier le prompt</button>
      <div class="copy-hint">Colle-le dans ChatGPT ou Claude (mode vocal pour l'oral) pour démarrer.</div>
      <button class="btn btn-ghost btn-block btn-sm" style="margin-top:12px;" id="practice-done-btn" onclick="markPracticeDone()">✓ J'ai fait ma session (+12 min)</button>
      <button class="btn btn-ghost btn-block btn-sm" style="margin-top:10px;" onclick="openImport()">📥 Importer les mots de la conversation</button>
      <div class="copy-hint">À la fin, l'IA te donne tes erreurs et 5 mots à apprendre : colle les mots ici, reporte les erreurs dans l'onglet Correction.</div>
    </div>`;
  topicType='passion'; renderTopicChips();
}
let topicType='passion', selectedTopic=null, practiceLogged=false;
function setTopicType(t){
  topicType=t;
  document.getElementById('tt-passion').classList.toggle('active', t==='passion');
  document.getElementById('tt-practical').classList.toggle('active', t==='practical');
  renderTopicChips();
}
function renderTopicChips(){
  const w=document.getElementById('topic-chips'); w.innerHTML='';
  if(topicType==='passion'){
    S.passions.forEach(p=>{
      const m=PASSIONS[p]; if(!m) return;
      const c=document.createElement('button'); c.className='chip'; c.innerHTML=`${m.emoji} ${m.label}`;
      c.onclick=()=>{ selectTopic('passion', p, m.label, c); }; w.appendChild(c);
    });
  } else {
    SCENARIOS.forEach(s=>{
      const c=document.createElement('button'); c.className='chip'; c.textContent=s.label;
      c.onclick=()=>{ selectTopic('practical', s.id, s.label, c); }; w.appendChild(c);
    });
  }
}
function selectTopic(kind, id, label, chip){
  document.querySelectorAll('#topic-chips .chip').forEach(x=>x.classList.remove('selected'));
  chip.classList.add('selected');
  selectedTopic={ kind, id, label };
  practiceLogged=false;
  const doneBtn=document.getElementById('practice-done-btn');
  if(doneBtn){ doneBtn.disabled=false; doneBtn.textContent='✓ J\'ai fait ma session (+12 min)'; }
  const out=document.getElementById('pg-out');
  out.textContent = practiceTab==='oral' ? oralPrompt(kind,id,label) : writtenPrompt(kind,id,label);
  document.getElementById('prompt-card').style.display='block';
  document.getElementById('prompt-card').scrollIntoView({behavior:'smooth', block:'nearest'});
}

/* ---- PROMPT BUILDERS (driven by tested level) ---- */
function levelGuidance(){
  const lvl = L().level || 'B1';
  const map = {
    A2: 'I am at A2 (elementary) level. Speak slowly and simply, use short common sentences, and explain any harder word. Correct every important mistake gently.',
    B1: 'I am at B1 (intermediate) level. Speak at a slightly slow, clear pace with everyday vocabulary. Don\'t oversimplify, but avoid rare idioms. Correct my main mistakes without breaking the flow.',
    B2: 'I am at B2 (upper-intermediate) level. Speak at a natural pace with real idiomatic language. Don\'t go over the basics. Stretch me with richer vocabulary and correct subtler mistakes.',
    C1: 'I am at C1 (advanced) level. Speak fully naturally, fast, with idioms, nuance and cultural references. Only correct genuine errors or unnatural phrasing, and suggest more sophisticated alternatives.',
  };
  return map[lvl];
}
function weakSnippet(){
  const w = L().errors.slice(0,3);
  if(!w.length) return '';
  return ` I tend to struggle with: ${w.map(e=>e.label).join(', ')}. Please steer the conversation so I have to use these, and correct them in priority.`;
}
function langLine(){
  return activeLang==='es'
    ? 'You are my Spanish conversation partner. Speak to me ONLY in Spanish (I am a French speaker).'
    : 'You are my English conversation partner. Speak to me ONLY in English (I am a French speaker).';
}
function oralPrompt(kind,id,label){
  let topic;
  if(kind==='passion'){
    const t={
      foot:'football — recent matches, tactics, transfers',
      manga:'manga and anime — arcs, characters, recommendations',
      jeuxvideo:'video games — what I\'m playing, design, the industry',
      cuisine:'cooking — recipes, techniques, food cultures',
      voyage:'travel — a trip I\'m planning or a place I love',
    }[id] || label;
    topic = `Let's have a real conversation about ${t}. Have opinions and challenge mine.`;
  } else {
    const sc=SCENARIOS.find(x=>x.id===id);
    const role = sc ? sc.role[activeLang] : label;
    topic = `Let's role-play a real-life situation: you play ${role}. Stay in character and keep it realistic.`;
  }
  return `${langLine()} ${levelGuidance()} I'm practicing speaking for travel and work. ${topic}${weakSnippet()} At the end, summarise my 3 main recurring mistakes in French so I can review them. Then list 5 useful words or expressions from our conversation that I should learn, one per line, exactly in this format: ${IMPORT_FORMAT}`;
}
function writtenPrompt(kind,id,label){
  let topic;
  if(kind==='passion'){ topic=`Let's chat in writing about ${label} (one of my passions).`; }
  else { const sc=SCENARIOS.find(x=>x.id===id); topic=`Let's role-play in writing: you play ${sc?sc.role[activeLang]:label}.`; }
  return `${langLine()} ${levelGuidance()} We'll chat in writing. ${topic} Keep replies to 2-4 sentences, ask me questions, and when I make a mistake, show the correction in bold inside your reply without lecturing.${weakSnippet()} When I write "FIN", stop and give me, in French, my 3 main recurring mistakes, then list 5 useful words or expressions from our chat that I should learn, one per line, exactly in this format: ${IMPORT_FORMAT}`;
}
function correctionPrompt(){
  return `${langLine().replace('conversation partner','writing tutor')} ${levelGuidance()} I'll paste a text I wrote. Reply in French: 1) the corrected version, 2) a short bullet list of my 2-4 main recurring mistakes with one example each, 3) one tip to improve, 4) 3 to 5 words or expressions that would make my text sound more natural, one per line, exactly in this format: ${IMPORT_FORMAT}. Be concrete and encouraging. Here is my text:`;
}

function copyPrompt(){
  const text=document.getElementById('pg-out').textContent;
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(()=>toast('Prompt copié !')).catch(()=>selectText('pg-out'));
  } else selectText('pg-out');
}
function selectText(id){
  const r=document.createRange(); r.selectNodeContents(document.getElementById(id));
  const s=window.getSelection(); s.removeAllRanges(); s.addRange(r); toast('Sélectionne et copie (appui long).');
}
function markPracticeDone(){
  if(!selectedTopic) return;
  if(practiceLogged){ toast('Déjà enregistrée. Choisis un nouveau sujet pour une autre session.'); return; }
  practiceLogged = true;
  L().progress.sessionsLog.push({ date:todayISO(), type:selectedTopic.kind, topic:selectedTopic.id });
  logMinutes(12); save();
  const b=document.getElementById('practice-done-btn'); if(b){ b.disabled=true; b.textContent='✓ Session enregistrée'; }
  toast('Session enregistrée (+12 min).');
}
function addManualError(){
  const v=document.getElementById('err-input').value.trim();
  if(!v){ toast('Écris une erreur d\'abord.'); return; }
  mergeError({label:v, example:''});
  document.getElementById('err-input').value='';
  toast('Ajouté à tes points faibles.');
}
function mergeError(e){
  const key=e.label.toLowerCase().trim();
  const ex=L().errors.find(p=>p.label.toLowerCase().trim()===key);
  if(ex){ ex.count++; ex.lastSeen=todayISO(); if(e.example) ex.example=e.example; }
  else L().errors.push({label:e.label, example:e.example||'', count:1, lastSeen:todayISO()});
  L().errors.sort((a,b)=>b.count-a.count);
  if(L().errors.length>15) L().errors=L().errors.slice(0,15);
  save();
}

/* ---------- PROGRESS ---------- */
function renderProgress(el){
  const p=L().progress;
  const seen=L().deck.filter(c=>!c.isNew).length;
  el.innerHTML=`
    <div class="screen-head"><h1>Progrès</h1><p>${LANGS[activeLang].name} · niveau ${L().level||'—'}</p></div>
    <div class="stat-grid">
      <div class="stat"><div class="n">${(p.totalMinutes/60).toFixed(1)}h</div><div class="l">Total</div></div>
      <div class="stat"><div class="n">${p.streak}</div><div class="l">Jours de suite</div></div>
      <div class="stat"><div class="n">${seen}</div><div class="l">Mots vus</div></div>
    </div>
    <div class="card">
      <h3>Vers un B2 solide</h3>
      <div class="pbar" style="margin-top:10px;"><div class="pbar-fill" style="width:${pct()}%"></div></div>
      <div class="pmeta"><span>${(p.totalMinutes/60).toFixed(1)}h / ${TARGET_HOURS}h</span><span>${etaText()}</span></div>
      <div class="stamps" id="stamps"></div>
    </div>
    <div class="card">
      <h3>Tes points faibles</h3>
      <p class="sub">Réinjectés dans tes prompts pour que l'IA te pousse dessus.</p>
      <div id="weaks" style="margin-top:10px;"></div>
    </div>`;
  renderStamps(); renderWeaks();
}
const STAMPS=[
  {i:'1',t:p=>p.streak>=1},{i:'7',t:p=>p.streak>=7},{i:'30',t:p=>p.streak>=30},
  {i:'10h',t:p=>p.totalMinutes/60>=10},{i:'50h',t:p=>p.totalMinutes/60>=50},{i:'100h',t:p=>p.totalMinutes/60>=100},{i:'B2',t:p=>p.totalMinutes/60>=TARGET_HOURS},
];
function renderStamps(){
  const w=document.getElementById('stamps'); const p=L().progress;
  w.innerHTML=STAMPS.map(s=>`<div class="stamp${s.t(p)?' on':''}">${s.i}</div>`).join('');
}
function renderWeaks(){
  const w=document.getElementById('weaks');
  if(!L().errors.length){ w.innerHTML='<div class="empty">Rien encore. Reporte tes erreurs depuis l\'onglet Correction.</div>'; return; }
  w.innerHTML=L().errors.slice(0,6).map(e=>`<div class="weak"><span class="wc">vu ${e.count}x</span><div class="wl">${esc(e.label)}</div>${e.example?`<div class="we">${esc(e.example)}</div>`:''}</div>`).join('');
}

/* ---------- SETTINGS ---------- */
function renderSettings(el){
  el.innerHTML=`
    <div class="screen-head"><h1>Réglages</h1></div>
    <div class="card">
      <h3>Programme bilingue</h3>
      <p class="sub">Choisis comment répartir anglais et espagnol.</p>
      <label class="field">Mode</label>
      <select class="sel" id="set-mode">
        ${Object.entries(MODES).map(([k,m])=>`<option value="${k}" ${S.mode===k?'selected':''}>${m.label}</option>`).join('')}
      </select>
      <div class="info-box">En mode « Anglais seul », l'espagnol est en veille : tu peux l'activer à tout moment sans rien perdre.</div>
    </div>
    <div class="card">
      <h3>Langues</h3>
      <div id="lang-status"></div>
    </div>
    <div class="card">
      <h3>Objectif quotidien</h3>
      <label class="field">Minutes par jour</label>
      <select class="sel" id="set-time">
        ${[40,50,60,75].map(v=>`<option value="${v}" ${S.dailyMinutes===v?'selected':''}>${v} min</option>`).join('')}
      </select>
      <label class="field">Nouveaux mots par jour</label>
      <select class="sel" id="set-new">
        ${[5,10,15,20,30].map(v=>`<option value="${v}" ${newPerDay()===v?'selected':''}>${v} mots</option>`).join('')}
      </select>
      <div class="info-box">Les révisions des mots déjà vus s'ajoutent à ce nombre. Avec 10 nouveaux mots par jour, compte environ 15 à 20 min de vocabulaire quotidien une fois le rythme pris.</div>
    </div>
    <div class="card">
      <h3>Centres d'intérêt</h3>
      <div class="chips" id="set-passions"></div>
    </div>
    <button class="btn btn-primary btn-block" onclick="saveSettings()">Enregistrer</button>
    <button class="btn btn-ghost btn-block btn-sm" style="margin-top:10px;" onclick="resetActiveLangTest()">Refaire le test de niveau (${LANGS[activeLang].name})</button>
    <button class="btn btn-ghost btn-block btn-sm" style="margin-top:10px; color:var(--error);" onclick="resetAll()">Tout réinitialiser</button>
    <p style="text-align:center; font-size:12px; color:var(--ink-soft); margin:18px 0;">Passeport · données locales · v5</p>`;
  renderLangStatus(); renderSetPassions();
}
function renderLangStatus(){
  const w=document.getElementById('lang-status');
  w.innerHTML=['en','es'].map(c=>{
    const ls=S.langs[c]; const dormant=isDormant(c);
    return `<div class="lang-row ${c===activeLang?'active':''} ${dormant?'dormant':''}">
      <span class="flag">${LANGS[c].flag}</span>
      <div class="lr-tx"><div class="lr-name">${LANGS[c].name}${dormant?' · en veille':''}</div>
      <div class="lr-meta">${ls.tested?'Niveau '+ls.level:'Non testé'} · ${(ls.progress.totalMinutes/60).toFixed(1)}h</div></div>
      ${c!==activeLang?`<button class="btn btn-ghost btn-sm" onclick="setActiveLang('${c}')">Activer</button>`:'<span class="sub">actif</span>'}
    </div>`;
  }).join('');
}
function renderSetPassions(){
  const w=document.getElementById('set-passions');
  Object.entries(PASSIONS).forEach(([k,m])=>{
    const c=document.createElement('button'); c.className='chip'+(S.passions.includes(k)?' selected':''); c.dataset.k=k;
    c.innerHTML=`${m.emoji} ${m.label}`; c.onclick=()=>c.classList.toggle('selected'); w.appendChild(c);
  });
}
function saveSettings(){
  S.mode=document.getElementById('set-mode').value;
  S.dailyMinutes=parseInt(document.getElementById('set-time').value,10);
  S.newPerDay=parseInt(document.getElementById('set-new').value,10)||10;
  S.passions=Array.from(document.querySelectorAll('#set-passions .chip.selected')).map(c=>c.dataset.k);
  if(S.passions.length===0) S.passions=['voyage'];
  save(); toast('Réglages enregistrés.'); syncTopbar();
  // if active lang became dormant, switch to a non-dormant one
  if(isDormant(activeLang)){ const alt=['en','es'].find(c=>!isDormant(c)); if(alt) setActiveLang(alt); }
}
function resetActiveLangTest(){
  document.getElementById('app').style.display='none';
  document.getElementById('onboarding').style.display='block';
  beginTest(activeLang);
  // after test, finishTest -> Continue calls finishOnboarding which re-asks passions; guard:
}
function resetAll(){
  if(!confirm('Effacer toutes tes données (progression, niveaux, vocabulaire) ?')) return;
  localStorage.clear(); location.reload();
}

/* ---------- LANG SWITCHER ---------- */
function openLangSheet(){
  const bd=document.getElementById('lang-sheet');
  const inner=document.getElementById('lang-sheet-inner');
  inner.innerHTML=`<div class="sheet-handle"></div><h3>Changer de langue</h3>`+
    ['en','es'].map(c=>{
      const ls=S.langs[c]; const dormant=isDormant(c);
      return `<div class="lang-row ${c===activeLang?'active':''} ${dormant?'dormant':''}" onclick="pickLang('${c}')">
        <span class="flag">${LANGS[c].flag}</span>
        <div class="lr-tx"><div class="lr-name">${LANGS[c].name}${dormant?' · en veille':''}</div>
        <div class="lr-meta">${ls.tested?'Niveau '+ls.level:'Non testé'}</div></div>
      </div>`;
    }).join('')+
    `<button class="btn btn-ghost btn-block" style="margin-top:8px;" onclick="closeLangSheet()">Fermer</button>`;
  bd.style.display='flex';
  bd.onclick=(e)=>{ if(e.target===bd) closeLangSheet(); };
}
function closeLangSheet(){ document.getElementById('lang-sheet').style.display='none'; }
function pickLang(c){
  closeLangSheet();
  if(!S.langs[c].tested){
    // trigger a test for this language first
    document.getElementById('app').style.display='none';
    document.getElementById('onboarding').style.display='block';
    pendingActivate=c; beginTest(c);
    return;
  }
  setActiveLang(c);
}
let pendingActivate=null;
function setActiveLang(c){
  activeLang=c; DB.set('activeLang', c);
  vocabMode='home'; reviewQ=[]; sortQ=[]; imp.items=[];   // don't carry a session over to the other language
  syncTopbar(); switchScreen('today');
}

/* patch finishTest to handle pendingActivate & test-only re-runs */
const _finishOnboarding = finishOnboarding;
finishOnboarding = function(){
  if(S.onboarded){
    // this was a re-test or a new-language test, not first onboarding
    document.getElementById('onboarding').style.display='none';
    document.getElementById('app').style.display='flex';
    if(pendingActivate){ const c=pendingActivate; pendingActivate=null; setActiveLang(c); }
    else { syncTopbar(); switchScreen('today'); }
    toast('Niveau mis à jour.');
    return;
  }
  _finishOnboarding();
};

/* ---------- utils ---------- */
function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function cap(s){ return s.charAt(0).toUpperCase()+s.slice(1); }
let toastT;
function toast(m){ const t=document.getElementById('toast'); t.textContent=m; t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('show'),3000); }

/* ---------- service worker ---------- */
function registerSW(){
  if('serviceWorker' in navigator){
    // update() at launch: an installed iPhone app is often resumed rather than
    // reloaded, so we ask explicitly whether a newer version was published.
    navigator.serviceWorker.register('sw.js').then(reg=>{ reg.update().catch(()=>{}); }).catch(()=>{});
  }
}

/* ---------- go ---------- */
boot();
