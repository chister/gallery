var express = require('express'),
    path    = require('path'),
    http    = require('http'),
    db		= require('../lib/mongodb');

var app = express();

app.configure(function(){
	app.set('views', path.join(__dirname , path.join('..','views')));
	app.set('view engine', 'jade');
	app.set('port', 8080);
	app.use(express.favicon('./public/images/favicon.ico'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(function(req, res, next){
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'X-Requested-With');
		next();
	});
	app.use(app.router);
	app.use(express.static(path.join(__dirname, path.join('..','public'))));
});

app.configure('development', function(){
  process.env.NODE_ENV='development';
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

require('../controllers/VideoController')(app, db);

app.get('/', express.static('index.html'));

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});