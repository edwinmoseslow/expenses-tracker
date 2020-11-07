<template>
    <div class="dashboard">
        <table>
            <tr>
                <td>
                    <ExpensesTable :expense="childData"/>
                </td>
                <td>
                    <ExpensesForm @expense="addExpense" />
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <ExpensesChart />
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
                amount: ""
            }
        };
    },
    methods: {
        addExpense(variable){
            console.log("Adding: ")
            console.log(variable.name)
            console.log(variable.date)
            console.log(variable.amount)

            this.childData = {
                name: variable.name,
                date: variable.date,
                amount: variable.amount
            };
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
}
</style>