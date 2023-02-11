  __path = process.cwd()
const favicon = require('serve-favicon');
const express = require('express');
const router = express.Router();
const request = require('request')
const axios = require("axios");
const { cekKey } = require('../database/db'); 
const fs = require('fs');
const fetch = require('node-fetch');
const mintake = require("mintake");
const cheerio = require('cheerio');
const primbon = require('primbon-saipul')
const translate = require('@saipulanuar/google-translate-api');
const saipulanuar = require("@saipulanuar/open-apis");
var TinyUrl = require('tinyurl');
const nodemailer = require("nodemailer");
const wikipediajs = require('wikipediajs')
const creator = "Sanzy"
const hdiiofficial = require('hdiiofficial')

// FILE SCRAPER
var scp1 = require('../lib/api/scraperr');
var KingOfBear = require("../lib/listapi");
var { fetchJson, runtime, getBuffer } = require('../lib/myfunc');

const { TTScraper } = require("tiktok-scraper-ts");
const TikTokScraper = new TTScraper();
var zrapi = require("zrapi");

var { 
  stalkff,
  igstalk
} = require("./../lib/api/stalker");

var { 
  topupFreeFiree,
} = require("./../lib/api/topup");

var { 
  ngazap
} = require("./../lib/api/virtex/ngazap");

var { 
  vir
} = require("./../lib/api/virtex/vir");

var { 
  vir2
} = require("./../lib/api/virtex/virtex");

var { 
  vir3
} = require("./../lib/api/virtex/virus");

var { 
  philips
} = require("./../lib/api/virtex/philips");

var { 
  mlstalk
} = require("./../lib/api/mlstalk");

var { 
  musicaldown,
  tiktokstalk,
  jadwalmplid,
  downvideo,
  emoji,
  emojimix,
  randomtt
} = require("./../lib/api/musicaldown");

var { 
    KbbiInfo
  } = require("./../lib/api/kbbi");

var { 
    facebook
  } = require("./../lib/api/facebook");

var { 
  Joox, 
  FB,
  Tiktok,
  mediafiredownloader
} = require("./../lib/api/downloader");

var {
  pinterest
} = require("./../lib/api/pinterest");

var {
  ytDonlodMp3,
  ytDonlodMp4,
  ytPlayMp3,
  ytPlayMp4,
  ytSearch
} = require("./../lib/api/yt");

var {
  telesticker,
  stickersearch,
  sholat,
  styletext,
  linkwa
} = require("./../lib/api/scraper");

var {
  tiktokdl,
  tiktokdlv3,
  tiktokdlv4
} = require("./../lib/api/tiktokdl");

var {
  Cuaca, 
  Lirik
} = require('./../lib/api/information');

var tebakGambar = require('./../lib/api/tebakGambar');

var {
  Base, 
  WPUser
} = require('./../lib/api/tools');
const { query } = require('express');

//* Pesan Error 404 *//
loghandler = {
    notparam: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter apikey'
    },
    noturl: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter url'
    },
    notquery: {
        status: false,
        creator: `${creator}`,
        code: 406,
        result: 'masukkan parameter query'
        },
    notkata: {
        status: false,
        creator: `${creator}`,
        code: 406,
        result: 'masukan parameter kata'
    },
    nottext: {
        status: false,
        creator: `${creator}`,
        code: 406,
        result: 'masukan parameter text'
    },
    nottext2: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter text2'
    },
    notnabi: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter nabi'
    },
    nottext3: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter text3'
    },
    nottheme: {
        status: false,
        creator: `${creator}`,
        code: 406,
        result: 'masukan parameter theme'
    },
    notusername: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter username'
    },
    notid: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter id'
    },
    notvalue: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter value'
    },
    invalidKey: {
        status: false,
        creator: `${creator}`,
        code: 404,
        result: 'APIKEY SALAH, pastikan anda pernah berlangganan di https://saipulanuar.herokuapp.com'
    },
    invalidlink: {
        status: false,
        creator: `${creator}`,
        result: 'error, mungkin link anda tidak valid.'
    },
    invalidkata: {
        status: false,
        creator: `${creator}`,
        result: 'error, mungkin kata tidak ada dalam api.'
    },
    error: {
        status: false,
        creator: `${creator}`,
        result: '500 - internal server error'
    }
}

// Cek Apikey

