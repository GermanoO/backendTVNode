'use strict';

let request = require('request');
let cheerio = require('cheerio');
let baseUrl = 'https://www.hltv.org';

module.exports = {
	getNewsList: () => {
		let latestNews = new Array();
		request('https://www.hltv.org', function (error, response, html) {
			if (!error && response.statusCode == 200) {
				var $ = cheerio.load(html);
				$('a.newsline').each(function(i, element){
					let content = $(this).text().split("\n")
					latestNews.push({
						title: content[1].trim(),
						date: content[3].trim(),
						comments: content[4].trim(),
						link: $(this).attr('href')
					})
				});


				latestNews.map(newsHeadline => {
					let headline = global.models.NewsHeadline.findOneAndUpdate({
						title: newsHeadline.title,
					},
					{
						date: newsHeadline.date,
						comments: newsHeadline.comments,
						link: newsHeadline.link
					
					},
					{upsert: true, 'new': true}, (err, response) => {
						console.log(JSON.stringify(response, null, 2));
						getNewsDetails(response.link, response._id)
					})
					setTimeout(() => {
						//
					}, 50);
				})
			}
		});
	},
	getResults: () => {
		request('https://www.hltv.org/results', function (error, response, html) {
			if (!error && response.statusCode == 200) {
				var $ = cheerio.load(html);
				let results = []
				$('div.results-sublist').each(function(i, element){
					
					let date = $(this).children('.standard-headline').text()
					
					let team1 = $(this).find('.team1').text().split('\n').map(i => i.trim()).filter(i => i.length > 0);
					let team2 = $(this).find('.team2').text().split('\n').map(i => i.trim()).filter(i => i.length > 0);
					
					let scoreRef = $(this).find('.result-score')
					let score = scoreRef.map((index, s) => scoreRef.eq(index).text()).get()
					
					let linkRef = $(this).find('a')
					let link = linkRef.map((index, s) => linkRef.eq(index).attr('href')).get()

					let description1Ref = $(this).find('.team1').children().not('.team-logo')
					let description1 = description1Ref.map((index, s) => description1Ref.eq(index).attr('class')).get()

					let description2Ref = $(this).find('.team2').children().not('.team-logo')
					let description2 = description2Ref.map((index, s) => description2Ref.eq(index).attr('class')).get()
					
					let logo1Ref = $(this).find('.team1').children('.team-logo')
					let logo1 = logo1Ref.map((index, s) => logo1Ref.eq(index).attr('src')).get()

					let logo2Ref = $(this).find('.team2').children('.team-logo')
					let logo2 = logo2Ref.map((index, s) => logo2Ref.eq(index).attr('src')).get()

					team1.map((t, index) => {
						let result = {
							date,
							team1: {
								name: t,
								description: description1[index].indexOf('won') != -1 ? 'winner' : 'loser',
								logo: logo1[index]
							},
							team2: {
								name: team2[index],
								description: description2[index].indexOf('won') != -1 ? 'winner' : 'loser',
								logo: logo2[index]
							},
							score: score[index],
							link: link[index]
						}

						let obj = global.models.Result.findOneAndUpdate({
							link: result.link
						},
						{
							...result
						},
						{upsert: true, 'new': true}, (err, response) => {
							if(err){
								console.log(err)
							} else {
								//console.log(response)
							}
						})
					})
				});
			}
		});
	},
	getMatches: () => {
		request('https://www.hltv.org/matches', function (error, response, html) {
			if (!error && response.statusCode == 200) {
				var $ = cheerio.load(html);
				$('div.match-day').each(function(i, element){
					
					let date = $(this).children('.standard-headline').text()
					
					let teamsRef = $(this).find('.team');
					let teams = teamsRef.map((index, s) => teamsRef.eq(index).text()).get()

					let linkRef = $(this).find('.upcoming-match')
					let link = linkRef.map((index, s) => linkRef.eq(index).attr('href')).get()

					let timeRef = $(this).find('.time')
					let time = timeRef.map((index, s) => timeRef.eq(index).text().trim()).get()

					let eventRef = $(this).find('.event-name')
					let events = eventRef.map((index, s) => eventRef.eq(index).text()).get()
					
					let logosRef = $(this).find('.logo')
					let logos = logosRef.map((index, s) => logosRef.eq(index).attr('src')).get()
					let match = {
						date,
						teams,
						link,
						time,
						logos,
						events
					}

					teams
					.filter((i, index) => index < teams.length/2)
					.map((t, index) => {
						let match = {
							date,
							time: time[index],
							team1: {
								name: teams[index*2],
								logo: logos[index*2]
							},
							team2: {
								name: teams[(index*2)+1],
								logo: logos[(index*2)+1]
							},
							link: link[index]
						}

						let obj = global.models.Match.findOneAndUpdate({
							link: match.link
						},
						{
							...match
						},
						{upsert: true, 'new': true}, (err, response) => {
							if(err){
								console.log(err)
							} else {
								//console.log(response)
							}
						})

					})
				});
			}
		});
	},
	getHype: () => {
		request('https://csgolounge.com/', function(error, response, html) {
			if (!error && response.statusCode == 200) {
				var $ = cheerio.load(html);
				
				let hype = {}
				
				$('div.matchmain').each(function(i, element){
					hype = {
						event: $(this).find('.eventm').text(),
						date: $(this).find('.whenm').text().trim(),
						team1: {
							teamName: $(this).find('div.teamtext').first().children('b').text(),
							logo:  $(this).find('img').first().attr('src'),
							value: $(this).find('i.percent-coins').first().text()
						},
						team2: {
							teamName: $(this).find('div.teamtext').last().children('b').text(),
							logo:  $(this).find('img').eq(1).attr('src'),
							value: $(this).find('i.percent-coins').last().text()
						},
						format: $(this).find('span.format').text()
					}

					let obj = global.models.Hype.findOneAndUpdate({
						team1: hype.team1,
						date: hype.date,
						team2: hype.team2,
						event: hype.event
					},
					{
						...hype
					},
					{upsert: true, 'new': true}, (err, response) => {
						if(err){
							console.log(err)
						} else {
							//console.log(response)
						}
					})
				})
			}
		})
	},
	getRank: () => {
		request('https://www.hltv.org/ranking/teams/2018/february/12', function(error, response, html) {
			if (!error && response.statusCode == 200) {
				let team = {}
				let player = {}

				var $ = cheerio.load(html);
				
				$('div.ranked-team').each(function(i, element){
					team = {
						position: parseInt($(this).find('span.position').text().replace('#', '')),
						logo: $(this).find('span.team-logo').children('img').attr('src'),
						teamName: $(this).find('span.name').text(),
						link: 'https://www.hltv.org' + $(this).find('span.name').attr('data-url'),
						points: $(this).find('span.points').text(),
						lineUp: []
					}

					$(this).find('td.player-holder').each(function(i, element){
						player = {
							name: $(this).find('img.playerPicture').attr('alt'),
							picture: $(this).find('img.playerPicture').attr('src'),
							nationality: $(this).find('img.flag').attr('alt'),
							countryLogo: $(this).find('img.flag').attr('src')
						}
						team.lineUp.push(player)
					})


					let obj = global.models.Team.findOneAndUpdate({
						teamName: team.teamName,
						link: team.link
					},
					{
						...team
					},
					{upsert: true, 'new': true}, (err, response) => {
						if(err){
							console.log(err)
						} else {
							
						}
					})
				})
			}
		})
	}
}

let getNewsDetails = (link, reference) => {
	request('https://www.hltv.org' + link, function (error, response, html) {
		if (!error && response.statusCode == 200) {
			var $ = cheerio.load(html);
			$('div.newsitem').each(function(i, element){
				let details = {
					title: $(this).children('.headline').text(),
					author: $(this).children('.author').children('.authorName').text(),
					date: $(this).children('.author').children('.date').text(),
					content: $(this).children('.newsdsl').text().split('\n').map(i => i.trim()).filter(i => i.length > 15).filter((i, index) =>  index < 8)
				}
				let obj = global.models.NewsDetail.findOneAndUpdate({
					headline: reference
				},
				{
					...details
				},
				{upsert: true, 'new': true}, (err, response) => {
					if(err){
						console.log(err)
					} else {
						global.models.NewsHeadline.findOneAndUpdate({
							_id: reference
						},
						{
							detail: response._id
						}, (err, response) => {
							if(err){
								console.log(err)
							}
						})
					}
				})
			});
		}
	});
}