<template>
    <div>
        <p class="title">Expenses Table</p>
        <table>
            <tr>
                <!-- <th @click="sort('index')">
                    Expenses No.
                </th> -->
                <th v-on:click="sort('name')">
                    <p v-show="sortKey.name === 1">Expenses Name &#8645;</p>
                    <p v-show="sortKey.name === 3">Expenses Name &#8650;</p>
                    <p v-show="sortKey.name === 2">Expenses Name &#8648;</p> 
                </th>
                 <th v-on:click="sort('date')">
                    <p v-show="sortKey.date === 1">Expenses Date &#8645;</p>
                    <p v-show="sortKey.date === 3">Expenses Date &#8650;</p>
                    <p v-show="sortKey.date === 2">Expenses Date &#8648;</p> 
                </th>
                <th v-on:click="sort('amount')">
                    <p v-show="sortKey.amount === 1">Expenses Amount &#8645;</p>
                    <p v-show="sortKey.amount === 3">Expenses Amount &#8650;</p>
                    <p v-show="sortKey.amount === 2">Expenses Amount &#8648;</p>
                </th>
                <th>
                    Actions
                </th>
            </tr>
            <tr v-for="(expense, index) in expensesList" :item="expense" :key="index">
                <!-- <td>
                    {{ index + 1 }}
                </td> -->
                <td>
                    <span v-show="!expense.edit">{{ expense.name }}</span>
                    <input type="text" v-model="expense.name" v-show="expense.edit" required>
                </td>
                <td>
                    <span v-show="!expense.edit">{{ expense.date }}</span>
                    <input type="date" v-model="expense.date" v-show="expense.edit" required>
                </td>
                <td>
                    <span v-show="!expense.edit">{{ expense.amount }}</span>
                    <input type="text" v-model="expense.amount" v-show="expense.edit" required>
                </td>
                <td>
                    <button class="btn btn-outline-dark" v-show="!expense.edit" v-on:click="editExpense(expense)">Edit</button>
                    <button class="btn btn-outline-danger" v-show="!expense.edit" v-on:click="deleteExpense(index, expense)">Delete</button>

                    <button class="btn btn-outline-success" v-show="expense.edit" v-on:click="saveEdit(expense)">Save</button>
                    <button class="btn btn-outline-danger" v-show="expense.edit" v-on:click="cancelEdit(expense)">Cancel</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: "ExpensesTable",
    props: {
        expense: {
            name: String,
            date: String,
            amount: String,
            edit: Boolean
        },
        preloaded: {
            type: Array
        }
    },
    data: function() {
        return {
            expensesList: [],
            sortKey: {
                name: 1,
                date: 1,
                amount: 1
            }
        };
    },
    created() {
        var i = -1
        while (++i < this.preloaded.length) {
            this.expensesList.push(this.preloaded[i])
        }
    },
    watch: {
        expense: function () {
            console.log("Table : Updating expenses list")
            this.expensesList.push(this.expense)

            this.sortKey.amount = 1
            this.sortKey.name = 1
            this.sortKey.date = 1
        }
    },
    methods: {
        // sortExpenses: function() {
        //     this.expensesList.sort((a, b) => (a.date > b.date) ? 1 : -1)
        // },
        editExpense(expense) {
            console.log("Edit Expense")
            if(this._originalExpense != null) {
                // revert the preivous edit
                for(var i = 0; i < this.expensesList.length; i++){
                    if(this.expensesList[i].edit == true) {
                        console.log("Rollback previous exepense")
                        this._originalExpense.edit = false;
                        Object.assign(this.expensesList[i], this._originalExpense);
                        break;
                    }
                }
            }

            console.log("store current expense")
            this._originalExpense = Object.assign({}, expense);
            expense.edit = true
        },
        deleteExpense(index, expense) {
            console.log("Delete Expense")
            this.expensesList.splice(index, 1)

            expense.edit = false;

            // update expenses
            this.$emit("updateExList", this.expensesList);
        },
        saveEdit(expense) {
            console.log("Save Edit")

            // validation
            if(!expense.name || !expense.date || !expense.amount) {
                alert("Validation Failed")
                console.log("Save Edit Failed")
                return; 
            }

            expense.edit = false;
            
            // update expenses
            this.$emit("updateExList", this.expensesList);

            this._originalExpense = null;
        },
        cancelEdit(expense) {
            console.log("Cancel Edit")
            Object.assign(expense, this._originalExpense);
            expense.edit = false;
            this._originalExpense = null;
        },
        sort:function(key) {
            console.log("Sorting")
            if(key === "name") {
                switch(this.sortKey.name) {
                    case 1:
                    case 2:
                        this.expensesList.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
                        this.sortKey.name = 3
                        this.sortKey.date = 1
                        this.sortKey.amount = 1
                        break
                    case 3:
                        this.expensesList.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? 1 : -1)
                        this.sortKey.name = 2
                        this.sortKey.date = 1
                        this.sortKey.amount = 1
                        break
                }
            } else if(key === "date") {
                switch(this.sortKey.date){
                    case 1:
                    case 2:
                        // asc
                        this.expensesList.sort((a, b) => (a.date > b.date) ? 1 : -1)
                        this.sortKey.date = 3
                        this.sortKey.name = 1
                        this.sortKey.amount = 1
                        break
                    case 3:
                        // desc
                        this.expensesList.sort((a, b) => (a.date < b.date) ? 1 : -1)
                        this.sortKey.date = 2
                        this.sortKey.name = 1
                        this.sortKey.amount = 1
                        break
                }
            } else if(key === "amount") {
               switch(this.sortKey.amount){
                    case 1:
                    case 2:
                        // asc
                        this.expensesList.sort((a, b) => (a.amount - b.amount))
                        this.sortKey.amount = 3
                        this.sortKey.name = 1
                        this.sortKey.date = 1
                        break
                    case 3:
                        // desc
                        this.expensesList.sort((a, b) => (b.amount - a.amount))
                        this.sortKey.amount = 2
                        this.sortKey.name = 1
                        this.sortKey.date = 1
                        break
                }
            }
        }
    }
}
</script>

<style scoped>
table {
    width: 100%;
    border: 3px black solid;
}

th {
    border: 2px black solid;
}

td {
    border: 2px black solid;
}

button {
    margin-left: 5px;
    margin-top: 2px;
    margin-bottom: 2px;
}

.title {
    font-weight: bold;
    font-size: larger;
}
</style>