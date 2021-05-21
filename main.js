import bisection from "./src/bisection.js";
import newtonRaphson from "./src/newton.js";
import trapezoidal from "./src/trapezoidal.js";
import draw from "./src/util/draw.js";

//////////////////////////////////////////////////////////////// tabs
const tabsContainer = document.querySelector(".section-tabs");
const sections = document.querySelector(".main");
tabsContainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("tab-item") &&
    !e.target.classList.contains("active")
  ) {
    tabsContainer.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    const target = e.target.getAttribute("data-target");
    console.log(target);
    sections.querySelector("section.active").classList.remove("active");
    sections.querySelector(target).classList.add("active");
  }
});

//////////////////////////////////////////////////////////////
// bisection
const formBisection = document.querySelector(".bisection-section form");
const tableBisection = document.querySelector(".bisection-section table");
const answerBoxBisection = document.querySelector(
  ".bisection-section .answer h2"
);
const iterBoxBisection = document.querySelector(
  ".bisection-section .answer h3 > span"
);
const ansDivsBisection = document.querySelectorAll(
  ".bisection-section .row.hidden"
);
const errDivBisection = document.querySelector(".bisection-section .error");
// newton
const formNewton = document.querySelector(".newton-section form");
const tableNewton = document.querySelector(".newton-section table");
const ansBoxNewton = document.querySelector(".newton-section .answer h2");
const iterBoxNewton = document.querySelector(
  ".newton-section .answer h3 > span"
);
const ansDivsNewton = document.querySelectorAll(".newton-section .row.hidden");
const errDivNewton = document.querySelector(".newton-section .error");
// trapezoidal
const formTrap = document.querySelector(".trapezoidal-section form");
const ansBoxTrap = document.querySelector(".trapezoidal-section .answer h2");
const ansDivsTrap = document.querySelectorAll(
  ".trapezoidal-section .row.hidden"
);
const errDivTrap = document.querySelector(".trapezoidal-section .error");

/////////// bisection listener
formBisection.addEventListener("submit", (e) => {
  e.stopPropagation();
  e.preventDefault();
  let inputs = {};
  inputs["equ"] = formBisection.equ.value;
  inputs["from"] = formBisection.from.value;
  inputs["to"] = formBisection.to.value;
  inputs["eps"] = formBisection.eps.value;
  try {
    const bisectionResult = bisection(
      inputs.equ,
      {
        a: parseFloat(inputs.from),
        b: parseFloat(inputs.to),
      },
      parseFloat(inputs.eps)
    );
    fillTableBisection(tableBisection.children[1], bisectionResult);
    fillAnswer(bisectionResult, answerBoxBisection, iterBoxBisection, "c");
    draw(inputs.equ, "bisection-plot");
    showAnswer(ansDivsBisection);
    resetError(errDivBisection);
  } catch (err) {
    showError(err, errDivBisection);
  }
});

/////////// newton listener
formNewton.addEventListener("submit", (e) => {
  e.stopPropagation();
  e.preventDefault();

  let inputs = {};
  inputs["equ"] = formNewton.equ.value;
  inputs["x0"] = formNewton.x0.value;
  inputs["eps"] = formNewton.eps.value;
  try {
    const newtonResult = newtonRaphson(
      inputs.equ,
      parseFloat(inputs.x0),
      parseFloat(inputs.eps)
    );
    fillTableNewton(tableNewton.children[1], newtonResult);
    fillAnswer(newtonResult, ansBoxNewton, iterBoxNewton, "xi");
    draw(inputs.equ, "newton-plot");
    showAnswer(ansDivsNewton);
    resetError(errDivNewton);
  } catch (err) {
    showError(err, errDivNewton);
  }
});

/////////// trap listener
formTrap.addEventListener("submit", (e) => {
  e.stopPropagation();
  e.preventDefault();

  let inputs = {};
  inputs["equ"] = formTrap.equ.value;
  inputs["interval"] = formTrap.interval.value;
  inputs["x0"] = formTrap.x0.value;
  inputs["xn"] = formTrap.xn.value;
  console.log(inputs);
  try {
    const trapResult = trapezoidal(
      inputs.equ,
      parseFloat(inputs.interval),
      parseFloat(inputs.x0),
      parseFloat(inputs.xn)
    );

    ansBoxTrap.innerHTML = Math.round(trapResult * 10000.0) / 10000.0;
    draw(inputs.equ, "trapezoidal-plot");
    showAnswer(ansDivsTrap);
    resetError(errDivTrap);
  } catch (err) {
    showError(err, errDivTrap);
  }
});

// -------------------------------------------------- util functions
function showError(err, errDiv) {
  errDiv.children[0].innerHTML = err;
  errDiv.parentElement.classList.remove("hidden");
}
function resetError(errDiv) {
  errDiv.children[0].innerHTML = "";
  console.log(errDiv.parentElement.classList);
  errDiv.parentElement.classList.add("hidden");
}

function fillAnswer(res, answerBox, iterBox, finAns) {
  answerBox.innerHTML =
    Math.round(res[res.length - 1][finAns] * 10000.0) / 10000.0;
  iterBox.innerHTML = res.length;
}

function showAnswer(ansDivs) {
  ansDivs.forEach((ansDiv) => {
    ansDiv.classList.remove("hidden");
  });
}

function fillTableBisection(tbody, res) {
  tbody.innerHTML = "";
  res.forEach((iter) => {
    tbody.innerHTML += `<tr>
    <td>${iter.counter + 1}</td>
    
    <td>${iter.a}</td>
    
    <td>${iter.b}</td>
    
    <td>${iter.c}</td>
    
    <td>${iter.fc}</td>
    </tr>`;
  });
}
function fillTableNewton(tbody, res) {
  tbody.innerHTML = "";
  res.forEach((iter) => {
    tbody.innerHTML += `<tr>
    <td>${iter.counter + 1}</td>
    
    <td>${iter.x}</td>
    
    <td>${iter.fx}</td>
    
    <td>${iter.fDerx}</td>
    
    <td>${iter.xi}</td>
    </tr>`;
  });
}
