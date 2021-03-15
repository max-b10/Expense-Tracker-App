const getSavedIncomes = () => {
  const incomesJSON = localStorage.getItem("incomes");
  if (incomesJSON !== null) {
    return JSON.parse(incomesJSON);
  } else {
    return [];
  }
};

const saveIncomes = (incomes) =>
  localStorage.setItem("incomes", JSON.stringify(incomes));

const removeIncome = (id) => {
  const incomeIndex = incomes.findIndex((income) => {
    return income.id === id;
  });
  if (incomeIndex > -1) {
    incomes.splice(incomeIndex, 1);
  }
};

const generateIncomeDOM = (income) => {
  const incomeEl = document.createElement("div");
  const textEl = document.createElement("a");
  const removeButton = document.createElement("button");

  incomeEl.className = "incomeElement";

  textEl.setAttribute("href", `/incomeEdit.html#${income.id}`);
  textEl.className = "incomeText";

  if (income.description.length > 0) {
    textEl.textContent = `${income.description}: £${income.amount}`;
  } else {
    textEl.textContent = "Unnamed income";
  }
  removeButton.textContent = "Remove";
  removeButton.className = "removeButton";

  removeButton.addEventListener("click", () => {
    removeIncome(income.id);
    saveIncomes(incomes);
    renderIncomes(incomes, incomeFilters);
  });
  incomeEl.appendChild(textEl);
  incomeEl.appendChild(removeButton);

  return incomeEl;
};

const renderIncomes = (incomes, incomeFilters) => {
  const filteredIncomes = incomes.filter((income) => {
    return income.description
      .toLowerCase()
      .includes(incomeFilters.searchText.toLowerCase());
  });
  document.querySelector("#incomes").innerHTML = "";

  filteredIncomes.forEach((income) => {
    const incomeEl = generateIncomeDOM(income);
    document.querySelector("#incomes").appendChild(incomeEl);
  });
};

const totalIncomeAmount = () => {
  let incomes = getSavedIncomes();
  let total = incomes.reduce(
    (accumulator, { amount }) => accumulator + amount,
    0
  );
  return total;
};
