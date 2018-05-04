module.exports = global.mongoose.model(
	'NewsHeadline',
	new global.Schema({
		title: { type: String, required : true },
		date: { type: String, required : true },
		comments: { type: String, required : true },
		link: { type: String, required : true },
		detail: { type: global.Schema.Types.ObjectId, ref: 'NewsDetails' }
	},
	{ collection: 'newsHeadlines' })
);