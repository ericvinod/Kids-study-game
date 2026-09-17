# Little Stars Academy 🦉⭐

A playful, browser-based revision game for children age 4+, covering the topics
from the uploaded LKG textbook pages: Fruits, Vegetables, Farm Animals, Wild
Animals, Sea Animals, Birds, Shapes, Colours, My Body, Days of the Week,
Seasons, School Supplies, 5 Senses, Good Habits, Good Manners, and Numbers.

## How to run it
Just open `index.html` in any modern web browser (Chrome, Edge, Safari).
No installation, build step, or internet connection is required — the app
runs entirely offline (an internet connection is only used to fetch the
"Baloo 2" display font; without it, the app quietly falls back to a similar
system font).

## Features
- **16 topic groups** grouped into a single home screen grid, sourced
  directly from the textbook content.
- **Animation** throughout: a bouncy mascot, floating background shapes,
  card pop-ins, wiggle/hover effects, and confetti celebrations.
- **Audio pronunciation** for every word/label using the browser's built-in
  Web Speech API (no audio files needed) — tap "🔊 Say the word".
- **"Read Entire Sentence"** speaker button on every flashcard that reads the
  full descriptive sentence aloud ("📢 Read Entire Sentence").
- **Instant rewards**: a toast pop-up, a confetti burst at the exact spot
  tapped, and a star badge, immediately after every correct quiz answer.
- **End-of-quiz celebration**: a full-screen confetti canvas plus a star
  rating (1–3 stars) saved per topic in the browser's local storage, so
  progress is remembered between visits.
- Fully responsive (phone/tablet/desktop) and respects
  `prefers-reduced-motion` for accessibility.

## File structure
```
kids-lessons/
├── index.html          # App shell
├── css/
│   └── style.css       # All styling & animation
├── js/
│   ├── data.js          # All lesson content (words, emoji, sentences)
│   ├── confetti.js       # Lightweight canvas confetti engine
│   └── app.js            # App logic: navigation, flashcards, quiz, speech
└── README.md
```

## Notes for teachers/parents
- Every topic has a "Learn" mode (flip through flashcards, listen to words
  and full sentences) and a "Quiz" mode (multiple-choice, 4–6 questions).
- Stars earned per topic are shown on the home screen so a child (or
  parent) can see progress at a glance.
- All visuals use large emoji/CSS shapes for fast loading and crisp
  rendering at any screen size — no external image files are required.
