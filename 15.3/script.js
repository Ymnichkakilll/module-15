const wsUri = "wss://echo-ws-service.herokuapp.com";
//находим нужные элементы
const messageInput = document.querySelector('.message');
const btnSend = document.querySelector('.j-btn-message');
const btnGeo = document.querySelector('.j-btn-geo');

const windowMessage = document.getElementById('window-message');

//создаем новый вебсокет
let websocket = new WebSocket(wsUri);

websocket.onopen = function(evt) {
    console.log("CONNECTED");
};

websocket.onerror = function(evt) {
    console.log(evt.data);
};

websocket.onmessage = function(evt) {
    console.log(evt.data);
    addMessage(evt.data, 'flex-start');
};

//навешиваем обработчик на отправление сообщения
btnSend.addEventListener('click', () => {
	const message = messageInput.value;
	websocket.send(message);
	addMessage(message);
	messageInput.value = '';
});

//создаем функцию вывода сообщения в диалоговое окно
function addMessage(message, position = 'flex-end') {
	let element = `
        <p class="window-text" style="align-self: ${position}">
           ${message} 
        </p>    
	`;
	let chatWindow = windowMessage.innerHTML;
	windowMessage.innerHTML = chatWindow + element;
}

//
const error = () => {
	let error = "Geolocation not found";
	addMessage(error);
}

const success = (position) => {
	const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

	let link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude};`
	addLink(link);
}

//
function addLink(link) {
	let element = `
	    <a href="${link}" target="_blank" style="text-decoration: none">Geolocation</a>
    `;
   let chatWindow = windowMessage.innerHTML;
   windowMessage.innerHTML = chatWindow + element;
};

//
btnGeo.addEventListener('click', () => {
    if (!navigator.geolocation) {
        console.log("You can not use geolocation")
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    };
});