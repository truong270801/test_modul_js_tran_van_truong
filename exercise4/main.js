const videoElement = document.querySelector('#container_video');
const btnPlayElement = document.querySelector('.container_btn__play');
const btnPlay = document.querySelector('.container_control__btn__left__play');
const soundElement = document.querySelector('.container_control__btn__right__sound');
const screenElement = document.querySelector('.container_control__btn__right__screen');

const progressBarCurrent = document.querySelector('.container_control__progress__bar__current');
const progressBar = document.querySelector('.container_control__progress__bar');
const progressBarThumb = document.querySelector('.container_control__progress__bar__thumb');

const nextTime15s = document.querySelector('.container_control__btn__left__next');
const backTime15s = document.querySelector('.container_control__btn__left__back');

const controls = document.querySelector('.container_control');





let controlsVisible = true;



function playVideo() {
    if (videoElement.paused) {
        videoElement.play();
        btnPlayElement.style.display = 'none';
        btnPlay.src = './assets/icon/stop.svg';
    } else {
        videoElement.pause();
        btnPlayElement.style.display = 'block';
        btnPlay.src = './assets/icon/playsm.svg';
    }
}

// document.addEventListener('keydown', function(event) {
//     if (event.code === 'Space') { 
//         event.preventDefault(); 
//         playVideo();
//     }
// });

btnPlayElement.addEventListener('click', playVideo)
btnPlay.addEventListener('click', playVideo);
videoElement.addEventListener('click', playVideo);

soundElement.addEventListener('click', () => {
    if (videoElement.muted === true) {
        videoElement.muted = false;
        soundElement.src = './assets/icon/sound.svg';

    } else {
        videoElement.muted = true;
        soundElement.src = './assets/icon/no_sound.svg';

    }
});

screenElement.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        videoElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

progressBarThumb.addEventListener('mousedown', () => {
    isDragging = true;
});

videoElement.addEventListener('timeupdate', () => {
    const percentage = (videoElement.currentTime / videoElement.duration) * 100;
    progressBarCurrent.style.width = `${percentage}%`;
    progressBarThumb.style.left = `${percentage}%`;
});

document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const rect = progressBar.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const percentage = Math.min(Math.max(offsetX / rect.width, 0), 1);

        progressBarCurrent.style.width = `${percentage * 100}%`;
        progressBarThumb.style.left = `${percentage * 100}%`;
        videoElement.currentTime = percentage * videoElement.duration;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});


nextTime15s.addEventListener('click', () => {
    videoElement.currentTime = Math.min(videoElement.currentTime + 15, videoElement.duration);
});
backTime15s.addEventListener('click', () => {
    videoElement.currentTime = Math.min(videoElement.currentTime - 15, videoElement.duration);
});

videoElement.addEventListener('timeupdate', () => {
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    document.querySelector('.time_current').textContent = formatTime(videoElement.currentTime);
    document.querySelector('.time_video').textContent = formatTime(videoElement.duration);
});

document.addEventListener('keydown', function (event) {
    switch (event.code) {
        case 'Space':
            event.preventDefault();
            playVideo();
            break;
        case 'ArrowLeft':
            videoElement.currentTime = Math.min(videoElement.currentTime - 15, videoElement.duration);

            break;
        case 'ArrowRight':
            videoElement.currentTime = Math.min(videoElement.currentTime + 15, videoElement.duration);
            break;
    }
});

function hideControls() {
    setTimeout(() => {
        if (controlsVisible) {
            controls.style.display = 'none';
            controlsVisible = false;
        }
    }, 5000);  
}

function showControls() {
    controls.style.display = 'flex';
    controlsVisible = true;
}

setTimeout(hideControls, 5000);


videoElement.addEventListener('mouseenter', showControls);
controls.addEventListener('mouseenter', showControls);

videoElement.addEventListener('mouseleave', hideControls);
controls.addEventListener('mouseleave', showControls);
