//Variables
const formSubmit = document.querySelector('#formulario');
const tweetArea = document.querySelector('#tweet');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Funciones
document.addEventListener('DOMContentLoaded', () => {
	tweets = JSON.parse(localStorage.getItem('tweets')) || [];
	createTweet();
});

const saveStorage = () => {
	localStorage.setItem('tweets', JSON.stringify(tweets));
};

const limpiarHTML = () => {
	while (listaTweets.firstChild) {
		listaTweets.removeChild(listaTweets.firstChild);
	}
};

const borrarTweet = (id) => {
	tweets = tweets.filter((tweet) => tweet.id !== id);
	createTweet();
	saveStorage();
};

function createTweet() {
	limpiarHTML();
	if (tweets.length > 0) {
		tweets.forEach((tweet) => {
			const tweetText = document.createElement('li');
			const deleteBtn = document.createElement('a');
			deleteBtn.textContent = 'X';
			deleteBtn.classList.add('borrar-tweet');
			deleteBtn.onclick = () => {
				borrarTweet(tweet.id);
			};
			tweetText.textContent = tweet.tweet;
			tweetText.appendChild(deleteBtn);
			listaTweets.appendChild(tweetText);
		});
	}
}

const agregarTweet = (e) => {
	e.preventDefault();
	if (tweetArea.value !== '') {
		const tweet = tweetArea.value.trim();
		const tweetObj = {
			id: Date.now(),
			tweet,
		};

		tweets = [...tweets, tweetObj];
		createTweet();
		formSubmit.reset();
	} else {
		showError('No se puede enviar un tweet sin mensaje');
	}
	saveStorage();
};

const showError = (message) => {
	if (!formSubmit.querySelector('.error')) {
		const error = document.createElement('p');
		error.textContent = message;
		error.classList.add('error');
		formSubmit.appendChild(error);

		setTimeout(() => {
			error.remove();
		}, 3000);
	}
};

//EventListeners
formSubmit.addEventListener('submit', agregarTweet);
