let request = require('request');
let cheerio = require('cheerio');

let ranksArray = []
let team = {}
let player = {}

request('https://www.hltv.org/ranking/teams/2018/february/12', function(error, response, html) {
	if (!error && response.statusCode == 200) {
		var $ = cheerio.load(html);
		$('div.ranked-team').each(function(i, element){
			team = {
				position: $(this).find('span.position').text(),
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
					countryLogo: $(this).find('img.flag').attr('src'),
				}
				team.lineUp.push(player)
			})
			ranksArray.push(team)
		})
	}
})
/*
//TORCIDA
let hypeArray = []
let hype = {}
request('https://csgolounge.com/', function(error, response, html) {
	if (!error && response.statusCode == 200) {
		var $ = cheerio.load(html);
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
			hypeArray.push(hype)
		})
		console.log(JSON.stringify(hypeArray, null, 2))
	}
})

//News Details
let details = {}
request('https://www.hltv.org/news/22525/tempo-storm-release-swedish-roster', function (error, response, html) {
	if (!error && response.statusCode == 200) {
		var $ = cheerio.load(html);
		$('div.newsitem').each(function(i, element){
			details = {
				title: $(this).children('.headline').text(),
				author: $(this).children('.author').children('.authorName').text(),
				date: $(this).children('.author').children('.date').text(),
				content: $(this).children('.newsdsl').text().split('\n').map(i => i.trim()).filter(i => i.length > 15).filter((i, index) =>  index < 8)
			}
			console.log(JSON.stringify(details, null, 2))
		});
	}
});


//Match Results
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

				results.push(result)
			})
		});
		console.log(JSON.stringify(results, null, 2))
	}
});


//Agenda
request('https://www.hltv.org/matches', function (error, response, html) {
	if (!error && response.statusCode == 200) {
		var $ = cheerio.load(html);
		let matches = []
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

				matches.push(match)
			})
		});
		console.log(JSON.stringify(matches, null, 2))
	}
});
*/
