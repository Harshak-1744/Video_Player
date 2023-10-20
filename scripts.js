let videoList = document.querySelectorAll('.video-list-container .list');
let mainVideo = document.querySelector('.main-video-container .main-video');
let countdown = document.querySelector('.countdown');
let countdownWrapper = document.querySelector('.autoplay-countdown');

function updateMainVideo(src, title) {
    mainVideo.src = src;
    document.querySelector('.main-video-container .main-vid-title').innerHTML = title;
    mainVideo.play();
}

videoList.forEach(vid => {
    vid.onclick = () => {
        videoList.forEach(remove => { remove.classList.remove('active') });
        vid.classList.add('active');
        let src = vid.querySelector('.list-video').src;
        let title = vid.querySelector('.list-title').innerHTML;
        updateMainVideo(src, title);
    };
});

mainVideo.addEventListener('ended', () => {
    let currentActiveVideo = document.querySelector('.list.active');
    let videoArray = Array.from(videoList);
    let currentIndex = videoArray.indexOf(currentActiveVideo);

    if (currentIndex !== -1 && currentIndex < videoArray.length - 1) {
        let nextVideo = videoArray[currentIndex + 1];
        let src = nextVideo.querySelector('.list-video').src;
        let title = nextVideo.querySelector('.list-title').innerHTML;

        currentActiveVideo.classList.remove('active'); 
        nextVideo.classList.add('active');

        countdownWrapper.style.display = 'block';
        let seconds = 15;
        countdown.innerHTML = seconds;
        
        let timer = setInterval(() => {
            seconds--;
            countdown.innerHTML = seconds;
            if (seconds <= 0) {
                clearInterval(timer);
                countdownWrapper.style.display = 'none';
                updateMainVideo(src, title);
            }
        }, 1000);
        
    }
});

document.querySelector('.skip-next').addEventListener('click', function() {
    mainVideo.play();
    countdownWrapper.style.display = 'none';
});
