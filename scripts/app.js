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

const renderExpenses = function (expenses, filters) {
  // Spits out a new array where each expense matches the searchText in the filters object.
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

// // Add a p tag for each expense to the expenses div.
// expenses.forEach(function (expense) {
//   const newPara = document.createElement("p");
//   newPara.textContent = `${expense.description}: £${expense.amount}`;
//   document.querySelector("#expenses").appendChild(newPara);
// });

// Add expense button just console logging for now.
document.querySelector("#addExpense").addEventListener("click", function (e) {
  console.log("Expense Added");
  e.preventDefault();
});
// Remove expense button removing all items with the 'expenses' class.
document
  .querySelector("#removeExpenses")
  .addEventListener("click", function (e) {
    document.querySelectorAll("#expenses").forEach(function (expense) {
      expense.remove();
    });
    e.preventDefault();
  });

// Search expenses filter
document
  .querySelector("#searchExpenses")
  .addEventListener("input", function (e) {
    // Take the user input from the search Expenses field and replaces the filters object searcText with it.
    filters.searchText = e.target.value;
    // Now call renderExpenses to render the updated expenses and filters values.
    renderExpenses(expenses, filters);
  });
