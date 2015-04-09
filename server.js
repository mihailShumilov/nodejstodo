/**
 * Created by godson on 4/9/15.
 */


var express         = require( 'express' );
var app             = express();
var mongoose        = require( 'mongoose' );
var morgan          = require( 'morgan' );
var bodyParser      = require( 'body-parser' );
var methodOverride  = require( 'method-override' );
var uid             = require('node-uuid');
var session         = require('express-session');
var config          = require('./server/config');


mongoose.connect(config.dns);

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

require('./server/routes')(app);

// Server start
app.listen(8080);
console.log("App listening on port 8080");