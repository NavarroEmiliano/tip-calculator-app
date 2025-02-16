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

let bill, percentageOption, people;

const validations = {
  bill: () => {
    if (billInput.value.length > 7) {
      billErrorElement.innerText = "Max 7 digits";
      setTimeout(() => {
        billErrorElement.innerText = "";
      }, 3000);
      return;
    }
  },
  people: () => {
    if (people < 1) {
      peopleErrorElement.innerText = "Can't be zero";
      setTimeout(() => {
        peopleErrorElement.innerText = "";
      }, 3000);
      return
    }
  },
};

billInput.addEventListener("input", function () {
  validations.bill();
  bill = Number(billInput.value);
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
  percentageOption = Number(customOptionsInput.value) / 100;
  calcTip();
});

peopleInput.addEventListener("input", function () {
  people = Number(peopleInput.value);
  calcTip();
});

function calcTip() {
  validations.people()
  
  if (bill && percentageOption && people) {
    const personTip = Number(((bill * percentageOption) / people).toFixed(2));
    const personTotal = Number((bill / people + personTip).toFixed(2));

    personTipElement.innerText = personTip;
    personTotalElement.innerText = personTotal;
  } else {
    personTipElement.innerText = 0;
    personTotalElement.innerText = 0;
  }
}

function resetValues() {
  resetVariables();
  removeActiveClassBtn();

  billInput.value = "";
  customOptionsInput.value = "";
  peopleInput.value = "";

  personTipElement.innerText = 0;
  personTotalElement.innerText = 0;
}

const resetVariables = () => {
  bill = 0;
  percentageOption = 0;
  people = 0;
};

const removeActiveClassBtn = () => {
  tipOptions.forEach((element) => {
    element.classList.remove("btn-active");
  });
};

resetBtn.addEventListener("click", resetValues);
