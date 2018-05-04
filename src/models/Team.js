module.exports = global.mongoose.model(
	'Team',
	new global.Schema({
		position: { type: Number, required : true },
		logo: { type: String, required : true },
		teamName: { type: String, required : true },
		link: { type: String, required : true },
		points: { type: String, required : true },
		lineUp: [{
			name: { type: String, required : true },
			picture:  { type: String, required : true },
			nationality: { type: String, required : true },
			countryLogo: { type: String, required : true },
		}]
	},
	{ collection: 'teams' })
);