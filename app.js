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
			link = link + `&t=${this.startTime}`;
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

const tracks = [
	new MusicTrack("Seek and Destroy", "FLTchCiC0T0"),
	new MusicTrack("Ride the Lightning", "DVOImtJY7po"),
	new MusicTrack("For Whom the Bell Tolls", "B_HSa1dEL9s"),
	new MusicTrack("Fade to Black", "9HZ_tx8aWuA"),
	new MusicTrack("Battery", "uzlOcupu5UE"),
	new MusicTrack("Master of Puppets", "u6LahTuw02c"),
	new MusicTrack("Blackened", "8G4xF_VGhEw", 36),
	new MusicTrack("One", "apK2jCrfnsk", 18),
	new MusicTrack("Enter Sandman", "XZuM4zFg-60"),
	new MusicTrack("Sad but True", "TpohVYomw2o"),
	new MusicTrack("The Unforgiven", "domjqjQ_WRI"),
	new MusicTrack("Fuel", "Ji_QolNU4I8")
];


// VARS
let trackId = Math.floor(Math.random() * tracks.length);

// FUNCS
function loadEmbededYtVideo (parentNode=videoContainer, embedLink = "")
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
	modalBtn.parentNode.classList.toggle('hidden');
	mainSect.classList.toggle('hidden');
}

function nextTrack ()
{
	if (trackId === tracks.length)
	{
		return null;
	}

	unloadEmbededYtVideo();
	trackId++;
	loadTrackFromInd();

	return true;
}

function prevTrack ()
{
	if (trackId === 0)
	{
		return null;
	}

	unloadEmbededYtVideo();
	trackId--;
	loadTrackFromInd();

	return true;
}

// EVENTLISTENERS
modalBtn.addEventListener('click', (evt) => {
	startApp();

	console.log(trackId);
	loadTrackFromInd();

	evt.target.parentNode.remove();
});

document.addEventListener('keydown', (evt) => {
	switch (evt.key) {
		case "ArrowLeft":
			prevTrack();
			break;
			
		case "ArrowRight":
			nextTrack();
			break;

		default:
			break;
	}
});

// MAIN