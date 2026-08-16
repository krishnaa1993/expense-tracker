let incomeTotal = 0;
let expenseTotal = 0;

let editingTransaction = null;

const totalBalance = document.querySelector("#balance");
const totalIncome = document.querySelector("#income");
const totalExpenses = document.querySelector("#expenses");

const titleInput = document.querySelector("#title");
const amountInput = document.querySelector("#amount");
const typeInput = document.querySelector("#type");
const addButton = document.querySelector("#addTransaction");
const transactions = document.querySelector("#transactions");

addButton.addEventListener("click", function () {
  const title = titleInput.value;
  const amountNumber = Number(amountInput.value);
  const type = typeInput.value;

  if (title === "") {
    alert("Please enter a title");
    return;
  }

  if (amountNumber <= 0) {
    alert("Please enter an amount");
    return;
  }

  if (type === "") {
    alert("Please select an option");
    return;
  }

  let typeText;

  if (type === "opt-income") {
    typeText = "Income";
  } else {
    typeText = "Expense";
  }

  // EDIT EXISTING TRANSACTION
  if (editingTransaction) {
    const oldAmount = editingTransaction.amount;
    const oldType = editingTransaction.type;

    // Remove old amount
    if (oldType === "opt-income") {
      incomeTotal -= oldAmount;
    } else {
      expenseTotal -= oldAmount;
    }

    // Add new amount
    if (type === "opt-income") {
      incomeTotal += amountNumber;
    } else {
      expenseTotal += amountNumber;
    }

    // Update stored transaction data
    editingTransaction.amount = amountNumber;
    editingTransaction.type = type;

    // Update UI
    editingTransaction.titleElement.textContent = title;
    editingTransaction.amountElement.textContent = `₹${amountNumber}`;
    editingTransaction.typeElement.textContent = typeText;

    totalIncome.textContent = incomeTotal;
    totalExpenses.textContent = expenseTotal;
    totalBalance.textContent = incomeTotal - expenseTotal;

    // Exit edit mode
    editingTransaction = null;

    // Clear form
    titleInput.value = "";
    amountInput.value = "";
    typeInput.value = "";

    return;
  }

  // ADD NEW TRANSACTION

  // Update totals
  if (type === "opt-income") {
    incomeTotal += amountNumber;
  } else {
    expenseTotal += amountNumber;
  }

  totalIncome.textContent = incomeTotal;
  totalExpenses.textContent = expenseTotal;
  totalBalance.textContent = incomeTotal - expenseTotal;

  // Create transaction container
  const div = document.createElement("div");

  // Create elements
  const titleElement = document.createElement("span");
  const amountElement = document.createElement("span");
  const typeElement = document.createElement("span");

  titleElement.textContent = title;
  amountElement.textContent = `₹${amountNumber}`;
  typeElement.textContent = typeText;

  // Create buttons
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  // Store current transaction data on the div
  div.amount = amountNumber;
  div.type = type;

  // Store references to display elements
  div.titleElement = titleElement;
  div.amountElement = amountElement;
  div.typeElement = typeElement;

  // Add elements to transaction
  div.appendChild(titleElement);
  div.appendChild(amountElement);
  div.appendChild(typeElement);
  div.appendChild(editButton);
  div.appendChild(deleteButton);

  transactions.appendChild(div);

  // EDIT
  editButton.addEventListener("click", function () {
    titleInput.value = div.titleElement.textContent;
    amountInput.value = div.amount;
    typeInput.value = div.type;

    editingTransaction = div;
  });

  // DELETE
  deleteButton.addEventListener("click", function () {
    div.remove();

    if (div.type === "opt-income") {
      incomeTotal -= div.amount;
    } else {
      expenseTotal -= div.amount;
    }

    totalIncome.textContent = incomeTotal;
    totalExpenses.textContent = expenseTotal;
    totalBalance.textContent = incomeTotal - expenseTotal;

    // If this transaction was being edited, cancel edit mode
    if (editingTransaction === div) {
      editingTransaction = null;
      titleInput.value = "";
      amountInput.value = "";
      typeInput.value = "";
    }
  });

  // Clear form
  titleInput.value = "";
  amountInput.value = "";
  typeInput.value = "";
});
