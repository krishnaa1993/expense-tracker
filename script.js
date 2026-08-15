let incomeTotal = 0;
let expenseTotal = 0;
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
  const amount = amountInput.value;
  const amountNumber = Number(amount);
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
    incomeTotal = incomeTotal + amountNumber;
    totalIncome.textContent = incomeTotal;
  } else {
    typeText = "Expense";
    expenseTotal = expenseTotal + amountNumber;
    totalExpenses.textContent = expenseTotal;
  }

  const balance = incomeTotal - expenseTotal;
  totalBalance.textContent = balance;

  const div = document.createElement("div");
  const deleteButton = document.createElement("button");
  div.textContent = `${title} - ${amount} - ${typeText}`;
  transactions.appendChild(div);

  titleInput.value = "";
  amountInput.value = "";
  typeInput.value = "";
});
