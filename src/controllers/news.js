module.exports = {
	index: (req, res) => {
		let limit = parseInt(req.params.limit) || 10;
		let offset = parseInt(req.params.offset) || 0;

		let response = global.models.NewsHeadline.find()
		.limit(limit)
		.skip(offset)
		.populate('detail')
		.exec((err, response) => {
			if(err) {
				res.status(404).json({
					message: 'Error',
					data: err.message
				})
			} else {
				res.status(200).json({
					message: 'Success',
					data: response
				})
			}
		})
				
	},
	insert: (req, res) => {},
	update: (req, res) => {},
	remove: (req, res) => {}
}