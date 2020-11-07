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
    },
    data: function() {
        return {
            expensesList: [],
        };
    },
    watch: {
        expense: function () {
            console.log("updating expenses list")
            this.expensesList.push(this.expense);
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