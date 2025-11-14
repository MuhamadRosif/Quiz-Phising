const quizData = [
  {
    question: "Email dari bank meminta kamu klik link untuk verifikasi akun. Apa yang harus kamu lakukan?",
    options: ["Klik link", "Abaikan dan cek web resmi", "Balas email"],
    correct: 1
  },
  {
    question: "Website meminta password tapi URL tidak HTTPS. Apa itu aman?",
    options: ["Aman", "Tidak aman", "Tetap lanjut saja"],
    correct: 1
  },
  {
    question: "Kamu dapat pesan WhatsApp hadiah undian. Respon terbaik?",
    options: ["Klik link", "Blokir dan laporkan", "Chat saja dulu"],
    correct: 1
  }
];

let currentIndex = 0;
let score = 0;

const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const resultContainer = document.getElementById("result");
const scoreText = document.getElementById("score-text");
const retryBtn = document.getElementById("retry-btn");

function loadQuestion() {
  const q = quizData[currentIndex];
  questionText.textContent = q.question;

  optionsContainer.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(index);
    optionsContainer.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === quizData[currentIndex].correct) {
    score++;
  }

  currentIndex++;

  if (currentIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-container").classList.add("hidden");
  resultContainer.classList.remove("hidden");

  scoreText.textContent = `Skor kamu: ${score}/${quizData.length}`;
}

retryBtn.onclick = () => {
  currentIndex = 0;
  score = 0;
  resultContainer.classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  loadQuestion();
};

loadQuestion();
