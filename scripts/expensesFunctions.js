// Read expenses from Local Storage:
const getSavedExpenses = () => {
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
const saveExpenses = (expenses) =>
  localStorage.setItem("expenses", JSON.stringify(expenses));

// findIndex() returns the index of the 1st element in expenses that satisfies the provided testing function.
// Otherwise, it returns - 1, indicating that no element in expenses passed that test.
const removeExpense = (id) => {
  const expenseIndex = expenses.findIndex((expense) => {
    //  findIndex() returns true when the expense.id = the id param in the removeExpense function.
    return expense.id === id;
  });
  // So if expenseIndex returned 1, use splice to cut that index out of the expenses array:
  if (expenseIndex > -1) {
    expenses.splice(expenseIndex, 1);
  }
};

const generateExpenseDOM = (expense) => {
  const expenseEl = document.createElement("div");
  const textEl = document.createElement("a");
  const removeButton = document.createElement("button");

  expenseEl.className = "expenseElement";

  // Set the href on the anchor tag created for each expense text element (using the expense id):
  textEl.setAttribute("href", `/expensesEdit.html#${expense.id}`);
  textEl.className = "expenseText";

  // If the expenses description is > 0, create an anchor element with that description (plus amount).
  // If not, use 'unnamed expense' as a default.
  if (expense.description.length > 0) {
    textEl.textContent = ` ${expense.description}: £${expense.amount}`;
  } else {
    textEl.textContent = "Unnamed expense";
  }

  // Set button text content, give it a class name and append it to each expenseEl div.
  removeButton.textContent = "x";
  removeButton.className = "removeButton";

  // Add the event listener for when a user clicks the button to remove an expense.
  removeButton.addEventListener("click", () => {
    // Call removeExpense which requires the expense.id as a param.
    removeExpense(expense.id);
    saveExpenses(expenses);
    // Then need to call renderExpenses again to rerender the expenses without the recently deleted expenses.
    renderExpenses(expenses, expenseFilters);
  });

  // Append the new text anchor element  and removeButton to the expenseEl div.
  expenseEl.appendChild(textEl);
  expenseEl.appendChild(removeButton);

  return expenseEl;
};

// Render the expenses array to the expenses div. Requires the expenseFilters object to access the searchText.
const renderExpenses = (expenses, expenseFilters) => {
  // Using filter() spits out a new array where each expense inludes the searchText entered by the user in the expenseFilters object.
  const filteredExpenses = expenses.filter((expense) => {
    return expense.description
      .toLowerCase()
      .includes(expenseFilters.searchText.toLowerCase());
  });

  //Need to clear the expenses div before rendering or it will only continue to add the filtered expenses to the existing list.
  document.querySelector("#expenses").innerHTML = "";

  // Once filtered, the expenses need to be rendered:
  filteredExpenses.forEach((expense) => {
    const expenseEl = generateExpenseDOM(expense);
    document.querySelector("#expenses").appendChild(expenseEl);
  });
};

// // Calculate the total expenses (to be rendered to the expenseHeader).
const totalExpenseAmount = () => {
  // access the live expenses array:
  let expenses = getSavedExpenses();
  // reduce() executes a function on each element in the expenses array.
  // {amount} accesses the amount property on the individual expense object.
  // The 0 represents where the accumulator should 'start'.
  let total = expenses.reduce(
    (accumulator, { amount }) => accumulator + amount,
    0
  );
  return total;
};
