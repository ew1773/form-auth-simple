var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: '238280934@#$@#$sdfasdlkfj'
}));
app.use(express.static(__dirname+'/public'));

app.post('/login', function(req, res) {
	console.log(req.body);
	if (req.body.username === 'test' && req.body.password === 'awesome') {
		//set cookie
		console.log("authenticated!!");
		req.session.is_logged_in = true;
		//return res.redirect('/');
	}
	else {
		return res.redirect('/login.html?error=signinfailed');
		console.log("not allowed!!");
	}
});

app.get('/', function(req, res) {
	if (req.session.is_logged_in) {
		return res.sendFile(__dirname+'/public/home.html');	
	}
	else {
		return res.redirect('/login.html');
	}
});

app.listen(8080);