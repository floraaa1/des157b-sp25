(function(){
    'use strict';
    console.log('reading js');

    const myVideo = document.querySelector('#myVideo');

            const fs = document.querySelector('#fs');
            const displayText = document.querySelector('#displayText');
            const line1 = document.querySelector('#line1');

            function checkTime(){
                if(1 < myVideo.currentTime && myVideo.currentTime < 5){
                    line1.className = 'showing';
                    myVideo.style.filter = 'grayscale(100%) contrast(100%)';
                    displayText.innerHTML = '';
                }
                else{
                    line1.className = 'hidden';
                    myVideo.style.filter = 'grayscale(30%) contrast(200%)';
                }
                if(6 < myVideo.currentTime && myVideo.currentTime < 10){
                    displayText.innerHTML = 'During their annual migration, dolphins undertake a remarkable journey across vast stretches of the ocean.';
                }
                else if(11 < myVideo.currentTime && myVideo.currentTime < 15){
                    displayText.innerHTML = 'They travel in well-organized pods, communicating and coordinating through a series of clicks and whistles.';
                }
                else if(16 < myVideo.currentTime && myVideo.currentTime < 20){
                    displayText.innerHTML = 'Dolphins use sophisticated echolocation techniques to navigate and locate abundant feeding grounds along their route.';
                }
                else if(21 < myVideo.currentTime && myVideo.currentTime < 25){
                    displayText.innerHTML = 'Environmental cues such as changing water temperature and food availability drive their migration patterns.';
                }
                else if(26 < myVideo.currentTime && myVideo.currentTime < 28){
                    displayText.innerHTML = "This synchronized movement is not only a survival strategy but also a stunning demonstration of nature's elegance and intelligence.";
                }
                else {
                    displayText.innerHTML = '';
                }
            }
            const intervalID = setInterval (checkTime, 1000);

            fs.addEventListener('click', function(){
                if(!document.fullscreenElement){
                    document.documentElement.requestFullscreen();
                } 
                else {
                        document.exitFullscreen();
                }
            })
})();