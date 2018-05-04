module.exports = global.mongoose.model(
	'Event',
	new global.Schema({
		name: { type: String, required : true },
		description: { type: String, required : true },
		teamsAttending: [{ type: global.Schema.Types.ObjectId, ref: 'Team' }],
	},
	{ collection: 'events' })
);