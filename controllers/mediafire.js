__path = process.cwd()

const fetch = require("node-fetch");
var fs = require('fs');
const { cekKey } = require('../database/db');
const creator = 'Ashley'

// Scraper
const { 
    mediafiredownloader 
} = require("../lib/api/downloader");

const {   
    telesticker,
    stickersearch,
    sholat,
    styletext,
    linkwa 
} = require("../lib/api/scraper");

const { 
    fetchJson, 
    runtime, 
    getBuffer 
} = require('../lib/myfunc');


async function mediafiredl(req, res) {
    const url = req.query.url;
    const apikey = req.query.apikey;
    if (url === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    mediafiredownloader(url).then(result => {
        res.status(200).send({status: 200, creator: `${creator}`, result: result});
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            creator: `${creator}`,
            message: 'Internal Server Error'
        })
    });
}

async function telestickerr(req, res) {
    const url = req.query.url;
    const apikey = req.query.apikey;
    if (url === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    telesticker(url).then(result => {
        const url_download = result[Math.floor(Math.random() * result.length)];
        res.status(200).send({status: 200, creator: `${creator}`, result: url_download});
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            creator: `${creator}`,
            message: 'Internal Server Error'
        })
    });
}

async function gammer(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    var result = await fetchJson(`https://raw.githubusercontent.com/saipulanuar/Api-Github/main/random/wallpaper-gamming.json`)
        var bear = result[Math.floor(Math.random() * result.length)];
        var kimak = bear.url
       const data = await getBuffer(kimak)
         await fs.writeFileSync(__path +'/tmp/epep.jpeg', data)
        res.sendFile(__path+'/tmp/epep.jpeg')
}

module.exports = { mediafiredl, gammer, telestickerr };