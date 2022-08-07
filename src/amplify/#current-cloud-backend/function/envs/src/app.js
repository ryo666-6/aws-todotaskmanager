/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'database-1.clw5xqnhqbio.us-east-1.rds.amazonaws.com',
  user: 'root',
  password: 'Ryotakagi',
  database: 'awstaskmanager'
})

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/todos', (req, res) => {
  const TASK_QUERY = "select * from awstaskmanager.tasks"
  connection.query(TASK_QUERY, (err, response) => {
      if (err) console.log(err);
      else res.send(response)
  })
})

/****************************
* Example post method *
****************************/

app.post('/todos/addTask', (req, res) => {
  const ADD_QUERY = `insert into awstaskmanager.tasks (task) values ('${req.body.task}')`
  connection.query(ADD_QUERY, (err) => {
      if (err) console.log(err);
      else res.send('add task')
  })
})

/****************************
* Example put method *
****************************/


/****************************
* Example delete method *
****************************/

app.delete('/todos/deleteTask/:taskid', (req, res) => {
  console.log(req.params.taskid);
  const DELETE_QUERY = `DELETE FROM awstaskmanager.tasks where (taskid=${req.params.taskid})`
  connection.query(DELETE_QUERY, (err, res) => {
      if (err) console.log(err);
  })
})

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
