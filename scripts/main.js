var elem = document.getElementsByTagName("body")[0]; 
var hiddenText= document.getElementById("hiddenText");
var hiddenWord = document.getElementById("palabra");
var menuActive = false;

/* When the openFullscreen() function is executed, open the video in fullscreen.
Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
//  } else if (elem.mozRequestFullScreen) { /* Firefox */
//    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
//  } else if (elem.msRequestFullscreen) { /* IE/Edge */
//    elem.msRequestFullscreen();
//  }
}
}

function fullscreen() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    var docElm = document.documentElement;
    if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
			document.getElementById("fullscreen").src = "images/exitfullscreen.png";
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
			document.getElementById("fullscreen").src = "images/exitfullscreen.png";
        } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
			document.getElementById("fullscreen").src = "images/exitfullscreen.png";
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
			document.getElementById("fullscreen").src = "images/exitfullscreen.png";
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
			document.getElementById("fullscreen").src = "images/fullscreen.png";
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
			document.getElementById("fullscreen").src = "images/fullscreen.png";
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
			document.getElementById("fullscreen").src = "images/fullscreen.png";
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

var arrayorder = [];
var arraytarg = [];
var arraySrc = [];
var palabras = "";
var sort = false;

window.scrollTo(0,1);


document.getElementById("move").addEventListener("click", activateSort)



//autoLoopVideo();
//
function autoLoopVideo() {
	var videos = document.getElementsByTagName('video');
	for (let v = 0; v < videos.length; v++) {
		videos[v].play();
		videos[v].onended = function () {
//			this.load();
			this.play();
			this.setAttribute("autoloop","true")
			
		};
	}
}

function deleteWord(){
	palabras = "";
	hiddenWord.textContent = palabras;
}

function pauseVideo(){
	var videos = document.getElementsByTagName('video');
	for (let v = 0; v < videos.length; v++) {
		videos[v].pause();	
		}
	}
	


function addEvent(evento) {
	var sortables = document.getElementsByClassName("column");
	for (var i = 0; i < sortables.length; i++) {
		sortables[i].addEventListener("click", evento)
	}
}

function removeEvent(evento) {
	var sortables = document.getElementsByClassName("column");
	for (var i = 0; i < sortables.length; i++) {
		sortables[i].removeEventListener("click", evento)
	}
}

function activateSort() {
	if (!sort) {
		document.getElementById("move").src = "images/move2.png";
//		console.log("order activated");
		removeEvent(createArrayWords);
		addEvent(orderthis);
		sort = true;

	} else {
		sort = false;
		document.getElementById("move").src = "images/movedeac2.png";
//		console.log("order deactivated");
		removeEvent(orderthis);
		addEvent(createArrayWords);

	}
}


function createArrayWords() {
//	console.log(palabras);
	palabras = palabras + event.target.parentElement.getAttribute("data-message");
	hiddenWord.textContent = palabras;
	
}

function addCharacters(char) {
	palabras = palabras + char;	
//	console.log(palabras);

}

function orderthis() {
	var orderflex = event.target.parentElement.getAttribute("data-order");
	arrayorder.push(orderflex);
	arraytarg.push(event.target.parentElement);

	if (arrayorder.length === 2 && arraytarg.length === 2) {
		event.target.parentElement.style.order = arrayorder[0];
		event.target.parentElement.setAttribute("data-order", arrayorder[0]);
		arraytarg[0].style.order = arrayorder[1];
		arraytarg[0].setAttribute("data-order", arrayorder[1]);
		arrayorder = [];
		arraytarg = [];

	}
}

function sendInfo() {
	var btnemail = document.getElementById("email");
	btnemail.setAttribute("href", "mailto:micaela@ubiqum.com?body=" + arraypalabras)
}



function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

document.getElementById("dwn-btn").addEventListener("click", function () {
	var text = palabras
	text = text.replace(/([^\r])\n/g, "$1\r\n");
	var filename = "resultado.txt";
	download(filename, text);
}, false);

var space = '\n';


