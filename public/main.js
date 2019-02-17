var video_view = document.getElementById('yt_view');
var result_view = document.getElementById('yt_details');


function getInfo() {

    var search_box = document.getElementById('btn1').value;

    if(search_box !== null){

        axios.post('/getVideoInfo', {
            url: "" + search_box
        })
        .then(function (response) {
            console.log(response.data["videos"]);

            (response.data["videos"]).forEach(video_detail => {
                document.getElementById('yt_details').innerHTML += generateResult(video_detail);
            });
            
            //document.getElementById('yt_view').innerHTML = "<video width='640px' height='360px' src='../video.mp4' controls></video>";
        })
        .catch(function (error) {
            console.log(error);
        });

    }

}

function playVideo(url) {

    console.log(url);

    document.getElementById('yt_details').innerHTML = " ";

    axios.post('/getVideo', {
        vurl: url.split(',')[0],
        vext: url.split(",")[1]
    }).then((response) => {
        console.log(response.data);
    }).catch((err) => {
        console.log(err);
    });

}

function generateResult(video_detail){

    return `
    <div class="card w-75">
        <div class="card-body">
            <h5 class="card-title">${video_detail["quality"]}</h5>
            <p class="card-text">Video Format: ${video_detail["ext"]}</p>
            <a href="#" class="btn btn-primary" onclick="playVideo('${video_detail["url"]},${video_detail["ext"]}')">Play</a>
        </div>
    </div>
    `;

}