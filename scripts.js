// get Elements
const player = document.querySelector(".player");
const video = document.querySelector("video");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled")
const toggle = document.querySelector(".toggle")
const skipbuttons = document.querySelectorAll("[data-skip]")
const range = document.querySelectorAll(".player__slider")
const fullscreenButton = document.querySelector(".fullscreen-btn");

// create functions


function togglePlay(){
    // if(video.paused){
    //     video.play()
    // } else{
    //     video.pause()
    // }
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}


function updateButton(){
        // const icon = video.paused ? '►' : '❚ ❚';
        toggle.textContent =  video.paused ? '►' : '❚ ❚';
}


function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgress(){
    const percent = (video.currentTime/video.duration) * 100;

    progressBar.style.flexBasis = `${percent}%`
}


function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
      player.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }


// and hook event listners 

video.addEventListener("click",togglePlay)
video.addEventListener("play", updateButton)
video.addEventListener("pause", updateButton)
video.addEventListener("timeupdate", handleProgress)

toggle.addEventListener("click",togglePlay)

skipbuttons.forEach(button => button.addEventListener("click", skip));

range.forEach(range => range.addEventListener("click",handleRangeUpdate))
range.forEach(range => range.addEventListener("mousemove",handleRangeUpdate))


let mousedown = false;

progress.addEventListener("click",scrub)
progress.addEventListener("mousemove", (e) => mousedown && scrub(e))
progress.addEventListener("mousedown", () => mousedown = true)
progress.addEventListener("mouseup", () => mousedown = false)
fullscreenButton.addEventListener("click", toggleFullScreen);
