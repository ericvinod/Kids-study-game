/* ============================================================
   LITTLE STARS ACADEMY — LESSON DATA
   All vocabulary content sourced from the uploaded LKG textbook
   pages (Fruits, Vegetables, Animals, Numbers, Good Habits, etc).
   ============================================================ */

const CATEGORIES = [
  {
    id: "fruits", name: "Fruits", icon: "🍓", color: "#FF6B6B",
    kind: "word",
    items: [
      { label: "Apple", emoji: "🍎" },
      { label: "Banana", emoji: "🍌" },
      { label: "Grapes", emoji: "🍇" },
      { label: "Watermelon", emoji: "🍉" },
      { label: "Papaya", emoji: "🍈" },
      { label: "Strawberry", emoji: "🍓" },
      { label: "Mango", emoji: "🥭" },
      { label: "Pomegranate", emoji: "🍎" },
      { label: "Pineapple", emoji: "🍍" },
      { label: "Blueberry", emoji: "🫐" },
      { label: "Lemon", emoji: "🍋" },
      { label: "Orange", emoji: "🍊" }
    ]
  },
  {
    id: "vegetables", name: "Vegetables", icon: "🥕", color: "#51CF66",
    kind: "word",
    items: [
      { label: "Onion", emoji: "🧅" },
      { label: "Potato", emoji: "🥔" },
      { label: "Cabbage", emoji: "🥬" },
      { label: "Lady's Finger", emoji: "🫛" },
      { label: "Capsicum", emoji: "🫑" },
      { label: "Carrot", emoji: "🥕" },
      { label: "Beetroot", emoji: "🍠" },
      { label: "Beans", emoji: "🫘" },
      { label: "Cauliflower", emoji: "🥦" },
      { label: "Broccoli", emoji: "🥦" },
      { label: "Tomato", emoji: "🍅" },
      { label: "Brinjal", emoji: "🍆" }
    ]
  },
  {
    id: "farm", name: "Farm Animals", icon: "🐄", color: "#FFA94D",
    kind: "word",
    items: [
      { label: "Cow", emoji: "🐄" },
      { label: "Cat", emoji: "🐱" },
      { label: "Horse", emoji: "🐴" },
      { label: "Rooster", emoji: "🐓" },
      { label: "Goat", emoji: "🐐" },
      { label: "Pig", emoji: "🐖" },
      { label: "Donkey", emoji: "🫏" },
      { label: "Dog", emoji: "🐶" },
      { label: "Duck", emoji: "🦆" },
      { label: "Hen", emoji: "🐔" },
      { label: "Rabbit", emoji: "🐰" },
      { label: "Sheep", emoji: "🐑" }
    ]
  },
  {
    id: "wild", name: "Wild Animals", icon: "🦁", color: "#845EF7",
    kind: "word",
    items: [
      { label: "Lion", emoji: "🦁" },
      { label: "Tiger", emoji: "🐯" },
      { label: "Elephant", emoji: "🐘" },
      { label: "Giraffe", emoji: "🦒" },
      { label: "Zebra", emoji: "🦓" },
      { label: "Bear", emoji: "🐻" },
      { label: "Monkey", emoji: "🐒" },
      { label: "Kangaroo", emoji: "🦘" },
      { label: "Panda", emoji: "🐼" },
      { label: "Fox", emoji: "🦊" },
      { label: "Wolf", emoji: "🐺" },
      { label: "Deer", emoji: "🦌" },
      { label: "Crocodile", emoji: "🐊" },
      { label: "Snake", emoji: "🐍" },
      { label: "Hippopotamus", emoji: "🦛" },
      { label: "Rhinoceros", emoji: "🦏" },
      { label: "Gorilla", emoji: "🦍" },
      { label: "Cheetah", emoji: "🐆" }
    ]
  },
  {
    id: "sea", name: "Sea Animals", icon: "🐬", color: "#22B8CF",
    kind: "word",
    items: [
      { label: "Dolphin", emoji: "🐬" },
      { label: "Shark", emoji: "🦈" },
      { label: "Whale", emoji: "🐋" },
      { label: "Jelly Fish", emoji: "🪼" },
      { label: "Fish", emoji: "🐟" },
      { label: "Turtle", emoji: "🐢" },
      { label: "Star Fish", emoji: "⭐" },
      { label: "Sea Horse", emoji: "🐠" }
    ]
  },
  {
    id: "birds", name: "Birds", icon: "🦜", color: "#F06595",
    kind: "word",
    items: [
      { label: "Eagle", emoji: "🦅" },
      { label: "Kingfisher", emoji: "🐦" },
      { label: "Hen", emoji: "🐔" },
      { label: "Sparrow", emoji: "🐦" },
      { label: "Crow", emoji: "🐦‍⬛" },
      { label: "Owl", emoji: "🦉" },
      { label: "Myna", emoji: "🐦" },
      { label: "Parrot", emoji: "🦜" },
      { label: "Pigeon", emoji: "🕊️" },
      { label: "Peacock", emoji: "🦚" },
      { label: "Flamingo", emoji: "🦩" },
      { label: "Duck", emoji: "🦆" }
    ]
  },
  {
    id: "shapes", name: "Shapes", icon: "🔷", color: "#5C7CFA",
    kind: "shape",
    items: [
      { label: "Circle", shape: "circle", bg: "#51CF66" },
      { label: "Star", shape: "star", bg: "#9775FA" },
      { label: "Triangle", shape: "triangle", bg: "#F783AC" },
      { label: "Diamond", shape: "diamond", bg: "#FF922B" },
      { label: "Square", shape: "square", bg: "#4DABF7" },
      { label: "Oval", shape: "oval", bg: "#3B5BDB" },
      { label: "Heart", shape: "heart", bg: "#FA5252" },
      { label: "Rectangle", shape: "rectangle", bg: "#FCC419" }
    ]
  },
  {
    id: "colours", name: "Colours", icon: "🎨", color: "#FF8787",
    kind: "colour",
    items: [
      { label: "Red", hex: "#E8594A" },
      { label: "Green", hex: "#4CAF6D" },
      { label: "Blue", hex: "#4A4EC1" },
      { label: "Yellow", hex: "#F5D93B" },
      { label: "Orange", hex: "#F0904B" },
      { label: "Pink", hex: "#E0398B" },
      { label: "Purple", hex: "#7B3FA0" },
      { label: "Brown", hex: "#7A5230" },
      { label: "Grey", hex: "#9B9B9B" },
      { label: "White", hex: "#F2F2F2" },
      { label: "Maroon", hex: "#7A2331" },
      { label: "Black", hex: "#2B2B2B" }
    ]
  },
  {
    id: "body", name: "My Body", icon: "🧍", color: "#63E6BE",
    kind: "word",
    items: [
      { label: "Hair", emoji: "💇" },
      { label: "Head", emoji: "🙂" },
      { label: "Eye", emoji: "👁️" },
      { label: "Ear", emoji: "👂" },
      { label: "Nose", emoji: "👃" },
      { label: "Mouth", emoji: "👄" },
      { label: "Neck", emoji: "🧣" },
      { label: "Shoulder", emoji: "🙆" },
      { label: "Chest", emoji: "👕" },
      { label: "Arm", emoji: "💪" },
      { label: "Wrist", emoji: "⌚" },
      { label: "Finger", emoji: "☝️" },
      { label: "Stomach", emoji: "🫃" },
      { label: "Thigh", emoji: "🦵" },
      { label: "Knee", emoji: "🦵" },
      { label: "Leg", emoji: "🦿" },
      { label: "Foot", emoji: "🦶" }
    ]
  },
  {
    id: "days", name: "Days of the Week", icon: "📅", color: "#FFD43B",
    kind: "word",
    sentencePrefix: "Today is",
    items: [
      { label: "Sunday", emoji: "🐓" },
      { label: "Monday", emoji: "🐶" },
      { label: "Tuesday", emoji: "🐒" },
      { label: "Wednesday", emoji: "🐱" },
      { label: "Thursday", emoji: "🐦" },
      { label: "Friday", emoji: "🐘" },
      { label: "Saturday", emoji: "🐷" }
    ]
  },
  {
    id: "seasons", name: "Seasons", icon: "🍂", color: "#E8590C",
    kind: "word",
    sentencePrefix: "It is",
    items: [
      { label: "Spring", emoji: "🌸" },
      { label: "Summer", emoji: "☀️" },
      { label: "Autumn", emoji: "🍂" },
      { label: "Winter", emoji: "⛄" }
    ]
  },
  {
    id: "supplies", name: "School Supplies", icon: "🎒", color: "#4DABF7",
    kind: "word",
    items: [
      { label: "Sharpener", emoji: "🔻" },
      { label: "Glue", emoji: "🧴" },
      { label: "Book", emoji: "📖" },
      { label: "Crayons", emoji: "🖍️" },
      { label: "Pencil Case", emoji: "👝" },
      { label: "Scissors", emoji: "✂️" },
      { label: "Pencil", emoji: "✏️" },
      { label: "Eraser", emoji: "🧼" },
      { label: "Pen", emoji: "🖊️" },
      { label: "Ruler", emoji: "📏" },
      { label: "Bag", emoji: "🎒" },
      { label: "Notebook", emoji: "📓" }
    ]
  },
  {
    id: "senses", name: "5 Senses", icon: "👀", color: "#B197FC",
    kind: "sentence",
    items: [
      { label: "Smell", emoji: "👃", sentence: "We use our nose to smell things." },
      { label: "Touch", emoji: "✋", sentence: "We use our hands to touch things." },
      { label: "Taste", emoji: "👅", sentence: "We use our tongue to taste food." },
      { label: "See", emoji: "👀", sentence: "We use our eyes to see things." },
      { label: "Hear", emoji: "👂", sentence: "We use our ears to hear sounds." }
    ]
  },
  {
    id: "habits", name: "Good Habits", icon: "🌟", color: "#69DB7C",
    kind: "sentence",
    items: [
      { label: "Wake up early", emoji: "⏰", sentence: "Wake up early." },
      { label: "Brush your teeth", emoji: "🪥", sentence: "Brush your teeth twice a day." },
      { label: "Take a bath", emoji: "🛁", sentence: "Take bath everyday." },
      { label: "Eat on time", emoji: "🍽️", sentence: "Have your food on time." },
      { label: "Play in the evening", emoji: "🤸", sentence: "Play in the evening." },
      { label: "Learn your lessons", emoji: "📚", sentence: "Learn your lessons everyday." },
      { label: "Sleep early", emoji: "😴", sentence: "Go to sleep early." },
      { label: "Pray to God", emoji: "🙏", sentence: "Pray to God everyday." }
    ]
  },
  {
    id: "manners", name: "Good Manners", icon: "🤝", color: "#FFA8A8",
    kind: "sentence",
    items: [
      { label: "Greet your teachers", emoji: "👋", sentence: "Greet your teachers and friends when you enter the school." },
      { label: "Be on time", emoji: "⏰", sentence: "Be on time to school." },
      { label: "Do your homework", emoji: "📝", sentence: "Do your homework everyday." },
      { label: "Revise your lessons", emoji: "📖", sentence: "Revise your lessons everyday." },
      { label: "Be polite", emoji: "😊", sentence: "Be polite and kind to your friends." },
      { label: "Wait for your turn", emoji: "🙋", sentence: "Wait for your turn." },
      { label: "Come neatly dressed", emoji: "👔", sentence: "Come neatly dressed to school." },
      { label: "Keep belongings carefully", emoji: "🎒", sentence: "Keep your belongings carefully." }
    ]
  },
  {
    id: "numbers", name: "Numbers", icon: "🔢", color: "#4DABF7",
    kind: "number",
    items: [
      { label: "One", value: 1 }, { label: "Two", value: 2 }, { label: "Three", value: 3 },
      { label: "Four", value: 4 }, { label: "Five", value: 5 }, { label: "Six", value: 6 },
      { label: "Seven", value: 7 }, { label: "Eight", value: 8 }, { label: "Nine", value: 9 },
      { label: "Ten", value: 10 }, { label: "Eleven", value: 11 }, { label: "Twelve", value: 12 },
      { label: "Thirteen", value: 13 }, { label: "Fourteen", value: 14 }, { label: "Fifteen", value: 15 },
      { label: "Sixteen", value: 16 }, { label: "Seventeen", value: 17 }, { label: "Eighteen", value: 18 },
      { label: "Nineteen", value: 19 }, { label: "Twenty", value: 20 }
    ]
  }
];

/* Simple pluralised/friendly sentence builder used by the "Read Sentence"
   speaker button when a category doesn't define its own sentence. */
function buildSentence(category, item) {
  if (item.sentence) return item.sentence;
  if (category.kind === "shape") return `This is a ${item.label}.`;
  if (category.kind === "colour") return `This colour is ${item.label}.`;
  if (category.kind === "number") return `This is the number ${item.label}, ${item.value}.`;
  const prefix = category.sentencePrefix || "This is a";
  const article = /^[aeiou]/i.test(item.label) ? "an" : "a";
  if (category.sentencePrefix) return `${prefix} ${item.label}.`;
  return `This is ${article} ${item.label}.`;
}
