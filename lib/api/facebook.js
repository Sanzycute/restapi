const cheerio = require("cheerio");
const fetch = require("node-fetch");
const axios = require("axios");
const request = require("request");
const FormData = require("form-data");
const url = require('url')

exports.facebook = async(url) => {
    return new Promise((resolve) => {
        const options = {
            method: "POST",
            url: 'https://fdownloader.net/api/ajaxSearch',
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            formData: {
                q: url
            }
        }
        request(options, async function(err, response, body){
            if(err) return resolve({status: false, message: 'error'})
            const data = JSON.parse(body).data
            if(!data) return resolve({status: false, message: 'media not found'})
            const $ = cheerio.load(data)
            const result = {
                sd: $('#fbdownloader > div.tab-wrap > div:nth-child(5) > table > tbody > tr:nth-child(2) > td:nth-child(3) > a').attr('href'),
                hd: $('#fbdownloader > div.tab-wrap > div:nth-child(5) > table > tbody > tr:nth-child(1) > td:nth-child(3) > a').attr('href')
            }
            resolve({status: true, ...result})
        })
    })
}