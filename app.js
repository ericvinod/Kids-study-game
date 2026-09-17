/* ============================================================
   LITTLE STARS ACADEMY — APP LOGIC
   ============================================================ */

const STORAGE_KEY = "little-stars-progress-v1";
const state = {
  progress: loadProgress(),
  view: "home",
  currentCategory: null,
  cardIndex: 0,
  seen: new Set(),
  quiz: { questions: [], index: 0, score: 0 }
};

const appEl = document.getElementById("app");
const toastEl = document.getElementById("toast");

/* ---------------- Progress storage ---------------- */
function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}
function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}
function starsFor(catId) {
  return (state.progress[catId] && state.progress[catId].stars) || 0;
}
function totalStars() {
  return Object.values(state.progress).reduce((sum, p) => sum + (p.stars || 0), 0);
}
function setStars(catId, stars) {
  const prev = starsFor(catId);
  if (stars > prev) {
    state.progress[catId] = { stars };
    saveProgress();
  }
}

/* ---------------- Speech ----------------
   The Web Speech API has a few well-known browser quirks that can make
   audio silently fail:
   1. Some browsers garbage-collect the SpeechSynthesisUtterance object
      before it finishes speaking if nothing keeps a reference to it —
      we keep one in `activeUtterance` to prevent that.
   2. Calling cancel() immediately followed by speak() can race in some
      browsers (especially Chrome/Android) — a tiny delay avoids it.
   3. Voice lists load asynchronously, so we warm them up once and pick
      an English voice explicitly when one is available.
   4. Mobile browsers only allow speech to start from inside a direct
      user gesture (a click), which every speak() call here already is.
------------------------------------------------------------------- */
let activeUtterance = null;
let voicesCache = [];
let speechSupported = "speechSynthesis" in window;

function loadVoices() {
  if (!speechSupported) return;
  voicesCache = window.speechSynthesis.getVoices();
}
if (speechSupported) {
  loadVoices();
  window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
}

function pickVoice() {
  if (!voicesCache.length) return null;
  return (
    voicesCache.find(v => /en-US|en_US/i.test(v.lang) && /female|Samantha|Google US English/i.test(v.name)) ||
    voicesCache.find(v => /^en/i.test(v.lang)) ||
    voicesCache[0]
  );
}

function speak(text, btn) {
  if (!speechSupported) {
    showToast("🔇 Audio isn't supported in this browser");
    return;
  }
  if (btn) btn.classList.add("speaking");

  const doSpeak = () => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.85;
    utter.pitch = 1.15;
    utter.volume = 1;
    const voice = pickVoice();
    if (voice) utter.voice = voice;

    const stopAnim = () => { if (btn) btn.classList.remove("speaking"); };
    utter.onend = stopAnim;
    utter.onerror = stopAnim;

    activeUtterance = utter; // keep a live reference so it isn't garbage-collected
    window.speechSynthesis.speak(utter);
  };

  // Cancel anything in progress, then wait a beat before speaking again —
  // avoids a race condition present in several mobile browsers.
  window.speechSynthesis.cancel();
  setTimeout(doSpeak, 60);
}

/* ---------------- Toast ---------------- */
let toastTimer = null;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1400);
}

/* ---------------- Rendering helpers ---------------- */
function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (v === null || v === undefined) return;
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach(c => {
    if (c == null) return;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  });
  return node;
}

function renderVisual(category, item, sizeClass = "") {
  if (category.kind === "shape") {
    if (item.shape === "star") return el("span", { class: "shape-icon star" }, "⭐");
    if (item.shape === "heart") return el("span", { class: "shape-icon heart" }, "❤️");
    return el("span", { class: `shape-icon ${item.shape}`, style: `background:${item.bg}; --tri-color:${item.bg}` });
  }
  if (category.kind === "colour") {
    return el("span", { class: "colour-swatch", style: `background:${item.hex}` });
  }
  if (category.kind === "number") {
    const wrap = el("div", { class: "flash-visual numbers-grid" });
    for (let i = 0; i < item.value; i++) wrap.appendChild(el("span", {}, "⭐"));
    return wrap;
  }
  return el("span", {}, item.emoji || "❓");
}

/* ================================================================
   HOME SCREEN
   ================================================================ */
function renderHome() {
  appEl.innerHTML = "";
  appEl.appendChild(
    el("div", { class: "topbar" }, [
      el("div", { class: "brand" }, [el("span", { class: "mascot" }, "🦉"), "Little Stars Academy"]),
      el("div", { class: "stars-total" }, [el("span", {}, "⭐"), " " + totalStars()])
    ])
  );

  appEl.appendChild(
    el("div", { class: "hero" }, [
      el("h1", {}, "What shall we learn today?"),
      el("p", {}, "Tap a topic, listen to the words, then play the quiz to win stars!")
    ])
  );

  const grid = el("div", { class: "category-grid" });
  CATEGORIES.forEach(cat => {
    const stars = starsFor(cat.id);
    grid.appendChild(
      el(
        "button",
        {
          class: "cat-card",
          style: `background:${cat.color}`,
          onclick: () => openCategory(cat.id)
        },
        [
          el("span", { class: "cat-icon" }, cat.icon),
          el("span", { class: "cat-name" }, cat.name),
          el("span", { class: "cat-stars" }, stars > 0 ? `⭐ ${stars}/3` : "New!")
        ]
      )
    );
  });
  appEl.appendChild(grid);
}

