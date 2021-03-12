const incomeDescriptionEl = document.querySelector("#editIncomeDescription");
const incomeAmountEl = document.querySelector("#editIncomeAmount");
const removeButtonEl = document.querySelector("#removeIncomeButton");

const incomeId = location.hash.substring(1);
let incomes = getSavedIncomes();

let income = incomes.find((income) => {
  return income.id === incomeId;
});
if (income === undefined) {
  location.assign("/index.html");
}
incomeDescriptionEl.value = income.description;
incomeAmountEl.value = income.amount;

document
  .querySelector("#incomeHome")
  .addEventListener("click", () => location.assign("/index.html"));
incomeDescriptionEl.addEventListener("input", (e) => {
  income.description = e.target.value;
  saveIncomes(incomes);
});

incomeAmountEl.addEventListener("input", (e) => {
  income.amount = parseFloat(e.target.value);
  saveIncomes(incomes);
});

removeButtonEl.addEventListener("click", () => {
  removeIncome(income.id);
  saveIncomes(incomes);
  location.assign("/index.html");
});

window.addEventListener("storage", (e) => {
  if (e.key === "incomes") {
    incomes = JSON.parse(e.newValue);

    let income = incomes.find((income) => {
      return income.id === incomeId;
    });
    if (income === undefined) {
      location.assign("/index.html");
    }
    incomeDescriptionEl.value = income.description;
    incomeAmountEl.value = income.amount;
  }
});
