module.exports = global.mongoose.model(
	'Result',
	new global.Schema({
		date: { type: String, required : true },
		link: { type: String, required : true },
		team1: { name: { type: String, required : true }, logo: { type: String, required : true }, description: { type: String, required : true }},
		team2: { name: { type: String, required : true }, logo: { type: String, required : true }, description: { type: String, required : true }},
		score: { type: String, required : true },
	},
	{ collection: 'results' })
);