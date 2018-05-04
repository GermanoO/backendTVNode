module.exports = global.mongoose.model(
	'User',
	new global.Schema({
		name: { type: String, required : true },
		email: { type: String, required : true },
		password: { type: String, required : true },
		age:  { type: Number, required : true, min: 0, max: 150 },
		imageUrl: { type: String, required : true, min: 0, max: 150 },
		favorites: [{ type: global.Schema.Types.ObjectId, ref: 'Favorite' }],
		friends: [{ type: global.Schema.Types.ObjectId, ref: 'User' }]
	},
	{ collection: 'users' })
);