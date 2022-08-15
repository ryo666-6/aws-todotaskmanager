const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'database-1.cy7qik1duxfi.ap-northeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'password',
    database: 'taskmanager'
});

const response = {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
    }, 
    body: ""
};

exports.handler = (event, context, callback) => {
    const sql = 'insert into taskmanager.tasks SET ?;'
    let post = {};
    post['taskid'] = event["queryStringParameters"]["taskid"];
    post['task'] = event["queryStringParameters"]["task"];
    console.log(event["queryStringParameters"]);
    
    connection.query(sql, post, function(err, result) {
    if (err) {
        console.log(err);
        return err;
    }
    response['body'] = JSON.stringify(result)
    callback(null, response);
    });
    connection.end();
};
