const { DownloaderHelper } = require('node-downloader-helper');
const fs = require('fs');

var jsonURLs = JSON.parse(fs.readFileSync('./public/rhn.json', 'UTF8'));

console.log(jsonURLs["index"]);