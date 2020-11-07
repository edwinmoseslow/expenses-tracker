<template>
    <div class="dashboard">
        <ExpensesTable />
        <ExpensesForm />
        <ExpensesChart />
    </div>
</template>

<script>
import ExpensesChart from './components/ExpensesChart.vue'
import ExpensesForm from './components/ExpensesForm.vue'
import ExpensesTable from './components/ExpensesTable.vue'

export default {
    components: {
        ExpensesChart,
        ExpensesForm,
        ExpensesTable
    },
    data() {
        return {

        }
    }
}
</script>