const que = [
  {
    q: " what is 2+2+2?",
    a: [
      { text: "222", correct: false },
      { text: "6", correct: true },
      { text: "8", correct: false },
      { text: "2+2+2", correct: false },
    ],
  },
  {
    q: " what is 2+4+2?",
    a: [
      { text: "242", correct: false },
      { text: "42", correct: false },
      { text: "8", correct: true },
      { text: "2+4+2", correct: false },
    ],
  },
  {
    q: " what is 2+1+2?",
    a: [
      { text: "212", correct: true },
      { text: "4", correct: false },
      { text: "5", correct: false },
      { text: "2+1+2", correct: false },
    ],
  },
  {
    q: " what is 2+6+2?",
    a: [
      { text: "262", correct: false },
      { text: "10", correct: true },
      { text: "8", correct: false },
      { text: "2+6+2", correct: false },
    ],
  },
];

const questionelement = document.getElementById("question");
const answerbtn = document.getElementById("buttons");
const next = document.getElementById("next");

let currentquestionindex = 0;
let score = 0;

function start() {
  currentquestionindex = 0;
  score = 0;
  next.innerHTML = "next";
  showquestion();
}
function showquestion() {
  resetstate();

  let currentquestion = que[currentquestionindex];
  let questionno = currentquestionindex + 1;
  questionelement.innerHTML = questionno + "." + currentquestion.q;

  currentquestion.a.forEach((a) => {
    const button = document.createElement("button");
    button.innerHTML = a.text;
    button.classList.add("btn");
    answerbtn.appendChild(button);
    if (a.correct) {
      button.dataset.correct = a.correct;
    }
    button.addEventListener("click", selectans);
  });
}
function resetstate() {
  next.style.display == "none";
  while (answerbtn.firstChild) {
    answerbtn.removeChild(answerbtn.firstChild);
  }
}

function selectans(e) {
  const selectedbtn = e.target;
  const iscorrect = selectedbtn.dataset.correct === "true";
  if (iscorrect) {
    selectedbtn.classList.add("correct");
    score++;
  } else {
    selectedbtn.classList.add("incorrect");
  }
  Array.from(answerbtn.children).forEach((button) => {
    if (button.dataset.correct == "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  next.style.display = "block";
}
function showscore() {
  resetstate();
  questionelement.innerHTML = `Your scoreed ${score} out of ${que.length}!`;
  next.innerHTML = "Play again";
}

function handlenextbtn() {
  currentquestionindex++;
  if (currentquestionindex < que.length) {
    showquestion();
  } else {
    showscore();
  }
}

next.addEventListener("click", () => {
  if (currentquestionindex < que.length) {
    handlenextbtn();
  } else {
    start();
  }
});
start();
