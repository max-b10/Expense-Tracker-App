// expenses
let expenses = getSavedExpenses();
let expenseTotal = totalExpenseAmount();
const expenseFilters = {
  searchText: "",
};
let incomes = getSavedIncomes();
let incomeTotal = totalIncomeAmount();
// let incomeTotal = totalIncomeAmount();
const incomeFilters = {
  searchText: "",
};
let balance = incomeTotal - expenseTotal;
// console.log(balance);
// The balance header:
document.querySelector(".balanceHeader").innerHTML = `Balance: £${balance}`;

// The Expense Total summary header:
document.querySelector(
  ".expenseHeader"
).innerHTML = `Expense Total: £${expenseTotal}`;
// The Income Total summary header:
document.querySelector(
  ".incomeHeader"
).innerHTML = `Income Total: £${incomeTotal}`;

// Call renderExpenses() and renderIncomes().
renderExpenses(expenses, expenseFilters);
renderIncomes(incomes, incomeFilters);

// The 'search for expenses' filter:
document.querySelector("#searchExpenses").addEventListener("input", (e) => {
  // Take the user input from the search Expenses field and replaces the expenseFilters object searcText with it.
  expenseFilters.searchText = e.target.value;
  // Now call renderExpenses to render the updated expenses and expenseFilters values.
  renderExpenses(expenses, expenseFilters);
});

// The search for incomes filter:
document.querySelector("#searchIncomes").addEventListener("input", (e) => {
  incomeFilters.searchText = e.target.value;
  renderIncomes(incomes, incomeFilters);
});

// The addExpenseForm event listener for when a user submits a new expense:
document.querySelector("#addExpenseForm").addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(e);
  // assign uuidv4() to a variable so it can be used in the location.assign method.
  const id = uuidv4();
  // Adds an object with 2 empty properties to expenses when form is submitted.
  expenses.push({
    description: e.target.elements.addExpenseDescription.value,
    // parseFloat is essential to convert the .value to a floating number:
    amount: parseFloat(e.target.elements.addExpenseAmount.value),
    // With the uuid script loaded in index.html, when you call uuidv4() a new id is created.
    id: id,
  });

  saveExpenses(expenses);
  // location.assign will cause the page to switch to edit.html upon form submission.
  location.assign(`/expensesEdit.html#${id}`);
  // No need to call renderNotes again since they're rendered again upon returning to the page from edit.html.

  // This will clear the form field upon submission. Pro user experience!!!
  e.target.elements.addExpenseDescription.value = "";
});
// The addIncomeForm event listener for when a user submits a new income:
document.querySelector("#addIncomeForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = uuidv4();
  incomes.push({
    description: e.target.elements.addIncomeDescription.value,
    amount: parseFloat(e.target.elements.addIncomeAmount.value),
    id: id,
  });

  saveIncomes(incomes);
  location.assign(`/incomeEdit.html#${id}`);

  e.target.elements.addIncomeDescription.value = "";
});
