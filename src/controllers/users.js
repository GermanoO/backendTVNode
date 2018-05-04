module.exports = {
	index: (req, res) => {
		global.models.User.find((err, Users) => {
			if(err) {
				res.status(404).json({
					'status': 'error',
					'message': 'User not found.'
				})
			} else {
				res.status(200).json({
					'status': 'success',
					'data': Users
				})
			}
		})
	},
	indexById: (req, res) => {
		let id = req.params.id

		global.models.User.findOne({ _id: id },(err, User) => {
			if(err) {
				res.status(404).json({
					'status': 'error',
					'message': 'User not found.'
				})
			} else {
				res.status(200).json({
					'status': 'success',
					'data': User
				})
			}
		})
	},
	insert: (req, res) => {
		
		let name = req.body.name
		let email = req.body.email
		let password = req.body.password
		let age = req.body.age
		let imageUrl = req.body.imageUrl

		let User = new global.models.User({
			name: name,
			email: email,
			password: password,
			age: age,
			imageUrl: imageUrl
		})
		
		User.save((err, User) => {
			if(err) {
				res.status(400).json({
					'status': 'error',
					'message': err
				})
			} else {
				res.status(200).json({
					'status': 'success',
					'message': 'User inserted successfully.',
					'data': User
				})
			}
		})
	},
	update: (req, res) => {
		let id = req.params.id
		let name = req.body.name
		let email = req.body.email
		let password = req.body.password
		let age = req.body.age
		let imageUrl = req.body.imageUrl

		global.models.User.update({ _id: id }, {
			name: name,
			email: email,
			password: password,
			age: age,
			imageUrl: imageUrl
		}, (err, User) => {
			if(err){
				res.status(404).json({
					'status': 'error',
					'message': err.message,
				})
			} else {
				res.status(200).json({
					'status': 'success',
					'message': 'user updated successfully.',
				})
			}
		})
	},
	remove: (req, res) => {
		let id = req.params.id
		global.models.User.remove({ _id: id }, (err, response) => {
			if(err){
				res.status(404).json({
					'status': 'error',
					'message': err.message,
				})
			} else {
				res.status(200).json({
					'status': 'success',
					'message': 'user removed successfully',
				})
			}
		})
	}
}