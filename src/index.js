let controllers = require('./controllers');
var cors = require('cors');

let corsOptions = {
	'origin': '*',
	'optionsSuccessStatus': 200
}

module.exports = app => {
	
	//utilities
	app.get('/version', controllers.utilities.getVersion);

	//user
	app.get(['/users', '/users/:limit', '/users/:limit/:offset'], controllers.users.index)
	app.post('/user', controllers.users.insert)
	app.put('/user', controllers.users.update)
	app.delete('/user', controllers.users.remove)

	//auth
	app.post('/auth', cors(corsOptions), controllers.authentication.login)

	//news
	app.get(['/news', '/news/:limit', '/news/:limit/:offset'], controllers.news.index)
	app.post('/news', controllers.news.insert)
	app.put('/news/:id', controllers.news.update)
	app.delete('/news/:id', controllers.news.remove)

	//matches
	app.get(['/matches', '/matches/:limit', '/matches/:limit/:offset'], controllers.matches.index)
	app.get('/match/:id', controllers.matches.index)
	app.post('/match', controllers.matches.insert)
	app.put('/match/:id', controllers.matches.update)
	app.delete('/match/:id', controllers.matches.remove)

	//results
	app.get(['/results', '/results/:limit', '/results/:limit/:offset'], controllers.results.index)
	app.get('/result/:id', controllers.results.index)
	app.post('/result', controllers.results.insert)
	app.put('/result/:id', controllers.results.update)
	app.delete('/result/:id', controllers.results.remove)

	//hype
	app.get(['/hypes', '/hypes/:limit', '/hypes/:limit/:offset'], controllers.hype.index)
	app.get('/hype/:id', controllers.hype.index)
	app.post('/hype', controllers.hype.insert)
	app.put('/hype/:id', controllers.hype.update)
	app.delete('/hype/:id', controllers.hype.remove)

	//teams
	app.get(['/teams', '/teams/:limit', '/teams/:limit/:offset'], controllers.teams.index)
	app.get('/team/:id', controllers.teams.index)
	app.post('/team', controllers.teams.insert)
	app.put('/team/:id', controllers.teams.update)
	app.delete('/team/:id', controllers.teams.remove)

}