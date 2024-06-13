function loadEmbededYtVideo (videoCode)
{
	const footer = document.querySelector('footer');
	const ytPlayer = document.createElement('iframe');

	console.log()

	ytPlayer.setAttribute("src", "https://www.youtube.com/embed/FLTchCiC0T0?si=ok7qhPOaF_kUtMXU&autoplay=1&enablejsapi=1&rel=0&mute=1");
	ytPlayer.setAttribute("frameborder", "0");
	ytPlayer.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
	ytPlayer.setAttribute("allowfullscreen", "");
	ytPlayer.classList.add('yt-player');

	footer.appendChild(ytPlayer);
}


if (confirm('Autoriser le site a jouer de la musique')) {

	


}