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
        this.itemList = {};
        this.total = 0;
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
        const expense = this.total;
        this.expenseAmount.textContent = expense;
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
            let amount = parseInt(amountValue);
            this.expenseInput.value = '';
            this.expenseAmountInput.value = '';
            let expense = {
                title: expenseName,
                amount,
            }            
            this.itemList[this.itemId] = expense;            
            this.addExpense(expense);
            this.showBalance();
            this.itemId++;
        }
        
    }

    // add expense
    addExpense(expense){
        this.total += expense.amount;
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="d-flex row row-col-3 expense-item justify-content-between align-items-baseline text-danger">
            <p class="h7 text-capitalize list-item col" >- ${expense.title}</p>
            <p class="h6 list-item text col col-lg-4" >${expense.amount}</p>
            <div class="col col-lg-2">
                <a href="#" class="text-info edit-icon mx-2" data-id=${this.itemId}>
                    <i class="fas fa-edit"></i>
                </a>
                <a href="#" class="text-danger delete-icon mx-2" data-id=${this.itemId}>
                    <i class="fas fa-trash-alt"></i>
                </a>
            </div>
        </div>
        `;
        this.expenseList.appendChild(div);
    }


    //edit expense
    editExpense(element){
        const id = parseInt(element.dataset.id);
        const expense = this.itemList[id];
        this.expenseInput.value = expense.title;
        this.expenseAmountInput.value = expense.amount;
        this.deleteExpense(element);
    }

    //delete expense
    deleteExpense(element){
        const id = parseInt(element.dataset.id);
        const parent = element.parentElement.parentElement.parentElement;

        this.expenseList.removeChild(parent);
        this.total -= this.itemList[id].amount;
        delete this.itemList[id];
        this.showBalance();
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
    expenseForm.addEventListener('submit', function(event){
        event.preventDefault();
        ui.submitExpenseForm();
    })

    // expense click
    expenseList.addEventListener('click', function(event){
        event.preventDefault();
        const parent = event.target.parentElement;
        if (parent.classList.contains('edit-icon')){
            ui.editExpense(parent);
        } else if (parent.classList.contains('delete-icon')){
            ui.deleteExpense(parent);
        }
    })


}

document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
})