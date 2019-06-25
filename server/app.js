const { DownloaderHelper } = require('node-downloader-helper');//require('ytdl-core');
const fs = require('fs');
const rmdir = require('rimraf');
const request = require('request');
const yt_handler = require('./yt_handler');
const od_handler = require('./od_handler');

var router = (app) => {

    app.post('/getVideoInfo', (req, res) => {

        var URL = req.body.url;
        var yt_info_url = "https://www.youtube.com/get_video_info?html5=1&video_id=";

        const validateUrl = /^(?:https?:\/\/)?(w{3})?\.?youtube\.com/.test(URL);

        if(!validateUrl){
            res.end({
                url: 'INVALID'
            });
        }else{

            yt_info_url += URL.split('?v=')[1];

            request(yt_info_url, (err, response) => {

                if (err) {
                    res.status(500).send(err);
                }

                var infos = yt_handler.qsToJson(response.body.toString());

                var tmp_info = infos["url_encoded_fmt_stream_map"];

                if(tmp_info){

                    tmp_info = tmp_info.split(',');

                    for(let index in tmp_info){

                        tmp_info[index] = yt_handler.qsToJson(tmp_info[index]);
                        tmp_info[index].ext = tmp_info[index].type.match(/^video\/\w+(?=;)/g)[0].replace(/^video\//, "");

                    }

                    infos["videos"] = tmp_info;
                    infos.title = infos.title.replace(/\+/g, " ");

                }

                res.send(infos);
                console.log(infos);

            });

        }

    });


    app.post('/getVideo', (req, res) => {

        console.log(req.body);

        // rmdir.sync()
        rmdir.sync("./public/videos");
        fs.mkdirSync("./public/videos");

       dmgr = new DownloaderHelper(req.body.vurl, "./public/videos", { fileName: "video." + req.body.vext});

       dmgr.on('progress', (stats) => console.log(stats));

       dmgr.on('end', () => {
           res.send("../videos/video." + req.body.vext);
       });

       dmgr.on('error', (err) => {
           res.err(err);
           console.log(err);
       });

       dmgr.start();

    });

    app.post('/getOdVideo', (req, res) => {

        rmdir.sync("./public/odVideos");
        fs.mkdirSync("./public/odVideos");

       dmgr = new DownloaderHelper(req.body.vurl, "./public/odVideos", { fileName: "odVideo.mp4"});

       dmgr.on('progress', (stats) => console.log(stats));

       dmgr.on('end', () => {
           res.send("../odVideos/odVideo.mp4");
       });

       dmgr.on('error', (err) => {
           res.err(err);
           console.log(err);
       });

       dmgr.start();

    });

    app.post('/search', (req, res) => {

        let search_keywords = req.body.search_keywords;
        let youtube_search_api = "https://www.youtube.com/results?search_query=";

        request(`${youtube_search_api + search_keywords}`, (error, query_response, query_html) => {

            if(error){
                console.log(error);
                res.status(500).send(error);
            }

            // console.log(query_response.body.toString());

            
            res.send("OKAY DA");

            

        });

    });

    app.post('/odGetInfo', (req, res) => {

        var url = req.body.url;

        od_handler.collectIntel(url, (intel) => {
            res.send(intel);
        });

    });


};

module.exports = router;