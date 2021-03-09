// Read expenses from Local Storage:
const getSavedExpenses = function () {
  // Get any expenses which have been saved to localStorage and return that parsed
  // JSON data.
  // If there's no saved data in LS, return an empty array.
  const expensesJSON = localStorage.getItem("expenses");
  if (expensesJSON !== null) {
    return JSON.parse(expensesJSON);
  } else {
    return [];
  }
};
// Save each form submission to LS - converting the object to JSON:
const saveExpenses = function (expenses) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};

const generateExpenseDOM = function (expense) {
  const expenseEl = document.createElement("div");
  const textEl = document.createElement("span");
  const removeButton = document.createElement("button");

  // Set button text content and append it to each expenseEl div.
  removeButton.textContent = "x";
  expenseEl.appendChild(removeButton);

  // If the expenses description is > 0, create a span element with that value.
  // If not, use 'unnamed expense' as a default.
  if (expense.description.length > 0) {
    textEl.textContent = `${expense.description}: £${expense.amount}`;
  } else {
    textEl.textContent = "Unnamed expense";
  }
  // Append the new text span representing the user's expense input to the expenseEl div.
  expenseEl.appendChild(textEl);
  return expenseEl;
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
    const expenseEl = generateExpenseDOM(expense);
    document.querySelector("#expenses").appendChild(expenseEl);
  });
};

// // Calculate and render the total expenses to the expenseHeader.
const totalAmount = function (expenses) {
  let expenseTotal = 0;
  for (let i = 0; i < expenses.length; i++) {
    expenseTotal += expenses[i].amount;
  }
  return expenseTotal;
};
