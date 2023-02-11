const axios = require("axios").default;
const fetch = require("node-fetch");
const request = require('request')
const cheerio = require("cheerio");
const encodeUrl = require("encodeurl");
const tool = require("../myfunc");

async function musicaldown(URL) {
    return new Promise((resolve, rejecet) => {
        axios
            .get("https://musicaldown.com/id", {
                headers: {
                    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
                },
            })
            .then((res) => {
                const $ = cheerio.load(res.data);
                const url_name = $("#link_url").attr("name");
                const token_name = $("#submit-form > div")
                    .find("div:nth-child(1) > input[type=hidden]:nth-child(2)")
                    .attr("name");
                const token_ = $("#submit-form > div")
                    .find("div:nth-child(1) > input[type=hidden]:nth-child(2)")
                    .attr("value");
                const verify = $("#submit-form > div")
                    .find("div:nth-child(1) > input[type=hidden]:nth-child(3)")
                    .attr("value");
                let data = {
                    [`${url_name}`]: URL,
                    [`${token_name}`]: token_,
                    verify: verify,
                };
                axios
                    .request({
                        url: "https://musicaldown.com/id/download",
                        method: "post",
                        data: new URLSearchParams(Object.entries(data)),
                        headers: {
                            "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
                            cookie: res.headers["set-cookie"],
                        },
                    })
                    .then((respon) => {
                        const ch = cheerio.load(respon.data);
                        axios
                            .request({
                                url: "https://musicaldown.com/id/mp3",
                                method: "post",
                                headers: {
                                    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
                                    cookie: res.headers["set-cookie"],
                                },
                            })
                            .then((resaudio) => {
                                const hc = cheerio.load(resaudio.data);
                                const a = {
									judul: hc(
										"body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8"
									)
									.find("h2")
									.text()
									.split(": ")[1],
                                    video: {
                                        //body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(10)
                                        link1: ch("body > div.welcome.section > div")
                                            .find("div:nth-child(2) > div.col.s12.l8 > a:nth-child(7)")
                                            .attr("href"),
                                        link2: ch("body > div.welcome.section > div")
                                            .find("div:nth-child(2) > div.col.s12.l8 > a:nth-child(5)")
                                            .attr("href"),
                                        link3: ch("body > div.welcome.section > div")
                                            .find("div:nth-child(2) > div.col.s12.l8 > a:nth-child(9)")
                                            .attr("href"),
                                        link4: ch("body > div.welcome.section > div")
                                            .find("div:nth-child(2) > div.col.s12.l8 > a:nth-child(10)")
                                            .attr("href")
                                    },
                                    audio: {
                                        judul: hc(
                                                "body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8"
                                            )
                                            .find("h2")
                                            .text()
                                            .split(": ")[1],
                                        link1: hc(
                                            "body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(6)"
                                        ).attr("href"),
                                        link2: hc(
                                            "body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(4)"
                                        ).attr("href"),
                                        link3: hc(
                                            "body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(6)"
                                        ).attr("href"),
                                    },
                                };
                                const b = {
                                    creator: "Fajar Ihsan",
                                    audio: {
                                        judul: hc(
                                                "body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8"
                                            )
                                            .find("h2")
                                            .text()
                                            .split(": ")[1],
                                        link1: ch("body > div.welcome.section > div")
                                            .find("div:nth-child(2) > div.col.s12.l8 > a:nth-child(5)")
                                            .attr("href"),
                                        link2: ch("body > div.welcome.section > div")
                                            .find("div:nth-child(2) > div.col.s12.l8 > a:nth-child(7)")
                                            .attr("href"),
                                        link3: ch("body > div.welcome.section > div")
                                            .find("div:nth-child(2) > div.col.s12.l8 > a:nth-child(9)")
                                            .attr("href"),
                                    },
                                };
                                resolve(
                                    URL.includes("/music/") ? {
                                        status: true,
                                        ...b
                                    } : {
                                        status: true,
                                        ...a
                                    }
                                );
                            });
                    });
            });
    });
}

