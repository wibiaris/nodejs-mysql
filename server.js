var express = require("express");
var mysql = require('mysql');
var app = express();
var fs = require("fs");



var pool =  mysql.createPool({
	connectionLimit: 100, 
	host: "localhost",
	user: "homestead",
	password: "secret",
	database: "wsup", 
	port: 33060,
	debug: false
});

function handle_database(req,res) {

	pool.getConnection(function(err, connection){
		if(err){
			connection.release();
			res.json({"code": 100, "status": "Ërror in connection database"});
			return;
		}

		console.log('çonnected as id' + connection.threadId);

		connection.query("SELECT * from user_token", function(err, rows){
			connection.release();
			if(!err) {

				res.json(rows);
				var writeStream = fs.createWriteStream("queryResult.txt");
				writeStream.write(rows +"\n");
				writeStream.end();
			}
		});

		connection.on('error', function(err) {
			res.json({"code": 100, "status": "Error in connection database"});
			return;
		});

	});
}

app.get("/", function(req,res){
	handle_database(req,res);
});

app.listen(3000);
