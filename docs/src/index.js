const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const msg = document.getElementById("message");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const container = document.getElementById("container");
const selectionSummary = document.getElementById("selectionSummary");
const finalChoice = document.getElementById("finalChoice");
const confirmDateBtn = document.getElementById("confirmDate");
const dateCards = [...document.querySelectorAll(".dateCard")];
const celebrationScreen = document.getElementById("celebrationScreen");
const celebrationText = document.getElementById("celebrationText");
const restartBtn = document.getElementById("restartBtn");
const sendEmailBtn = document.getElementById("sendEmailBtn");
const floatingHearts = document.getElementById("floatingHearts");

const crushName = "my love";
const myEmail = "fortuneakintunde@gmail.com";

let pressCount = 0;
let yesScale = 1;
let noScale = 1;
let selectedDate = null;
let romanticLoopId = null;

const messages = [
  "wait, check again",
  "nahhh, that's not right...",
  "fr, be serious...",
  "okay, now you're just playing",
  "okay, last chance"
];

const colors = [
  "#2f1d1d",
  "#d72638",
  "#0ea5e9",
  "#1d4ed8",
  "#db2777"
];

const soundEnabled = true;

const playTone = (freq, duration, type = "sine", volume = 0.06) => {
  if (!soundEnabled || !window.AudioContext) return;

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = type;
  oscillator.frequency.value = freq;
  gainNode.gain.value = volume;

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration);

  gainNode.gain.exponentialRampToValueAtTime(
    0.0001,
    audioCtx.currentTime + duration
  );
};

const createHeartBackground = () => {
  if (!floatingHearts) return;

  floatingHearts.innerHTML = "";

  for (let i = 0; i < 32; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart-particle";
    heart.textContent = "♥";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDelay = `${(Math.random() * 6).toFixed(2)}s`;
    heart.style.animationDuration = `${(6 + Math.random() * 8).toFixed(2)}s`;
    heart.style.fontSize = `${(14 + Math.random() * 20).toFixed(0)}px`;
    heart.style.opacity = (0.35 + Math.random() * 0.65).toFixed(2);
    heart.style.setProperty("--drift", `${(Math.random() * 70 - 35).toFixed(0)}px`);
    floatingHearts.appendChild(heart);
  }
};

const launchConfetti = () => {
  const confettiLayer = document.createElement("div");
  confettiLayer.className = "confetti-layer";

  for (let i = 0; i < 48; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = [
      "#ff8ca3",
      "#fbbf24",
      "#a78bfa",
      "#34d399",
      "#f472b6"
    ][Math.floor(Math.random() * 5)];
    piece.style.setProperty("--x", `${(Math.random() * 220 - 110).toFixed(0)}px`);
    piece.style.setProperty("--y", `${(Math.random() * 180 + 80).toFixed(0)}px`);
    piece.style.setProperty("--delay", `${(Math.random() * 0.5).toFixed(2)}s`);
    confettiLayer.appendChild(piece);
  }

  document.body.appendChild(confettiLayer);

  setTimeout(() => confettiLayer.remove(), 1800);
};

const startRomanticLoop = () => {
  if (romanticLoopId) {
    clearInterval(romanticLoopId);
  }

  const phrase = [
    392.0, 392.0, 440.0, 440.0, 523.25, 523.25, 587.33,
    523.25, 440.0, 440.0, 392.0, 392.0, 349.23, 349.23,
    329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 587.33,
    523.25, 440.0, 392.0
  ];

  let i = 0;

  romanticLoopId = setInterval(() => {
    const note = phrase[i % phrase.length];
    const duration = i % 4 === 0 ? 0.26 : 0.2;
    const volume = i % 2 === 0 ? 0.04 : 0.03;

    playTone(note, duration, "triangle", volume);
    i += 1;
  }, 280);
};

const stopRomanticLoop = () => {
  if (romanticLoopId) {
    clearInterval(romanticLoopId);
    romanticLoopId = null;
  }
};

const sendResponseByEmail = () => {
  if (!selectedDate) {
    finalChoice.textContent = "pick a date first, silly";
    finalChoice.classList.add("warning");
    return;
  }

  const subject = encodeURIComponent(`Date plan confirmed for ${crushName}`);
  const body = encodeURIComponent(
    `Hi,\n\nI just confirmed our date for ${selectedDate.day}.\nPlan: ${selectedDate.plan}.\nI am so excited to spend time together.\n\nWith love,\n${crushName}`
  );

  window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;
};

