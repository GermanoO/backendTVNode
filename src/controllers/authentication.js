module.exports = {
	login: (req, res) => {
		console.log(req.body)
		let username = req.body.username || ''
		let password = req.body.password || ''

		global.models.User.findOne({ $or: [{ email: username}, { name: username}] },(err, user) => {
			if(err) {
				console.log(err)
				res.status(404).json({
					'status': 'error',
					'message': 'wrong username or password.'
				})
			} else {
				console.log(user)
				if(user && user.password == password){
					res.status(200).json({
						'status': 'success',
						'data': user
					})
				} else {
					res.status(404).json({
						'status': 'error',
						'message': 'wrong username or password.'
					})
				}
			}
		})
	},
}