function openCategory(catId) {
  state.currentCategory = CATEGORIES.find(c => c.id === catId);
  state.cardIndex = 0;
  state.seen = new Set();
  state.view = "lesson";
  renderLesson();
}

/* ================================================================
   LESSON / FLASHCARD SCREEN
   ================================================================ */
function renderLesson() {
  const cat = state.currentCategory;
  const item = cat.items[state.cardIndex];
  state.seen.add(state.cardIndex);

  appEl.innerHTML = "";
  appEl.appendChild(
    el("div", { class: "topbar" }, [
      el("button", { class: "btn-back", onclick: goHome }, ["⬅", " Topics"]),
      el("div", { class: "stars-total" }, [el("span", {}, "⭐"), " " + totalStars()])
    ])
  );

  appEl.appendChild(
    el("div", { class: "lesson-header" }, [
      el("span", { style: "font-size:2rem" }, cat.icon),
      el("h2", {}, cat.name)
    ])
  );

  const dots = el("div", { class: "progress-dots" });
  cat.items.forEach((_, i) => {
    let cls = "dot";
    if (i === state.cardIndex) cls += " active";
    else if (state.seen.has(i)) cls += " seen";
    dots.appendChild(el("span", { class: cls }));
  });
  appEl.appendChild(dots);

  const visual = renderVisual(cat, item);
  const visualWrap = visual.classList && visual.classList.contains("numbers-grid")
    ? visual
    : el("div", { class: "flash-visual" }, visual);

  const sentence = buildSentence(cat, item);

  const card = el("div", { class: "flashcard" }, [
    visualWrap,
    el("div", { class: "flash-label" }, item.label),
    el("div", { class: "flash-sentence" }, sentence),
    el("div", { class: "speaker-row" }, [
      el(
        "button",
        { class: "btn-speak word", onclick: (e) => speak(item.label, e.currentTarget) },
        ["🔊 Say the word"]
      ),
      el(
        "button",
        { class: "btn-speak sentence", onclick: (e) => speak(sentence, e.currentTarget) },
        ["📢 Read Entire Sentence"]
      )
    ])
  ]);

  appEl.appendChild(
    el("div", { class: "flashcard-wrap" }, [
      el("button", {
        class: "nav-arrow", "aria-label": "Previous",
        onclick: () => { state.cardIndex = Math.max(0, state.cardIndex - 1); renderLesson(); },
        disabled: state.cardIndex === 0 ? "disabled" : null
      }, "◀"),
      card,
      el("button", {
        class: "nav-arrow", "aria-label": "Next",
        onclick: () => { state.cardIndex = Math.min(cat.items.length - 1, state.cardIndex + 1); renderLesson(); },
        disabled: state.cardIndex === cat.items.length - 1 ? "disabled" : null
      }, "▶")
    ])
  );

  appEl.appendChild(
    el("div", { class: "lesson-footer" }, [
      el("button", { class: "btn-quiz", onclick: startQuiz }, "🎯 Start the Quiz!")
    ])
  );
}

function goHome() {
  window.speechSynthesis && window.speechSynthesis.cancel();
  state.view = "home";
  renderHome();
}

/* ================================================================
   QUIZ SCREEN
   ================================================================ */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startQuiz() {
  const cat = state.currentCategory;
  const count = Math.min(6, cat.items.length);
  const chosen = shuffle(cat.items.map((it, i) => i)).slice(0, count);

  state.quiz.questions = chosen.map(correctIdx => {
    const distractorPool = cat.items
      .map((_, i) => i)
      .filter(i => i !== correctIdx);
    const distractors = shuffle(distractorPool).slice(0, Math.min(3, distractorPool.length));
    const options = shuffle([correctIdx, ...distractors]);
    return { correctIdx, options };
  });
  state.quiz.index = 0;
  state.quiz.score = 0;
  state.view = "quiz";
  renderQuiz();
}

