module.exports = global.mongoose.model(
	'Favorite',
	new global.Schema({
		type: { type: String, required : true },
		info: { type: global.Schema.Types.ObjectId, refPath: 'type' },
		following: [{ type: global.Schema.Types.ObjectId, ref: 'User' }]
	},
	{ collection: 'favorites' })
);