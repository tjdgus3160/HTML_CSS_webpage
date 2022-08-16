const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const answerBox = document.querySelector(".answerBox");
const qBox = document.querySelector(".qBox");
const statusBar = document.querySelector(".statusBar");

let qIdx = 0;
const totalQna = 12;

function createQnaAnswer(answers) {
  answers.forEach(({ answer }) => {
    const answerBtn = document.createElement("button");

    answerBtn.className = ["answerList", "my-3", "py-3", "mx-auto", "fadeIn"].join(" ");
    answerBtn.innerHTML = answer;
    answerBox.appendChild(answerBtn);
  });

  answerBox.onclick = (e) => {
    if (!e.target.closest(".answerList")) {
      return;
    }

    const children = Array.from(document.querySelectorAll(".answerList"));

    children.forEach((child) => {
      child.disabled = true;
      child.style.WebkitAnimation = "fadeOut 0.5s";
      child.style.animation = "fadeOut 0.5s";
    });

    setTimeout(() => {
      children.forEach((child) => (child.style.display = "none"));

      viewQna(++qIdx);
    }, 450);
  };
}

function viewQna(qIdx) {
  const { q, a } = qnaList[qIdx];

  qBox.innerHTML = q;

  createQnaAnswer(a);

  statusBar.style.width = (100 / totalQna) * (qIdx + 1) + "%";
}

function changeSection(current, next) {
  current.style.WebkitAnimation = "fadeOut 1s";
  current.style.animation = "fadeOut 1s";

  setTimeout(() => {
    next.style.WebkitAnimation = "fadeIn 1s";
    next.style.animation = "fadeIn 1s";
    setTimeout(() => {
      current.style.display = "none";
      next.style.display = "block";
    }, 450);

    if (next.id === "qna") {
      viewQna(qIdx);
    }
  }, 450);
}

const goQna = () => changeSection(main, qna);
const goResult = () => changeSection(qna, result);
