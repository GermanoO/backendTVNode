module.exports = global.mongoose.model(
	'NewsDetails',
	new global.Schema({
		title: { type: String, required : true },
		content: { type: String, required : true },
		author: { type: String, required : true },
		headline: { type: global.Schema.Types.ObjectId, ref: 'NewsHeadline', required : true }
	},
	{ collection: 'newsDetails' })
);