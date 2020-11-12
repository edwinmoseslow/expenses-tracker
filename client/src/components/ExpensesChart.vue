<script>
import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    name: "ExpensesChart",
    props: {
        expense: {
            name: String,
            date: String,
            amount: String,
            edit: Boolean
        },
        preloaded: {
            type: Array
        },
        updatedList: {
            type: Array
        }
    },
    data: function() {
        return {
            expensesList: [],
        };
    },
    watch: {
        expense: function () {
            console.log("Chart : Updating expenses list")
            this.expensesList.push(this.expense);

            this.expensesList.sort((a, b) => (a.date > b.date) ? 1 : -1)

            this.updateChart();
        },
        updatedList: function () {
            this.expensesList = []

            var i = -1
            while (++i < this.updatedList.length) {
                this.expensesList.push(this.updatedList[i]);
            }

            this.expensesList.sort((a, b) => (a.date > b.date) ? 1 : -1)

            this.updateChart();
        }
    },
    mounted() {
        var i = -1
        while (++i < this.preloaded.length) {
            this.expensesList.push(this.preloaded[i]);
        }
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