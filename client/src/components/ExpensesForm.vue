<template>
    <div>
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label>Expense's Name :</label>
                <input type="text" class="form-control" v-model="name" placeholder="Enter Expense Name" required>
            </div>
            <div class="form-group">
                <label>Date :</label>
                <input type="date" class="form-control" v-model="date" placeholder="Enter Exepense Date" required>
            </div>
            <div class="form-group">
                <label>Amount :</label>
                <input type="number" class="form-control" v-model="amount" placeholder="Enter Exepense Amount" required>
            </div>
            <button @click="submit" class="btn btn-dark">Add Expense</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "ExpensesForm",
    data: function() {
        return {
            name: "",
            date: "",
            amount: ""
        }
    },
    methods: {
        submit: function() {
            // validation
            if(!this.name || !this.date || !this.amount) {
                console.log("Validation Failed")
                return; 
            }
            
            console.log("Submitting New Expense")
            let expense = {
                name: this.name,
                date: this.date,
                amount: this.amount,
                edit: false
            }

            // add expense
            this.$emit("expense", expense);

            this.name = "";
            this.date = "";
            this.amount = "";
        }
    }
}
</script>

<style scoped>
form {
    padding: 10px;
    text-align: left;
}

label {
    font-weight: bold;
}

button {
    margin-top: 10px;
    width: 100%;
}
</style>