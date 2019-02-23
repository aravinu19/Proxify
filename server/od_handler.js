const cheerio = require('cheerio');
const request = require('request');

var collectIntel = (url, callback) => {

    request(url, (err, res, res_body) => {

        let $ = cheerio.load(res_body);
        let title = "";
        let folder;
        let files;

        title = $('.BreadcrumbBar-item').


        callback(res_body);

    });

};

module.exports.collectIntel = collectIntel;