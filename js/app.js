// Get Hash from string.
String.prototype.hashCode = function ()
{
	let hash = 0;
	let i, chr;
	if (this.length === 0) {
		return hash;
	}
	for(i = 0; i < this.length; i++) {
		chr = this.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0;
	}
	return hash;
}

// CLASS
class MusicTrack {
	_gaugePercent = null;
	
	constructor (title="", videoCode="", startTime=0) 
	{
		this._title = title;
		this._videoCode = videoCode;
		this._startTime = startTime;
	}

	get gaugePercent ()
	{
		return this._gaugePercent;
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

	set gaugePercent (gaugePercent)
	{
		this._gaugePercent = gaugePercent;
	}

	generateIFrame ()
	{
		let player;
		player = new YT.Player('player', {
			height: '360',
			width: '640',
			videoId: this.videoCode,
			playerVars : {
				autoplay: 1,
				loop: 1,
				start: this.startTime
			},
			events: {
				'onReady': onPlayerReady
			}
		});

		this._player = player;
	}
}

// CONSTS
	// HTML Elements
		// Containers
const footer = document.querySelector('footer');
const header = document.querySelector('header');
const mainSect = document.querySelector('#main-sect');
const sfx = document.querySelector('#sfx');
const videoContainer = document.querySelector('#video-container');
		// Modal
const modalBtn = document.querySelector('#modal-btn');
const remakeTracksChbx = document.querySelector('#remake-tracks');
	// Animations
const leftKnob = document.querySelector('.left-knob');
const leftGaugeContent = document.querySelector('.left-gauge-content');
const selArrow = document.querySelector('.selector-arrow');
const songNameElt = document.querySelector('.song-name');

const tracksOriginal = [
	// MusicTrack(string:title, string:youtbe_hash, int:start_time_in_sec)
	new MusicTrack("Seek & Destroy", "FLTchCiC0T0"),
	new MusicTrack("Ride The Lightning", "DVOImtJY7po"),
	new MusicTrack("For Whom The Bell Tolls", "B_HSa1dEL9s"),
	new MusicTrack("Fade to Black", "9HZ_tx8aWuA"),
	new MusicTrack("Battery", "RvW4OQFA_UY"),
	new MusicTrack("Master Of Puppets", "u6LahTuw02c"),
	new MusicTrack("Blackened", "8G4xF_VGhEw", 36),
	new MusicTrack("One", "apK2jCrfnsk", 18),
	new MusicTrack("Enter Sandman", "XZuM4zFg-60"),
	new MusicTrack("Sad But True", "TpohVYomw2o"),
	new MusicTrack("The Unforgiven", "domjqjQ_WRI"),
	new MusicTrack("Fuel", "Ji_QolNU4I8")
	];

const tracksRemake = [
	// MusicTrack(string:title, string:youtbe_hash, int:start_time_in_sec)
	new MusicTrack("Hit The Lights", "1bW2DMOeDEM"),
	new MusicTrack("Seek & Destroy", "FLTchCiC0T0"),
	new MusicTrack("Ride The Lightning", "DVOImtJY7po"),
	new MusicTrack("For Whom The Bell Tolls", "B_HSa1dEL9s"),
	new MusicTrack("Fade to Black", "9HZ_tx8aWuA"),
	new MusicTrack("Battery", "RvW4OQFA_UY"),
	new MusicTrack("Master Of Puppets", "u6LahTuw02c"),
	new MusicTrack("Blackened", "8G4xF_VGhEw", 36),
	new MusicTrack("One", "apK2jCrfnsk", 18),
	new MusicTrack("Enter Sandman", "XZuM4zFg-60"),
	new MusicTrack("Sad But True", "TpohVYomw2o"),
	new MusicTrack("The Unforgiven", "domjqjQ_WRI"),
	new MusicTrack("King Nothing", "Xz9DX_VMXdI"),
	new MusicTrack("Fuel", "Ji_QolNU4I8"),
	new MusicTrack("Frantic", "Sq3eLdixvCc"),
	new MusicTrack("Hardwired", "THO9ycDW8tA"),
	new MusicTrack("Moth Into Flame", "BtRyz1qGI8c"),
	new MusicTrack("Spit Out The Bone", "JQ6s7pNiC6A"),
	new MusicTrack("72 Seasons", "0rVIEj7zgOo"),
	new MusicTrack("If Darknes Had a Son", "GkUC44CWwjw")
	];


// VARS
let modalClicked = false;
let tracks = tracksOriginal;
let trackId = Math.floor(Math.random() * tracks.length);
let trackPos = [];
let isMusicPlaying = true;
let stopSweep;

// FUNCS
function unloadEmbededYtVideo ()
{
	const player = document.createElement('div');
	player.id = "player";
	videoContainer.innerHTML = "";
	videoContainer.append(player);
}

function loadTrackFromInd (i = trackId)
{
	tracks[i].generateIFrame();
}

function volumeChange (value = 0)
{
	const currentVolume = tracks[trackId]._player.getVolume();
	const newVolume = Math.min(Math.max(0, currentVolume + value), 100);

	tracks[trackId]._player.setVolume(newVolume);
}

function volumeUp ()
{
	volumeChange(5);
}

function volumeDown ()
{
	volumeChange(-5);
}

function startApp () 
{
	if (modalClicked) {
		return null;
	}

	if (remakeTracksChbx.checked) {
		tracks = tracksRemake;
	} else {
		tracks = tracksOriginal;
	}

	setAllGaugePercent();
	loadTrackFromInd();
	genTrackPos();
	setSelArrPos();
	displaySongName();
	rotateLeftKnob();
	fillLeftGauge();

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
	rotateLeftKnob();
	fillLeftGauge();
}

function pauseTrack () // NOT FINISHED
{
	if (isMusicPlaying) {
		tracks[trackId]._player.pauseVideo();
		songNameElt.innerHTML = "&#x23F8;";

	} else {
		tracks[trackId]._player.playVideo();
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

function rotateLeftKnob ()
{
	leftKnob.style.boxShadow = `0 0 0.25vh 0.25vh rgba(0,0,0,0.5), inset -0.25vh -0.25vh 0.25vh 0.25vh rgba(0,0,0,0.5), inset 0.25vh 0.25vh 0.25vh 0.25vh rgba(255,255,255,0.5);`;
	leftKnob.style.transform = `rotate(${(trackPos[trackId] / 100 * 300) - 160}deg)`;
}

function fillLeftGauge ()
{
	leftGaugeContent.style.height = `${tracks[trackId].gaugePercent}%`;
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

function onPlayerReady(event) {
	event.target.playVideo();
}

function setAllGaugePercent() {
	const maxValue = 1.1 * Math.max(...tracks.map(e => Math.abs(e.videoCode.hashCode())));

	tracks.forEach( (track) => {
		track.gaugePercent = Math.floor(Math.abs(track.videoCode.hashCode()) / maxValue * 100);
	});
}

// EVENTLISTENERS
modalBtn.addEventListener('click', startApp);
songNameElt.parentNode.addEventListener('touchend', pauseTrack);

document.addEventListener('keydown', (evt) => { // key Press
	if (!modalClicked) {
		if (evt.key === "Enter") {
			startApp();
		}
		return null;
	}

	switch (evt.code) {
	case "ArrowUp":
		volumeUp();
		break;

	case "ArrowDown":
		volumeDown();
		break;

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