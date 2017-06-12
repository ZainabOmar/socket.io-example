var express = require ("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var UserController = require ('./userController');

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
	console.log('a user is connected');
	socket.on('disconnect', function() {
		console.log('the user is disconnected now')
	});
});

app.use(bodyParser.json());

// Connect to Mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/chatapp');
var db = mongoose.connection;
console.log("mongodb is now connected to the serever");

app.post('/api/signin', UserController.handleUsers.signin);
app.post('/api/signup', UserController.handleUsers.signup);
app.get('/api/allUsers', UserController.handleUsers.getUsers);

app.use(express.static(__dirname + '/../client'));

http.listen(process.env.PORT || 3000);
console.log("app is listening on port 3000");

module.exports = app;