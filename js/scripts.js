
class VideoPlayer {
    constructor() {
        this.player = document.querySelector('.player');
        this.video = this.player.querySelector('.viewer');
        this.progress = document.querySelector('.progress');
        this.progressBar = this.progress.querySelector('.progress__filled');
        this.toggle = this.player.querySelector('.toggle');
        this.skipButtons = this.player.querySelectorAll('[data-skip]');
        this.ranges = this.player.querySelectorAll('.player__slider');
        this.length = parseFloat(getComputedStyle(this.progress).width);
        this.videoState = JSON.parse( localStorage.getItem('videoState') ) || {};

    }

    init() {
        this.events();
    }

    events() {
        this.video.addEventListener('click', e => this.togglePlay());
        this.toggle.addEventListener('click', e => this.togglePlay());
        this.ranges.forEach(range => range.addEventListener('change', e => this.handleRangeUpdate(e)));
        this.ranges.forEach(range => range.addEventListener('mousemove', e => this.handleRangeUpdate(e)));
        this.skipButtons.forEach(btn => btn.addEventListener('click', e => this.skip(e)));
        this.progress.addEventListener('click', e => this.rewind(e));
    }

    togglePlay() {
        const method = this.video.paused ? 'play' : 'pause';
        this.toggle.textContent = this.video.paused ? '❚ ❚' : '►';
        this.video[method]();
        this.runProgress();
    }

    handleRangeUpdate(e) {
        this.video[e.target.name] = e.target.value;
    }

    skip(e) {
        this.video.currentTime += +e.target.dataset.skip;
    }

    runProgress() {
        let interval = setInterval(() => {
            this.progressBar.style.flexBasis = this.video.currentTime / this.video.duration * 100 + '%';
        }, 10);
    }

    rewind(e) {
        this.video.currentTime = e.offsetX / this.length * this.video.duration;
    }

    saveState() {
        localStorage.setItem('videoState', JSON.stringify(this.videoState));
    }

}

const video = new VideoPlayer();

video.init();
