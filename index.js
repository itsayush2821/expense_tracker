document.addEventListener("DOMContentLoaded", function () {
    const expenseForm = document.getElementById("expenseForm");
    const expenseList = document.getElementById("expenseList");
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  
    function renderExpenses() {
      expenseList.innerHTML = "";
      expenses.forEach((expense, index) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.innerHTML = `
          <strong>${expense.amount}</strong>-<strong>${expense.category}</strong>-<strong>${expense.name}</strong>
          <button type="button" class="btn btn-sm btn-info ml-2 edit-btn" data-index="${index}">Edit Expense</button>
          <button type="button" class="btn btn-sm btn-danger ml-2 delete-btn" data-index="${index}">Delete Expense</button>
        `;
        expenseList.appendChild(listItem);
      });
  
      const editButtons = document.querySelectorAll(".edit-btn");
      const deleteButtons = document.querySelectorAll(".delete-btn");
  
      editButtons.forEach((button) => {
        button.addEventListener("click", handleEdit);
      });
  
      deleteButtons.forEach((button) => {
        button.addEventListener("click", handleDelete);
      });
    }
  
    function addExpense(name, amount, category) {
      expenses.push({ name, amount, category });
      localStorage.setItem("expenses", JSON.stringify(expenses));
      renderExpenses();
    }
  
    function editExpense(index) {
      const newName = prompt("Enter new expense name:", expenses[index].name);
      const newAmount = parseFloat(prompt("Enter new expense amount:", expenses[index].amount));
      const newCategory = prompt("Enter new expense category:", expenses[index].category);
      if (newName && !isNaN(newAmount) && newCategory) {
        expenses[index].name = newName;
        expenses[index].amount = newAmount;
        expenses[index].category = newCategory;
        localStorage.setItem("expenses", JSON.stringify(expenses));
        renderExpenses();
      }
    }

  
    function deleteExpense(index) {
      expenses.splice(index, 1);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      renderExpenses();
    }
  
    function handleEdit(event) {
      const index = event.target.getAttribute("data-index");
      if (index !== null) {
        editExpense(parseInt(index));
      }
    }
  
    function handleDelete(event) {
      const index = event.target.getAttribute("data-index");
      if (index !== null) {
        deleteExpense(parseInt(index));
      }
    }
  
    expenseForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("expenseName").value;
      const amount = parseFloat(document.getElementById("expenseAmount").value);
      const category = document.getElementById("expenseCategory").value;
      if (name && !isNaN(amount) && category) {
        addExpense(name, amount, category);
        expenseForm.reset();
      }
    });
  
    renderExpenses();
  });
  