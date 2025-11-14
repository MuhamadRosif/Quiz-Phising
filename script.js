// =====================
// DATA SOAL
// =====================
const questions = [
    {
        q: "Kamu mendapat email dari 'Bank Nasional' meminta update data akun. Link tidak resmi. Apa ini?",
        a: ["Aman", "Phishing", "Spam", "Notifikasi Umum"],
        c: 1
    },
    {
        q: "Website login yang tampilannya mirip Google tetapi URL mencurigakan adalah?",
        a: ["Website Biasa", "Iklan", "Phishing", "Maintenance"],
        c: 2
    },
    {
        q: "SMS hadiah undian tetapi kamu tidak pernah ikut. Itu adalah?",
        a: ["Spam", "Phishing", "Promo Resmi", "Error Sistem"],
        c: 1
    }
];

let index = 0;
let score = 0;
let timer = 0;
let timerInterval;

// Shuffle array function
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// =====================
// MULAI KUIS
// =====================
document.getElementById("start-btn").onclick = () => {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");

    index = 0;
    score = 0;
    timer = 0;
    questions.sort(() => Math.random() - 0.5);

    document.getElementById("q-total").innerText = questions.length;

    timerInterval = setInterval(() => {
        timer++;
        document.getElementById("timer").innerText = timer;
    }, 1000);

    loadQuestion();
};

// =====================
// TAMPILKAN SOAL
// =====================
function loadQuestion() {
    let q = questions[index];

    document.getElementById("question").innerText = q.q;
    document.getElementById("q-number").innerText = index + 1;

    let ansBox = document.getElementById("answers");
    ansBox.innerHTML = "";

    let shuffledAnswers = q.a.map((text, i) => ({ text, i }));
    shuffle(shuffledAnswers);

    shuffledAnswers.forEach(item => {
        let btn = document.createElement("button");
        btn.className = "answer-btn";
        btn.innerText = item.text;

        btn.onclick = () => checkAnswer(btn, item.i);

        ansBox.appendChild(btn);
    });

    updateProgress();
}

// =====================
// CEK JAWABAN
// =====================
function checkAnswer(button, indexAnswer) {
    let correctIndex = questions[index].c;
    let buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach(btn => btn.style.pointerEvents = "none");

    if (indexAnswer === correctIndex) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
    }

    setTimeout(() => {
        index++;
        if (index < questions.length) loadQuestion();
        else finishQuiz();
    }, 700);
}

// =====================
// PROGRESS BAR
// =====================
function updateProgress() {
    let percentage = ((index) / questions.length) * 100;
    document.getElementById("progress").style.width = percentage + "%";
}

// =====================
// AKHIR KUIS
// =====================
function finishQuiz() {
    clearInterval(timerInterval);

    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    document.getElementById("final-score").innerText = `${score} / ${questions.length}`;
    document.getElementById("final-time").innerText = timer;

    let badge = "";

    if (score === questions.length) badge = "🏆 Gold — Kamu jago banget!";
    else if (score >= questions.length * 0.6) badge = "🥈 Silver — Bagus!";
    else badge = "🥉 Bronze — Belajar lagi ya!";

    document.getElementById("badge").innerText = badge;
}

function restartQuiz() {
    location.reload();
}
