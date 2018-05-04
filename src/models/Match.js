module.exports = global.mongoose.model(
	'Match',
	new global.Schema({
		date: { type: String, required : true },
		time: { type: String, required : true },
		team1: { name: { type: String, required : true }, logo: { type: String, required : true }},
		team2: { name: { type: String, required : true }, logo: { type: String, required : true }},
		link: { type: String, required : true },
	},
	{ collection: 'matches' })
);