function createVideo(msg, ordernum, srcroute) {
	var div = document.createElement("div");
	div.setAttribute("data-message", msg);
	div.setAttribute("data-order", ordernum);
	div.style.order = ordernum;
	div.setAttribute("class", "column")
	var video = document.createElement("video");
//	video.setAttribute("autoplay","");
	video.setAttribute("muted", "");
//	video.setAttribute("loop", true);
	var source = document.createElement("source");
	source.src = srcroute
	source.type = "video/mp4";
	video.appendChild(source);
	div.appendChild(video);
//	video.load();
//	video.onended = function () {
//			this.play();
//		};
	document.getElementById("container").appendChild(div);
}

function modifyPlaybackRate(){
	var rate = event.target.textContent;
	console.log(rate);
	var videos = document.getElementsByTagName('video');
	for (let v = 0; v < videos.length; v++) {
		videos[v].playbackRate = rate;	
		}
	showSpeed();
}


function showText(){
	console.log("show me the text");
	hiddenText.style.display = "flex";
}

function hideText(){
	hiddenText.style.display = "none";
}

function showSpeed(){
	var menu = document.getElementsByClassName("dropdown-content")
	if (menuActive){
		for(let i = 0; i < menu.length; i++){
			menu[i].style.backgroundColor = "#ddd"
			menu[i].style.display = "none";
		}
		document.getElementById("dropbtn").style.backgroundColor = "#4CAF50";
		menuActive = false;
	} else{
		for(let i = 0; i < menu.length; i++){
			menu[i].style.backgroundColor = "#ddd"
			menu[i].style.display = "block";
		}
		document.getElementById("dropbtn").style.backgroundColor = "#3e8e41";
		menuActive = true;
	}
}





///Se agregan videos desde aquí
//siempre entre comillas, y el  primero sería el mensaje
// el segumdo es el orden en el que va salir el video
// el tercero seria el nombre del video, que estará dentro de la carpeta videos en la carpeta del proyecto (videos/ es la carpeta y luego el nombre del video más la extension ejemplo .mp4)


createVideo("mensaje oculto", "1", "videos/video1.mp4");
createVideo("b", "2", "videos/hola.mp4");
createVideo("c", "3", "videos/video3.mp4");
createVideo("d", "4", "videos/video4.mp4");
createVideo("e", "5", "videos/video5.mp4");
createVideo("f", "6", "videos/video6.mp4");
createVideo("g", "7", "videos/video7.mp4");
createVideo("h", "8", "videos/video8.mp4");
createVideo("i", "9", "videos/video9.mp4");
createVideo("j", "10", "videos/video10.mp4");
createVideo("k", "11", "videos/video1.mp4");
createVideo("l", "12", "videos/video3.mp4");
createVideo("m", "13", "videos/video4.mp4");
createVideo("n", "14", "videos/video5.mp4");
createVideo("ñ", "15", "videos/video6.mp4");
createVideo("o", "16", "videos/video7.mp4");
createVideo("p", "17", "videos/video8.mp4");
createVideo("q", "18", "videos/video9.mp4");
createVideo("r", "19", "videos/video1.mp4");
createVideo("s", "20", "videos/video2.mp4");
createVideo("t", "21", "videos/video3.mp4");
createVideo("u", "22", "videos/video4.mp4");
createVideo("v", "23", "videos/video5.mp4");
createVideo("w", "24", "videos/video6.mp4");
createVideo("y", "25", "videos/video7.mp4");
createVideo("x", "26", "videos/video8.mp4");
createVideo("z", "27", "videos/video9.mp4");
createVideo("1", "28", "videos/video1.mp4");
createVideo("2", "29", "videos/video2.mp4");
createVideo("3", "30", "videos/video3.mp4");
createVideo("4", "31", "videos/video4.mp4");
createVideo("5", "32", "videos/video5.mp4");
createVideo("6", "32", "videos/video6.mp4");
createVideo("7", "33", "videos/video7.mp4");
createVideo("8", "34", "videos/video8.mp4");
createVideo("9", "35", "videos/video9.mp4");
createVideo("10", "37", "videos/video8.mp4");
createVideo("10", "38", "videos/video8.mp4");









addEvent(createArrayWords);
