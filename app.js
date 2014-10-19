//API imports 
var session = require('express-session');
var express = require('express');
var app = express();
var handlebars = require('express3-handlebars');
var bodyParser = require('body-parser');

app.engine('handlebars', handlebars({ defaultLayout:'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));


// parse application
 // to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// to support JSON-encoded bodies
app.use(bodyParser.json());

var sessionOptions = {
	secret: 'donotpassgodonotcollect$100',
	resave: true,
	saveUninitialized: true
};

app.use(session(sessionOptions));

//Logger function
var logIt=function(req,res){
	console.log(Date(),req.url, 200,"OK");
};
//Logger function
var logError=function(req,res){
	console.log(Date(),req.url, 404,"Page Not Found");
};

//Birdwatching
var birdArray=[{"name":"Bald Eagle", "number":3},{"name":"Yellow Billed Duck", "number":7},{"name":"Great Cormorant", "number":4}];


app.get('/', function(req, res){
	res.render('home');
	logIt(req,res);
});

app.get('/list', function(req, res){
	res.render('list', {bird:birdArray});
	logIt(req,res);

});

app.post('/birds', function(req, res){
  //Holding the value of the bird name entered by user
  var newBird = req.body;
  var newBirdTwo=newBird.name;
  var birdExisting=0;	
birdArray.forEach(function(entry){
	if(((newBirdTwo).toUpperCase())===((entry.name).toUpperCase())){
		birdExisting=1;
		entry.number++;
		res.render('list', {bird:birdArray});
		logIt(req,res);
	}

});

	if(birdExisting===0 && newBirdTwo!==""){
		birdArray.push({"name":newBirdTwo, "number":1});
		birdExisting=0;
		res.render('list', {bird:birdArray});
		logIt(req,res);
	}
	

});

// Removes an element from an array.
Array.prototype.remove = function(value) {
var idx = this.indexOf(value);
if (idx != -1) {
    return this.splice(idx, 1); // The second parameter is the number of elements to remove.
}
return false;
}

app.get('/settings', function(req, res){
	res.render('settings');
	logIt(req,res);
});

app.post('/settings', function(req, res){
  //Holding the value of the min number entered by user
  var newNum = req.body;
  var newNumTwo=newNum.name;
birdArray.forEach(function(entry){
	if(entry.number < newNumTwo){
		birdArray.remove(entry);	
	}
});

res.render('list', {bird:birdArray});
logIt(req,res);

});

app.use(function(req, res, next){
	res.status(404);
	res.render('404');
	logError(req,res);
});

var port = 3000;
app.listen(port);
console.log('Express started on http://localhost:', port+ '; press Ctrl-C to terminate.' );
