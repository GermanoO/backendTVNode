module.exports = global.mongoose.model(
	'Player',
	new global.Schema({
		name: { type: String, required : true },
		picture:  { type: String, required : true },
		nationality: { type: String, required : true },
		countryLogo: { type: String, required : true },
		team: { type: global.Schema.Types.ObjectId, ref: 'Team' }
	},
	{ collection: 'players' })
);