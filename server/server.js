const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '1103278',
    key: '5fcb9931143c7f084122',
    secret: 'c62c44991b6ae704a4fb',
    cluster: 'ap1',
    encrypted: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '/app')));

app.set('port', (process.env.PORT || 4000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

// Expense Data
let expenesesList ={
    data: [
        {
            name: "MacWings",
            expense: 5,
            date: "01/11/2020"
        },
        {
            name: "Fries",
            expense: 5,
            date: "01/11/2020"
        }
    ]
}

// get all expenses
app.get('/expenses', (req, res) =>{
    res.send(expenesesList);
})

app.post('/expense/add', (req, res) => {
    let expense = Number(req.body.expense)
    let name = req.body.name
    let date = req.body.date;

    let newExpense  = {
        name = name,
        expense: expense,
        date: date
    };

    expensesList.data.push(newExpense);

    pusher.trigger('finance', 'new-expense', {
        newExpense: expensesList
    });

    res.send({
        success : true,
        name: name,
        expense: expense,
        date: date,
        data: expensesList
    })
});