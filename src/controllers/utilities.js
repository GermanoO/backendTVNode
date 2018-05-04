let version = require('../../package.json').version;

module.exports = {
	getVersion: (req, res) => {
		res.status(200).json({
			message: 'Current version is '+ version +'.'
		})
	}
}