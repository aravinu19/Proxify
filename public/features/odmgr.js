function loadTitle() {

    document.getElementById('title').innerHTML = `<div class="card card-body" onclick="loadIndex()"> <h2>${durls["title"]}</h2> </div>`;

}

function loadIndex() {

    document.getElementById('subIndex').innerHTML = "";
    document.getElementById('videoView').innerHTML = "";

    let index = durls["index"];

    generateIndexTags(index, (tags) => {
        document.getElementById("courseIndex").innerHTML = tags;
    });

}

function loadChapter(chapterName){

    document.getElementById("courseIndex").innerHTML = "";
    document.getElementById('videoView').innerHTML = "";

    var chapters = (durls["chapters"])[chapterName.innerText.trim()];

    generateChapterTags( chapterName.innerText, chapters, (tags) => {
        document.getElementById('subIndex').innerHTML = tags;
    });

}

function loadVideo(VideoURL){

    document.getElementById('courseIndex').innerHTML = "";
    document.getElementById('subIndex').innerHTML = "";

    let element = VideoURL.childNodes[0].innerText;
    let url = element.split(".jpg?")[0];

    axios.post('/getOdVideo', {
        vurl: `${url}`
    }).then((response) => {
        document.getElementById('videoView').innerHTML = `<video width='640px' height='360px' src='${response.data}' controls></video>`;
    }).catch((err) => {
        console.log(err);
    });

}

function loadQuiz(QuizURL){



}

function generateChapterTags(chapterTitle, chapters, callback){

    var chapterTags = `<div class='col col-md-10' style='margin: 0 auto;'> <h3>Contents of ${chapterTitle}</h3>`;

    for(let index = 0; chapters[`${index}`] != undefined; index++){
        
        if(chapters[`${index}`].includes('.html')){
            chapterTags += `<div class="card" style="margin: 2%;" onclick="loadQuiz(this)"><p hidden>${chapters[`${index}`]}</p><h4>0${(index+1)} QUIZ</h4></div>`;
        }else{
            chapterTags += `<div class="card" style="margin: 2%;" onclick="loadVideo(this)"><p hidden>${chapters[`${index}`]}</p><h4>0${(index+1)} Video</h4></div>`;
        }

    }

    callback(chapterTags + "</div>");

}

function generateIndexTags(index, callback) {

    let indexes = "<div class='col col-md-10' style='margin: 0 auto;'> <h3>Chapters</h3>";

    index.forEach(element => {
        
        indexes += `<div class="card" style="margin: 2%;" onclick="loadChapter(this)"> <h4>${element}</h4></div>`;

    });

    callback(indexes + "</div>");

}