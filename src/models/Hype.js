module.exports = global.mongoose.model(
	'Hype',
	new global.Schema({
		event: { type: String, required : true },
		date: { type: String, required : true },
		team1: { teamName: { type: String, required : true }, logo: { type: String, required : true }, value: { type: String, required : true }},
		team2: { teamName: { type: String, required : true }, logo: { type: String, required : true }, value: { type: String, required : true }},
		format: { type: String, required : true },
	},
	{ collection: 'hypes' })
);