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
        this.balanceAmount = document.getElementById("balance-amount");
        this.expenseList = document.getElementById("expense-list");
        this.balance = document.getElementById("balance");
        this.itemList = [];
        this.itemId = 0;

    }

    //budget form submit
    submitBudgetForm(){
        const value = this.budgetInput.value;

        // send slert if input is empty or negative
        if (value < 0){
            this.budgetFeedback.classList.add("show-item");
            this.budgetFeedback.innerHTML = `<p>budget can't negative</p>`;

            // remove alert after 5000 ms
            const self = this;
            setTimeout(function(){
                self.budgetFeedback.classList.remove("show-item");
                self.budgetFeedback.innerHTML = '';
                self.budgetInput.value = '';
            }, 5000)
        } else {
            this.budgetAmount.textContent = value;
            this.budgetInput.value = '';            
            this.showBalance();
            
        }
    }

    // show balance
    showBalance(){
        const expense = this.totalExpense();
        const total = parseInt(this.budgetAmount.textContent) - expense;
        this.balanceAmount.textContent = total;
        if (total < 0){
            this.balance.classList.remove("text-secondary", "text-success");
            this.balance.classList.add("text-danger");
        } else if (total === 0){
            this.balance.classList.remove("text-danger", "text-success");
            this.balance.classList.add("text-secondary");
        } else {
            this.balance.classList.remove("text-secondary", "text-danger");
            this.balance.classList.add("text-success");
        }
    }

    // submit expense form
    submitExpenseForm(){
        const expenseName = this.expenseInput.value;
        const amountValue = this.expenseAmountInput.value;
        if (amountValue < 0){
            this.expenseFeedback.classList.add('show-item');
            this.expenseFeedback.innerHTML = `<p>Expense can't be negative</p>`;
            const self = this;
            setTimeout(function(){
                self.expenseFeedback.classList.remove('show-item');
                self.expenseFeedback.innerHTML = '';
                self.expenseAmountInput.value = '';
            }, 5000);
        } else{

        }
        
    }

    //total expense
    totalExpense(){
        let total = 0
        for(let i = 0; i < this.itemList.length; i ++){
            total += this.itemList[i].amount;
        }
        return total
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
        ui.submitExpenseForm();
    })

    // expense click
    expenseList.addEventListener('click', function(){
        
    })


}

document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
})