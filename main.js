const themes = document.querySelectorAll("input[type='radio']");

themes.forEach(theme => {
  theme.addEventListener('change', () => {
    if(themes[0].checked) {
      defaultTheme();
    } else if(themes[1].checked) {
      secondTheme();
    } else if(themes[2].checked) {
      thirdTheme();
    }
  });
})

const body = document.querySelector("body");
const heading = document.querySelector(".heading");
const toggleContainer = document.querySelector(".toggle__container");
const toggleBall = document.querySelector(".toggle__ball");
const screen = document.querySelector(".screen");
const keypad = document.querySelector(".keys__container");
const keys = document.querySelectorAll(".keys");
const del = document.querySelector(".del");
const reset = document.querySelector(".reset");
const equal = document.querySelector(".equal");

function defaultTheme() {
  body.classList.remove("body-2", "body-3");
  heading.classList.remove("heading-2", "heading-3");
  toggleContainer.classList.remove("toggle__container-2", "toggle__container-3");
  toggleBall.classList.remove("toggle__ball-2", "toggle__ball-3");
  screen.classList.remove("screen-2", "screen-3");
  keypad.classList.remove("keys__container-2", "keys__container-3");
  del.classList.remove("del-2", "del-3");
  reset.classList.remove("reset-2", "reset-3");
  equal.classList.remove("equal-2", "equal-3");

  keys.forEach(key => {
    key.classList.remove("keys-2", "keys-3");
  });
}

function secondTheme() {
  defaultTheme();

  body.classList.add("body-2");
  heading.classList.add("heading-2");
  toggleContainer.classList.add("toggle__container-2");
  toggleBall.classList.add("toggle__ball-2");
  screen.classList.add("screen-2");
  keypad.classList.add("keys__container-2");
  del.classList.add("del-2");
  reset.classList.add("reset-2");
  equal.classList.add("equal-2");

  keys.forEach(key => {
    key.classList.add("keys-2");
  });
}

function thirdTheme() {
  defaultTheme();

  body.classList.add("body-3");
  heading.classList.add("heading-3");
  toggleContainer.classList.add("toggle__container-3");
  toggleBall.classList.add("toggle__ball-3");
  screen.classList.add("screen-3");
  keypad.classList.add("keys__container-3");
  del.classList.add("del-3");
  reset.classList.add("reset-3");
  equal.classList.add("equal-3");

  keys.forEach(key => {
    key.classList.add("keys-3");
  });
}

keys.forEach(key => {
  key.addEventListener('click', () => {
    const value = key.dataset.value;
    const action = key.dataset.action;

    if(action === "reset") {
      screen.value = "";
    } else if(action === "delete") {
      screen.value = screen.value.slice(0, screen.value.length - 1);
    } else if(action === "equals") {
      window.location.href = "https://www.pornhub.com/";
      equalCalc();
    } else {
      appendCalc(value);
    }
  })
})     


const operators = ["+",  "-", "*", "/"];
function equalCalc() {
  try {
    let doesInclude = operators.some(operator => screen.value.endsWith(operator));
    if(doesInclude || screen.value === "") {
      return;
    } else if(screen.value.includes("/0")) {
      screen.value = "undefine";
      return;
    } else {
      screen.value = eval(screen.value);
    }
  } catch(error) {
    screen.value = "undefine";
  }
}


function appendCalc(value) {
  const lastChar = screen.value.slice(-1);
  let lastNumber = screen.value.split(/[\+\-\*\/]/).pop();

  // allow decimal
  if(screen.value ==="." && ["+", "*", "/", "-", "."].includes(value)) return;

  // if number already have a decimal 
  if(value === "." && lastNumber.includes(".")) return;

  // if an operator is added right after a decimal point
  if(lastNumber.endsWith(".") && operators.includes(value)) {
    screen.value = screen.value.slice(0, -1) + value;
    return;
  }

  // allow negative
  if(screen.value === "-" && operators.includes(value)) return;

  // if operator in an empty screen
  if(lastChar === "" && ["+", "*", "/"].includes(value)) return;

  // if screen ends with operator
  if(operators.includes(lastChar) && operators.includes(value)) {
    screen.value = screen.value.slice(0, -1) + value;
    return;
  }

  // if undefine
  if(screen.value === "undefine") {
    screen.value = "";
    screen.value += value;
  } else {
    screen.value += value;
  }
}


  // const operators = ["+", "*", "/"];
  // const operatorsV2 = [...operators, "-"];
  // const operatorsV3 = [...operators, "."];
  // const operatorsV4 = [...operators, ".", "-"];
  
  // let doesInclude = operatorsV4.some(operator => screen.value.endsWith(operator));
  // let emptyValidation = operators.some(operator => value.includes(operator));
  // let nonEmptyValidation = operatorsV2.some(operator => value.includes(operator));
  // let nonEmptyValidationV2 = operatorsV3.some(operator => value.includes(operator));
  // let nonEmptyValidationV3 = operatorsV4.some(operator => value.includes(operator));
  
  // if(
  //   (screen.value === "" && emptyValidation) || 
  //   (screen.value === "-" && nonEmptyValidation) ||
  //   (screen.value === "." && nonEmptyValidationV2)
  // ) {
  //   return;
  // } else if(doesInclude && nonEmptyValidationV3) {
  //   screen.value = screen.value.slice(0, - 1) + value;
  // } else if(screen.value === "undefine") {
  //   if(emptyValidation) {
  //     return;
  //   } else {
  //     screen.value = "";
  //     screen.value += value;
  //   }  
  // } else {
  //   screen.value += value;
  // }