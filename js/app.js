// CLASS
class MusicTrack {
	constructor (title="", videoCode="", startTime=0) 
	{
		this._title = title;
		this._videoCode = videoCode;
		this._startTime = startTime;
	}

	get title ()
	{
		return this._title;
	}

	get videoCode ()
	{
		return this._videoCode;
	}

	get startTime ()
	{
		return this._startTime;
	}

	get embedLink ()
	{
		let link = `https://www.youtube.com/embed/${this.videoCode}?si=2GYxFb57x9jPFMcA&autoplay=1&enablejsapi=1&rel=0`;
		if (this.startTime > 0) {
			link = link + `&start=${this.startTime}`;
		}

		return link;
	}
}

// CONSTS
const header = document.querySelector('header');
const footer = document.querySelector('footer');
const mainSect = document.querySelector('#main-sect');
const videoContainer = document.querySelector('#video-container');
const modalBtn = document.querySelector('#modal-btn');
const sfx = document.querySelector('#sfx');
const selArrow = document.querySelector('.selector-arrow');
const songNameElt = document.querySelector('.song-name');

const tracks = [
	// MusicTrack(string:title, string:youtbe_hash, int:start_time_in_sec)
	new MusicTrack("Seek and Destroy", "FLTchCiC0T0"),
	new MusicTrack("Ride the Lightning", "DVOImtJY7po"),
	new MusicTrack("For Whom the Bell Tolls", "B_HSa1dEL9s"),
	new MusicTrack("Fade to Black", "9HZ_tx8aWuA"),
	new MusicTrack("Battery", "RvW4OQFA_UY"),
	new MusicTrack("Master of Puppets", "u6LahTuw02c"),
	new MusicTrack("Blackened", "8G4xF_VGhEw", 36),
	new MusicTrack("One", "apK2jCrfnsk", 18),
	new MusicTrack("Enter Sandman", "XZuM4zFg-60"),
	new MusicTrack("Sad but True", "TpohVYomw2o"),
	new MusicTrack("The Unforgiven", "domjqjQ_WRI"),
	new MusicTrack("Fuel", "Ji_QolNU4I8")
];


// VARS
let modalClicked = false;
let trackId = Math.floor(Math.random() * tracks.length);
let trackPos = [];
let isMusicPlaying = true;
let stopSweep;

// FUNCS
function loadEmbededYtVideo (parentNode = videoContainer, embedLink = "")
{
	const ytPlayer = document.createElement('iframe');

	ytPlayer.setAttribute("src", embedLink);
	ytPlayer.setAttribute("frameborder", "0");
	ytPlayer.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
	ytPlayer.setAttribute("allowfullscreen", "");
	ytPlayer.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
	ytPlayer.classList.add('yt-player');

	parentNode.appendChild(ytPlayer);
}

function unloadEmbededYtVideo (parentNode=videoContainer)
{
	parentNode.innerHTML = "";
}

function loadAllTracks (parentNode=videoContainer)
{
	tracks.forEach((elt) => {
		loadEmbededYtVideo(parentNode, elt.embedLink);
	});
}

function loadTrackFromInd (i=trackId, parentNode=videoContainer)
{
	loadEmbededYtVideo(parentNode, tracks[i].embedLink);
}

function startApp () 
{
	if (modalClicked) {
		return null;
	}

	loadTrackFromInd();
	genTrackPos();
	setSelArrPos();
	displaySongName();

	modalBtn.parentNode.classList.toggle('hidden');
	mainSect.classList.toggle('hidden');
	modalClicked = true;
}

function nextTrack ()
{
	if (trackId === tracks.length - 1)
	{
		return null;
	}

	trackId++;
	changeTrack();

	return true;
}

function prevTrack ()
{
	if (trackId === 0)
	{
		return null;
	}

	trackId--;
	changeTrack();

	return true;
}

function changeTrack ()
{
	shortRadioSweep();
	unloadEmbededYtVideo();
	loadTrackFromInd();
	setSelArrPos();
	displaySongName();
}

function pauseTrack ()
{
	if (isMusicPlaying) {
		songNameElt.innerHTML = "&#x23F8;";

	} else {
		songNameElt.innerHTML = tracks[trackId].title;
	}
	isMusicPlaying = !isMusicPlaying;
}

function genTrackPos ()
{
	for (let i = 0; i < tracks.length; i++) {
		let interval = 100 / tracks.length;
		let offset = i * interval;
		let pos = Math.floor(offset + (Math.random() * interval));
		trackPos.push(pos);
	}

	console.log(trackPos);
}

function displaySongName ()
{
	songNameElt.textContent = tracks[trackId].title;
}

function setSelArrPos ()
{
	selArrow.style.left = `calc(${trackPos[trackId]}% - 0.25vh)`;
}

function playRadioSweep ()
{
	sfx.play();
}

function stopRadioSweep ()
{
	sfx.pause();
}

function shortRadioSweep ()
{
	playRadioSweep();
	stopSweep = setTimeout(stopRadioSweep, 1000);
}

// EVENTLISTENERS
modalBtn.addEventListener('click', startApp);

document.addEventListener('keydown', (evt) => {
	if (!modalClicked) {
		if (evt.key === "Enter") {
			startApp();
		}
		return null;
	}

	switch (evt.code) {
		case "ArrowLeft":
			prevTrack();
			break;
			
		case "ArrowRight":
			nextTrack();
			break;

		case "Space":
			pauseTrack();
			break;

		default:
			break;
	}
});

// MAIN