const questions = [
  {
    question: "Apa yang dimaksud dengan phishing?",
    choices: [
      "Serangan yang mencoba mencuri data dengan menyamar",
      "Aplikasi untuk mempercepat internet",
      "Software antivirus otomatis"
    ],
    answer: 0
  },
  {
    question: "Tanda-tanda website phishing umumnya meliputi …",
    choices: [
      "URL tampak aneh atau domain tidak resmi",
      "Tampilan website sangat profesional tanpa kesalahan",
      "Warna website gelap dan sulit dibaca"
    ],
    answer: 0
  },
  {
    question: "Jika kamu menerima email mencurigakan dengan link, apa yang sebaiknya dilakukan?",
    choices: [
      "Langsung klik link untuk melihat isinya",
      "Masukkan password kamu untuk verifikasi",
      "Abaikan atau laporkan ke pihak berwenang",
    ],
    answer: 2
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const TIME_PER_QUESTION = 30; // detik

const questionEl = document.getElementById("question");
const choicesContainer = document.getElementById("choice-container");
const nextBtn = document.getElementById("next-btn");
const timerEl = document.getElementById("time");
const progressBar = document.getElementById("progress-bar");
const resultContainer = document.getElementById("result-container");
const quizContainer = document.getElementById("question-container");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  nextBtn.classList.add("hidden");
  updateProgressBar();
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  const q = questions[currentQuestionIndex];
  questionEl.textContent = q.question;
  choicesContainer.innerHTML = "";

  q.choices.forEach((choice, idx) => {
    const btn = document.createElement("button");
    btn.classList.add("choice");
    btn.textContent = choice;
    btn.onclick = () => selectAnswer(idx, btn);
    choicesContainer.appendChild(btn);
  });

  startTimer();
}

function startTimer() {
  let timeLeft = TIME_PER_QUESTION;
  timerEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      showAnswerFeedback(); // jika waktu habis otomatis lanjut
    }
  }, 1000);
}

function selectAnswer(idx, btn) {
  clearInterval(timer);
  const q = questions[currentQuestionIndex];
  const correctIdx = q.answer;

  if (idx === correctIdx) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("incorrect");
    // highlight jawaban benar
    const correctBtn = choicesContainer.children[correctIdx];
    if (correctBtn) correctBtn.classList.add("correct");
  }

  // disable semua pilihan
  Array.from(choicesContainer.children).forEach(b => b.disabled = true);

  nextBtn.classList.remove("hidden");
}

nextBtn.onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    updateProgressBar();
    loadQuestion();
    nextBtn.classList.add("hidden");
  } else {
    showResult();
  }
};

function updateProgressBar() {
  const percent = (currentQuestionIndex / questions.length) * 100;
  progressBar.style.width = `${percent}%`;
}

function showResult() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  scoreText.textContent = `Kamu menjawab benar ${score} dari ${questions.length} soal.`;
  progressBar.style.width = `100%`;
}

restartBtn.onclick = () => {
  startQuiz();
};

// Jalankan saat halaman siap
startQuiz();
