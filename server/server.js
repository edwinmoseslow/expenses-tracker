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

app.set('port', (process.env.PORT || 5000));

// Expense Data : initial data to fill
let expenesesList ={
    data: [
        {
            name: "MacWings meal",
            expense: 10,
            date: "01/11/2020"
        },
        {
            name: "Google Pixel",
            expense: 3000,
            date: "10/11/2020"
        },
        {
            name: "Whiteboard",
            expense: 100,
            date: "01/11/2020"
        }
    ]
}

// get all expenses
app.get('/finances', (req, res) =>{
    res.send(expenesesList);
})

// add a new expense
app.post('/expense/add', (req, res) => {
    let expense = Number(req.body.expense)
    let name = req.body.name
    let date = req.body.date;

    let newExpense  = {
        name : name,
        expense: expense,
        date: date
    };

    expensesList.data.push(newExpense);

    pusher.trigger('finances', 'new-expense', {
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

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});