async function tiktokstalk(user) {
	return new Promise(async(resolve, reject) => {
		const options = {
		  method: 'POST',
		  url: 'https://toolxox.com/seo/find-tiktok-account-analyze.php',
		  headers: {
			"content-type": 'application/x-www-form-urlencoded',
			"user-agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
		  },
		  formData: {
			url: user          
		  }
		}
		request(options, async function(error, response, body) {
		  const $ = cheerio.load(body)
		  if(!$('#profile > tbody > tr > td:nth-child(1)').text().replace(/\D/g, '')) return resolve({status: false, message: 'user not found'})
		  const {data} = await axios.get(`https://urlebird.com/user/${user}/`)
		  const $$ = cheerio.load(data)
		  const result = {
			status: true,
			username: $$('body').find('div.col-md-auto.text-center.text-md-left.pl-0 > h1').text(),
			nickname: $$('body').find('div.col-md-auto.text-center.text-md-left.pl-0 > div > h5').text(),
			ppurl: $$('body').find('div.col-md-auto.justify-content-center.text-center > img').attr('src'),
			followers: $('#profile > tbody > tr > td:nth-child(1)').text().replace(/\D/g, ''),
			following: $('#profile > tbody > tr > td:nth-child(2)').text().replace(/\D/g, ''),
			likes: $('#profile > tbody > tr > td:nth-child(3)').text().replace(/\D/g, ''),
			videos: $('#profile > tbody > tr > td:nth-child(4)').text().replace(/\D/g, ''),
		  }
		  resolve(result)
		})
	  })
	}

async function jadwalmplid() {
		return new Promise((resolve, reject) => {
			axios.get('https://id-mpl.com/schedule').then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const result = []
				week = 1
				data1 = []
				data2 = []
				jam = []
				replay = []
				for (let i = 66; i <= 73; i++) {
					$(`#mc-${i} > div > div > div`).each(function() {
						tanggal = $(this).find('div.ticket-date.mb10.mt20').text()
						$(this).find('div > span.teams-wrap > div > div.match-team1.text-center').each(function(a, b) {
							data1.push({
								a: $(b).find('div > div > b').text(),
								score: $(b).find('div.font-title').text().trim()
							})
							result.push({
								tanggal: tanggal,
								week: week,
								jam: '',
								match: '',
								score: '',
								replay: ''
							})
						})
						$(this).find('div > span.teams-wrap > div > div.match-team2.text-center').each(function(a, b) {
							data2.push({
								a: $(b).find('div > div > b').text(),
								score: $(b).find('div.font-title').text().trim()
							})
						})
						$(this).find('div > span.teams-wrap > div').each(function(a, b) {
							jam.push($(b).find('div.match-score.center > div > b').text())
							replay.push($(b).find('div.match-vs.match-link.replay > a').attr('href'))
						})
					})
					for (let i = 0; i < data1.length; i++) {
						result[i].match = `${data1[i].a} Vs ${data2[i].a}`
						result[i].jam = jam[i],
							result[i].replay = replay[i] ? replay[i] : 'Coming Soon'
						result[i].score = data1[i].score ? `${data1[i].score} : ${data2[i].score}` : 'Coming Soon'
					}
					week += 1
				}
				resolve(result)
			})
		})
	}

async function attp(text) {
		return new Promise(async(resolve, reject) => {
			const getid = await axios.get('https://id.bloggif.com/text')
			const id = cheerio.load(getid.data)('#content > form').attr('action')
			const options = {
				  method: "POST",
				  url: `https://id.bloggif.com${id}`,
				  headers: {
				  "content-type": 'application/x-www-form-urlencoded',
				  "user-agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
				  },
				  formData: {
				  target: 1,
				  text: text,
				  glitter_id: Math.floor(Math.random() * 2821),
				  font_id: 'lucida_sans_demibold_roman',
				  size: 100,
				  bg_color: 'FFFFFF',
				  transparent: 1,
				  border_color: 000000,
				  border_width: 2,
				  shade_color: 000000,
				  shade_width: 1,
				  angle: 0,
				  text_align: 'center'
				  },
			  };
			  request(options, async function(error, response, body) {
				const $ = cheerio.load(body)
				const url = $('#content > div:nth-child(10) > a').attr('href')
				resolve(url != '' ? {status: true, text: text, url: 'https://id.bloggif.com' + url} : {status: false})
			  })
		  })
	  }

