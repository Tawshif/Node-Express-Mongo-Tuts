var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

var app = express();

// var logger = function(req, res, next){
// 	console.log('loging....');
// 	next();
// }

// app.use(logger);

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set static path
app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next) {
    res.locals.errors = null;
    next();
});
// Express validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

var users = [{
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john@gmail.com"
}, {
    id: 1,
    first_name: "charli",
    last_name: "Doe",
    email: "charli@gmail.com"
}, {
    id: 1,
    first_name: "Neo",
    last_name: "Doe",
    email: "neo@gmail.com"
}]

app.get('/', function(req, res) {
    res.render('index', {
        title: "customer",
        users: users
    });
});

app.post("/users/add", function(req, res) {
    req.checkBody('first_name', 'First name is requided ').notEmpty();
    req.checkBody('last_name', 'Last name is requided ').notEmpty();
    req.checkBody('email', 'Email name is requided ').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        console.log("Errors");
        res.render('index', {
            title: "customer",
            users: users,
            errors: errors
        });

    } else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.first_name,
            email: req.body.email
        }
        console.log("Success");
    }
    console.log(newUser);
});

app.listen(5000, function() {
    console.log("server started on port 5000__");
});