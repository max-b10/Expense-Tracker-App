// For now using a hard-coded array of expenses.
let expenses = [
  {
    description: "Rent",
    amount: 400,
  },
  {
    description: "Coffee",
    amount: 2.5,
  },
  {
    description: "Gym Membership",
    amount: 99,
  },
  {
    description: "Food Shopping",
    amount: 70,
  },
  {
    description: "Parking Fine",
    amount: 30,
  },
];

const filters = {
  searchText: "",
};

// Render the expenses array to the expenses div. Requires the filters object to
const renderExpenses = function (expenses, filters) {
  // Using filter() spits out a new array where each expense inludes the searchText entered by the user in the filters object.
  const filteredExpenses = expenses.filter(function (expense) {
    return expense.description
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
  });
  //Need to clear the expenses div before rendering or it will only continue to add the filtered expenses to the existing list.
  document.querySelector("#expenses").innerHTML = "";
  // Once filtered, the expenses need to be rendered:
  filteredExpenses.forEach(function (expense) {
    const expenseEl = document.createElement("p");
    expenseEl.textContent = `${expense.description}: £${expense.amount}`;
    document.querySelector("#expenses").appendChild(expenseEl);
  });
};
renderExpenses(expenses, filters);

// The 'search for expenses' filter:
document
  .querySelector("#searchExpenses")
  .addEventListener("input", function (e) {
    // Take the user input from the search Expenses field and replaces the filters object searcText with it.
    filters.searchText = e.target.value;
    // Now call renderExpenses to render the updated expenses and filters values.
    renderExpenses(expenses, filters);
  });

document
  .querySelector("#addExpenseForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    // Pushes on the user's form input to the expenses array.
    expenses.push({
      description: e.target.elements.addExpenseInput.value,
      amount: Math.floor(Math.random() * 500) + 1,
    });
    // This will clear the form field upon submission. Pro user experience!!!
    e.target.elements.addExpenseInput.value = "";
    renderExpenses(expenses, filters);
  });

// Calculate and render the total expenses to the expenseHeader.
const totalAmount = function (expenses) {
  let expenseTotal = 0;
  for (let i = 0; i < expenses.length; i++) {
    expenseTotal += expenses[i].amount;
  }
  return expenseTotal;
};
totalAmount(expenses);
const expenseTotal = totalAmount(expenses);
document.querySelector(
  ".expenseHeader"
).innerHTML = `Expense Total: £${expenseTotal}.`;