function renderQuiz() {
  const cat = state.currentCategory;
  const q = state.quiz.questions[state.quiz.index];
  const correctItem = cat.items[q.correctIdx];

  appEl.innerHTML = "";
  appEl.appendChild(
    el("div", { class: "topbar" }, [
      el("button", { class: "btn-back", onclick: () => { state.view = "lesson"; renderLesson(); } }, ["⬅", " Cards"]),
      el("div", { class: "stars-total" }, [el("span", {}, "⭐"), " " + totalStars()])
    ])
  );

  appEl.appendChild(
    el("div", { class: "quiz-progress" }, `Question ${state.quiz.index + 1} of ${state.quiz.questions.length}`)
  );

  const promptText = cat.kind === "number"
    ? `Find the number: ${correctItem.label} (${correctItem.value})`
    : cat.kind === "colour"
    ? `Find the colour:`
    : `Find:`;

  appEl.appendChild(
    el("div", { class: "quiz-question" }, [
      el("div", { class: "prompt-label" }, "Listen and tap the right answer"),
      el("div", { class: "prompt-word" }, cat.kind === "colour" ? correctItem.label : correctItem.label),
      el("button", {
        class: "btn-speak sentence",
        onclick: (e) => speak(cat.kind === "number" ? `Find the number ${correctItem.label}` : `Find the ${correctItem.label}`, e.currentTarget)
      }, ["🔊 Hear it again"])
    ])
  );

  const optionsWrap = el("div", { class: "quiz-options" });
  q.options.forEach(optIdx => {
    const optItem = cat.items[optIdx];
    const visual = renderVisual(cat, optItem);
    const card = el(
      "button",
      { class: "option-card", onclick: (e) => handleAnswer(optIdx === q.correctIdx, e.currentTarget) },
      [
        el("div", { class: "opt-visual" }, visual),
        el("div", { class: "opt-label" }, optItem.label)
      ]
    );
    optionsWrap.appendChild(card);
  });
  appEl.appendChild(optionsWrap);
  appEl.appendChild(el("div", { class: "feedback-banner", id: "feedback" }));
}

function handleAnswer(isCorrect, cardEl) {
  const options = document.querySelectorAll(".option-card");
  options.forEach(o => o.classList.add("disabled"));
  const feedback = document.getElementById("feedback");

  if (isCorrect) {
    cardEl.classList.add("correct");
    feedback.textContent = pickCheer();
    feedback.className = "feedback-banner good";
    state.quiz.score++;
    const rect = cardEl.getBoundingClientRect();
    Confetti.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 60);
    showToast("⭐ Great job!");
    speak(pickCheerSpeech());
  } else {
    cardEl.classList.add("wrong");
    feedback.textContent = "Not quite — try the next one!";
    feedback.className = "feedback-banner bad";
    // reveal correct answer softly
    const q = state.quiz.questions[state.quiz.index];
    const correctCard = [...options][q.options.indexOf(q.correctIdx)];
    if (correctCard) correctCard.classList.add("correct");
  }

  setTimeout(() => {
    state.quiz.index++;
    if (state.quiz.index >= state.quiz.questions.length) {
      finishQuiz();
    } else {
      renderQuiz();
    }
  }, 1300);
}

function pickCheer() {
  const cheers = ["Awesome!", "You got it!", "Super!", "Well done!", "Fantastic!", "Yay!"];
  return cheers[Math.floor(Math.random() * cheers.length)];
}
function pickCheerSpeech() {
  const cheers = ["Great job!", "You are a star!", "Awesome work!", "Well done!"];
  return cheers[Math.floor(Math.random() * cheers.length)];
}

function finishQuiz() {
  const cat = state.currentCategory;
  const total = state.quiz.questions.length;
  const score = state.quiz.score;
  const ratio = score / total;
  const stars = ratio === 1 ? 3 : ratio >= 0.6 ? 2 : 1;
  setStars(cat.id, stars);

  Confetti.fullCelebration();
  speak(`You scored ${score} out of ${total}. Great work!`);

  const overlay = el("div", { class: "reward-overlay" }, [
    el("div", { class: "reward-card" }, [
      el("span", { class: "big-emoji" }, stars === 3 ? "🏆" : stars === 2 ? "🎉" : "🌟"),
      el("h3", {}, `You scored ${score} / ${total}!`),
      el("p", {}, "★".repeat(stars) + "☆".repeat(3 - stars)),
      el("div", { class: "reward-actions" }, [
        el("button", { class: "btn-primary", onclick: () => { overlay.remove(); startQuiz(); } }, "Play Again"),
        el("button", { class: "btn-secondary", onclick: () => { overlay.remove(); goHome(); } }, "Back to Topics")
      ])
    ])
  ]);
  appEl.appendChild(overlay);
}

/* ---------------- One-time speech "unlock" ----------------
   iOS Safari and some Android browsers keep the speech engine asleep
   until the very first user gesture triggers a tiny (near-silent)
   utterance. Without this, the first real word/sentence tap can be
   silently dropped. */
let speechUnlocked = false;
function unlockSpeechOnce() {
  if (speechUnlocked || !speechSupported) return;
  speechUnlocked = true;
  const warm = new SpeechSynthesisUtterance(" ");
  warm.volume = 0.01;
  window.speechSynthesis.speak(warm);
  document.removeEventListener("pointerdown", unlockSpeechOnce);
}
document.addEventListener("pointerdown", unlockSpeechOnce, { once: true });

/* ---------------- Init ---------------- */
renderHome();
