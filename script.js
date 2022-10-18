
let audioTime;
let songIndex = 0;
let audioElement = new Audio("songs/123.mp3");
let masterPlay = document.getElementById("master-play");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("master-song-name");
let songItems = Array.from(document.getElementsByClassName("song-item"));




let songs = [
    {songName:"No Copyright Songs 1", filePath: "songs/1.mp3", coverPath: "cover/ncs.jpg"},
    {songName:"No Copyright Songs 2", filePath: "songs/2.mp3", coverPath: "cover/ncs.jpg"},
    {songName:"No Copyright Songs 3", filePath: "songs/3.mp3", coverPath: "cover/ncs.jpg"},
    {songName:"No Copyright Songs 4", filePath: "songs/4.mp3", coverPath: "cover/ncs.jpg"},
    {songName:"No Copyright Songs 5", filePath: "songs/5.mp3", coverPath: "cover/ncs.jpg"},
    {songName:"No Copyright Songs 6", filePath: "songs/6.mp3", coverPath: "cover/ncs.jpg"},
    {songName:"No Copyright Songs 7", filePath: "songs/7.mp3", coverPath: "cover/ncs.jpg"},
    {songName:"No Copyright Songs 8", filePath: "songs/8.mp3", coverPath: "cover/ncs.jpg"},
    {songName:"No Copyright Songs 9", filePath: "songs/9.mp3", coverPath: "cover/ncs.jpg"},
    {songName:"No Copyright Songs 10", filePath: "songs/10.mp3", coverPath: "cover/ncs.jpg"},

];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("song-name")[0].innerText = songs[i].songName;
});



//handle play/pause

masterPlay.addEventListener("click", ()=>{
    if(audioElement.paused || audioElement.currentTime<= 0 || null) {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
    }
});





// listen to evets

audioElement.addEventListener("timeupdate", () => {
    //update seeker
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;

}); 

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
});

const makeAllPlay = ()=>{
    Array.from(document.getElementsByClassName("song-item-play")).forEach((element)=>{
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    });
}

const makePaused = () => {
Array.from(document.getElementsByClassName("song-item-play")).forEach((element) => {
    element.addEventListener("click", (e) => {
        if(audioElement.play) {
            audioElement.play();
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");
        }  else {
                e.target.classList.remove("fa-play-circle");
                e.target.classList.add("fa-pause-circle");
        }
    });
});
};


Array.from(document.getElementsByClassName("song-item-play")).forEach((element) => {
    element.addEventListener("click", (e) => {
        makeAllPlay();
        makePaused();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    });
});



document.getElementById("next").addEventListener("click", ()=>{
    if(songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
});


document.getElementById("previous").addEventListener("click", ()=>{
    if(songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
});