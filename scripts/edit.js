// Assigning the user expense description and amount inputss to variable
const descriptionEl = document.querySelector("#editDescription");
const amountEl = document.querySelector("#editAmount");
const removeButtonEl = document.querySelector("#removeExpenseButton");

// Grabs the url after and including the hashtag e.g.http://127.0.0.1:8080/edit.html#6ce2d002-8e2a-4d89-9d27-3b79969a51e1
// Here, .substring() starts from the item with an index of 1.
const expenseId = location.hash.substring(1);
// Accessing LS to gather all the data from expenses:
let expenses = getSavedExpenses();

// Need to check the expense exists:
let expense = expenses.find((expense) => {
  return expense.id === expenseId;
});
// If the expense doesn't exist, return to index.html.
if (expense === undefined) {
  location.assign("/index.html");
}
// If an expense exists, the following inputs are setup using the variables at top of page:
descriptionEl.value = expense.description;
amountEl.value = expense.amount;

// Return home/save expense button:
document
  .querySelector("#home")
  .addEventListener("click", () => location.assign("/index.html"));
// Updates the expense description to whatever the user types in the description input on edit page.
descriptionEl.addEventListener("input", (e) => {
  expense.description = e.target.value;
  saveExpenses(expenses);
});

// Updates the expense amount to whatever the user types in the amount input on edit page.
amountEl.addEventListener("input", (e) => {
  expense.amount = e.target.value;
  saveExpenses(expenses);
});

// Wiring up the remove expense button on expense page.
removeButtonEl.addEventListener("click", () => {
  removeExpense(expense.id);
  saveExpenses(expenses);
  location.assign("/index.html");
});

// Using the 'storage' event to detect when a change is made on the page:
window.addEventListener("storage", (e) => {
  if (e.key === "expenses") {
    // e.newValue is the new value of the the entire array with the new item added, now stored in lS.
    // newValue would return a string so it needs to be parsed into an object.
    expenses = JSON.parse(e.newValue);

    // Then all this code is ran again:
    // Need to check the expense exists:
    let expense = expenses.find((expense) => {
      return expense.id === expenseId;
    });
    // If the expense doesn't exist, return to index.html.
    if (expense === undefined) {
      location.assign("/index.html");
    }
    // If an expense exists, the following inputs are setup using the variables at top of page:
    descriptionEl.value = expense.description;
    amountEl.value = expense.amount;
  }
});
