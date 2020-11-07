<script>
import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    name: "ExpenseChart",
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
        },
        expensesList: function () {
            // this.expensesList.sort((a, b) => (a.date > b.date) ? 1 : -1)
            this.updateChart();
        }
    },
    mounted () {
        this.updateChart();
    },
    methods: {
        updateChart() {
            console.log("Render Chart")
            this.renderChart({
            labels: this.expensesList.map(expense => expense.date),
            datasets: [{
                label: 'Expense',
                backgroundColor: '#f87979',
                data: this.expensesList.map(expense => expense.amount),
                parsing: {
                    yAxisKey: 'amount'
                }
            }]
            },{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            })
        }
    }
};
</script>