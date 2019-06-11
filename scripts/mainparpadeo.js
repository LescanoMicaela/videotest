var video = document.getElementById("video");

var interval = setInterval(function(){
    if(video.style.display == 'none'){
        video.style.display = 'block';
    }else{
        video.style.display = 'none';
    }
}, 1000);

