const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const qBox = document.querySelector(".qBox");
const statusBar = document.querySelector(".statusBar");
const answerBox = document.querySelector(".answerBox");

const resultName = document.querySelector(".resultname");
const imgDiv = document.querySelector("#resultImg");
const resultDesc = document.querySelector(".resultDesc");

const select = new Array(12).fill(0);
let qIdx = 0;
const totalQna = 12;

function createQnaAnswer(answers) {
  answers.forEach(({ answer }, idx) => {
    const answerBtn = document.createElement("button");

    answerBtn.className = ["answerList", "my-3", "py-3", "mx-auto", "fadeIn"].join(" ");
    answerBtn.innerHTML = answer;
    answerBtn.dataset.idx = idx;
    answerBox.appendChild(answerBtn);
  });

  answerBox.onclick = (e) => {
    if (!e.target.closest(".answerList")) {
      return;
    }

    const idx = e.target.dataset.idx;
    answers[idx].type.forEach((v) => select[v]++);

    const children = Array.from(document.querySelectorAll(".answerList"));

    children.forEach((child) => {
      child.disabled = true;
      child.style.WebkitAnimation = "fadeOut 0.5s";
      child.style.animation = "fadeOut 0.5s";
    });

    setTimeout(() => {
      children.forEach((child) => (child.style.display = "none"));
      qIdx++;

      if (qIdx < totalQna) {
        viewQna(qIdx);
      } else {
        viewResult();
      }
    }, 450);
  };
}

function viewQna(qIdx) {
  const { q, a } = qnaList[qIdx];

  qBox.innerHTML = q;

  createQnaAnswer(a);

  statusBar.style.width = (100 / totalQna) * (qIdx + 1) + "%";
}

function viewResult() {
  goResult();

  const point = select.indexOf(Math.max(...select));
  const resultImg = document.createElement("img");

  resultName.innerHTML = infoList[point].name;
  resultImg.src = "img/image-" + point + ".png";
  resultImg.alt = point;
  resultImg.classList.add("img-fluid");
  imgDiv.appendChild(resultImg);

  resultDesc.innerHTML = infoList[point].desc;
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
