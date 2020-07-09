class UI {
    constructor(){
        this.budgetForm = document.getElementById("budget-form");
        this.budgetInput = document.getElementById("budget-input");
        this.expenseForm = document.getElementById("expense-form");
        this.expenseInput = document.getElementById("expense-input");
        this.expenseAmountInput = document.getElementById("expense-amount-input");
        this.budgetAmount = document.getElementById("budget-amount");
        this.expenseAmount = document.getElementById("expense-amount");
        this.balance = document.getElementById("balance");
        this.expenseList = document.getElementById("expense-list");
        this.itemList = [];
        this.itemId = 0;

    }
}

function eventListeners(){
    const budgetForm = document.getElementById("budget-form");
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
}

document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
})