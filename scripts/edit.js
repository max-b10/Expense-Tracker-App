// Assigning the user expense description and amount inputss to variable
const descriptionEl = document.querySelector("#editDescription");
const amountEl = document.querySelector("#editAmount");
const removeButtonEl = document.querySelector("#removeExpenseButton");
// Grabs the url after and including the hashtag e.g.http://127.0.0.1:8080/edit.html#6ce2d002-8e2a-4d89-9d27-3b79969a51e1
// Here, .substring() starts from the item with an index of 1.
const expenseId = location.hash.substring(1);
// Accessing LS to gather all the data from expenses:
const expenses = getSavedExpenses();
// Need to see if the expense.id matches the expenseId in the url:
const expense = expenses.find((expense) => {
  return expense.id === expenseId;
});
// If the Ids don't match(undefined) then user is sent to index.html:
if (expense === undefined) {
  location.assign("/index.html");
}

// Return home/save expense button:
document.querySelector("#home").addEventListener("click", () => {
  location.assign("/index.html");
});

descriptionEl.value = expense.description;
amountEl.value = expense.amount;

descriptionEl.addEventListener("input", (e) => {
  expense.description = e.target.value;
  saveExpenses(expenses);
});
amountEl.addEventListener("input", (e) => {
  expense.amount = e.target.value;
  saveExpenses(expenses);
});

removeButtonEl.addEventListener("click", () => {
  removeExpense(expense.id);
  saveExpenses(expenses);
  location.assign("/index.html");
});
