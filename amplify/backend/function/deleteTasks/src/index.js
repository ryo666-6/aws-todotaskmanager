const mysql = require('mysql');

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


exports.handler = async (event, context, callback) => {
    const sql = `DELETE FROM taskmanager.tasks where taskid = 3;`;
    connection.query(sql, function(err, result) {
    if (err) {
        console.log(err);
        return err;
    }
    response['body'] = JSON.stringify(result)
    callback(null, response);
    });
    connection.end();
};

