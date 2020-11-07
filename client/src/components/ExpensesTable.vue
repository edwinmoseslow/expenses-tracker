<template>
    <div>
        Expenses Table
        <table>
            <tr>
                <th>
                    Expense Name
                </th>
                <th>
                    Expense Date
                </th>
                <th>
                    Expense Amount
                </th>
            </tr>
            <tr v-for="(expense, index) in expensesList" :item="expense" :key="index">
                <td>{{ expense.name }}</td>
                <td>{{ expense.date }}</td>
                <td>{{ expense.amount }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: "ExpenseTable",
    props: {
        expense: {
            name: String,
            date: String,
            amount: String
        },
        preloadedList: []
    },
    data: function() {
        return {
            expensesList: [],
        };
    },
    watch: {
        expense: function () {
            console.log("Updating expenses list")
            this.expensesList.push(this.expense);
            // this.expensesList.sort((a, b) => (a.date > b.date) ? 1 : -1)
        },
    },
};
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
</style>