async function ttp(text) {
		return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: `https://www.picturetopeople.org/p2p/text_effects_generator.p2p/transparent_text_effect`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "Cookie": "_ga=GA1.2.1667267761.1655982457; _gid=GA1.2.77586860.1655982457; __gads=ID=c5a896288a559a38-224105aab0d30085:T=1655982456:RT=1655982456:S=ALNI_MbtHcmgQmVUZI-a2agP40JXqeRnyQ; __gpi=UID=000006149da5cba6:T=1655982456:RT=1655982456:S=ALNI_MY1RmQtva14GH-aAPr7-7vWpxWtmg; _gat_gtag_UA_6584688_1=1"
                },
                formData: {
                    'TextToRender': text,
                    'FontSize': '100',
                    'Margin': '30',
                    'LayoutStyle': '0',
                    'TextRotation': '0',
                    'TextColor': 'ffffff',
                    'TextTransparency': '0',
                    'OutlineThickness': '3',
                    'OutlineColor': '000000',
                    'FontName': 'Lekton',
                    'ResultType': 'view'
                }
            };
            request(options, async function(error, response, body) {
                if (error) return resolve({status: false, message: error})
                const $ = cheerio.load(body)
                const result = 'https://www.picturetopeople.org' + $('#idResultFile').attr('value')
                resolve({ status: true, author: "expar animej", result: result })
            });
        })
}

