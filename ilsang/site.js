(function () {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const S = { props: { motion: true }, state: { lb: -1 }, _cv: {}, _got: {} };
  ['hero', 'floor', 'fx', 'bg', 'g0', 'g1', 'g2', 'g3', 'g4', 'g5'].forEach((k) => { S._cv[k] = $('cv-' + k); });

  const IMGMAP = {
    '0a865c198cc7b22f1869512d0c53d52f': 'mascot.jpg',
    '97adaf2b7c4a232c1800895d1e2914cf': 'diary_ramen.jpg',
    '341e9fd55b8507251a986c0ff7d26fcf': 'diary_karaoke.jpg',
    '1adabaeca0d2f409ce1a128c68ebae9e': 'diary_catroom.jpg',
    '20d67b215d5faa1713fe60303d807410': 'char_pinkcat.jpg',
    '7b17de5855f7a81e886f3e2882380113': 'char_underwater.jpg',
    'da9b6686b13e3f894416951be3a2e34e': 'char_puppy.jpg',
    '4d8bdb8a2abb4b74d9ae213853092459': 'char_crown.jpg',
    '921ff4b02ab7e1e9bcdf63112c213832': 'char_kimono.jpg',
    '4ebb11752ec761e9ef1f4e4bb6bcb960': 'char_greencat.jpg',
    '1490170bb2506d4a801f458e9dbdc236': 'char_blackcat.jpg',
    '37706d61e32bd9a4b29ffc096a354852': 'char_furina.jpg',
    '03e88b240944bb1b43b5b422a280c9c1': 'char_uta.jpg',
    '3f48109e1502bfbb63bc36ea59ada239': 'char_gwen.jpg',
    '7ab862ac32bdfa2b9635f314e884ee7e': 'char_spider1.jpg',
    '0986729999512b9208e50a6a8e0a201e': 'char_spider2.jpg',
    '2801448ef04e5d023a46cd6e9095e34f': 'char_fire.jpg',
    'd619d980b4c7f1b49099f890386f9f1a': 'sk_point.jpg',
    '83fcd1e3328a0615ea29693d34e8fc25': 'sk_cheer.jpg',
    'a0418fbbab902162222e112f52b28c26': 'sk_phone.jpg',
    '7fb8eb7b0cc943d0db027cc129588bb7': 'sk_catwand.jpg',
    '963d47bd6537c11f53d57051e834f33e': 'sk_spin.jpg',
    '22aca2323cce00f3ff192aefba5557fa': 'sk_eevee.jpg',
    'c472edba3bb0a246b42c80cf90838d28': 'sk_ball.jpg',
    '4c80467e51e53a0554f8132711f279d2': 'sk_bluehair.jpg',
    'c6eb7774c7778c01f4b0dacb82eb3471': 'char_frieren.jpg',
    '40db731af863ab26ccd1da1a3e82e83a': 'char_yellowtee.jpg',
    '9bb4e59d80a4c2ddc0638b1e98ee2740': 'char_silver.jpg',
    '47042842c43c3d2dc960d84af47671bf': 'char_yellowtee2.jpg',
    '17f50079662b10764806a6240f4f0f3a': 'diary_vsrang.jpg',
    'ac992dc0870bccdd1b80db2000da68a0': 'char_suu_koma.jpg'
  };
  const EGGS = [
      { k: 'heart10', title: '하트 브레이커', desc: '큰 하트를 10번 눌러 깨뜨렸다', hint: '가운데 큰 하트를 여러 번 콕콕' },
      { k: 'love', title: 'LOVE OVERLOAD', desc: '하트를 꾹 눌러 사랑 폭발', hint: '큰 하트를 길게 꾹…' },
      { k: 'drag', title: '어지러워', desc: '회전목마를 미친 듯이 돌렸다', hint: '회전목마를 마구마구 돌려봐' },
      { k: 'logo', title: '블루스크린', desc: '로고 연타로 시스템 다운', hint: '로고를 연타하면…?' },
      { k: 'mascot', title: '쓰담쓰담', desc: '오너캐 일상을 5번 쓰다듬었다', hint: 'ABOUT의 일상을 눌러봐' },
      { k: 'mine', title: '팡!', desc: '빙글빙글 스티커를 터뜨렸다', hint: '빙글빙글 도는 스티커를 눌러봐' },
      { k: 'cube', title: '큐브 폭발', desc: '그림 큐브를 터뜨렸다', hint: '돌아가는 큐브를 클릭' },
      { k: 'term', title: '해커', desc: '비밀 터미널에 명령어 입력', hint: 'SECRET 구역의 터미널' },
      { k: 'party', title: '파티 피플', desc: 'party 명령 실행', hint: '터미널에 파티를 열어줘' },
      { k: 'flip', title: '뒤집힌 세상', desc: 'flip 명령 실행', hint: '터미널: 세상을 뒤집는 단어' },
      { k: 'gravity', title: '중력 실험', desc: 'gravity 명령 실행', hint: '터미널: 뉴턴이 좋아하는 단어' },
      { k: 'nope', title: '반항아', desc: '누르지 말라는 버튼을 3번 누름', hint: '누르지 말라면 누르고 싶지' },
      { k: 'bottom', title: '끝까지 봄', desc: '페이지 맨 끝까지 스크롤', hint: '끝까지 와 줄래?' },
      { k: 'idle', title: '멍때리기', desc: '30초 동안 가만히 있었다', hint: '아무것도 하지 말아봐' },
      { k: 'night', title: '새벽 감성', desc: '새벽 0~5시에 방문', hint: '잠 안 오는 시간에 와봐' }
    ];
  const D = [
    { id: '97adaf2b7c4a232c1800895d1e2914cf', file: 'ramen.png', title: '라멘 먹는 일상', kind: 'oc', alt: '라멘집에서 면을 후루룩 먹는 오너캐 일상과 옆의 고양이, 우파루파' },
    { id: '341e9fd55b8507251a986c0ff7d26fcf', file: 'karaoke.png', title: '노래방 간 일상', kind: 'oc', alt: '노래방 조명 아래 마이크를 든 오너캐 일상과 신난 고양이, 우파루파' },
    { id: '1adabaeca0d2f409ce1a128c68ebae9e', file: 'my_room.png', title: '방바닥 일상', kind: 'oc', alt: '방바닥에 엎드린 오너캐 일상과 혀를 내민 삼색 고양이' },
    { id: '40db731af863ab26ccd1da1a3e82e83a', file: 'ilsang_jump.png', title: '뛰어오르는 일상', kind: 'oc', alt: '노란 티셔츠를 입은 오너캐 일상이 주먹을 쥐고 뛰어오르는 그림' },
    { id: '47042842c43c3d2dc960d84af47671bf', file: 'ilsang_bleh.png', title: '메롱 일상', kind: 'oc', alt: '노란 티셔츠를 입은 오너캐 일상이 혀를 내밀고 서 있는 그림' },
    { id: '17f50079662b10764806a6240f4f0f3a', file: 'ilsang_vs_rang.png', title: '일상 VS 랑', kind: 'oc', alt: '노란 티를 입은 일상의 발차기를 은발의 랑이 막아내는 대결 장면' }
  ];
  const A = [
    { id: '20d67b215d5faa1713fe60303d807410', file: 'pink_cat.png', title: '분홍 고양이', kind: 'char', alt: '혀를 내밀고 손을 흔드는 분홍 고양이 소녀' },
    { id: '7b17de5855f7a81e886f3e2882380113', file: 'siren.png', title: '세이렌', kind: 'char', alt: '푸른 물속, 매달린 새장 아래 웃는 세이렌' },
    { id: '4d8bdb8a2abb4b74d9ae213853092459', file: 'crown_girl.png', title: '왕관 소녀', kind: 'char', alt: '왕관을 쓴 분홍 머리 SD 캐릭터' },
    { id: 'da9b6686b13e3f894416951be3a2e34e', file: 'butter.png', title: '트릭컬 리바이브 · 버터', kind: 'char', alt: '노란 리본을 단 버터가 두 팔을 벌리고 있는 그림' },
    { id: '921ff4b02ab7e1e9bcdf63112c213832', file: 'yakuzen_yaku.png', title: '야쿠젠 야쿠', kind: 'fan', alt: '야쿠젠 야쿠: 빨간 머리에 기모노와 보라색 하오리를 입은 소녀' },
    { id: '4ebb11752ec761e9ef1f4e4bb6bcb960', file: 'yanineko.png', title: '야니네코', kind: 'fan', alt: '야니네코: 노란 눈의 민트색 머리 고양이 소녀를 위에서 내려다본 구도' },
    { id: '1490170bb2506d4a801f458e9dbdc236', file: 'black_cat.png', title: '검은 고양이', kind: 'char', alt: '브이 포즈를 한 검은 고양이 소녀' },
    { id: '37706d61e32bd9a4b29ffc096a354852', file: 'furina.png', title: '원신 · 푸리나', kind: 'fan', alt: '푸리나 SD 그림' },
    { id: 'c6eb7774c7778c01f4b0dacb82eb3471', file: 'frieren.png', title: '장송의 프리렌 · 프리렌', kind: 'fan', alt: '별빛 밤하늘 아래 지팡이를 든 프리렌 SD 그림' },
    { id: 'ac992dc0870bccdd1b80db2000da68a0', file: 'suu_komasan.png', title: '미즈미야 스우 & 코마상', kind: 'fan', alt: '빨간 배경에서 미즈미야 스우와 코마상이 나란히 포즈를 잡은 SD 그림' },
    { id: '9bb4e59d80a4c2ddc0638b1e98ee2740', file: 'rang.png', title: '랑', kind: 'char', alt: '푸른 빛줄기 사이로 은발의 랑이 뛰어오르는 그림' },
    { id: '3f48109e1502bfbb63bc36ea59ada239', file: 'gwen.png', title: '스파이더버스 · 그웬', kind: 'fan', alt: '거꾸로 매달린 그웬, 하프톤 배경' },
    { id: '03e88b240944bb1b43b5b422a280c9c1', file: 'uta.png', title: '원피스 FILM RED · 우타', kind: 'fan', alt: '왕관을 쓴 우타' },
    { id: '7ab862ac32bdfa2b9635f314e884ee7e', file: 'spider_01.png', title: '스파이더맨 수트 01', kind: 'fan', alt: '철창 앞에서 포즈를 취한 스파이더맨 수트 소녀' },
    { id: '0986729999512b9208e50a6a8e0a201e', file: 'spider_02.png', title: '스파이더맨 수트 02', kind: 'fan', alt: '부서진 잔해 위에 쓰러진 스파이더맨 수트 소녀' },
    { id: '2801448ef04e5d023a46cd6e9095e34f', file: 'ilulu.png', title: '메이드래곤 · 이루루', kind: 'fan', alt: '불을 뿜는 이루루' }
  ];
  const SK = [
    { id: '83fcd1e3328a0615ea29693d34e8fc25', file: 'rough_01.png', title: '만세하는 일상', kind: 'oc', alt: '두 팔을 번쩍 든 오너캐 일상 러프 스케치' },
    { id: '963d47bd6537c11f53d57051e834f33e', file: 'rough_02.png', title: '빙글 일상 & 고양이', kind: 'oc', alt: '빙글 도는 오너캐 일상과 고양이 러프 스케치' },
    { id: 'd619d980b4c7f1b49099f890386f9f1a', file: 'rough_03.png', title: '나야 나 일상', kind: 'oc', alt: '양손으로 자기를 가리키는 오너캐 일상 러프 스케치' },
    { id: '7fb8eb7b0cc943d0db027cc129588bb7', file: 'rough_04.png', title: '고양이랑 노는 일상', kind: 'oc', alt: '낚싯대 장난감으로 고양이와 노는 오너캐 일상 스케치' },
    { id: 'a0418fbbab902162222e112f52b28c26', file: 'rough_05.png', title: 'ㅎㅇ 일상', kind: 'oc', alt: '펜과 폰을 들고 웃는 오너캐 일상 스케치' },
    { id: '22aca2323cce00f3ff192aefba5557fa', file: 'rough_06.png', title: '포켓몬 · 이브이 & 트레이너', kind: 'fan', alt: '이브이와 트레이너 선화' },
    { id: 'c472edba3bb0a246b42c80cf90838d28', file: 'rough_07.png', title: '포켓몬 트레이너', kind: 'fan', alt: '몬스터볼을 쥔 트레이너 러프 스케치' },
    { id: '4c80467e51e53a0554f8132711f279d2', file: 'rough_08.png', title: '홀로라이브 · 미즈미야 스우', kind: 'char', alt: '양손 브이를 한 미즈미야 스우 컬러 러프' }
  ];
  const TAGS = { oc: ['오너캐 ♡ 일상', '#FFF35C'], fan: ['작업물', '#C9A8FF'], char: ['작업물', '#C9A8FF'] };
  const ALL = D.concat(A, SK);
  ALL.forEach((it, i) => {
    it.idx = i;
    it.src = 'images/' + IMGMAP[it.id];
    it.tag = TAGS[it.kind][0];
    it.tagBg = TAGS[it.kind][1];
    it.label = it.title + ' 크게 보기';
  });

  // ---------- 목록 렌더링 ----------
  const renderList = (name, arr) => {
    const t = document.querySelector('template[data-list="' + name + '"]');
    if (!t) return;
    const as = t.dataset.as;
    const re = new RegExp('\\{\\{\\s*' + as + '\\.(\\w+)\\s*\\}\\}', 'g');
    (t._nodes || []).forEach((n) => n.remove());
    const tmp = document.createElement('template');
    tmp.innerHTML = arr.map((o) => t.innerHTML.replace(re, (m, k) => esc(o[k] === undefined ? '' : o[k]))).join('');
    t._nodes = Array.from(tmp.content.childNodes);
    t.parentNode.insertBefore(tmp.content, t);
  };
  renderList('diary', D);
  renderList('art', A);
  renderList('sketch', SK);

  // ---------- 토스트 / 모드 / 효과 ----------
  let tt, mt;
  const toast = (text) => {
    const el = $('toast');
    el.textContent = text; el.hidden = false;
    el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
    clearTimeout(tt); tt = setTimeout(() => { el.hidden = true; }, 2800);
  };
  const page = $('page');
  const setMode = (m, ms) => {
    clearTimeout(mt);
    page.className = 'page ' + m;
    mt = setTimeout(() => { page.className = 'page'; }, ms);
  };
  const burst = (x, y, n) => { if (S._burst) S._burst(x, y, n); };
  const effect = (name) => {
    const now = performance.now();
    if (name === 'party') { setMode('party', 6000); S._rainUntil = now + 6000; }
    else if (name === 'flip') setMode('flip', 3200);
    else if (name === 'grav') setMode('grav', 3300);
    else if (name === 'shake') setMode('shake', 800);
    else if (name === 'rain') S._rainUntil = now + 7000;
    else if (name === 'matrix') S._matrixUntil = now + 8000;
  };

  // ---------- 이스터에그 도감 ----------
  const renderAch = () => {
    const n = Object.keys(S._got).length;
    $('achCount').textContent = '★ 이스터에그 ' + n + '/' + EGGS.length;
    renderList('achList', EGGS.map((e) => {
      const ok = !!S._got[e.k];
      return { icon: ok ? '★' : '?', label: ok ? e.title : '???', desc: ok ? e.desc : '힌트: ' + e.hint, color: ok ? '#FFF35C' : '#B8A3B2', border: ok ? '#FFF35C' : '#5A4862' };
    }));
  };
  const unlock = (k) => {
    if (S._got[k]) return;
    S._got[k] = true;
    renderAch();
  };
  S.unlock = unlock; S.toast = toast;
  renderAch();

  // ---------- 터미널 ----------
  let termLog = [{ text: '♡ ILSANG OS v2.0 ♡  help 를 입력해 보세요' }];
  renderList('termLog', termLog);
  const runCmd = (raw) => {
    const c = (raw || '').trim().toLowerCase();
    if (!c) return;
    unlock('term');
    const out = [];
    if (c === 'help' || c === '도움') out.push('명령어: help love party flip gravity rain matrix spin shake ilsang hello hp bsod secret clear');
    else if (c === 'love' || c === '사랑') { out.push('♡♡♡ LOVE 발사 ♡♡♡'); burst(window.innerWidth / 2, window.innerHeight / 2, 30); }
    else if (c === 'party' || c === '파티') { effect('party'); unlock('party'); out.push('PARTY MODE ON ♪♪♪'); }
    else if (c === 'flip' || c === '뒤집기') { effect('flip'); unlock('flip'); out.push('세상이 뒤집혔다…'); }
    else if (c === 'gravity' || c === '중력') { effect('grav'); unlock('gravity'); out.push('중력 ON… 그림이 떨어진다!'); }
    else if (c === 'rain' || c === '비') { effect('rain'); out.push('하트 비가 내려요 ♡'); }
    else if (c === 'matrix') { effect('matrix'); out.push('Wake up, 일상…'); }
    else if (c === 'spin') { S._spinBoost = 30; out.push('회전목마 가속!!!'); }
    else if (c === 'shake') { effect('shake'); out.push('흔들흔들'); }
    else if (c === 'ilsang' || c === '일상') out.push('일상 = 이 사이트 주인의 오너캐 ♡ 오너 그림체로 그려요');
    else if (c === 'hello' || c === 'hi' || c === '안녕') out.push('안녕! 와줘서 고마워 ♡');
    else if (c === 'hp') { hp = 5; $('hp').textContent = '♥♥♥♥♥'; out.push('일상 HP 풀회복 ♥♥♥♥♥'); }
    else if (c === 'bsod') { $('bsod').hidden = false; out.push('으앗'); }
    else if (c === 'secret' || c === '비밀') out.push('힌트: 로고 연타 / 큰 하트 10번 / 30초 멍때리기 / 빙글 스티커…');
    else if (c === 'clear' || c === 'cls') { termLog = []; renderList('termLog', termLog); return; }
    else out.push("'" + raw + "'은(는) 내부 또는 외부 명령이 아닙니다 ♡");
    termLog = termLog.concat([{ text: 'C:\\> ' + raw }], out.map((o) => ({ text: o }))).slice(-8);
    renderList('termLog', termLog);
  };
  $('termIn').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { const v = e.target.value; e.target.value = ''; runCmd(v); }
  });

  // ---------- 그림 뷰어 ----------
  let V = { z: 1, x: 0, y: 0 };
  const ptrs = {}; let pz = null;
  const vImg = $('vImg'), vRange = $('vRange'), vPct = $('vPct'), vStage = $('vStage');
  const applyV = () => {
    vImg.style.transform = 'translate(' + V.x + 'px, ' + V.y + 'px) scale(' + V.z + ')';
    vRange.value = V.z; vPct.textContent = Math.round(V.z * 100) + '%';
  };
  const setZ = (z) => { V.z = Math.max(0.5, Math.min(5, z)); if (V.z <= 1) { V.x = 0; V.y = 0; } applyV(); };
  const showV = (i) => {
    const it = ALL[i];
    S.state.lb = i; V = { z: 1, x: 0, y: 0 };
    vImg.src = it.src; vImg.alt = it.alt;
    $('vTag').textContent = it.tag; $('vTag').style.background = it.tagBg;
    $('vTitle').textContent = it.title;
    $('vPos').textContent = (i + 1) + ' / ' + ALL.length;
    $('viewer').hidden = false;
    document.body.style.overflow = 'hidden';
    applyV();
  };
  const closeV = () => { $('viewer').hidden = true; S.state.lb = -1; document.body.style.overflow = ''; };
  vStage.addEventListener('pointerdown', (e) => { try { vStage.setPointerCapture(e.pointerId); } catch (err) {} ptrs[e.pointerId] = { x: e.clientX, y: e.clientY }; pz = null; });
  vStage.addEventListener('pointermove', (e) => {
    const p = ptrs[e.pointerId]; if (!p) return;
    const ids = Object.keys(ptrs);
    if (ids.length >= 2) {
      p.x = e.clientX; p.y = e.clientY;
      const a = ptrs[ids[0]], b = ptrs[ids[1]], dist = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      if (!pz) pz = { d: dist, z: V.z }; else setZ(pz.z * dist / pz.d);
      return;
    }
    V.x += e.clientX - p.x; V.y += e.clientY - p.y; p.x = e.clientX; p.y = e.clientY;
    applyV();
  });
  const vUp = (e) => { delete ptrs[e.pointerId]; pz = null; };
  vStage.addEventListener('pointerup', vUp); vStage.addEventListener('pointercancel', vUp);
  vStage.addEventListener('wheel', (e) => { e.preventDefault(); setZ(V.z * (e.deltaY < 0 ? 1.12 : 1 / 1.12)); }, { passive: false });
  vStage.addEventListener('dblclick', () => { if (V.z > 1.05) { V = { z: 1, x: 0, y: 0 }; applyV(); } else setZ(2.5); });
  vRange.addEventListener('input', (e) => setZ(parseFloat(e.target.value)));
  document.addEventListener('keydown', (e) => {
    if ($('viewer').hidden) return;
    if (e.key === 'Escape') closeV();
    else if (e.key === 'ArrowLeft') showV((S.state.lb - 1 + ALL.length) % ALL.length);
    else if (e.key === 'ArrowRight') showV((S.state.lb + 1) % ALL.length);
  });

  // ---------- 버튼 동작 ----------
  const LINES = ['안녕! 나 일상이야 ♡', '그림 보러 왔어?', '라멘 먹고 싶다…', '노래방 가고 싶다!', '간지러워!!', '더 누르면 아파…', '행복하게 살고 싶다 ♡', '말랑 쫀득한 거 먹고 싶다…'];
  const NOPE = ['누르지 마시오', '누르지 말라니까?', '진짜 마지막 경고', '……', '마음대로 해 ♡'];
  let hp = 5, pokes = 0, logoN = 0, nope = 0, bt;
  const ACT = {
    closeBsod: () => { $('bsod').hidden = true; },
    lbClose: closeV,
    lbPrev: () => showV((S.state.lb - 1 + ALL.length) % ALL.length),
    lbNext: () => showV((S.state.lb + 1) % ALL.length),
    vOut: () => setZ(V.z / 1.25),
    vIn: () => setZ(V.z * 1.25),
    vReset: () => { V = { z: 1, x: 0, y: 0 }; applyV(); },
    toggleAch: () => { $('achPanel').hidden = !$('achPanel').hidden; },
    poke: () => {
      pokes += 1; hp -= 1;
      let say = LINES[pokes % LINES.length];
      if (hp <= 0) { hp = 5; say = 'GAME OVER… 부활! ♡'; }
      $('hp').textContent = '♥'.repeat(hp) + '♡'.repeat(5 - hp);
      const b = $('bubble'); b.textContent = say; b.hidden = false;
      b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
      clearTimeout(bt); bt = setTimeout(() => { b.hidden = true; }, 2200);
      if (pokes >= 5) unlock('mascot');
    },
    clickLogo: () => { logoN += 1; if (logoN >= 7) { logoN = 0; $('bsod').hidden = false; unlock('logo'); } },
    clickMine: () => { setMode('shake', 800); if (S._got.mine) toast('팡! ♡'); else unlock('mine'); },
    copyMail: () => {
      const m = 'wkdcl159@gmail.com';
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(m).then(() => toast('메일 주소를 복사했어요 ♡'), () => toast(m));
        else toast(m);
      } catch (err) { toast(m); }
    },
    clickCube: (e, el) => { el.classList.add('boom'); setTimeout(() => el.classList.remove('boom'), 950); unlock('cube'); },
    pressNope: () => {
      nope += 1;
      $('nopeText').textContent = NOPE[Math.min(nope, NOPE.length - 1)];
      effect(['party', 'flip', 'grav', 'shake', 'rain', 'matrix'][Math.floor(Math.random() * 6)]);
      if (nope >= 3) unlock('nope');
    }
  };
  document.addEventListener('click', (e) => {
    const o = e.target.closest('[data-open]');
    if (o) { showV(parseInt(o.dataset.open, 10)); return; }
    const a = e.target.closest('[data-act]');
    if (a && ACT[a.dataset.act]) ACT[a.dataset.act](e, a);
  });

  // ---------- 3D / 캔버스 ----------
  (function mount() {
    const norm = (p) => { const l = Math.hypot(p[0], p[1], p[2]) || 1; return [p[0] / l, p[1] / l, p[2] / l]; };
    const rot = (p, rx, ry, rz) => {
      let x = p[0], y = p[1], z = p[2], c, s, t;
      c = Math.cos(rx); s = Math.sin(rx); t = y * c - z * s; z = y * s + z * c; y = t;
      c = Math.cos(ry); s = Math.sin(ry); t = x * c + z * s; z = -x * s + z * c; x = t;
      c = Math.cos(rz); s = Math.sin(rz); t = x * c - y * s; y = x * s + y * c; x = t;
      return [x, y, z];
    };
    const icosa = () => {
      const t = (1 + Math.sqrt(5)) / 2;
      const v = [[-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],[0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],[t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]].map(norm);
      const f = [[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];
      return { v, f };
    };
    const octa = (sy) => ({ v: [[1,0,0],[-1,0,0],[0,sy,0],[0,-sy,0],[0,0,1],[0,0,-1]], f: [[0,2,4],[4,2,1],[1,2,5],[5,2,0],[4,3,0],[1,3,4],[5,3,1],[0,3,5]] });
    let seed = 23;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const puffy = (ol, d, ins, c) => {
      const n = ol.length, v = [], f = [];
      ol.forEach((p) => v.push([p[0], p[1], 0]));
      ol.forEach((p) => v.push([c[0] + (p[0] - c[0]) * ins, c[1] + (p[1] - c[1]) * ins, d * 0.62]));
      ol.forEach((p) => v.push([c[0] + (p[0] - c[0]) * ins, c[1] + (p[1] - c[1]) * ins, -d * 0.62]));
      v.push([c[0], c[1], d], [c[0], c[1], -d]);
      for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        f.push([i, j, n + j], [i, n + j, n + i], [n + i, n + j, 3 * n], [i, 2 * n + j, j], [i, 2 * n + i, 2 * n + j], [2 * n + i, 3 * n + 1, 2 * n + j]);
      }
      return { v, f };
    };
    const heartOutline = (n) => {
      const p = [];
      for (let i = 0; i < n; i++) {
        const t = i / n * Math.PI * 2;
        p.push([16 * Math.pow(Math.sin(t), 3) / 17, (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 17 + 0.12]);
      }
      return p;
    };
    const HEART = puffy(heartOutline(22), 0.45, 0.58, [0, 0]);
    const HEART_S = puffy(heartOutline(14), 0.45, 0.58, [0, 0]);
    const BOW = puffy([[0,0.14],[0.5,0.55],[0.95,0.6],[1.05,-0.45],[0.6,-0.42],[0,-0.14],[-0.6,-0.42],[-1.05,-0.45],[-0.95,0.6],[-0.5,0.55]], 0.28, 0.55, [0, 0]);
    const CROSS = puffy([[-0.16,1],[0.16,1],[0.16,0.51],[0.7,0.51],[0.7,0.19],[0.16,0.19],[0.16,-1],[-0.16,-1],[-0.16,0.19],[-0.7,0.19],[-0.7,0.51],[-0.16,0.51]], 0.22, 0.55, [0, 0.35]);
    const STAR = (() => { const p = []; for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 + Math.PI / 2, r = i % 2 ? 0.45 : 1; p.push([Math.cos(a) * r, Math.sin(a) * r]); } return puffy(p, 0.35, 0.5, [0, 0]); })();
    const OCT = octa(1.6), ICO = icosa();

    const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
    const P = {
      hot: [hex('#C0186E'), hex('#FFD6EC')],
      pink: [hex('#E0559E'), hex('#FFF4FA')],
      black: [hex('#08040A'), hex('#7A6688')],
      silver: [hex('#8E86A8'), hex('#FFFFFF')],
      lav: [hex('#7A5CFF'), hex('#F5EEFF')],
      cyan: [hex('#14A8C8'), hex('#EAFFFF')],
      lime: [hex('#5FAF10'), hex('#F6FFDC')],
      gold: [hex('#D9A800'), hex('#FFFDD8')]
    };
    const GLOW = { hot: 'rgba(255,79,176,', pink: 'rgba(255,140,198,', black: 'rgba(255,79,176,', silver: 'rgba(200,230,255,', lav: 'rgba(160,120,255,', cyan: 'rgba(79,247,255,', lime: 'rgba(198,255,79,', gold: 'rgba(255,243,92,' };
    const DK = '#1B0A16', PK = '#FF8CC6';
    const LT = norm([-0.5, 0.8, 0.6]);
    const mix = (a, b, s) => [a[0] + (b[0] - a[0]) * s, a[1] + (b[1] - a[1]) * s, a[2] + (b[2] - a[2]) * s];
    const rgb = (c) => 'rgb(' + Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]) + ')';
    const face = (a, b, c) => {
      const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], w = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
      return norm([u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]]);
    };
    const sprites = {};
    const haloSprite = (g) => {
      if (sprites[g]) return sprites[g];
      const c = document.createElement('canvas'); c.width = 64; c.height = 64;
      const x = c.getContext('2d'), gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
      gr.addColorStop(0, g + '1)'); gr.addColorStop(0.45, g + '0.35)'); gr.addColorStop(1, g + '0)');
      x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
      sprites[g] = c; return c;
    };
    const halo = (ctx, x, y, r, g, a) => {
      if (!g || r <= 0) return;
      const op = ctx.globalCompositeOperation, ga = ctx.globalAlpha;
      ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = ga * Math.min(1, a);
      ctx.drawImage(haloSprite(g), x - r, y - r, r * 2, r * 2);
      ctx.globalAlpha = ga; ctx.globalCompositeOperation = op;
    };
    const vis = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.bottom > -50 && r.top < window.innerHeight + 50; };
    const draw = (ctx, parts, cx, cy, sc, rx, ry, rz, lw, ex) => {
      const all = [];
      parts.forEach((pt) => {
        const R = pt.m.v.map((p) => rot(p, rx, ry, rz));
        const S = R.map((p) => { const k = 1 / (1 - p[2] * 0.16); return [cx + p[0] * sc * k, cy - p[1] * sc * k]; });
        pt.m.f.forEach((q) => {
          const a = R[q[0]], b = R[q[1]], c = R[q[2]], n = face(a, b, c);
          let A = S[q[0]], B = S[q[1]], C = S[q[2]];
          if (ex) {
            const ox = ((A[0] + B[0] + C[0]) / 3 - cx) * ex, oy = ((A[1] + B[1] + C[1]) / 3 - cy) * ex;
            A = [A[0] + ox, A[1] + oy]; B = [B[0] + ox, B[1] + oy]; C = [C[0] + ox, C[1] + oy];
          }
          all.push({ a: A, b: B, c: C, z: (a[2] + b[2] + c[2]) / 3, s: Math.abs(n[0] * LT[0] + n[1] * LT[1] + n[2] * LT[2]), pal: pt.pal, st: pt.st || DK });
        });
      });
      all.sort((p, q) => p.z - q.z);
      ctx.lineJoin = 'round'; ctx.lineWidth = lw;
      all.forEach((o) => {
        ctx.beginPath(); ctx.moveTo(o.a[0], o.a[1]); ctx.lineTo(o.b[0], o.b[1]); ctx.lineTo(o.c[0], o.c[1]); ctx.closePath();
        ctx.fillStyle = rgb(mix(o.pal[0], o.pal[1], 0.15 + 0.85 * o.s)); ctx.fill();
        ctx.strokeStyle = o.st; ctx.stroke();
      });
    };
    const heart2d = (ctx, x, y, s) => {
      ctx.beginPath(); ctx.moveTo(x, y + s);
      ctx.bezierCurveTo(x - s * 1.6, y - s * 0.1, x - s * 0.6, y - s * 1.2, x, y - s * 0.35);
      ctx.bezierCurveTo(x + s * 0.6, y - s * 1.2, x + s * 1.6, y - s * 0.1, x, y + s);
      ctx.closePath();
    };
    const rr = (ctx, x, y, w, h, r) => {
      ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
    };
    const drawCard = (ctx, im, X, Y, sx, k, cw, ch, d) => {
      if (Math.abs(sx) < 0.03) return;
      halo(ctx, X, Y, ch * 0.9 * k, 'rgba(255,79,176,', 0.5);
      ctx.save(); ctx.setTransform(sx, 0, 0, k, X, Y);
      rr(ctx, -cw / 2, -ch / 2, cw, ch, 10 * d);
      ctx.fillStyle = '#FFF2F9'; ctx.fill();
      ctx.save(); ctx.clip();
      if (sx > 0) {
        if (im.complete && im.naturalWidth) {
          const ir = im.naturalWidth / im.naturalHeight, cr = cw / ch;
          let sw = im.naturalWidth, sh = im.naturalHeight, ox = 0, oy = 0;
          if (ir > cr) { sw = sh * cr; ox = (im.naturalWidth - sw) / 2; } else { sh = sw / cr; oy = (im.naturalHeight - sh) / 2; }
          ctx.drawImage(im, ox, oy, sw, sh, -cw / 2, -ch / 2, cw, ch);
        }
      } else {
        ctx.fillStyle = '#24112A'; ctx.fillRect(-cw / 2, -ch / 2, cw, ch);
        ctx.fillStyle = '#FF4FB0'; heart2d(ctx, 0, 0, cw * 0.2); ctx.fill();
      }
      ctx.restore();
      rr(ctx, -cw / 2, -ch / 2, cw, ch, 10 * d);
      ctx.lineWidth = 3 * d / Math.max(0.3, k); ctx.strokeStyle = '#FF4FB0'; ctx.stroke();
      ctx.restore();
    };
    const drawCat = (ctx, x, y, s, t, dir) => {
      ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1);
      ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.strokeStyle = DK; ctx.lineWidth = s * 0.09;
      ctx.beginPath(); ctx.moveTo(-s * 0.75, s * 0.05); ctx.quadraticCurveTo(-s * 1.5, -s * 0.5 + Math.sin(t * 8) * s * 0.3, -s * 1.1, -s * 1.05); ctx.lineWidth = s * 0.22; ctx.stroke();
      ctx.lineWidth = s * 0.09;
      const leg = Math.sin(t * 14) * s * 0.12;
      [[-0.45, leg], [-0.15, -leg], [0.2, leg], [0.45, -leg]].forEach((l) => { ctx.beginPath(); ctx.moveTo(l[0] * s, s * 0.5); ctx.lineTo(l[0] * s + l[1], s * 0.85); ctx.stroke(); });
      ctx.beginPath(); ctx.ellipse(0, s * 0.2, s * 0.85, s * 0.5, 0, 0, Math.PI * 2); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#F7A440'; ctx.beginPath(); ctx.ellipse(-s * 0.3, s * 0.1, s * 0.28, s * 0.2, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = DK; ctx.beginPath(); ctx.ellipse(s * 0.25, s * 0.32, s * 0.18, s * 0.12, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(s * 0.45, -s * 0.6); ctx.lineTo(s * 0.5, -s * 1.15); ctx.lineTo(s * 0.8, -s * 0.8); ctx.closePath(); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(s * 0.95, -s * 0.8); ctx.lineTo(s * 1.2, -s * 1.15); ctx.lineTo(s * 1.22, -s * 0.6); ctx.closePath(); ctx.fillStyle = '#F7A440'; ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(s * 0.85, -s * 0.4, s * 0.48, 0, Math.PI * 2); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.stroke();
      ctx.fillStyle = DK; ctx.beginPath(); ctx.arc(s * 0.7, -s * 0.45, s * 0.06, 0, Math.PI * 2); ctx.arc(s * 1.02, -s * 0.45, s * 0.06, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(s * 0.78, -s * 0.28); ctx.quadraticCurveTo(s * 0.86, -s * 0.2, s * 0.94, -s * 0.28); ctx.lineWidth = s * 0.06; ctx.stroke();
      ctx.restore();
    };
    const drawAxo = (ctx, x, y, s, t, dir) => {
      ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1);
      ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.strokeStyle = DK; ctx.lineWidth = s * 0.08;
      const w = Math.sin(t * 6) * s * 0.25;
      ctx.beginPath(); ctx.moveTo(-s * 0.9, 0); ctx.quadraticCurveTo(-s * 1.6, -s * 0.3 + w, -s * 1.9, w); ctx.quadraticCurveTo(-s * 1.5, s * 0.2 + w, -s * 0.9, s * 0.15); ctx.closePath(); ctx.fillStyle = '#FFB3D1'; ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(0, s * 0.05, s, s * 0.4, 0, 0, Math.PI * 2); ctx.fillStyle = '#FFC4DD'; ctx.fill(); ctx.stroke();
      ctx.strokeStyle = '#FF4FB0'; ctx.lineWidth = s * 0.12;
      [[-0.35, -1.0], [0, -1.1], [0.35, -1.0]].forEach((g) => { ctx.beginPath(); ctx.moveTo(s * (1.1 + g[0] * 0.5), -s * 0.35); ctx.lineTo(s * (1.1 + g[0]), s * g[1] + Math.sin(t * 5 + g[0]) * s * 0.08); ctx.stroke(); });
      ctx.strokeStyle = DK; ctx.lineWidth = s * 0.08;
      ctx.beginPath(); ctx.arc(s * 1.1, -s * 0.05, s * 0.5, 0, Math.PI * 2); ctx.fillStyle = '#FFC4DD'; ctx.fill(); ctx.stroke();
      ctx.fillStyle = DK; ctx.beginPath(); ctx.arc(s * 0.95, -s * 0.12, s * 0.06, 0, Math.PI * 2); ctx.arc(s * 1.3, -s * 0.12, s * 0.06, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(s * 1.0, s * 0.08); ctx.quadraticCurveTo(s * 1.12, s * 0.2, s * 1.24, s * 0.08); ctx.lineWidth = s * 0.05; ctx.stroke();
      ctx.restore();
    };

    const IMGS = ['20d67b215d5faa1713fe60303d807410', '4d8bdb8a2abb4b74d9ae213853092459', '7b17de5855f7a81e886f3e2882380113', '97adaf2b7c4a232c1800895d1e2914cf', 'da9b6686b13e3f894416951be3a2e34e', '4ebb11752ec761e9ef1f4e4bb6bcb960', '341e9fd55b8507251a986c0ff7d26fcf', '37706d61e32bd9a4b29ffc096a354852', '1490170bb2506d4a801f458e9dbdc236', '03e88b240944bb1b43b5b422a280c9c1', '1adabaeca0d2f409ce1a128c68ebae9e', '921ff4b02ab7e1e9bcdf63112c213832'].map((id) => { const im = new Image(); im.src = 'images/' + IMGMAP[id]; return im; });
    const SHARDS = [];
    const shardPals = ['silver', 'cyan', 'hot', 'lav', 'gold', 'lime'];
    for (let i = 0; i < 18; i++) {
      const pk = shardPals[i % shardPals.length];
      SHARDS.push({ m: i % 3 === 0 ? ICO : (i % 3 === 1 ? OCT : HEART_S), pk: pk, pal: P[pk], r: 1.45 + rnd() * 1.4, sp: (0.4 + rnd() * 0.9) * (i % 2 ? 1 : -1), ph: rnd() * 6.28, ya: (rnd() - 0.5) * 1.1, s: 0.09 + rnd() * 0.12 });
    }
    const BG = [];
    const kinds = [[HEART_S, 'hot', DK], [HEART_S, 'black', PK], [BOW, 'pink', DK], [BOW, 'cyan', DK], [CROSS, 'black', PK], [CROSS, 'silver', DK], [STAR, 'gold', DK], [OCT, 'lav', DK], [HEART_S, 'cyan', DK], [ICO, 'lime', DK], [STAR, 'pink', DK], [HEART_S, 'lav', DK]];
    for (let i = 0; i < 14; i++) {
      const kd = kinds[i % kinds.length];
      BG.push({ m: kd[0], pk: kd[1], pal: P[kd[1]], st: kd[2], x: rnd(), y: rnd(), s: 0.5 + rnd() * 0.9, dep: 0.15 + rnd() * 0.7, sp: [(rnd() - 0.5) * 1.4, (rnd() - 0.5) * 2.2, (rnd() - 0.5) * 0.9], ph: rnd() * 6.28 });
    }
    const GEMS = {
      g0: { parts: [{ m: HEART, pal: P.hot }], pk: 'hot', sp: [0.3, 1.6, 0] },
      g1: { parts: [{ m: BOW, pal: P.pink }], pk: 'pink', sp: [0.4, 1.1, 0.2] },
      g2: { parts: [{ m: HEART, pal: P.cyan }], pk: 'cyan', sp: [0.25, -1.3, 0] },
      g3: { parts: [{ m: CROSS, pal: P.silver }], pk: 'silver', sp: [0.2, 1.4, 0.1] },
      g4: { parts: [{ m: STAR, pal: P.gold }], pk: 'gold', sp: [0.3, 1.2, 0] },
      g5: { parts: [{ m: HEART, pal: P.lav }], pk: 'lav', sp: [0.3, 1.0, 0.2] }
    };

    const fit = (el, cap) => {
      const d = Math.min(cap || 1.25, window.devicePixelRatio || 1);
      const W = Math.round(el.clientWidth * d), H = Math.round(el.clientHeight * d);
      if (el.width !== W || el.height !== H) { el.width = W; el.height = H; }
      return d;
    };

    const FOG = hex('#0C070E'), LOW = hex('#3A1240'), HIGH = hex('#FF4FB0'), ROAD = hex('#160A1C');
    const drawFloor = (ctx, w, h, t, d) => {
      ctx.clearRect(0, 0, w, h);
      const hz = h * 0.36, f = Math.max(w * 0.05, 30 * d), ch = 1.6, off = t * 1.8;
      const sr = Math.min(w * 0.11, h * 0.32), sx = w / 2;
      halo(ctx, sx, hz - sr * 0.4, sr * 2.2, 'rgba(255,79,176,', 0.55);
      ctx.beginPath();
      for (let i = 0; i <= 12; i++) { const a = Math.PI + i / 12 * Math.PI; ctx.lineTo(sx + Math.cos(a) * sr, hz + Math.sin(a) * sr); }
      ctx.closePath();
      const g = ctx.createLinearGradient(0, hz - sr, 0, hz);
      g.addColorStop(0, '#FFF35C'); g.addColorStop(0.5, '#FF4FB0'); g.addColorStop(1, '#8A3BFF');
      ctx.fillStyle = g; ctx.fill(); ctx.lineWidth = 2 * d; ctx.strokeStyle = '#FFD6EC'; ctx.stroke();
      ctx.save(); ctx.globalCompositeOperation = 'destination-out';
      for (let i = 0; i < 5; i++) { const k = (i + (t * 0.7) % 1) / 5; const yy = hz - sr * (1 - k) * 0.85; ctx.fillRect(sx - sr - 4, yy, sr * 2 + 8, Math.max(1, sr * 0.08 * k)); }
      ctx.restore();
      ctx.fillStyle = '#FFFFFF'; heart2d(ctx, sx, hz - sr * 0.55, sr * 0.16); ctx.fill();
      const cols = 20, rows = 14, X0 = -10, near = 1.05, fr = off % 1, base = Math.floor(off);
      const ht = (x, zw) => {
        const ax = Math.abs(x);
        if (ax < 1.5) return 0;
        const k = Math.min(1, (ax - 1.5) / 3);
        return k * (0.7 + 0.6 * Math.sin(x * 1.3 + zw * 0.8) * Math.cos(zw * 0.55 - x * 0.35) + 0.35 * Math.sin(zw * 1.9 + x * 2.1)) * (0.5 + ax * 0.15);
      };
      const G = [];
      for (let r = 0; r <= rows; r++) {
        const z = near + r - fr, zw = near + r + base, row = [];
        for (let c = 0; c <= cols; c++) {
          const x = X0 + c, y = Math.max(0, ht(x, zw)), zz = Math.max(z, 0.12);
          row.push({ p: [x, y, z], s: [w / 2 + x * f / zz, hz + (ch - y) * f / zz] });
        }
        G.push(row);
      }
      const order = [];
      for (let c = 0; c < cols; c++) order.push(c);
      order.sort((a, b) => Math.abs(X0 + b + 0.5) - Math.abs(X0 + a + 0.5));
      ctx.lineJoin = 'round';
      for (let r = rows - 1; r >= 0; r--) {
        const fog = Math.min(1, Math.max(0, (G[r][0].p[2] - 2) / (rows - 2)));
        order.forEach((c) => {
          const A = G[r][c], B = G[r][c + 1], C = G[r + 1][c + 1], D = G[r + 1][c];
          [[A, B, C], [A, C, D]].forEach((tri) => {
            const n = face(tri[0].p, tri[1].p, tri[2].p);
            const sh = 0.35 + 0.65 * Math.abs(n[0] * LT[0] + n[1] * LT[1] + n[2] * LT[2]);
            const hy = (tri[0].p[1] + tri[1].p[1] + tri[2].p[1]) / 3;
            const road = Math.abs(tri[0].p[0]) < 1.6 && Math.abs(tri[1].p[0]) < 1.6 && Math.abs(tri[2].p[0]) < 1.6;
            let col = road ? ROAD : mix(LOW, HIGH, Math.min(1, hy / 1.8));
            col = mix(col.map((v) => v * (0.55 + 0.45 * sh)), FOG, fog * 0.88);
            ctx.beginPath(); ctx.moveTo(tri[0].s[0], tri[0].s[1]); ctx.lineTo(tri[1].s[0], tri[1].s[1]); ctx.lineTo(tri[2].s[0], tri[2].s[1]); ctx.closePath();
            ctx.fillStyle = rgb(col); ctx.fill();
            ctx.strokeStyle = road ? 'rgba(79,247,255,' + (0.95 * (1 - fog)).toFixed(3) + ')' : 'rgba(255,140,198,' + (0.95 * (1 - fog)).toFixed(3) + ')';
            ctx.lineWidth = 1.2 * d; ctx.stroke();
          });
        });
      }
    };

    const COLORS = ['#FF4FB0', '#FFFFFF', '#C9A8FF', '#4FF7FF', '#FFF35C', '#C6FF4F'];
    const HP = [['hot', DK], ['black', PK], ['silver', DK], ['lav', DK], ['cyan', DK], ['gold', DK], ['lime', DK]];
    const reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const moving = () => !reduce && (S.props.motion ?? true);
    S._parts = []; S._mx = 0; S._my = 0; S._spin = 0; S._dg = null; S._spinBoost = 0; S._spinAcc = 0;
    S._last = performance.now(); S._rainUntil = 0; S._matrixUntil = 0; S._brokenAt = -1e9; S._hc = 0;
    S._cat = { x: 100, y: 100, dir: 1 };
    S._ss = null;
    S._burst = (x, y, n) => {
      if (!moving()) return;
      S._parts.push({ ty: 2, x: x, y: y, life: 1 });
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, v = 180 + Math.random() * 340, hp = HP[i % HP.length];
        S._parts.push({ ty: 1, x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 220, g: 700, life: 1.4, s: 9 + Math.random() * 14, rx: Math.random() * 6, ry: Math.random() * 6, wx: (Math.random() - 0.5) * 10, wy: (Math.random() - 0.5) * 12, pk: hp[0], st: hp[1] });
      }
    };
    const act = () => { S._last = performance.now(); if (S._ss) S._ss = null; };
    S._onMove = (e) => {
      act();
      S._mx = e.clientX / window.innerWidth * 2 - 1;
      S._my = e.clientY / window.innerHeight * 2 - 1;
      S._px = e.clientX; S._py = e.clientY;
      if (S._dg) S._spin = S._dg.a + (e.clientX - S._dg.x) * 0.008;
      const tn = performance.now();
      if (!moving() || S._parts.length > 120 || tn - (S._lt || 0) < 40) return;
      S._lt = tn;
      S._parts.push({ ty: 0, x: e.clientX, y: e.clientY, vx: (Math.random() - 0.5) * 90, vy: (Math.random() - 0.5) * 60 - 20, life: 1, s: 4 + Math.random() * 7, r: (Math.random() - 0.5) * 0.8, c: COLORS[Math.floor(Math.random() * COLORS.length)] });
    };
    S._onDown = (e) => { act(); if (S.state.lb < 0) S._burst(e.clientX, e.clientY, 7); };
    S._onHeroDown = (e) => {
      S._dg = { x: e.clientX, a: S._spin };
      const he = S._cv.hero, g = S._hg;
      if (!he || !g) return;
      const rc = he.getBoundingClientRect();
      const px = e.clientX - rc.left, py = e.clientY - rc.top;
      if (Math.hypot(px - g.cx, py - g.cy) < g.hs * 1.15) {
        S._onHeart = true; S._holdStart = performance.now();
        S._hc += 1;
        if (S._hc >= 10) {
          S._hc = 0; S._brokenAt = performance.now();
          if (S._got.heart10) S.toast('또 깨졌다… 금방 붙어요 ♡'); else S.unlock('heart10');
        }
      }
    };
    S._onUp = () => { S._dg = null; S._onHeart = false; };
    S._onScroll = () => act();
    window.addEventListener('pointermove', S._onMove, { passive: true });
    window.addEventListener('pointerdown', S._onDown, { passive: true });
    window.addEventListener('pointerup', S._onUp, { passive: true });
    window.addEventListener('pointercancel', S._onUp, { passive: true });
    window.addEventListener('scroll', S._onScroll, { passive: true });
    S._heroEl = S._cv && S._cv.hero;
    if (S._heroEl) S._heroEl.addEventListener('pointerdown', S._onHeroDown);
    const hr = new Date().getHours();
    if (hr < 5) S._nt = setTimeout(() => S.unlock('night'), 2600);

    let t = 0, last = performance.now(), drops = [];
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const mv = moving();
      if (mv) t += dt;
      const cv = S._cv || {};
      const mx = mv ? S._mx : 0, my = mv ? S._my : 0;

      if (mv && now - S._last > 30000 && !S._ss) {
        S._ss = { x: 80, y: 80, vx: 160, vy: 120, c: 0 };
        S.unlock('idle');
      }
      const doc = document.documentElement;
      if (doc.scrollHeight > window.innerHeight * 1.6 && window.innerHeight + (window.scrollY || 0) >= doc.scrollHeight - 80) S.unlock('bottom');
      S._spinAcc += S._spinBoost * dt; S._spinBoost *= Math.pow(0.4, dt);
      if (Math.abs(S._spin) > 16) S.unlock('drag');
      if (S._onHeart && S._dg && !S._loved && now - S._holdStart > 2000) {
        S._loved = true;
        const g = S._hg, rc = cv.hero ? cv.hero.getBoundingClientRect() : { left: 0, top: 0 };
        if (g) S._burst(rc.left + g.cx, rc.top + g.cy, 50);
        S.unlock('love');
      }
      S._fr = (S._fr || 0) + 1;
      if (mv && now < S._rainUntil && Math.random() < 0.35 && S._parts.length < 120) {
        const hp = HP[Math.floor(Math.random() * HP.length)];
        S._parts.push({ ty: 1, x: Math.random() * window.innerWidth, y: -30, vx: (Math.random() - 0.5) * 40, vy: 80 + Math.random() * 120, g: 160, life: 4, s: 8 + Math.random() * 14, rx: Math.random() * 6, ry: Math.random() * 6, wx: (Math.random() - 0.5) * 6, wy: (Math.random() - 0.5) * 8, pk: hp[0], st: hp[1] });
      }

      const lbOpen = S.state.lb >= 0;
      const bg = cv.bg;
      if (bg && bg.clientWidth && !lbOpen && (S._fr % 2 === 0 || now < S._matrixUntil)) {
        const d = fit(bg, 1), ctx = bg.getContext('2d'), w = bg.width, h = bg.height;
        ctx.clearRect(0, 0, w, h);
        const u = Math.min(w, 1400 * d) / 22, span = h + 300 * d, sc = (window.scrollY || 0) * d;
        BG.forEach((o) => {
          let py = (o.y * span - sc * o.dep) % span; if (py < 0) py += span; py -= 150 * d;
          const px = o.x * w + Math.sin(t * 0.5 + o.ph) * 40 * d + mx * o.dep * 50 * d;
          const size = o.s * u * (0.6 + o.dep);
          ctx.globalAlpha = Math.min(1, 0.4 + o.dep);
          halo(ctx, px, py, size * 2.2, GLOW[o.pk], 0.35);
          draw(ctx, [{ m: o.m, pal: o.pal, st: o.st }], px, py, size, o.ph + o.sp[0] * t, o.ph + o.sp[1] * t, o.sp[2] * t, 1.5 * d);
        });
        ctx.globalAlpha = 1;
        if (now < S._matrixUntil) {
          const step = 22 * d, ncol = Math.ceil(w / step), CH = '일상♡ILSANG♥오너캐말랑쫀득';
          if (drops.length !== ncol) drops = Array.from({ length: ncol }, () => Math.random() * -30);
          ctx.font = (18 * d) + 'px VT323, monospace'; ctx.textAlign = 'center';
          for (let i = 0; i < ncol; i++) {
            drops[i] += dt * (10 + (i % 5) * 3);
            if (drops[i] * step > h + 200 * d) drops[i] = Math.random() * -10;
            for (let j = 0; j < 12; j++) {
              const yy = (drops[i] - j) * step; if (yy < -step) continue;
              ctx.fillStyle = j === 0 ? '#FFFFFF' : (i % 2 ? 'rgba(255,79,176,' : 'rgba(124,255,178,') + (1 - j / 12).toFixed(2) + ')';
              ctx.fillText(CH[(i * 7 + j + Math.floor(t * 8)) % CH.length], i * step + step / 2, yy);
            }
          }
        }
      }

      const he = cv.hero;
      if (he && he.clientWidth && !lbOpen && vis(he)) {
        const d = fit(he), ctx = he.getContext('2d'), w = he.width, h = he.height;
        ctx.clearRect(0, 0, w, h);
        const cx = w / 2 + mx * 24 * d, cy = h * 0.4 + my * 14 * d;
        const hs = Math.min(w, h) * 0.17;
        S._hg = { cx: cx / d, cy: cy / d, hs: hs / d };
        const R = Math.min(w * 0.4, h * 0.62, 540 * d), F = R * 3;
        const cw = Math.max(76 * d, Math.min(160 * d, w * 0.14)), chh = cw * 1.3;
        const spin = t * 0.32 + S._spin + S._spinAcc;
        const items = [];
        for (let i = 0; i < IMGS.length; i++) { const a = i / IMGS.length * Math.PI * 2 + spin; items.push({ z: Math.cos(a) * R, x: Math.sin(a) * R, a: a, card: i }); }
        SHARDS.forEach((s) => { const th = s.ph + t * s.sp, r = s.r * hs; items.push({ z: Math.sin(th) * r, x: Math.cos(th) * r, y: Math.sin(th * 2 + s.ph) * s.ya * r, shard: s }); });
        items.push({ z: 0, heart: true });
        items.sort((p, q) => p.z - q.z);
        const beat = 1 + 0.14 * Math.pow(Math.abs(Math.sin(t * 2.6)), 14);
        const bp = (now - S._brokenAt) / 2600;
        const ex = bp >= 0 && bp < 1 ? Math.sin(bp * Math.PI) * 2.6 : 0;
        items.forEach((it) => {
          const k = F / (F - it.z);
          if (it.heart) {
            halo(ctx, cx, cy, hs * 3.2 * beat, 'rgba(255,79,176,', 0.55 + (beat - 1) * 2);
            halo(ctx, cx, cy, hs * 1.6, 'rgba(255,255,255,', 0.18);
            draw(ctx, [{ m: HEART, pal: P.hot }], cx, cy, hs * beat, 0.25 + Math.sin(t * 0.9) * 0.3 + my * 0.4, t * 0.9 + S._spin * 1.5 + mx * 0.6, Math.sin(t * 0.7) * 0.15, 2.2 * d, ex);
          } else if (it.shard) {
            const s = it.shard, sx = cx + it.x * k, sy = cy - it.y * k;
            halo(ctx, sx, sy, s.s * hs * k * 2.6, GLOW[s.pk], 0.5);
            draw(ctx, [{ m: s.m, pal: s.pal }], sx, sy, s.s * hs * k, t * 1.3 + s.ph, t * 1.7 + s.ph, 0, 1.3 * d);
          } else {
            drawCard(ctx, IMGS[it.card], cx + it.x * k, cy + it.z * 0.2 * k, Math.cos(it.a) * k, k, cw, chh, d);
          }
        });
      }

      const fl = cv.floor;
      if (fl && fl.clientWidth && !lbOpen && vis(fl)) { const d = fit(fl, 1); drawFloor(fl.getContext('2d'), fl.width, fl.height, t, d); }

      Object.keys(GEMS).forEach((k) => {
        const el = cv[k];
        if (!el || !el.clientWidth || lbOpen || !vis(el)) return;
        const d = fit(el, 1.5), ctx = el.getContext('2d'), w = el.width, h = el.height, o = GEMS[k];
        ctx.clearRect(0, 0, w, h);
        const b = 1 + 0.1 * Math.pow(Math.abs(Math.sin(t * 2.6)), 14);
        const yy = h / 2 + Math.sin(t * 2) * h * 0.04;
        halo(ctx, w / 2, yy, Math.min(w, h) * 0.5, GLOW[o.pk], 0.6);
        draw(ctx, o.parts, w / 2, yy, Math.min(w, h) * 0.28 * b, 0.3 + o.sp[0] * t, o.sp[1] * t, o.sp[2] * t, Math.max(1.2, w / 55));
      });

      const fx = cv.fx;
      const fxBusy = S._parts.length > 0 || S._catOn || S._axoOn || S._ss;
      if (fx && fx.clientWidth && (fxBusy || S._fxDirty)) {
        const d = fit(fx, 1), ctx = fx.getContext('2d'), W = fx.width, Hh = fx.height;
        ctx.clearRect(0, 0, W, Hh);
        S._fxDirty = fxBusy;
        S._parts = S._parts.filter((p) => p.life > 0 && p.y < window.innerHeight + 80);
        S._parts.forEach((p) => {
          if (p.ty === 2) {
            p.life -= dt * 1.6;
            const r = (1 - p.life) * 170 * d;
            ctx.globalAlpha = Math.max(0, p.life);
            ctx.lineWidth = 5 * d * p.life;
            ctx.strokeStyle = '#FF4FB0'; ctx.beginPath(); ctx.arc(p.x * d, p.y * d, r, 0, Math.PI * 2); ctx.stroke();
            ctx.strokeStyle = '#4FF7FF'; ctx.beginPath(); ctx.arc(p.x * d, p.y * d, r * 0.7, 0, Math.PI * 2); ctx.stroke();
            ctx.strokeStyle = '#FFF35C'; ctx.beginPath(); ctx.arc(p.x * d, p.y * d, r * 0.45, 0, Math.PI * 2); ctx.stroke();
            return;
          }
          p.x += p.vx * dt; p.y += p.vy * dt;
          if (p.ty === 1) {
            p.vy += p.g * dt; p.vx *= 0.99; p.life -= dt; p.rx += p.wx * dt; p.ry += p.wy * dt;
            ctx.globalAlpha = Math.min(1, Math.max(0, p.life));
            halo(ctx, p.x * d, p.y * d, p.s * d * 2.2, GLOW[p.pk], 0.45);
            draw(ctx, [{ m: HEART_S, pal: P[p.pk], st: p.st }], p.x * d, p.y * d, p.s * d, p.rx, p.ry, 0, 1.2 * d);
          } else {
            p.vy += 60 * dt; p.life -= dt * 1.3;
            ctx.globalAlpha = Math.max(0, p.life);
            ctx.save(); ctx.translate(p.x * d, p.y * d); ctx.rotate(p.r);
            ctx.fillStyle = p.c; ctx.strokeStyle = '#1B0A16'; ctx.lineWidth = 1.2 * d;
            heart2d(ctx, 0, 0, p.s * d * (0.4 + 0.6 * p.life)); ctx.fill(); ctx.stroke();
            ctx.restore();
          }
        });
        ctx.globalAlpha = 1;

        if (S._catOn && S._px !== undefined) {
          const c = S._cat, tx = S._px - 50, ty = S._py + 30;
          const vx = (tx - c.x) * Math.min(1, dt * 2.5);
          c.x += vx; c.y += (ty - c.y) * Math.min(1, dt * 2.5);
          if (Math.abs(vx) > 0.3) c.dir = vx > 0 ? 1 : -1;
          drawCat(ctx, c.x * d, c.y * d, 22 * d, Math.abs(vx) > 0.3 ? t : 0, c.dir);
        }
        if (S._axoOn) {
          const span = window.innerWidth + 300, ax = ((t * 90) % span) - 150, ay = window.innerHeight * 0.78 + Math.sin(t * 1.6) * 40;
          drawAxo(ctx, ax * d, ay * d, 26 * d, t, 1);
        }
        if (S._ss) {
          const s = S._ss, bw = 300, bh = 80;
          s.x += s.vx * dt; s.y += s.vy * dt;
          const vw = window.innerWidth, vh = window.innerHeight;
          if (s.x < 0 || s.x + bw > vw) { s.vx *= -1; s.x = Math.max(0, Math.min(vw - bw, s.x)); s.c++; }
          if (s.y < 0 || s.y + bh > vh) { s.vy *= -1; s.y = Math.max(0, Math.min(vh - bh, s.y)); s.c++; }
          const cols = ['#FF4FB0', '#4FF7FF', '#FFF35C', '#C9A8FF', '#C6FF4F'], col = cols[s.c % cols.length];
          ctx.save();
          rr(ctx, s.x * d, s.y * d, bw * d, bh * d, 18 * d); ctx.fillStyle = '#120B14'; ctx.fill(); ctx.lineWidth = 3 * d; ctx.strokeStyle = col; ctx.stroke();
          ctx.fillStyle = col; ctx.font = (34 * d) + 'px VT323, monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('♡ ILSANG.EXE zzz ♡', (s.x + bw / 2) * d, (s.y + bh / 2) * d);
          ctx.restore();
        }
      }
      S._raf = requestAnimationFrame(tick);
    };
    S._raf = requestAnimationFrame(tick);
  })();
})();
