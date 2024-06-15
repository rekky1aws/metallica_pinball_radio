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
		return `https://www.youtube.com/embed/${this.videoCode}?t=${this.startTime}&autoplay=1&enablejsapi=1&rel=0`;
	}
}

// CONSTS
const header = document.querySelector('header');
const mainElt = document.querySelector('main');
const footer = document.querySelector('footer');
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
	new MusicTrack("Enter Sandman", "XZuM4zFg"),
	new MusicTrack("Sad but True", "TpohVYomw2o"),
	new MusicTrack("The Unforgiven", "domjqjQ_WRI"),
	new MusicTrack("Fuel", "Ji_QolNU4I8")
];


// VARS

// FUNCS
function loadEmbededYtVideo (parentNode, embedLink = "")
{
	const ytPlayer = document.createElement('iframe');

	ytPlayer.setAttribute("src", embedLink);
	ytPlayer.setAttribute("frameborder", "0");
	ytPlayer.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
	ytPlayer.setAttribute("allowfullscreen", "");
	ytPlayer.classList.add('yt-player');

	parentNode.appendChild(ytPlayer);
}

function startApp () 
{
	header.classList.toggle('hidden');
	mainElt.classList.toggle('hidden');
	footer.classList.toggle('hidden');
}

// EVENTLISTENERS
modalBtn.addEventListener('click', (e) => {
	startApp();
	
	e.target.parentNode.remove();
});

// MAIN