async function downvideo(url) {
	const gettoken = await axios.get("https://downvideo.quora-wiki.com/");
    const $$ = cheerio.load(gettoken.data);
    const token = $$("#token").attr("value");
    const {
        data
    } = await axios.request(
        "https://downvideo.quora-wiki.com/system/action.php", {
            method: "post",
            data: new URLSearchParams(
                Object.entries({
                    url: url,
                    token: token,
                })
            ),
            headers: {
                cookie: "fpestid=YT6abn7OdTpNYkeS7164xlFIg6RZEhfPvEtZnVWfk0kDip1a8iTAnO51q7VzTGLl89oycQ; __gads=ID=823e2024511cfbf1-221294301ad30014:T=1651936582:RT=1651936582:S=ALNI_Mb2xUbOd3tTkcYykDeYbYsj3ejTKQ; PHPSESSID=446tiepgldu14thd36q7ekpi22",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
            },
        }
    );
    return data.medias == "" ? {
        status: false,
        ...data
    } : {
        status: true,
        ...data
    };
};

  async function emoji(emoji) {
		return new Promise((resolve, reject) => {
			axios
				.get(`https://emojipedia.org/search/?q=${encodeUrl(emoji)}`)
				.then(({
					data
				}) => {
					const $ = cheerio.load(data);
					resolve({
						creator: "Saipul Anuar",
						nama: $("body > div.container > div.content > article > h1").text(),
						result: {
							apple: $("body")
								.find(
									"li:nth-child(1) > div.vendor-container.vendor-rollout-target > div.vendor-image > img"
								)
								.attr("src"),
							google: $("body")
								.find(
									"li:nth-child(2) > div.vendor-container.vendor-rollout-target > div.vendor-image > img"
								)
								.attr("src"),
							samsung: $("body")
								.find(
									"li:nth-child(3) > div.vendor-container.vendor-rollout-target > div.vendor-image > img"
								)
								.attr("src"),
							microsoft: $("body")
								.find(
									"li:nth-child(4) > div.vendor-container.vendor-rollout-target > div.vendor-image > img"
								)
								.attr("src"),
							whatsapp: $("body")
								.find(
									"li:nth-child(5) > div.vendor-container.vendor-rollout-target > div.vendor-image > img"
								)
								.attr("src"),
							twitter: $("body")
								.find(
									"li:nth-child(6) > div.vendor-container.vendor-rollout-target > div.vendor-image > img"
								)
								.attr("src"),
							facebook: $("body")
								.find(
									"li:nth-child(7) > div.vendor-container.vendor-rollout-target > div.vendor-image > img"
								)
								.attr("src"),
							skype: $("body")
								.find(
									"li:nth-child(8) > div.vendor-container.vendor-rollout-target > div.vendor-image > img"
								)
								.attr("src"),
							joypixels: $("body")
								.find(
									"li:nth-child(9) > div.vendor-container.vendor-rollout-target > div.vendor-image > img"
								)
								.attr("src"),
							openemoji: $("body")
								.find(
									"li:nth-child(10) > div.vendor-container.vendor-rollout-target > div.vendor-image > img"
								)
								.attr("src"),
							emojidex: $("body")
								.find(
									"li:nth-child(11) > div.vendor-container.vendor-rollout-target > div.vendor-image > img"
								)
								.attr("src"),
							messenger: $("body")
								.find(
									"li:nth-child(12) > div.vendor-container.vendor-rollout-target > div.vendor-image > img"
								)
								.attr("src"),
							lg: $("body")
								.find(
									"li:nth-child(13) > div.vendor-container.vendor-rollout-target > div.vendor-image > img"
								)
								.attr("src"),
							htc: $("body")
								.find(
									"li:nth-child(14) > div.vendor-container.vendor-rollout-target > div.vendor-image > img"
								)
								.attr("src"),
							mozilla: $("body")
								.find(
									"li:nth-child(15) > div.vendor-container.vendor-rollout-target > div.vendor-image > img"
								)
								.attr("src"),
							softbank: $("body")
								.find(
									"li:nth-child(16) > div.vendor-container.vendor-rollout-target > div.vendor-image > img"
								)
								.attr("src"),
							docomo: $("body")
								.find(
									"li:nth-child(17) > div.vendor-container.vendor-rollout-target > div.vendor-image > img"
								)
								.attr("src"),
						},
					});
				});
		});
	};

  async function emojimix(emoji1, emoji2) {
		return new Promise(async (resolve, reject) => {
			const query = `${encodeURIComponent(emoji1)}${emoji2 != undefined ? '_' + encodeURIComponent(emoji2) : ''}`
			await fetch('https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=' + query)
			  .then((res) => res.json())
			  .then((json) => {
				if(json.error) return resolve(json.error)
				if (json.results.length === 0) return resolve(undefined)
				resolve(json)
			  })
			  .catch((err) => reject(err))
		  })
		}

  async function randomtt(user) {
		return new Promise(async(resolve, reject) => {
			const getplink = await axios.get(await encodeUrl(`https://urlebird.com/search/?q=${user}`))
			const plink = cheerio.load(getplink.data)('body > div.main').find('div.info.text-truncate > a').attr('href')
			if(!plink) return resolve({status: false, message: 'User not found!'})
			const vidlink = await axios.get(await encodeUrl(plink))
			const $ = cheerio.load(vidlink.data)
			const array = []
			$('#thumbs > div > a').each(function(){
			  array.push($(this).attr('href'))
			})
			const {data} = await axios.get(await encodeUrl(await tool.randomobj(array)))
			const $$ = cheerio.load(data)
			const soundl = $$('body').find('div.music > a').attr('href')
			if(soundl) sound = await axios.get(await encodeUrl(soundl))
			else sound = false
			const $$$ = cheerio.load(sound.data)
			
			resolve({
			  status: true,
			  user: {
				username: $('body').find('div.col-md-auto.text-center.text-md-left.pl-0 > h1').text(),
				fullname: $('body').find('div.col-md-auto.text-center.text-md-left.pl-0 > div > h5').text(),
				bio: $('body > div.main').find('div.col-md-auto.text-center.text-md-left.pl-0 > div > p').text(),
				follower: $('body > div.main').find('div.col-7.col-md-auto.text-truncate').text().split('🦄 ')[1],
				profilepic: $('body > div.main').find('div.col-md-auto.justify-content-center.text-center > img').attr('src')
			  },
			  video: {
				caption: $$('body > div.main > div > div > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(4) > a').text(),
				plays: $$('body > div.main > div > div > div:nth-child(1) > div:nth-child(1) > div > div.info > span:nth-child(1)').text(),
				likes: $$('body > div.main > div > div > div:nth-child(1) > div:nth-child(1) > div > div.info > span:nth-child(2)').text(),
				comments: $$('body > div.main > div > div > div:nth-child(1) > div:nth-child(1) > div > div.info > span:nth-child(3)').text(),
				share: $$('body > div.main > div > div > div:nth-child(1) > div:nth-child(1) > div > div.info > span:nth-child(4)').text(),
				ago: $$('body').find('div.col-auto.text-left.pl-2 > h6').text(),
				url: $$('body').find('div.video_html5 > video').attr('src')
			  },
			  sound: soundl ? {
				title: $$$('body > div.main').find('h3:nth-child(3)').text(),
				thumbnail: $$$('body').find('div.col-md-offset-4.col-md-2.mt-md-0.text-md-right > img').attr('src'),
				url: $$$('body').find('audio > source').attr('src')
			  } : null
			})
		  })
		}

module.exports = { musicaldown, tiktokstalk, jadwalmplid, attp, ttp, downvideo, emoji, emojimix, randomtt }