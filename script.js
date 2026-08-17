let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let editingId = null;

const totalBalance = document.querySelector("#balance");
const totalIncome = document.querySelector("#income");
const totalExpenses = document.querySelector("#expenses");

const titleInput = document.querySelector("#title");
const amountInput = document.querySelector("#amount");
const typeInput = document.querySelector("#type");
const addButton = document.querySelector("#addTransaction");
const transactionsContainer = document.querySelector("#transactions");

// Save transactions to LocalStorage
function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Calculate and display totals
function updateSummary() {
  let incomeTotal = 0;
  let expenseTotal = 0;

  transactions.forEach(function (transaction) {
    if (transaction.type === "opt-income") {
      incomeTotal += transaction.amount;
    } else {
      expenseTotal += transaction.amount;
    }
  });

  const balance = incomeTotal - expenseTotal;

  totalIncome.textContent = incomeTotal;
  totalExpenses.textContent = expenseTotal;
  totalBalance.textContent = balance;
}

// Display transactions
function renderTransactions() {
  transactionsContainer.innerHTML = "<h2>Transactions</h2>";

  transactions.forEach(function (transaction) {
    const div = document.createElement("div");

    const titleElement = document.createElement("span");
    titleElement.textContent = transaction.title;

    const amountElement = document.createElement("span");
    amountElement.textContent = `₹${transaction.amount}`;

    const typeElement = document.createElement("span");
    typeElement.textContent =
      transaction.type === "opt-income" ? "Income" : "Expense";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    div.appendChild(titleElement);
    div.appendChild(amountElement);
    div.appendChild(typeElement);
    div.appendChild(editButton);
    div.appendChild(deleteButton);

    transactionsContainer.appendChild(div);

    // Edit
    editButton.addEventListener("click", function () {
      titleInput.value = transaction.title;
      amountInput.value = transaction.amount;
      typeInput.value = transaction.type;

      editingId = transaction.id;
      addButton.textContent = "Update Transaction";
    });

    // Delete
    deleteButton.addEventListener("click", function () {
      transactions = transactions.filter(function (item) {
        return item.id !== transaction.id;
      });

      saveTransactions();
      renderTransactions();
      updateSummary();

      if (editingId === transaction.id) {
        editingId = null;
        clearForm();
      }
    });
  });
}

// Clear form
function clearForm() {
  titleInput.value = "";
  amountInput.value = "";
  typeInput.value = "";
  addButton.textContent = "Add Transaction";
}

// Add / Update transaction
addButton.addEventListener("click", function () {
  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);
  const type = typeInput.value;

  // Validation
  if (title === "") {
    alert("Please enter a title");
    return;
  }

  if (amount <= 0) {
    alert("Please enter an amount");
    return;
  }

  if (type === "") {
    alert("Please select an option");
    return;
  }

  // Update existing transaction
  if (editingId !== null) {
    transactions = transactions.map(function (transaction) {
      if (transaction.id === editingId) {
        return {
          ...transaction,
          title: title,
          amount: amount,
          type: type,
        };
      }

      return transaction;
    });

    editingId = null;
  }

  // Add new transaction
  else {
    const newTransaction = {
      id: Date.now(),
      title: title,
      amount: amount,
      type: type,
    };

    transactions.push(newTransaction);
  }

  saveTransactions();
  renderTransactions();
  updateSummary();
  clearForm();
});

// Load saved data when page opens
renderTransactions();
updateSummary();