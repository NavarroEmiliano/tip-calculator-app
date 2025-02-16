const d = document;
const billInput = d.getElementById("bill");
const tipOptionsContainer = d.querySelector(".tip-options");
const tipOptions = d.querySelectorAll(".tip-options__button");
const customOptionsInput = d.querySelector(".tip-options__custom");
const peopleInput = d.getElementById("people-input");
const personTipElement = d.getElementById("person-tip");
const personTotalElement = d.getElementById("person-total");
const resetBtn = d.querySelector(".summary__reset-button");
const peopleErrorElement = d.querySelector(".error-message__people");
const billErrorElement = d.querySelector(".error-message__bill");

let bill = 0,
  percentageOption = 0,
  people = 0;

const validations = {
  billIsValid: () => {
    if (billInput.value.length > 9) {
      billErrorElement.innerText = "Max 9 digits";
      return false;
    }
    billErrorElement.innerText = "";
    return true;
  },
  peopleIsValid: () => {
    if (people < 1) {
      peopleErrorElement.innerText = "Can't be zero";
      return false;
    }
    peopleErrorElement.innerText = "";
    return true;
  },
};

billInput.addEventListener("input", function () {
  bill = Number(billInput.value) || 0;
  calcTip();
});

tipOptionsContainer.addEventListener("click", function (e) {
  if (e.target.matches(".tip-options__button")) {
    removeActiveClassBtn();
    e.target.classList.add("btn-active");
    percentageOption = Number(e.target.innerText) / 100;
    customOptionsInput.value = "";
  }
  calcTip();
});

customOptionsInput.addEventListener("input", function () {
  removeActiveClassBtn();
  percentageOption = Number(customOptionsInput.value) / 100 || 0;
  calcTip();
});

peopleInput.addEventListener("input", function () {
  people = Number(peopleInput.value) || 0;
  calcTip();
});

function calcTip() {
  if (resetBtn.classList.contains("btn-disabled")) {
    resetBtn.classList.remove("btn-disabled");
  }

  if (!validations.billIsValid() || !validations.peopleIsValid()) return;

  if (bill > 0 && percentageOption > 0 && people > 0) {
    const personTip = Number(((bill * percentageOption) / people).toFixed(2));
    const personTotal = Number((bill / people + personTip).toFixed(2));

    personTipElement.innerText = personTip;
    personTotalElement.innerText = personTotal;
  } else {
    personTipElement.innerText = "0.00";
    personTotalElement.innerText = "0.00";
  }
}

function resetValues() {
  resetBtn.classList.add("btn-disabled");
  resetVariables();
  removeActiveClassBtn();

  billInput.value = "";
  customOptionsInput.value = "";
  peopleInput.value = "";

  billErrorElement.innerText = "";
  peopleErrorElement.innerText = "";


  personTipElement.innerText = "0.00";
  personTotalElement.innerText = "0.00";
}

const resetVariables = () => {
  bill = 0;
  percentageOption = 0;
  people = 0;
};

const removeActiveClassBtn = () => {
  tipOptions.forEach((element) => element.classList.remove("btn-active"));
};

resetBtn.addEventListener("click", resetValues);
