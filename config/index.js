module.exports = {
	"dbUri": "mongodb://localhost:27017/ptv",
	//"dbUri": "mongodb://ptvServer:pvt2018@ptv-shard-00-00-olxpw.mongodb.net:27017,ptv-shard-00-01-olxpw.mongodb.net:27017,ptv-shard-00-02-olxpw.mongodb.net:27017/test?ssl=true&replicaSet=ptv-shard-0&authSource=admin",
	//"dbUri": "mongodb://ptvServer:pvt2018@ptv-shard-00-00-olxpw.mongodb.net:27017,ptv-shard-00-01-olxpw.mongodb.net:27017,ptv-shard-00-02-olxpw.mongodb.net:27017/test?ssl=true&replicaSet=ptv-shard-0&authSource=admin",
	//"dbUri": "mongodb+srv://ptvServer:pvt2018@ptv-olxpw.mongodb.net/ptv",
	"dbOptions": {
		"reconnectInterval": 500,
		"poolSize": 10
	},
	"port": 8080
}