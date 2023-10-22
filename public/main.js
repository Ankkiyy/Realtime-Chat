// const socket = io("https://localhost:3000");
const socket = io();

const nameInp = document.getElementById("name");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("msg-form");
const messageInp = document.getElementById("msg-inp");
const sourceUrl = window.location.href



// A Simple Name Modal
// Add this JavaScript code to your "main.js" file
document.addEventListener("DOMContentLoaded", function () {
    // console.log("DOM loaded");
    const usernameModal = document.getElementById("usernameModal");
    const usernameInput = document.getElementById("usernameInput");
    const submitUsername = document.getElementById("submitUsername");

    // Show the modal when the page loads
    usernameModal.style.display = "block";

    submitUsername.addEventListener("click", function () {
        let username = usernameInput.value.trim(); // Remove leading and trailing spaces

        // Check if the username contains any unwanted characters
        if (/^[a-zA-Z0-9-_]+$/.test(username)) {
            usernameModal.style.display = "none";
            nameInp.value = username;
        } else {
            alert("Please enter a valid username without special characters.");
        }
    });
});

messageInp.addEventListener("blur", () => {
    clearFeedback();
});

messageInp.addEventListener("focus", () => {
    socket.emit("feedback", nameInp.value);
});

messageInp.addEventListener("keypress", () => {
    socket.emit("feedback", nameInp.value);
    clearTimeout(typingTimeout);
    const typingTimeout = setTimeout(() => {
        socket.emit("notyping", true);
    }, 1500); // Adjust the timeout duration as needed (e.g., 1500 milliseconds)
});

socket.on('feedback', (data) => {
    if (data === '') return
    clearFeedback()
    const element = `
          <li class="msg-feedback">
            <p class="feedback" id="feedback">${data}</p>
          </li>
    `
    messageContainer.innerHTML += element

    sendPushNotification('AnkiyCodes', data, sourceUrl);
})

function clearFeedback() {
    document.querySelectorAll('li.msg-feedback').forEach((element) => {
        element.parentNode.removeChild(element)
    })
}

socket.on('notyping', (data) => {
    clearFeedback()
});

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendMessage();
});

function sendMessage() {
    const data = {
        name: nameInp.value,
        message: messageInp.value,
        date: new Date(),
        ip: ""
    };
    socket.emit("message", data);
    messageInp.value = "";
    appendMessage(true, data);
    socket.emit("notyping", true);
}

socket.on('client-total', (data) => {
    // console.log(data);
    document.getElementById('client-total').innerHTML = `🟢 ${data}`;
});

socket.on('message', (data) => {
    // console.log("Server Sent Data : ", data);
    appendMessage(false, data);
    sendPushNotification(data.name, data.message, sourceUrl);
});

function appendMessage(isOwn, data) {
    // console.log("Message: ", data);

    // Determine the class based on isOwn
    const className = isOwn ? "msg-right" : "msg-left";
    const uname = isOwn ? "You" : data.name;

    const messageElement = `
    <li class="${className}">
        <p class="msg"> ${data.message}
            <br>
            <span>${uname} 🟢 ${moment(data.date).fromNow()}</span>
        </p>
    </li>
    `;

    messageContainer.innerHTML += messageElement;
}

function sendPushNotification(name, message, sourceUrl) {
    navigator.serviceWorker.register('sw.js');

    if ('Notification' in window) {
        Notification.requestPermission().then(function (permission) {
            if (permission === 'granted') {
                const options = {
                    body: message,
                    icon: '/icon.png',
                    badge: '/badge.png',
                    vibrate: [200, 100, 200],
                };
                navigator.serviceWorker.ready.then(function (registration) {
                    registration.showNotification(name, options);
                });
            } else {
                Notification.requestPermission();
            }
        });
    } else {
        console.log('Notification API is not supported in this browser.');
    }
}
