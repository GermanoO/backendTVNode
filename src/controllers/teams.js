module.exports = {
	index: (req, res) => {
		let limit = parseInt(req.params.limit) || 3;
		let offset = parseInt(req.params.offset) || 0;

		let response = global.models.Team.find()
		.limit(limit)
		.skip(offset)
		.sort({ 'position': 1})
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