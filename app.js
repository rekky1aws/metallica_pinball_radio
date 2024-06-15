// CLASS
class Music {
	constructor (title="", videoCode="") 
	{
		this.title = title;
		this.videoCode = videoCode;
	}

	get title ()
	{
		return this.title;
	}

	get videoCode ()
	{
		return this.videoCode;
	}
}

// CONSTS
const header = document.querySelector('header');
const mainElt = document.querySelector('main');
const footer = document.querySelector('footer');
const modalBtn = document.querySelector('#modal-btn');

// VARS

// FUNCS
function loadEmbededYtVideo (videoCode = "")
{
	const ytPlayer = document.createElement('iframe');

	ytPlayer.setAttribute("src", `https://www.youtube.com/embed/${videoCode}?si=ok7qhPOaF_kUtMXU&autoplay=1&enablejsapi=1&rel=0`);
	ytPlayer.setAttribute("frameborder", "0");
	ytPlayer.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
	ytPlayer.setAttribute("allowfullscreen", "");
	ytPlayer.classList.add('yt-player');

	footer.appendChild(ytPlayer);
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
	loadEmbededYtVideo('FLTchCiC0T0');
	loadEmbededYtVideo('X8OeBZQn3_w');
	e.target.parentNode.remove();
});

// MAIN