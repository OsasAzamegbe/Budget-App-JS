class UI {
    constructor(){
        this.budgetFeedback = document.querySelector(".budget-feedback");
        this.expenseFeedback = document.querySelector(".expense-feedback");
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

    //budget form submit
    submitBudgetForm(){
        const value = this.budgetInput.value;

        // send slert if input is empty or negative
        if (value === "" || value < 0){
            this.budgetFeedback.classList.add("show-item");
            this.budgetFeedback.innerHTML = `<p>budget can't be empty or negative</p>`;

            // remove alert after 5000 ms
            const self = this;
            setTimeout(function(){
                self.budgetFeedback.classList.remove("show-item");
            }, 5000)
        }
    }
}

function eventListeners(){
    const budgetForm = document.getElementById("budget-form");
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");

    // new instance of UI class
    const ui = new UI();

    // budget form submit
    budgetForm.addEventListener('submit', function(event){
        event.preventDefault();
        ui.submitBudgetForm();
    })

    // expense form submit
    expenseForm.addEventListener('submit', function(e){
        e.preventDefault();
    })

    // expense click
    expenseList.addEventListener('click', function(){
        
    })


}

document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
})