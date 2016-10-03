//Important dependency for server
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var path = require('path');
var http = require('http');



// Create express app
var app = express();

// Main routes for back end
var router = require(path.join(__dirname ,'/routes/index'));


//Set view engine HandleBars
app.set('view engine', 'hbs');
app.set('views' , path.join(__dirname,'front-end/dist' ));

// Compress and defaults path to static files
app.use(compression());
app.use(express.static(path.join(__dirname , 'front-end/dist')));

//Body and Cookie parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());



app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


// Routes to use
app.get('/' , router);


// If no such route display error
app.get('/*' , function(req ,res ,next){
    res.status(404).send('No such page');
    res.end();
});



//Create server
var server = http.createServer(app);

var port = 3000;

if (process.env.PORT) {
    port = process.env.PORT;
}

// Import Socket IO
var IO = require('socket.io')(server);
// Router for SocketIo external file
var sockets = require(path.join(__dirname ,'/routes/sockets'))(IO);
app.use('/' , function(){
    sockets();
});



//Listen on port 3000
server.listen(port , function(){
    console.log('Server listening on http://localhost:' + port);
});







