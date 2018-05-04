'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cron = require('node-cron');
var cors = require('cors');

let config = require('./config/');
let port = config.port;
let crawler = require('./src/crawler');
let routes;

//PARSERS
app.use(bodyParser.urlencoded({
    limit: '100kb',
    extended: true
}));

app.use(bodyParser.json());



app.use(cors());



//DATABASE CONFIGURATION
let mongoose = require('mongoose');
let models = require('./src/models');

global.Schema = mongoose.Schema;
global.mongoose = mongoose;

global.mongoose.connect(config.dbUri, config.dbOptions, err => {
	if(err){
		console.log('Mongo connect error: ' + err);
	}
});

let db = global.mongoose.connection

db.once('open', () => {
	console.log("databse connection stabilished.")
	global.models = models.loadModels();
	routes = require('./src/index')(app);
})

/*
//CRAWLER TASKS SCHEDULER
//(MINUTOS 0-59) (HORAS 0-23) (DIAS DO MES 1-31) (MESES 1-12) (DIAS DA SEMANA 0-7)
cron.schedule('0 * * * *', function(){
	crawler.getNewsList();
});
*/
crawler.getNewsList();
crawler.getMatches();
crawler.getResults();
crawler.getHype();
crawler.getRank();

app.listen(port, () => {
	console.log('linstening port: '+port)
})
