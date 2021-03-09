// For now using a hard-coded array of expenses.
// let expenses = [
//   {
//     description: "Rent",
//     amount: 400,
//   },
//   {
//     description: "Coffee",
//     amount: 2.5,
//   },
//   {
//     description: "Gym Membership",
//     amount: 99,
//   },
//   {
//     description: "Food Shopping",
//     amount: 70,
//   },
//   {
//     description: "Parking Fine",
//     amount: 30,
//   },
// ];
let expenses = getSavedExpenses();

let expenseTotal = totalAmount(expenses);

const filters = {
  searchText: "",
};

// // Random number generator:
// const random = (min = 0, max = 50) => {
//   let num = Math.random() * (max - min) + min;

//   return Math.floor(num);
// };
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
// The add Expense form when a user submits a new expense:
document
  .querySelector("#addExpenseForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    // Adds an object with 2 empty properties to expenses when form is submitted.
    // (Will be editable on edit page).
    expenses.push({
      description: e.target.elements.addExpenseInput.value,
      amount: Math.floor(Math.random() * 500) + 1,
    });

    saveExpenses(expenses);

    // This will clear the form field upon submission. Pro user experience!!!
    e.target.elements.addExpenseInput.value = "";
    renderExpenses(expenses, filters);
  });

// The Expense Total summary header:
document.querySelector(
  ".expenseHeader"
).innerHTML = `Expense Total: £${expenseTotal}.`;
totalAmount(expenses);
