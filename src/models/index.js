'use strict';
let fs = require("fs");
let path = require("path");

module.exports = {
	loadModels: () => {

		let models = {}
		try{
			fs
				.readdirSync(__dirname)
				.filter((file) => {
					return (file.indexOf(".") !== 0) && (file !== "index.js");
				})
				.forEach((file) => {
					let model = require(path.join(__dirname, file));
					models[file.split('.')[0]] = model;
				});
		} catch (err){
			console.log(err)
		}

		return models;
			
	}
}