router.get('/cekKey', async (req, res, next) => {
    var Apikey = req.query.apikey;
  let pemilik = '<%= username %>'
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        creator: `${creator}`,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.status(404).send({
        status: 404,
        result: {
              apikey: `${Apikey}`,
              status:`apikey ${Apikey} not found, please register first!`
        }
    });
        res.status(200).send({
            status: 200, 
            result: {
              apikey: `${Apikey}`,
              status: 'Active'
            }
        })
  })

  // FITUR DOWNLOAD
  router.get('/download/fb', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var url = req.query.url
    const kimak = `https://facebook-reel-and-video-downloader.p.rapidapi.com/app/main.php?url=${url}`;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (url === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '7217cae559msh07020e10a271501p16760bjsn382d94ffbbbc',
          'X-RapidAPI-Host': 'facebook-reel-and-video-downloader.p.rapidapi.com'
        }
      };
      fetch(kimak, options).then(data => {
        var result = data
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/downloader/instagram', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var url = req.query.url
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (url === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    saipulanuar
    .insta_post(url).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

router.get('/downloader/allvideo', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var url = req.query.url
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (url === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    downvideo(url).then(data => {
        var result = data.medias
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/download/mediafire', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var url = req.query.url
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (url === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    mediafiredownloader(url).then(data => {
        var result = data
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/download/happymod', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var query = req.query.query
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (query === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter query & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    scp1.happymod(query).then(data => {
        var result = data
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

router.get('/download/cariresep', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var query = req.query.query
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (query === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter query & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    scp1.cariresep(query).then(data => {
        var result = data
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

router.get('/download/bacaresep', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var url = req.query.url
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (url === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    scp1.bacaresep(url).then(data => {
        var result = data
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/pinterest', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var query = req.query.query
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (query === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter query & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    pinterest(query).then(result => {
        const url_download = result[Math.floor(Math.random() * result.length)];
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: {
                url: url_download
            }
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/search/pinterest', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var query = req.query.query
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (query === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter query & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.pinterest(query).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/download/soundcloud', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var url = req.query.url
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (url === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.soundcloud(url).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/download/tiktokview', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var url = req.query.url
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (url === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    TikTokScraper.video(url).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/download/tiktok', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var url = req.query.url
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (url === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.ttdl(url).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

router.get('/download/tiktok2', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var url = req.query.url
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (url === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    musicaldown(url).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

router.get('/download/tiktok3', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var url = req.query.url
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (url === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    tiktokdl(url).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

router.get('/download/tiktok4', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var url = req.query.url
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (url === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    tiktokdlv4(url).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/download/stickersearch', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    stickersearch(text).then(data => {
        const url_download = data.sticker_url[Math.floor(Math.random() * data.sticker_url.length)];
        const title = result.title
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: {
                title: title,
                url: url_download
            }
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/search/wikimedia', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var query = req.query.query
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (query === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter query & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.wikimedia(query).then(data => {
        const wiki = data[Math.floor(Math.random() * data.length)];
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: wiki
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/download/telesticker', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var url = req.query.url
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (url === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    telesticker(url).then(data => {
        const url_download = data[Math.floor(Math.random() * data.length)];
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: url_download
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

   router.get('/download/xnxx', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var query = req.query.query
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (query === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter query & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetch(encodeURI(`http://kocakz.herokuapp.com/api/media/xnxx/search?query=${query}`))
    .then(response => response.json())
        .then(hasil => {
            var result = hasil.result;
            const xnxx = result[Math.floor(Math.random() * result.length)];
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: xnxx
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })
  
  router.get('/download/xvideo', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var query = req.query.query
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (query === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter query & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetch(encodeURI(`http://kocakz.herokuapp.com/api/media/xvideo/search?query=${query}`))
    .then(response => response.json())
        .then(hasil => {
            var result = hasil.result;
            const xvideo = result[Math.floor(Math.random() * result.length)];
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: xvideo
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/download/ytmp4', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var url = req.query.url
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (url === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    ytDonlodMp4(url).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/download/ytmp3', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var url = req.query.url
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (url === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    ytDonlodMp3(url).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/yt/playmp3', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var query = req.query.query
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (query === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter query & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    ytPlayMp3(query).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/yt/playmp4', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var query = req.query.query
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (query === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter query & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    ytPlayMp4(query).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/yt/search', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var query = req.query.query
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (query === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter query & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    ytSearch(query).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    })
  })

  // FITUR STALKER

  router.get('/stalk/ig', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var username = req.query.username
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (username === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter username & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    igstalk(username).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/stalk/tiktok', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var username = req.query.username
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (username === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter username & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://zenzapis.xyz/stalker/tiktok?username=${username}&apikey=sonelstore`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data.result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/download/tiktokstalk', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var username = req.query.username
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (username === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter username & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    tiktokstalk(username).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/stalk/npm', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var username = req.query.username
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (username === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter username & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://registry.npmjs.org/${username}`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/stalk/epep', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    stalkff(id).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/topup/epep1', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    var jumlah = '5'
    var nomor = req.query.nomor
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || nomor === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id, nomor & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    topupFreeFiree(id, jumlah, nomor).then(data => { 
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: {
              Id: id,
              Jumlah: `${jumlah} DM`,
              Nomor: nomor,
              Harga: 'Rp 1.261',
              deepLink: data.deepLink,
              checkoutUrl: data.checkoutUrl,
              timerCount: data.timerCount,
              MetodePembayaran: data.paymentMethod,
              Qris: data.qrCode
            }
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/topup/epep2', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    var jumlah = '12'
    var nomor = req.query.nomor
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || nomor === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id, nomor & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    topupFreeFiree(id, jumlah, nomor).then(data => { 
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: {
              Id: id,
              Jumlah: `${jumlah} DM`,
              Nomor: nomor,
              Harga: 'Rp 2.523',
              deepLink: data.deepLink,
              checkoutUrl: data.checkoutUrl,
              timerCount: data.timerCount,
              MetodePembayaran: data.paymentMethod,
              Qris: data.qrCode
            }
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/topup/epep3', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    var jumlah = '70'
    var nomor = req.query.nomor
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || nomor === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id, nomor & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    topupFreeFiree(id, jumlah, nomor).then(data => { 
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: {
              Id: id,
              Jumlah: `${jumlah} DM`,
              Nomor: nomor,
              Harga: 'Rp 12.614',
              deepLink: data.deepLink,
              checkoutUrl: data.checkoutUrl,
              timerCount: data.timerCount,
              MetodePembayaran: data.paymentMethod,
              Qris: data.qrCode
            }
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/topup/epep4', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    var jumlah = '140'
    var nomor = req.query.nomor
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || nomor === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id, nomor & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    topupFreeFiree(id, jumlah, nomor).then(data => { 
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: {
              Id: id,
              Jumlah: `${jumlah} DM`,
              Nomor: nomor,
              Harga: 'Rp 25.227',
              deepLink: data.deepLink,
              checkoutUrl: data.checkoutUrl,
              timerCount: data.timerCount,
              MetodePembayaran: data.paymentMethod,
              Qris: data.qrCode
            }
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/topup/epep5', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    var jumlah = '355'
    var nomor = req.query.nomor
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || nomor === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id, nomor & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    topupFreeFiree(id, jumlah, nomor).then(data => { 
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: {
              Id: id,
              Jumlah: `${jumlah} DM`,
              Nomor: nomor,
              Harga: 'Rp 63.068',
              deepLink: data.deepLink,
              checkoutUrl: data.checkoutUrl,
              timerCount: data.timerCount,
              MetodePembayaran: data.paymentMethod,
              Qris: data.qrCode
            }
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/topup/epep6', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    var jumlah = '720'
    var nomor = req.query.nomor
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || nomor === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id, nomor & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    topupFreeFiree(id, jumlah, nomor).then(data => { 
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: {
              Id: id,
              Jumlah: `${jumlah} DM`,
              Nomor: nomor,
              Harga: 'Rp 126.136',
              deepLink: data.deepLink,
              checkoutUrl: data.checkoutUrl,
              timerCount: data.timerCount,
              MetodePembayaran: data.paymentMethod,
              Qris: data.qrCode
            }
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/stalk/ml', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    var server = req.query.server
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || server === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id, server & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    mlstalk(id, server).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: {
              Id: id,
              Server: server,
              Username: data.userName
        }
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/stalk/nickhago', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://zenzapis.xyz/stalker/nickhago?apikey=sonelstore&query=${id}`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data.result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/stalker/nickccfun', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://zenzapis.xyz/stalker/nickcocofun?apikey=sonelstore&query=${id}`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data.result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/stalker/nickbgl', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://zenzapis.xyz/stalker/nickbigolive?apikey=sonelstore&query=${id}`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data.result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/stalker/nicknmtv', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://zenzapis.xyz/stalker/nicknimotv?apikey=sonelstore&query=${id}`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data.result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/stalker/nickpubg', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://zenzapis.xyz/stalker/nickpubg?apikey=sonelstore&query=${id}`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data.result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/stalker/nickmla', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    var zoneid = req.query.zoneid
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || zoneid === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id, zoneid & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://zenzapis.xyz/stalker/nickmladventure?apikey=sonelstore&query=${id}&query2=${zoneid}`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data.result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/stalker/nicklokapala', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://zenzapis.xyz/stalker/nicklokapala?apikey=sonelstore&query=${id}`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data.result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/stalker/nickzepeto', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://zenzapis.xyz/stalker/nickzepeto?apikey=sonelstore&query=${id}`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data.result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/stalker/nicksausage', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://zenzapis.xyz/stalker/nicksausage?apikey=sonelstore&query=${id}`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data.result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/stalker/nickpb', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://zenzapis.xyz/stalker/nickpb?apikey=sonelstore&query=${id}`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data.result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/stalk/higgs', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    var signature = '798e4a62e37692f3d3696c4020c7b0b0'
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://v1.apigames.id/merchant/M221008ISFN1832UF/cek-username/higgs?user_id=${id}&signature=${signature}`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/stalk/aov', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'eba684a286msh8f9c9a40acf9d21p110bcfjsn9f04d418e8da',
            'X-RapidAPI-Host': 'check-username-games.p.rapidapi.com'
        }
    };
    fetchJson(`https://check-username-games.p.rapidapi.com/check-username/aov?userId=${id}`, options).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: {
                NamaGame: 'AOV',
		        Id: `${id}`,
		        Username: `${data}`
            }
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/stalk/codm', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'eba684a286msh8f9c9a40acf9d21p110bcfjsn9f04d418e8da',
            'X-RapidAPI-Host': 'check-username-games.p.rapidapi.com'
        }
    };
    fetchJson(`https://check-username-games.p.rapidapi.com/check-username/codm?userId=${id}`, options).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: {
                NamaGame: 'CODM',
		        Id: `${id}`,
		        Username: `${data}`
            }
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/stalk/speed-drifters', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'eba684a286msh8f9c9a40acf9d21p110bcfjsn9f04d418e8da',
            'X-RapidAPI-Host': 'check-username-games.p.rapidapi.com'
        }
    };
    fetchJson(`https://check-username-games.p.rapidapi.com/check-username/speed-drifters?userId=${id}`, options).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: {
                NamaGame: 'Speed Drifters',
		        Id: `${id}`,
		        Username: `${data}`
            }
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/stalk/life-after', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var id = req.query.id
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (id === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'eba684a286msh8f9c9a40acf9d21p110bcfjsn9f04d418e8da',
            'X-RapidAPI-Host': 'check-username-games.p.rapidapi.com'
        }
    };
    fetchJson(`https://check-username-games.p.rapidapi.com/check-username/life-after?userId=${id}&server=SandCastle`, options).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: {
                NamaGame: 'Life After',
		        Id: `${id}`,
		        Username: `${data}`
            }
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  // FITUR MUSIK API
  router.get('/music/joox', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var query = req.query.query
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (query === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter query & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    Joox(query).then(data => {
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/music/liriklagu', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var query = req.query.query
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (query === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter query & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    Lirik(query).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data.data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  // FITUR ISLAMIC
  router.get('/muslim/hadits', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var kitab = req.query.kitab
    var nomor = req.query.nomor
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (kitab === undefined || nomor === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter kitab, nomor & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://hadits-api-zhirrr.vercel.app/books/${kitab}/${nomor}`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data.data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/muslim/quran', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var surah = req.query.surah
    var ayat = req.query.ayat
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (surah === undefined || ayat === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter surah, ayat & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://alquran-apiii.vercel.app/surah/${surah}/${ayat}`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data.data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/muslim/tafsirsurah', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var surah = req.query.surah
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (surah === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter surah & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.tafsirsurah(surah).then(data => {
        const tafsirsurah = data[Math.floor(Math.random() * data.length)];
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: tafsirsurah
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/muslim/tahlil', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
var tahlil = JSON.parse(
              fs.readFileSync(__path + '/lib/data/tahlil.json')
          )
      res
            .status(200)
            .json({
                code: 200,
                success: true,
            creator: `${creator}`,
            result: tahlil
            })
  })

  router.get('/muslim/wirid', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
var wirid = JSON.parse(
              fs.readFileSync(__path + '/lib/data/tahlil.json')
          )
      res
            .status(200)
            .json({
                code: 200,
                success: true,
            creator: `${creator}`,
            result: wirid
            })
  })

  router.get('/muslim/asmaulhusna', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        var asmaulhusna = JSON.parse(
              fs.readFileSync(__path + '/lib/data/asmaul_husna.json')
          )
      res
            .status(200)
            .json({
                code: 200,
                success: true,
            creator: `${creator}`,
            result: asmaulhusna
            })
  })

  router.get('/muslim/ayatkursi', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    var ayatkursi = JSON.parse(
              fs.readFileSync(__path + '/lib/data/ayatkursi.json')
          )
      res
            .status(200)
            .json({
                code: 200,
                success: true,
            creator: `${creator}`,
            result: ayatkursi.data
            })
  })

  router.get('/muslim/kisahnabi', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var nabi = req.query.nabi;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (nabi === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter nabi & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var kisahNabi = JSON.parse(
              fs.readFileSync(__path + `/lib/data/kisahNabi/${nabi}.json`)
          )
      res
            .status(200)
            .json({
                code: 200,
                success: true,
            creator: `${creator}`,
            result: kisahNabi
            })
  })

  router.get('/muslim/niatshalat', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
var niatshalat = JSON.parse(
              fs.readFileSync(__path + '/lib/data/niatsholat.json')
          )
      res
            .status(200)
            .json({
                code: 200,
                success: true,
            creator: `${creator}`,
            result: niatshalat
            })
  })

  router.get('/muslim/doaharian', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var doaharian = JSON.parse(
              fs.readFileSync(__path + '/lib/data/doaharian.json')
          )
      res
            .status(200)
            .json({
                code: 200,
                success: true,
            creator: `${creator}`,
            result: doaharian
            })
  })

  router.get('/muslim/bacaanshalat', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var bacaanshalat = JSON.parse(
              fs.readFileSync(__path + '/lib/data/niatsholat.json')
          )
      res
            .status(200)
            .json({
                code: 200,
                success: true,
            creator: `${creator}`,
            result: bacaanshalat
            })
  })

  router.get('/muslim/jadwalshalat', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var kota = req.query.kota;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (kota === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter kota & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    sholat(kota).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/random/quotes/muslim', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://docs-api-zahirrr.herokuapp.com/api/quote?type=agamis`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: {
                quotes: data.text_id
            }
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  // RANDOM IMAGE API
  router.get('/random/couple', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        var couple = JSON.parse(
              fs.readFileSync(__path + '/lib/data/kopel.json')
          )
    var ppcp = couple[Math.floor(Math.random() * couple.length)]
      res
            .status(200)
            .json({
                code: 200,
                success: true,
            creator: `${creator}`,
            result: ppcp
            })
  })

  router.get('/search/image', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var query = req.query.query;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (query === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter query & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var gis = require('g-i-s')
gis(query, logResults)

async function logResults(error, results) {
  if (error) {
	res.json(loghandler.notfound)
  }
  else {
	if (!results[0]) return res.json(loghandler.notfound)
	const ppcp = results[Math.floor(Math.random() * results.length)];
    var kimak = ppcp.url
    const data = await getBuffer(kimak)
         await fs.writeFileSync(__path +'/tmp/gimage.jpeg', data)
        res.sendFile(__path+'/tmp/gimage.jpeg')
        }
    }
})

router.get('/maker/dadu', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    random = Math.floor(Math.random() * 6) + 1
      hasil = 'https://www.random.org/dice/dice' + random + '.png'
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/dadu.png', data)
        res.sendFile(__path+'/tmp/dadu.png')
  })

  router.get('/wallpaper/teknologi', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var result = await fetchJson(`https://privatasw.herokuapp.com/cwelumanasu/teknologi`)
        bear = result.result
        const bear2 = await getBuffer(bear)
         await fs.writeFileSync(__path +'/tmp/teknologin.jpeg', bear2)
        res.sendFile(__path+'/tmp/teknologin.jpeg')
  })

  router.get('/wallpaper/programming', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var result = await fetchJson(`https://privatasw.herokuapp.com/lariadahemkel/programming`)
        bear = result.result
        const bear2 = await getBuffer(bear)
         await fs.writeFileSync(__path +'/tmp/programming.jpeg', bear2)
        res.sendFile(__path+'/tmp/programming.jpeg')
  })

  router.get('/wallpaper/cyberspace', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var result = await fetchJson(`https://privatasw.herokuapp.com/Lujomloajg/cybertod`)
        bear = result.result
        const bear2 = await getBuffer(bear)
         await fs.writeFileSync(__path +'/tmp/cyberspace.jpeg', bear2)
        res.sendFile(__path+'/tmp/cyberspace.jpeg')
  })

  router.get('/wallpaper/muslim', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var result = await fetchJson(`https://privatasw.herokuapp.com/tobatboy/islam`)
        bear = result.result
        const bear2 = await getBuffer(bear)
         await fs.writeFileSync(__path +'/tmp/muslim.jpeg', bear2)
        res.sendFile(__path+'/tmp/muslim.jpeg')
  })

  router.get('/wallpaper/pegunungan', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var result = await fetchJson(`https://privatasw.herokuapp.com/montain/gunung`)
        bear = result.result
        const bear2 = await getBuffer(bear)
         await fs.writeFileSync(__path +'/tmp/pegunungan.jpeg', bear2)
        res.sendFile(__path+'/tmp/pegunungan.jpeg')
  })

  // FITUR TIME LINE API
  router.get('/asupan', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://raw.githubusercontent.com/saipulanuar/Api-Github/main/random/random-tiktok.json`)
    .then(async pepek => {    
    var result = pepek[Math.floor(Math.random() * pepek.length)];
        var buffer = result.url;
      musicaldown(`${buffer}`).then(async kimak => {
      kontol2= kimak.video.link2
         data = await fetch(kontol2).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/random-tiktok.mp4', data)
        res.sendFile(__path+'/tmp/random-tiktok.mp4')
         })
    })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
})

  router.get('/asupan2', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://raw.githubusercontent.com/saipulanuar/Api-Github/main/random/asupan-ppkk.json`).then(data => {
        var ppcp = data[Math.floor(Math.random() * data.length)]
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: {
                url: `${ppcp.asupan}`
            }
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/asupan/santuy', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://raw.githubusercontent.com/saipulanuar/Api-Github/main/random/asupan-santuy.json`).then(data => {
        var ppcp = data[Math.floor(Math.random() * data.length)]
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: ppcp
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/asupan/hijaber', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://raw.githubusercontent.com/saipulanuar/Api-Github/main/random/asupan-hijaber.json`).then(data => {
        var ppcp = data[Math.floor(Math.random() * data.length)]
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: ppcp
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/asupan/ukhty', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://raw.githubusercontent.com/saipulanuar/Api-Github/main/random/asupan-ukhti.json`).then(data => {
        var ppcp = data[Math.floor(Math.random() * data.length)]
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: ppcp
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/asupan/bocil', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://raw.githubusercontent.com/saipulanuar/Api-Github/main/random/asupan-bocil.json`).then(data => {
        var ppcp = data[Math.floor(Math.random() * data.length)]
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: ppcp
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/asupan/gheayubi', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://raw.githubusercontent.com/saipulanuar/Api-Github/main/random/gheayubi.json`)
    .then(async pepek => {    
    var result = pepek[Math.floor(Math.random() * pepek.length)];
        var buffer = result.url;
      musicaldown(`${buffer}`).then(async kimak => {
      kontol2= kimak.video.link2
         data = await fetch(kontol2).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/gheayubi.mp4', data)
        res.sendFile(__path+'/tmp/gheayubi.mp4')
         })
    })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
})

  router.get('/asupan/rikagusriani', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://raw.githubusercontent.com/saipulanuar/Api-Github/main/random/rikagusriani.json`)
    .then(async pepek => {    
    var result = pepek[Math.floor(Math.random() * pepek.length)];
        var buffer = result.url;
      musicaldown(`${buffer}`).then(async kimak => {
      kontol2= kimak.video.link2
         data = await fetch(kontol2).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/rikagusriani.mp4', data)
        res.sendFile(__path+'/tmp/rikagusriani.mp4')
         })
    })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
})

  //FITUR CECAN API
  router.get('/cecan/random', async (req, res, next) => {
        var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var pepek= JSON.parse(
              fs.readFileSync(__path + '/lib/data/cecan/random.json')
          )
    var result = pepek[Math.floor(Math.random() * pepek.length)];
var buffer = result.url;
        await getBuffer(buffer).then(bear => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(bear)
    })
})

router.get('/cecan/hijaber', async (req, res, next) => {
      var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var pepek= JSON.parse(
              fs.readFileSync(__path + '/lib/data/cecan/hijaber.json')
          )
    var result = pepek[Math.floor(Math.random() * pepek.length)];
var buffer = result.url;
        await getBuffer(buffer).then(bear => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(bear)
    })
})

router.get('/cecan/china', async (req, res, next) => {
      var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var pepek= JSON.parse(
              fs.readFileSync(__path + '/lib/data/cecan/china.json')
          )
    var result = pepek[Math.floor(Math.random() * pepek.length)];
var buffer = result.url;
        await getBuffer(buffer).then(bear => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(bear)
    })
})

router.get('/cecan/indonesia', async (req, res, next) => {
      var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var pepek= JSON.parse(
              fs.readFileSync(__path + '/lib/data/cecan/indonesia.json')
          )
    var result = pepek[Math.floor(Math.random() * pepek.length)];
var buffer = result.url;
        await getBuffer(buffer).then(bear => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(bear)
    })
})

router.get('/cecan/japan', async (req, res, next) => {
      var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var pepek= JSON.parse(
              fs.readFileSync(__path + '/lib/data/cecan/japan.json')
          )
    var result = pepek[Math.floor(Math.random() * pepek.length)];
var buffer = result.url;
        await getBuffer(buffer).then(bear => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(bear)
    })
})

router.get('/cecan/korea', async (req, res, next) => {
      var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var pepek= JSON.parse(
              fs.readFileSync(__path + '/lib/data/cecan/korea.json')
          )
    var result = pepek[Math.floor(Math.random() * pepek.length)];
var buffer = result.url;
        await getBuffer(buffer).then(bear => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(bear)
    })
})

router.get('/cecan/malaysia', async (req, res, next) => {
      var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var pepek= JSON.parse(
              fs.readFileSync(__path + '/lib/data/cecan/malaysia.json')
          )
    var result = pepek[Math.floor(Math.random() * pepek.length)];
var buffer = result.url;
        await getBuffer(buffer).then(bear => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(bear)
    })
})

router.get('/cecan/thailand', async (req, res, next) => {
      var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var pepek= JSON.parse(
              fs.readFileSync(__path + '/lib/data/cecan/thailand.json')
          )
    var result = pepek[Math.floor(Math.random() * pepek.length)];
var buffer = result.url;
        await getBuffer(buffer).then(bear => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(bear)
    })
})

router.get('/cecan/vietnam', async (req, res, next) => {
      var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var pepek= JSON.parse(
              fs.readFileSync(__path + '/lib/data/cecan/vietnam.json')
          )
    var result = pepek[Math.floor(Math.random() * pepek.length)];
var buffer = result.url;
        await getBuffer(buffer).then(bear => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(bear)
    })
})

  // FITUR IMAGE MAKER API
  router.get('/textmaker/quoteser', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://textpro.me/firework-sparkle-text-effect-930.html", [text])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/textmaker/quobucin', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://textpro.me/create-neon-light-on-brick-wall-online-1062.html", [text])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/maker/nulis', async (req, res, next) => {
    var Apikey = req.query.apikey;
    const text = req.query.text;
    
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text dan apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var result = await fetchJson(`https://itskhyaa-textmaker.herokuapp.com/api/nulis?text=${text}`)
        bear = result.result
        const bear2 = await getBuffer(bear)
         await fs.writeFileSync(__path +'/tmp/nulis.jpeg', bear2)
        res.sendFile(__path+'/tmp/nulis.jpeg')
  })

  router.get('/maker/nulis2', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text;
    
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text dan apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var data = await fetchJson(`https://salism3api.pythonanywhere.com/write/?text=${text}`)
        bear = data.images
        const bear2 = await fetch(bear).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nulis2.jpeg', bear2)
        res.sendFile(__path+'/tmp/nulis2.jpeg')
  })

  router.get('/textmaker/digital', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text;
    
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text dan apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://textpro.me/create-a-futuristic-technology-neon-light-text-effect-1006.html", [text])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/maker/pubeje', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text1 = req.query.text;
    var text2 = req.query.text2;
    
    if (text1 === undefined || text2 === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text, text2 dan apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.photooxy("https://photooxy.com/battlegrounds/make-wallpaper-battlegrounds-logo-text-146.html", [text1,text2])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/maker/gammer', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://raw.githubusercontent.com/saipulanuar/Api-Github/main/random/wallpaper-gamming.json`)
    .then(async data => {    
    var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/epep.jpeg', data)
        res.sendFile(__path+'/tmp/epep.jpeg')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
})

router.get('/maker/joker', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text;
    
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text, text2 dan apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://textpro.me/create-logo-joker-online-934.html", [text])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  // FITUR EPHOTO 360 MAKER
  router.get('/maker/youtube-silver-button', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text;
    let radio = `jlady2un1`
    
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text dan apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    mintake 
  .ephoto4("https://en.ephoto360.com/create-silver-button-gold-button-social-network-online-450.html", [
    text
    ], radio
  )
  .then((data) => {
    var result = data.image
    var bear = `https://s1.ephoto360.com${result}`
    res.status(200).send({
        status: 200, 
        creator: `${creator}`,
        result: bear
    })
}).catch(error => {
    console.log(error);
    res.status(500).send({
        status: 500,
        message: 'Internal Server Error'
    })
});
})

router.get('/maker/youtube-gold-button', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text;
    let radio = `h093supm4`
    
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text dan apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    mintake 
  .ephoto4("https://en.ephoto360.com/create-silver-button-gold-button-social-network-online-450.html", [
    text
    ], radio
  )
  .then((data) => {
    var result = data.image
    var bear = `https://s1.ephoto360.com${result}`
    res.status(200).send({
        status: 200, 
        creator: `${creator}`,
        result: bear
    })
}).catch(error => {
    console.log(error);
    res.status(500).send({
        status: 500,
        message: 'Internal Server Error'
    })
});
})

router.get('/maker/instagram-gold-button', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text;
    let radio = `fg66107ov`
    
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text dan apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    mintake 
  .ephoto4("https://en.ephoto360.com/create-silver-button-gold-button-social-network-online-450.html", [
    text
    ], radio
  )
  .then((data) => {
    var result = data.image
    var bear = `https://s1.ephoto360.com${result}`
    res.status(200).send({
        status: 200, 
        creator: `${creator}`,
        result: bear
    })
}).catch(error => {
    console.log(error);
    res.status(500).send({
        status: 500,
        message: 'Internal Server Error'
    })
});
})

router.get('/maker/instagram-silver-button', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text;
    let radio = `wv902s1ri`
    
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text dan apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    mintake 
  .ephoto4("https://en.ephoto360.com/create-silver-button-gold-button-social-network-online-450.html", [
    text
    ], radio
  )
  .then((data) => {
    var result = data.image
    var bear = `https://s1.ephoto360.com${result}`
    res.status(200).send({
        status: 200, 
        creator: `${creator}`,
        result: bear
    })
}).catch(error => {
    console.log(error);
    res.status(500).send({
        status: 500,
        message: 'Internal Server Error'
    })
});
})

router.get('/maker/facebook-gold-button', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text;
    let radio = `1ie53a3yj`
    
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text dan apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    mintake 
  .ephoto4("https://en.ephoto360.com/create-silver-button-gold-button-social-network-online-450.html", [
    text
    ], radio
  )
  .then((data) => {
    var result = data.image
    var bear = `https://s1.ephoto360.com${result}`
    res.status(200).send({
        status: 200, 
        creator: `${creator}`,
        result: bear
    })
}).catch(error => {
    console.log(error);
    res.status(500).send({
        status: 500,
        message: 'Internal Server Error'
    })
});
})

router.get('/maker/facebook-silver-button', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text;
    let radio = `xy3n9c2cr`
    
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text dan apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    mintake 
  .ephoto4("https://en.ephoto360.com/create-silver-button-gold-button-social-network-online-450.html", [
    text
    ], radio
  )
  .then((data) => {
    var result = data.image
    var bear = `https://s1.ephoto360.com${result}`
    res.status(200).send({
        status: 200, 
        creator: `${creator}`,
        result: bear
    })
}).catch(error => {
    console.log(error);
    res.status(500).send({
        status: 500,
        message: 'Internal Server Error'
    })
});
})

router.get('/maker/twitter-gold-button', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text;
    let radio = `cs4ble8b9`
    
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text dan apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    mintake 
  .ephoto4("https://en.ephoto360.com/create-silver-button-gold-button-social-network-online-450.html", [
    text
    ], radio
  )
  .then((data) => {
    var result = data.image
    var bear = `https://s1.ephoto360.com${result}`
    res.status(200).send({
        status: 200, 
        creator: `${creator}`,
        result: bear
    })
}).catch(error => {
    console.log(error);
    res.status(500).send({
        status: 500,
        message: 'Internal Server Error'
    })
});
})

router.get('/maker/twitter-silver-button', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text;
    let radio = `gx6w3rh9h`
    
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text dan apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    mintake 
  .ephoto4("https://en.ephoto360.com/create-silver-button-gold-button-social-network-online-450.html", [
    text
    ], radio
  )
  .then((data) => {
    var result = data.image
    var bear = `https://s1.ephoto360.com${result}`
    res.status(200).send({
        status: 200, 
        creator: `${creator}`,
        result: bear
    })
}).catch(error => {
    console.log(error);
    res.status(500).send({
        status: 500,
        message: 'Internal Server Error'
    })
});
})

    // FITUR BANNER
    router.get('/maker/ashe-banner', async (req, res, next) => {
        var Apikey = req.query.apikey;
        var text = req.query.text;
        var text2 = req.query.text2;
        let radio = `f5441267-088d-49e2-ac1f-50671225064a`
        
        if (text === undefined || text2 === undefined || Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter text, text2 dan apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        mintake 
      .ephoto4("https://en.ephoto360.com/create-overwatch-2-banner-for-the-online-youtube-channel-782.html", [
        text, text2
        ], radio
      )
      .then((data) => {
        var result = data.image
        var bear = `https://s1.ephoto360.com${result}`
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: bear
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
    })
    
    router.get('/maker/brigitte-banner', async (req, res, next) => {
        var Apikey = req.query.apikey;
        var text = req.query.text;
        var text2 = req.query.text2;
        let radio = `2e1bb772-e47a-40e7-901c-dcaa3bd3ab8b`
        
        if (text === undefined || text2 === undefined || Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter text, text2 dan apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        mintake 
      .ephoto4("https://en.ephoto360.com/create-overwatch-2-banner-for-the-online-youtube-channel-782.html", [
        text, text2
        ], radio
      )
      .then((data) => {
        var result = data.image
        var bear = `https://s1.ephoto360.com${result}`
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: bear
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
    })

    router.get('/maker/doomfist-banner', async (req, res, next) => {
        var Apikey = req.query.apikey;
        var text = req.query.text;
        var text2 = req.query.text2;
        let radio = `44fd87de-3b47-42ad-b07c-2060a90ab50b`
        
        if (text === undefined || text2 === undefined || Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter text, text2 dan apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        mintake 
      .ephoto4("https://en.ephoto360.com/create-overwatch-2-banner-for-the-online-youtube-channel-782.html", [
        text, text2
        ], radio
      )
      .then((data) => {
        var result = data.image
        var bear = `https://s1.ephoto360.com${result}`
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: bear
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
    })

    router.get('/maker/junker-banner', async (req, res, next) => {
        var Apikey = req.query.apikey;
        var text = req.query.text;
        var text2 = req.query.text2;
        let radio = `0bfdd79f-b5b8-4238-b06e-eb36cdc456f5`
        
        if (text === undefined || text2 === undefined || Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter text, text2 dan apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        mintake 
      .ephoto4("https://en.ephoto360.com/create-overwatch-2-banner-for-the-online-youtube-channel-782.html", [
        text, text2
        ], radio
      )
      .then((data) => {
        var result = data.image
        var bear = `https://s1.ephoto360.com${result}`
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: bear
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
    })

    router.get('/maker/kiriko-banner', async (req, res, next) => {
        var Apikey = req.query.apikey;
        var text = req.query.text;
        var text2 = req.query.text2;
        let radio = `1d66ed5f-c699-4b57-9e17-6184ac720708`
        
        if (text === undefined || text2 === undefined || Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter text, text2 dan apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        mintake 
      .ephoto4("https://en.ephoto360.com/create-overwatch-2-banner-for-the-online-youtube-channel-782.html", [
        text, text2
        ], radio
      )
      .then((data) => {
        var result = data.image
        var bear = `https://s1.ephoto360.com${result}`
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: bear
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
    })

    router.get('/maker/sojourn-banner', async (req, res, next) => {
        var Apikey = req.query.apikey;
        var text = req.query.text;
        var text2 = req.query.text2;
        let radio = `d32e7d71-fd3c-4e7d-9034-8b49e76e1056`
        
        if (text === undefined || text2 === undefined || Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter text, text2 dan apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        mintake 
      .ephoto4("https://en.ephoto360.com/create-overwatch-2-banner-for-the-online-youtube-channel-782.html", [
        text, text2
        ], radio
      )
      .then((data) => {
        var result = data.image
        var bear = `https://s1.ephoto360.com${result}`
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: bear
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
    })

    router.get('/maker/symmetra-banner', async (req, res, next) => {
        var Apikey = req.query.apikey;
        var text = req.query.text;
        var text2 = req.query.text2;
        let radio = `7f9c65dd-d274-4aa4-bd13-82eed868dc27`
        
        if (text === undefined || text2 === undefined || Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter text, text2 dan apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        mintake 
      .ephoto4("https://en.ephoto360.com/create-overwatch-2-banner-for-the-online-youtube-channel-782.html", [
        text, text2
        ], radio
      )
      .then((data) => {
        var result = data.image
        var bear = `https://s1.ephoto360.com${result}`
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: bear
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
    })

    router.get('/maker/tracer-banner', async (req, res, next) => {
        var Apikey = req.query.apikey;
        var text = req.query.text;
        var text2 = req.query.text2;
        let radio = `0515b286-fec1-4af5-ba2f-831c85838208`
        
        if (text === undefined || text2 === undefined || Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter text, text2 dan apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        mintake 
      .ephoto4("https://en.ephoto360.com/create-overwatch-2-banner-for-the-online-youtube-channel-782.html", [
        text, text2
        ], radio
      )
      .then((data) => {
        var result = data.image
        var bear = `https://s1.ephoto360.com${result}`
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: bear
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
    })

    router.get('/maker/zarya-banner', async (req, res, next) => {
        var Apikey = req.query.apikey;
        var text = req.query.text;
        var text2 = req.query.text2;
        let radio = `0623c49e-6884-4db9-af44-cbba8d0f2405`
        
        if (text === undefined || text2 === undefined || Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter text, text2 dan apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        mintake 
      .ephoto4("https://en.ephoto360.com/create-overwatch-2-banner-for-the-online-youtube-channel-782.html", [
        text, text2
        ], radio
      )
      .then((data) => {
        var result = data.image
        var bear = `https://s1.ephoto360.com${result}`
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: bear
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
    })

    router.get('/maker/reaper-banner', async (req, res, next) => {
        var Apikey = req.query.apikey;
        var text = req.query.text;
        var text2 = req.query.text2;
        let radio = `e9a56c47-e9cf-4bcf-87d8-86da0c9031dd`
        
        if (text === undefined || text2 === undefined || Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter text, text2 dan apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        mintake 
      .ephoto4("https://en.ephoto360.com/create-overwatch-2-banner-for-the-online-youtube-channel-782.html", [
        text, text2
        ], radio
      )
      .then((data) => {
        var result = data.image
        var bear = `https://s1.ephoto360.com${result}`
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: bear
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
    })

    //  FITUR API PHOTOOXY
    router.get('/photooxy/shadow', async (req, res, next) => {
        var Apikey = req.query.apikey;
        var text = req.query.text;
        
        if (text === undefined || Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter text dan apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        KingOfBear.photooxy("https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html", [text])
        .then(data => {
            res.set({'Content-Type': 'image/png'})
            res.status(200).send(data)
        }).catch(error => {
            console.log(error);
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error'
            })
        });
      })

      router.get('/photooxy/romantic', async (req, res, next) => {
        var Apikey = req.query.apikey;
        var text = req.query.text;
        
        if (text === undefined || Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter text dan apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        KingOfBear.photooxy("https://photooxy.com/logo-and-text-effects/romantic-messages-for-your-loved-one-391.html", [text])
        .then(data => {
            res.set({'Content-Type': 'image/png'})
            res.status(200).send(data)
        }).catch(error => {
            console.log(error);
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error'
            })
        });
      })

      router.get('/photooxy/smoke', async (req, res, next) => {
        var Apikey = req.query.apikey;
        var text = req.query.text;
        
        if (text === undefined || Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter text dan apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        KingOfBear.photooxy("https://photooxy.com/other-design/create-an-easy-smoke-type-effect-390.html", [text])
        .then(data => {
            res.set({'Content-Type': 'image/png'})
            res.status(200).send(data)
        }).catch(error => {
            console.log(error);
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error'
            })
        });
      })

      router.get('/photooxy/burn-paper', async (req, res, next) => {
        var Apikey = req.query.apikey;
        var text = req.query.text;
        
        if (text === undefined || Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter text dan apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        KingOfBear.photooxy("https://photooxy.com/logo-and-text-effects/write-text-on-burn-paper-388.html", [text])
        .then(data => {
            res.set({'Content-Type': 'image/png'})
            res.status(200).send(data)
        }).catch(error => {
            console.log(error);
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error'
            })
        });
      })

      router.get('/photooxy/naruto', async (req, res, next) => {
        var Apikey = req.query.apikey;
        var text = req.query.text;
        
        if (text === undefined || Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter text dan apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        KingOfBear.photooxy("https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html", [text])
        .then(data => {
            res.set({'Content-Type': 'image/png'})
            res.status(200).send(data)
        }).catch(error => {
            console.log(error);
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error'
            })
        });
      })

      router.get('/photooxy/love-message', async (req, res, next) => {
        var Apikey = req.query.apikey;
        var text = req.query.text;
        
        if (text === undefined || Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter text dan apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        KingOfBear.photooxy("https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html", [text])
        .then(data => {
            res.set({'Content-Type': 'image/png'})
            res.status(200).send(data)
        }).catch(error => {
            console.log(error);
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error'
            })
        });
      })

      router.get('/photooxy/message-under-grass', async (req, res, next) => {
        var Apikey = req.query.apikey;
        var text = req.query.text;
        
        if (text === undefined || Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter text dan apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        KingOfBear.photooxy("https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html", [text])
        .then(data => {
            res.set({'Content-Type': 'image/png'})
            res.status(200).send(data)
        }).catch(error => {
            console.log(error);
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error'
            })
        });
      })

      router.get('/photooxy/double-heart', async (req, res, next) => {
        var Apikey = req.query.apikey;
        var text = req.query.text;
        
        if (text === undefined || Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter text dan apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        KingOfBear.photooxy("https://photooxy.com/logo-and-text-effects/love-text-effect-372.html", [text])
        .then(data => {
            res.set({'Content-Type': 'image/png'})
            res.status(200).send(data)
        }).catch(error => {
            console.log(error);
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error'
            })
        });
      })

      router.get('/photooxy/coffe-cup', async (req, res, next) => {
        var Apikey = req.query.apikey;
        var text = req.query.text;
        
        if (text === undefined || Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter text dan apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        KingOfBear.photooxy("https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html", [text])
        .then(data => {
            res.set({'Content-Type': 'image/png'})
            res.status(200).send(data)
        }).catch(error => {
            console.log(error);
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error'
            })
        });
      })

      router.get('/photooxy/love-text', async (req, res, next) => {
        var Apikey = req.query.apikey;
        var text = req.query.text;
        
        if (text === undefined || Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter text dan apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        KingOfBear.photooxy("https://photooxy.com/logo-and-text-effects/love-text-effect-372.html", [text])
        .then(data => {
            res.set({'Content-Type': 'image/png'})
            res.status(200).send(data)
        }).catch(error => {
            console.log(error);
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error'
            })
        });
      })

      router.get('/photooxy/butterfly', async (req, res, next) => {
        var Apikey = req.query.apikey;
        var text = req.query.text;
        
        if (text === undefined || Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter text dan apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        KingOfBear.photooxy("https://photooxy.com/logo-and-text-effects/butterfly-text-with-reflection-effect-183.html", [text])
        .then(data => {
            res.set({'Content-Type': 'image/png'})
            res.status(200).send(data)
        }).catch(error => {
            console.log(error);
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error'
            })
        });
      })
      
// FITUR TEXTPRO ME
router.get('/textpro/natural-leaves', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://textpro.me/natural-leaves-text-effect-931.html", [text])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/textpro/black-pink', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://textpro.me/create-blackpink-logo-style-online-1001.html", [text])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })
  
  router.get('/textpro/blackpink', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text;
    
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text dan apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    mintake 
  .ephoto3("https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html", [
    text
    ]
  )
  .then((data) => {
    var result = data.image
    var bear = `https://s1.ephoto360.com${result}`
    res.status(200).send({
        status: 200, 
        creator: `${creator}`,
        result: bear
    })
}).catch(error => {
    console.log(error);
    res.status(500).send({
        status: 500,
        message: 'Internal Server Error'
    })
});
})

router.get('/textpro/horrorblood', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://textpro.me/horror-blood-text-effect-online-883.html", [text])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/textpro/drop-water', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://textpro.me/dropwater-text-effect-872.html", [text])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/textpro/logo-wolf', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text
    var text2 = req.query.text2
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (text === undefined || text2 === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text, text2 & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://textpro.me/create-wolf-logo-black-white-937.html", [text, text2])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/textpro/logo-wolf2', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text
    var text2 = req.query.text2
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (text === undefined || text2 === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text, text2 & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://textpro.me/create-wolf-logo-galaxy-online-936.html", [text, text2])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/textpro/logo-wolf2', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://textpro.me/3d-christmas-text-effect-by-name-1055.html", [text])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/textpro/3d-gradient', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://textpro.me/3d-gradient-text-effect-online-free-1002.html", [text])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/textpro/christmas', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://textpro.me/3d-christmas-text-effect-by-name-1055.html", [text])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/textpro/logo-wolf2', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text1
    var text2 = req.query.text2
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (text === undefined || text2 === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text, text2 & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://textpro.me/pornhub-style-logo-online-generator-free-977.html", [
        text, text2
      ])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/textpro/matrix', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://textpro.me/matrix-style-text-effect-online-884.html", [text])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/textpro/harry-potter', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://photooxy.com/logo-and-text-effects/create-harry-potter-text-on-horror-background-178.html", [text])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/textpro/neondevil', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html", [text])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/textpro/neon', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://textpro.me/neon-light-text-effect-online-882.html", [text])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/textpro/marvel', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text1 = req.query.text1
    var text2 = req.query.text2
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (text1 === undefined || text2 === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text1, text2 & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://textpro.me/create-logo-style-marvel-studios-online-971.html", [text1,text2])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })
  
  router.get('/textpro/glitch2', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text1 = req.query.text1
    var text2 = req.query.text2
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (text1 === undefined || text2 === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text1, text2 & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://textpro.me/create-a-glitch-text-effect-online-free-1026.html", [text1,text2])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/textpro/silvermetal', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text1 = req.query.text1
    var text2 = req.query.text2
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (text1 === undefined || text2 === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text1, text2 & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://textpro.me/text-logo-3d-metal-silver-946.html", [text1, text2])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/textpro/transfomer', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://textpro.me/create-a-transformer-text-effect-online-1035.html", [text])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/textpro/sketsa', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.textpro("https://textpro.me/create-a-sketch-text-effect-online-1044.html", [text])
    .then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/textpro/styletext', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var teks = req.query.teks
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (teks === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    styletext(teks).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

// FITUR RANDOM  
  router.get('/quotes', async (req, res, next) => {
    Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
          var soal = JSON.parse(
              fs.readFileSync(__path + '/lib/data/quotes.json')
          )
      res
            .status(200)
            .json({
                code: 200,
                success: true,
            creator: `${creator}`,
            result: {
                   ...soal[~~(Math.random() * soal.length)] 
            }
            })
  })

  router.get('/random/pantun', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://raw.githubusercontent.com/saipulanuar/Api-Github/main/random/pantun.json`).then(data => {
        var result = data[Math.floor(Math.random() * data.length)];    
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/random/meme', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://raw.githubusercontent.com/saipulanuar/random-jokes-api/main/src/Assets/memes_list.json`)
    .then(async data => {    
    var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/meme.jpeg', data)
        res.sendFile(__path+'/tmp/meme.jpeg')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
})

router.get('/memeh', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    const memeindo = JSON.parse(fs.readFileSync(__path +'/lib/api/memeindo.json'));
    const Memeindo = memeindo[Math.floor(Math.random() * memeindo.length)];
    let hasil = Memeindo.memeindo;
         data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/memeh.jpeg', data)
        res.sendFile(__path+'/tmp/memeh.jpeg')
})

router.get('/loli', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    const loli = JSON.parse(fs.readFileSync(__path +'/lib/api/loli.json'));
    const Loli = loli[Math.floor(Math.random() * loli.length)];
    let hasil = Loli.loli;
         data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/loli.jpeg', data)
        res.sendFile(__path+'/tmp/loli.jpeg')
})

router.get('/nsfwloli', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    const nsfwloli = JSON.parse(fs.readFileSync(__path +'/lib/api/NsfwLoli.json'));
    const NsfwLoli = nsfwloli[Math.floor(Math.random() * nsfwloli.length)];
    let hasil = NsfwLoli.nsfwloli;
         data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfwloli.jpeg', data)
        res.sendFile(__path+'/tmp/nsfwloli.jpeg')
})

router.get('/bokepig', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    const bokepig = JSON.parse(fs.readFileSync(__path +'/lib/api/bokepig.json'));
    const Bokepig = bokepig[Math.floor(Math.random() * bokepig.length)];
    let hasil = Bokepig.bokepig;
         data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/bokepig.jpeg', data)
        res.sendFile(__path+'/tmp/bokepig.jpeg')
})

router.get('/darkjoke', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://raw.githubusercontent.com/saipulanuar/Api-Github/main/random/darkjoke.json`)
    .then(async data => {    
    var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.image;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/darkjoke.jpeg', data)
        res.sendFile(__path+'/tmp/darkjoke.jpeg')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
})

// FITUR ANIME/MANGA API
router.get('/anime/manga', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var search = req.query.search
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (search === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter search & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://manga-api.kingofbear-yt1.repl.co/api/search/${search}`).then(data => {
        var result = data.manga_list[Math.floor(Math.random() * data.manga_list.length)];    
        kimak = result
        kimak2 = result.type
        kimak3 = result.endpoint
        kimak4 = `https://komiku.id/manga/${kimak3}`
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: {
                "title": `${result.title}`,
                "thumb": `${result.thumb}`,
                "type": `${kimak2}`,
                "url": `${kimak4}`
            }
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

// FITUR FUN API
router.get('/cerpen/random', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://saipulanuar-cerpen-api.cyclic.app/`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/cerpen/cinta', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://privatasw.herokuapp.com/cerita/cinta`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/cerpen/horor', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://privatasw.herokuapp.com/cerita/horor`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/kuis/caklontong', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://raw.githubusercontent.com/saipulanuar/Api-Github/main/random/caklontong.json`).then(data => {
    var result = data[Math.floor(Math.random() * data.length)];
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/kuis/asahotak', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://raw.githubusercontent.com/saipulanuar/Api-Github/main/random/asahotak.json`).then(data => {
    var result = data[Math.floor(Math.random() * data.length)];
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/kuis/family100', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://raw.githubusercontent.com/saipulanuar/Api-Github/main/random/family100.json`).then(data => {
    var result = data[Math.floor(Math.random() * data.length)];
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/kuis/siapakahaku', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://raw.githubusercontent.com/saipulanuar/Api-Github/main/random/siapakahaku.json`).then(data => {
    var result = data[Math.floor(Math.random() * data.length)];
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/kuis/susunkata', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://raw.githubusercontent.com/saipulanuar/Api-Github/main/random/susunkata.json`).then(data => {
    var result = data[Math.floor(Math.random() * data.length)];
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/kuis/tebaktebakan', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var soal = JSON.parse(
        fs.readFileSync(__path + '/lib/api/tebaktebakan.json')
    )
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: {
                ...soal[~~(Math.random() * soal.length)] 
         }
        })
    })

    router.get('/kuis/tebaklirik', async (req, res, next) => {
        var Apikey = req.query.apikey;
        
        if(!Apikey) return res.json(loghandler.notparam)
        if (Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        var soal = JSON.parse(
            fs.readFileSync(__path + '/lib/api/tebaklirik.json')
        )
            res.status(200).send({
                status: 200, 
                creator: `${creator}`,
                result: {
                    ...soal[~~(Math.random() * soal.length)] 
             }
            })
        })

        router.get('/kuis/tekateki', async (req, res, next) => {
            var Apikey = req.query.apikey;
            
            if(!Apikey) return res.json(loghandler.notparam)
            if (Apikey === undefined) return res.status(404).send({
                status: 404,
                message: `Input Parameter apikey`
            });
            const check = await cekKey(Apikey);
            if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
            var soal = JSON.parse(
                fs.readFileSync(__path + '/lib/api/tekateki.json')
            )
                res.status(200).send({
                    status: 200, 
                    creator: `${creator}`,
                    result: {
                        ...soal[~~(Math.random() * soal.length)] 
                 }
                })
            })

            router.get('/kuis/tebakjenaka', async (req, res, next) => {
                var Apikey = req.query.apikey;
                
                if(!Apikey) return res.json(loghandler.notparam)
                if (Apikey === undefined) return res.status(404).send({
                    status: 404,
                    message: `Input Parameter apikey`
                });
                const check = await cekKey(Apikey);
                if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
                var soal = JSON.parse(
                    fs.readFileSync(__path + '/lib/api/tebakjenaka.json')
                )
                    res.status(200).send({
                        status: 200, 
                        creator: `${creator}`,
                        result: {
                            ...soal[~~(Math.random() * soal.length)] 
                     }
                    })
                })

                router.get('/kuis/tebakGambar', async (req, res, next) => {
                    var Apikey = req.query.apikey;
                    
                    if(!Apikey) return res.json(loghandler.notparam)
                    if (Apikey === undefined) return res.status(404).send({
                        status: 404,
                        message: `Input Parameter apikey`
                    });
                    const check = await cekKey(Apikey);
                    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
                    var soal = JSON.parse(
                        fs.readFileSync(__path + '/lib/api/tebakGambar.json')
                    )
                        res.status(200).send({
                            status: 200, 
                            creator: `${creator}`,
                            result: {
                                ...soal[~~(Math.random() * soal.length)] 
                         }
                        })
                    })

    router.get('/kuis/tebakGambar', async (req, res, next) => {
    var Apikey = req.query.apikey;
                        
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
        });
        const check = await cekKey(Apikey);
        if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
        var soal = JSON.parse(
        fs.readFileSync(__path + '/lib/api/tebakGambar.json')
        )
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: {
            ...soal[~~(Math.random() * soal.length)] 
            }
        })
     })

     router.get('/kuis/tebakbendera', async (req, res, next) => {
        var Apikey = req.query.apikey;
                            
        if(!Apikey) return res.json(loghandler.notparam)
        if (Apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter apikey`
            });
            const check = await cekKey(Apikey);
            if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
            var soal = JSON.parse(
            fs.readFileSync(__path + '/lib/api/tebakbendera.json')
            )
            res.status(200).send({
                status: 200, 
                creator: `${creator}`,
                result: {
                ...soal[~~(Math.random() * soal.length)] 
                }
            })
         })

         router.get('/random/artinama', async (req, res, next) => {
            var Apikey = req.query.apikey;
            var name = req.query.name;

            if(!Apikey) return res.json(loghandler.notparam)
            if (name === undefined || Apikey === undefined) return res.status(404).send({
                status: 404,
                message: `Input Parameter nama & apikey`
            });
            const check = await cekKey(Apikey);
            if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
            primbon.artiNama(name).then(data => {
                res.status(200).send({
                    status: 200, 
                    creator: `${creator}`,
                    result: data
                })
            }).catch(error => {
                console.log(error);
                res.status(500).send({
                    status: 500,
                    message: 'Internal Server Error'
                })
            });
          })

// FITUR API TOOLS
router.get('/hack/sms', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var query = req.query.query;

    if(!Apikey) return res.json(loghandler.notparam)
    if (query === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter query & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://id.jagreward.com/member/verify-mobile/${query}`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data.message
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/hack/tlpn', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var query = req.query.query;

    if(!Apikey) return res.json(loghandler.notparam)
    if (query === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter query & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://id.jagreward.com/member/verify-mobile/` + query).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data.message
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/text-to-audio/tts', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text;
    var idbahasa = req.query.idbahasa;
    
    if (text === undefined || idbahasa === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text, idbahasa dan apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var data = `https://salism3api.pythonanywhere.com/text2sound/?text=${text}&languageCode=${idbahasa}`
        const bear2 = await fetch(data).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/tts.mp3', bear2)
        res.sendFile(__path+'/tmp/tts.mp3')
  })

  router.get('/fakedata', async (req, res, next) => {
    var Apikey = req.query.apikey;

    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://random-data-api.com/api/address/random_address?size=3`).then(data => {
        var result = data[Math.floor(Math.random() * data.length)];    
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })
  
  router.get('/translate', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var kata = req.query.kata;

    if(!Apikey) return res.json(loghandler.notparam)
    if (kata === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter kata & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://docs-api-zahirrr.herokuapp.com/api/translate?text=${kata}`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/translate2', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var text = req.query.text;
    var dari = req.query.from;
    var lang = req.query.to;

    if(!Apikey) return res.json(loghandler.notparam)
    if (text === undefined || dari === undefined || lang === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter text, from, to & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    translate(`${text}`, {from: `${dari}`, to: `${lang}`}).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: {
                from: `${dari}`,
                to: `${lang}`,
                hasil: `${data.text}`
              }
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/short/tinyurl', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var url = req.query.url;

    if(!Apikey) return res.json(loghandler.notparam)
    if (url === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    TinyUrl.shorten(url).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/tools/wpuser', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var url = req.query.url;

    if(!Apikey) return res.json(loghandler.notparam)
    if (url === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    WPUser(url).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/download/ssweb', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var url = req.query.url;

    if(!Apikey) return res.json(loghandler.notparam)
    if (url === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KingOfBear.ssweb(url).then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/download/ssweb2', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var url = req.query.url;

    if(!Apikey) return res.json(loghandler.notparam)
    if (url === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    
await getBuffer(`https://image.thum.io/get/width/1900/crop/1000/fullpage/${url}`).then(data => {
        res.set({'Content-Type': 'image/png'})
        res.status(200).send(data)
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/download/linkwa', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var query = req.query.query;

    if(!Apikey) return res.json(loghandler.notparam)
    if (query === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter query & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    linkwa(query).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/sendmailCareer', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var from  = req.query.from;
    var to  = req.query.to;
    var subject  = req.query.subject;
    var text  = req.query.text;

    if(!Apikey) return res.json(loghandler.notparam)
    if (from === undefined || to === undefined || subject === undefined || text === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter from, to, subject, text & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    var transporter = nodemailer.createTransport({
        service: 'mailgun',
        auth: {
            user: 'postmaster@sandbox239bdf0c53e34161ba6e31f1c2bbb7eb.mailgun.org',
            pass: 'd3e5519dcbedaa5f07f7ce5961a81e11-2de3d545-cf61b8df'
        }
    });
    var mailOptions = {
        from: `KING OF BEAR SEND MAIL <${from}>`,
        to: `${to}`,
        subject: `${subject}`,
        text: `${text}`
    }
    transporter.sendMail(mailOptions).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: {
                From: `${mailOptions.from}`,
                To: `${mailOptions.to}`,
                Subject: `${mailOptions.subject}`,
                Text: `${mailOptions.text}`,
                Emailsent: `${data.response}`
              }
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/info/wikipedia', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var search = req.query.search;

    if(!Apikey) return res.json(loghandler.notparam)
    if (search === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter search & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    wikipediajs.search(search).then(data => {
        var bear = data.query
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: bear
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/info/covidworld', async (req, res, next) => {
    var Apikey = req.query.apikey;

    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://api-covid19-indonesia-saipulanuar.vercel.app/api/indonesia/provinsi`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/info/covidindo', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var provinsi = req.query.provinsi

    if(!Apikey) return res.json(loghandler.notparam)
    if (provinsi === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter provinsi & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://api-covid19-indonesia-saipulanuar.vercel.app/api/indonesia/provinsi?name=${provinsi}`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/info/cuaca', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var provinsi = req.query.provinsi
    var kota = req.query.kota

    if(!Apikey) return res.json(loghandler.notparam)
    if (provinsi === undefined || kota === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter provinsi, kota & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://cuaca-gempa-rest-api-saipulanuar.vercel.app/weather/${provinsi}/${kota}`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data.data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/info/gempa', async (req, res, next) => {
    var Apikey = req.query.apikey;

    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://cuaca-gempa-rest-api-saipulanuar.vercel.app/quake`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data.data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/info/drakorasia', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var search = req.query.search

    if(!Apikey) return res.json(loghandler.notparam)
    if (search === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter search & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`http://docs-api-zahirrr.herokuapp.com/api/drakorasia?search=${search}`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/info/berita2', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var kota = req.query.kota

    if(!Apikey) return res.json(loghandler.notparam)
    if (kota === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter kota & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://api-berita-indo-saipulanuar.vercel.app/v1/tribun-news/${kota}/techno`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            messages: data.messages,
            result: data.data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/info/berita', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var kota = req.query.kota

    if(!Apikey) return res.json(loghandler.notparam)
    if (kota === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter kota & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://api-berita-indo-saipulanuar.vercel.app/v1/tribun-news/${kota}/ramadan`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            messages: data.messages,
            result: data.data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/info/kodepos', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var provinsi = req.query.provinsi

    if(!Apikey) return res.json(loghandler.notparam)
    if (provinsi === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter provinsi & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    fetchJson(`https://saipul-kodepos.vercel.app/search/?q=${provinsi}`).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            messages: data.messages,
            result: data.data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/info/kbbi', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var provinsi = req.query.provinsi

    if(!Apikey) return res.json(loghandler.notparam)
    if (provinsi === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter provinsi & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    KbbiInfo(provinsi).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

router.get('/info/jadwalmplid', async (req, res, next) => {
    var Apikey = req.query.apikey;

    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    jadwalmplid().then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/info/emoji', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var query = req.query.query

    if(!Apikey) return res.json(loghandler.notparam)
    if (query === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter query & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    emoji(query).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/info/emojimix', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var emoji1 = req.query.emoji1
    var emoji2 = req.query.emoji2

    if(!Apikey) return res.json(loghandler.notparam)
    if (emoji1 === undefined || emoji2 === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter emoji1, emoji2 & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    emojimix(emoji1, emoji2).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

router.get('/info/randomtt', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var user = req.query.user

    if(!Apikey) return res.json(loghandler.notparam)
    if (user === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter user & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    randomtt(user).then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

// FITUR VIRTEX
  router.get('/virus/ngazap', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    ngazap().then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/virus/philips', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    philips().then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/virus/vir', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    vir().then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/virus/virtex', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    vir2().then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

  router.get('/virus/virus', async (req, res, next) => {
    var Apikey = req.query.apikey;
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    vir3().then(data => {
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: data
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

// FITUR WHM
  router.get('/whm/totaluser', async (req, res, next) => {
    var Apikey = req.query.apikey;
    var usrwhm = req.query.usrwhm
    var tokenwhm = req.query.tokenwhm
    var server = req.query.server
    
    if(!Apikey) return res.json(loghandler.notparam)
    if (usrwhm === undefined || tokenwhm === undefined || server === undefined || Apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter usrwhm, tokenwhm, server & apikey`
    });
    const check = await cekKey(Apikey);
    if (!check) return res.sendFile(__path + '/views/apikey-not-found.html');
    let authWhm = {headers: {Authorization: `WHM ${usrwhm}:${tokenwhm}`}}
axios.get(`https://${server}:2087/json-api/json-api/get_current_users_count?api.version=1`, authWhm).then(data => {
        let np = data.data.data.users
        res.status(200).send({
            status: 200, 
            creator: `${creator}`,
            result: {
              Server: `https://${server}:2087/`,
              JumlahUser: `${np} Users`
            }
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
  })

module.exports = router;
