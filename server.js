/**
 * Created by godson on 4/9/15.
 */

//Includes

var express         = require( 'express' );
var app             = express();
var mongoose        = require( 'mongoose' );
var morgan          = require( 'morgan' );
var bodyParser      = require( 'body-parser' );
var methodOverride  = require( 'method-override' );
var uid = require('node-uuid');
var session = require('express-session');


// configs

mongoose.connect('mongodb://localhost:27017/todo');

app.use(express.static(__dirname + '/web'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(session({
    genid: function(req) {
        return uid.v1()
    },
    secret: 'nodejstodo',
    saveUninitialized: true,
    cookie:{
        expires: new Date(Date.now() + 3600000)
    }
}));


// models

var Todo = mongoose.model('Todo', {
    userid: String,
    text : String
});


// routes

// get all todos
app.get('/api/todos', function(req, res) {

    Todo.find({ userid: req.sessionID },function(err, todos) {
        if (err) {
            res.send( err )
        }

        res.json(todos);
    });
});

// create todo
app.post('/api/todos', function(req, res) {

    Todo.create(
        {
            userid: req.sessionID,
            text : req.body.text,
            done : false
        },
        function(err, todo) {
            if (err) {
                res.send( err );
            }

            Todo.find({ userid: req.sessionID },function(err, todos) {
                if (err) {
                    res.send( err )
                }
                res.json(todos);
            });
        }
    );

});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove(
        {
            _id : req.params.todo_id
        },
        function(err, todo) {
            if (err) {
                res.send( err );
            }

            Todo.find({ userid: req.sessionID },function(err, todos) {
                if (err) {
                    res.send( err )
                }
                res.json(todos);
            });
        }
    );
});

// web
app.get('*', function(req, res) {
    res.sendfile('./web/index.html');
});


// Server start
app.listen(8080);
console.log("App listening on port 8080");