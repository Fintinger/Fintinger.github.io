class Player {
    constructor(audio, songList, songInfo, cover, playBtn, progress) {
        this.audio = audio
        this.songList = songList
        this.songInfo = songInfo
        this.playBtn = playBtn
        this.progress = progress
        this.cover = cover.querySelector("img") || cover
        console.dir(this.playBtn);
        this.curInd = 0
        this.loadSong()
    }

    loadSong() {
        let song = this.songList[this.curInd]
        this.songInfo.innerHTML = song.name
        this.cover.src = song.cover
        this.audio.src = song.src
    }

    playSong() {
        this.playBtn.offsetParent.classList.add("play")

        this.playBtn.classList.remove("fa-play")
        this.playBtn.classList.add("fa-pause")
        this.audio.play()
    }

    pauseSong() {
        this.playBtn.offsetParent.classList.remove("play")

        this.playBtn.classList.add("fa-play")
        this.playBtn.classList.remove("fa-pause")
        this.audio.pause()
    }

    nextSong() {
        this.curInd++
        if (this.curInd > this.songList.length - 1) {
            this.curInd = 0
        }
        this.loadSong()
        this.playSong()
    }

    prevSong() {
        this.curInd--
        if (this.curInd < 0) {
            this.curInd = this.songList.length - 1
        }
        this.loadSong()
        this.playSong()
    }

    updateProgress() {
        const {duration, currentTime} = this.audio;
        this.progress.style.width = (currentTime / duration) * 100 + "%"
    }

    setProgress(e) {
        let width = this.progress.parentElement.clientWidth;
        let clickX = e.offsetX;
        let duration = this.audio.duration;
        audio.currentTime = (clickX / width) * duration
    }
}

const playBtn = document.getElementsByClassName("fa-play")[0]
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")
const audio = document.getElementsByTagName("audio")[0]
const songInfo = document.querySelector(".info .song-info")
const cover = document.querySelector(".cover>img")
const progress = document.querySelector(".progress")
const progressContainer = document.querySelector(".progress-container")
const songList = [
    {name: "hey", src: "music/hey.mp3", cover: "images/hey.jpg"},
    {name: "summer", src: "music/summer.mp3", cover: "images/summer.jpg"},
    {name: "ukulele", src: "music/ukulele.mp3", cover: "images/ukulele.jpg"},
    {name: "陈鸿宇 - 理想三旬", src: "music/陈鸿宇 - 理想三旬.mp3", cover: "images/陈鸿宇 - 理想三旬.jpg"}
]
let p = new Player(audio, songList, songInfo, cover, playBtn, progress)

playBtn.addEventListener("click", e => {
    const isPlaying = [...e.target.offsetParent.classList].includes("play")
    if (!isPlaying) {
        p.playSong()
    } else {
        p.pauseSong()
    }
})
prevBtn.addEventListener("click", _ => p.prevSong())
nextBtn.addEventListener("click", _ => p.nextSong())
audio.addEventListener("timeupdate", _ => p.updateProgress())
audio.addEventListener("ended", _ => p.nextSong())
progressContainer.addEventListener("click", e => p.setProgress(e))