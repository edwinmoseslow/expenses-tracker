<template>
    <div class="dashboard">
        <table>
            <tr>
                <td>
                    <ExpensesTable @updateExList="updateExpenses" :expense="childData" :preloaded="sharedExpensesList"/>
                </td>
                <td>
                    <ExpensesForm @expense="addExpense" />
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <ExpensesChart :expense="childData" :preloaded="sharedExpensesList" :updatedList="sharedExpensesList"/>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import ExpensesChart from './ExpensesChart.vue'
import ExpensesForm from './ExpensesForm.vue'
import ExpensesTable from './ExpensesTable.vue'

export default {
    name: "Dashboard",
    components: {
        ExpensesChart,
        ExpensesForm,
        ExpensesTable
    },
    data: function() {
        return {
            childData: {
                name: "",
                date: "",
                amount: "",
                edit: false
            },
            sharedExpensesList: [{
                name: "Play Station 5",
                date: "2020-01-01",
                amount: "3000",
                edit: false
            }, {
                name: "Insurance",
                date: "2020-02-01",
                amount: "2000",
                edit: false
            }, {
                name: "Drum Pad",
                date: "2020-03-01",
                amount: "100",
                edit: false
            }, {
                name: "Food",
                date: "2020-04-01",
                amount: "300",
                edit: false
            }, {
                name: "Fast Food",
                date: "2020-05-01",
                amount: "200",
                edit: false
            }, {
                name: "Bills",
                date: "2020-06-01",
                amount: "4000",
                edit: false
            }, {
                name: "Online Course",
                date: "2020-07-01",
                amount: "500",
                edit: false
            }]
        };
    },
    methods: {
        addExpense(newExpense){
            console.log("Adding: ")
            console.log(newExpense.name)
            console.log(newExpense.date)
            console.log(newExpense.amount)

            this.childData = {
                name: newExpense.name,
                date: newExpense.date,
                amount: newExpense.amount,
                edit: newExpense.edit
            };
        },
        updateExpenses(expenseList){
            console.log("Updating : List")
            console.log(expenseList)

            this.sharedExpensesList = []
            
            expenseList.forEach(element => {
                this.sharedExpensesList.push(element)
            })
        }
    }
};
</script>

<style scoped>
.dashboard {
    width: 100%;
    padding: 5px;
}

table {
    width: 100%;
    height: 100%;
    border: 3px black solid;
}

td {
    border: 3px black solid;
    vertical-align: baseline;
}
</style>