const pulseButton = (element) => {
  element.classList.remove("pulse");
  void element.offsetWidth;
  element.classList.add("pulse");
};

const moveNoButton = () => {
  const padding = 20;
  const maxX = Math.max(window.innerWidth - noBtn.offsetWidth - padding, 0);
  const maxY = Math.max(window.innerHeight - noBtn.offsetHeight - padding, 0);

  const x = Math.random() * maxX;
  const y = Math.random() * Math.min(maxY, window.innerHeight * 0.82);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = `scale(${Math.max(noScale - 0.15, 0.4)})`;
  noBtn.style.zIndex = "20";
  noBtn.style.margin = "0";
};

const setSelectedDate = (card) => {
  selectedDate = {
    day: card.dataset.day,
    plan: card.dataset.plan
  };

  dateCards.forEach((item) => item.classList.toggle("selected", item === card));
  selectionSummary.textContent = `you picked ${selectedDate.day} for ${selectedDate.plan}`;
  finalChoice.textContent = "";
  finalChoice.classList.remove("warning");
  playTone(660, 0.12, "triangle", 0.05);
};

noBtn.addEventListener("click", () => {
  pressCount += 1;

  if (pressCount <= messages.length) {
    msg.textContent = messages[pressCount - 1];
    msg.style.color = colors[pressCount - 1];
  }

  yesScale += 0.25;
  yesBtn.style.transform = `scale(${yesScale})`;
  pulseButton(yesBtn);

  noScale = Math.max(noScale - 0.14, 0.4);
  noBtn.style.transform = `scale(${noScale})`;
  moveNoButton();
  playTone(220 + pressCount * 25, 0.08, "sawtooth", 0.025);

  if (pressCount >= 5) {
    noBtn.style.display = "none";
    msg.textContent = "you had your chance";
    msg.style.color = "#7c2d12";
  }
});

yesBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  container.classList.add("hidden");
  playTone(523.25, 0.15, "sine", 0.04);
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  container.classList.remove("hidden");
  selectedDate = null;
  selectionSummary.textContent = "No date picked yet";
  finalChoice.textContent = "";
  dateCards.forEach((card) => card.classList.remove("selected"));
});

dateCards.forEach((card) => {
  card.addEventListener("click", () => setSelectedDate(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedDate(card);
    }
  });
});

confirmDateBtn.addEventListener("click", () => {
  if (!selectedDate) {
    finalChoice.textContent = "pick a date first, silly";
    finalChoice.classList.add("warning");
    playTone(180, 0.12, "square", 0.03);
    return;
  }

  finalChoice.textContent = `perfect! ${selectedDate.day} it is — ${selectedDate.plan} sounds dreamy.`;
  finalChoice.classList.remove("warning");
  celebrationText.textContent = `we're picking ${selectedDate.day} for ${selectedDate.plan}, ${crushName} — and I am already smiling.`;

  playTone(784, 0.18, "triangle", 0.045);
  playTone(1046, 0.2, "triangle", 0.035);
  launchConfetti();
  startRomanticLoop();

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    celebrationScreen.classList.remove("hidden");
  }, 450);
});

sendEmailBtn.addEventListener("click", () => {
  sendResponseByEmail();
  pulseButton(sendEmailBtn);
});

restartBtn.addEventListener("click", () => {
  celebrationScreen.classList.add("hidden");
  container.classList.remove("hidden");
  stopRomanticLoop();
  selectedDate = null;
  selectionSummary.textContent = "No date picked yet";
  finalChoice.textContent = "";
  dateCards.forEach((card) => card.classList.remove("selected"));
  msg.textContent = "choose wisely";
  msg.style.color = "#2f1d1d";
  noBtn.style.display = "inline-block";
  noBtn.style.position = "relative";
  noBtn.style.left = "auto";
  noBtn.style.top = "auto";
  noBtn.style.zIndex = "auto";
  noBtn.style.transform = "scale(1)";
  yesBtn.style.transform = "scale(1)";
  yesScale = 1;
  noScale = 1;
  pressCount = 0;
});

msg.textContent = "choose wisely";
msg.style.color = "#2f1d1d";

window.addEventListener("resize", () => {
  if (noBtn.style.display !== "none") {
    moveNoButton();
  }
});

window.addEventListener("load", () => {
  createHeartBackground();
});

noBtn.style.position = "relative";
