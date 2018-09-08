// Get our elements
const player = document.querySelector(".player");
const video = document.querySelector(".viewer");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");

const toggle = document.querySelector(".toggle");
const skipButtons = document.querySelectorAll("[data-skip]");
const ranges = document.querySelectorAll("[type='range']");

// Build our functions
function togglePlay(){
    const method = video.paused?"play":"pause";
    video[method]();
}

function updateButton(){
    const icon = this.paused?"►":"❚ ❚";
    toggle.textContent = icon;
    
}
function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}
function handleRange(){
    video[this.name] = this.value;
}
function handleProgress(){
    const percent = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scurb(e){
    console.log(e);
    const scurbTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scurbTime;

}
// Hook up the event listener
video.addEventListener("click",togglePlay);
video.addEventListener("play",updateButton)
video.addEventListener("pause",updateButton)
toggle.addEventListener("click",togglePlay);
skipButtons.forEach(el => el.addEventListener("click",skip));
ranges.forEach(el => el.addEventListener("change",handleRange));
ranges.forEach(el => el.addEventListener("mousemove",handleRange));
video.addEventListener("progress",handleProgress);

let mousedown = false;
progress.addEventListener("click",scurb);
progress.addEventListener("mousemove",() => mousedown && scurb(e));
progress.addEventListener("mouseup",() => mousedown =true);
progress.addEventListener("mousedown",() => mousedown = false);