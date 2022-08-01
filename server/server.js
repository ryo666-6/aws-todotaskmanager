const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ryo1998+6565',
    database: 'todotaskmanager'
})

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/tasks', (req, res) => {
    const TASK_QUERY = "select * from todotaskmanager.tasks"
    connection.query(TASK_QUERY, (err, response) => {
        if (err) console.log(err);
        else res.send(response)
    })
})

app.post('/addTask', (req, res) => {
    const ADD_QUERY = `insert into todotaskmanager.tasks (task) values ('${req.body.task}')`
    connection.query(ADD_QUERY, (err) => {
        if (err) console.log(err);
        else res.send('add task')
    })
})

app.delete('/deleteTask/:taskid', (req, res) => {
    console.log(req.params.taskid);
    const DELETE_QUERY = `DELETE FROM todotaskmanager.tasks where (taskid=${req.params.taskid})`
    connection.query(DELETE_QUERY, (err, res) => {
        if (err) console.log(err);
    })
})

app.listen(4000, () => {
    console.log('running on PORT 4000...')
})