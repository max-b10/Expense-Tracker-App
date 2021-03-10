// Only relevant to index.html
let expenses = getSavedExpenses();

let expenseTotal = totalAmount(expenses);

const filters = {
  searchText: "",
};

// The Expense Total summary header:
document.querySelector(
  ".expenseHeader"
).innerHTML = `Expense Total: £${expenseTotal}.`;
totalAmount(expenses);

// Call renderExpenses().
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
// The addExpenseForm event listener for when a user submits a new expense:
document
  .querySelector("#addExpenseForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    // assign uuidv4() to a variable so it can be used in the location.assign method.
    const id = uuidv4();
    // Adds an object with 2 empty properties to expenses when form is submitted.
    expenses.push({
      description: e.target.elements.addExpenseInput.value,
      amount: "",
      // With the uuid script loaded in index.html, when you call uuidv4() a new id is created.
      id: id,
    });

    saveExpenses(expenses);
    // location.assign will cause the page to switch to edit.html upon form submission.
    location.assign(`/edit.html#${id}`);
    // No need to call renderNotes again since they're rendered again upon returning to the page from edit.html.

    // This will clear the form field upon submission. Pro user experience!!!
    e.target.elements.addExpenseInput.value = "";
  });
