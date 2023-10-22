const darkModeToggle = document.getElementById("darkModeToggle");
const messageCont = document.getElementById("message-container");
const userLogo = document.getElementById("userLogo");
const userName = document.getElementById("name");
const msgForm = document.getElementById("msg-form");
const msgInp = document.getElementById("msg-inp");
const msgRight = document.getElementsByClassName("msg-right");
const msgLeft = document.getElementsByClassName("msg-left");
const body = document.body;
const main = document.getElementsByClassName("main");
const feedback = document.getElementById("feedback");

// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

// Function to get a cookie value
function getCookie(name) {
    const cookieName = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

setCookie("darkModePreference", "dark", 365);

// Check if dark mode preference is saved in a cookie
const darkModePreference = getCookie("darkModePreference");

darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
        enableDarkMode();
        // console.log("Dark mode enabled");
        // Save the dark mode preference as a cookie
        setCookie("darkModePreference", "dark", 365); // This sets the cookie to last for 1 year
    } else {
        disableDarkMode();
        // console.log("Dark mode disabled");
        // Remove the dark mode cookie
        setCookie("darkModePreference", "", -1); // This deletes the cookie
    }
});
// Set the dark mode based on the cookie preference
if (darkModePreference === "dark") {
    darkModeToggle.checked = true;
    enableDarkMode();
}

// Dark mode Management

function enableDarkMode() {
    body.classList.add("dark-mode");
    messageCont.classList.add("dark-mode-message-container");
    userLogo.classList.add("dark-mode-user-logo");
    userName.classList.add("dark-mode-user-name");
    msgForm.classList.add("dark-mode-msg-form");
    msgInp.classList.add("dark-mode-msg-inp");
    for (let i = 0; i < msgRight.length; i++) {
        msgRight[i].classList.add("dark-mode-msg-right");
    }
    for (let i = 0; i < msgLeft.length; i++) {
        msgLeft[i].classList.add("dark-mode-msg-left");
    }
    main[0].style.backgroundColor = "#1a1a1a";
    feedback.style.color = "#fff";
    document.getElementById("client-total").style.color = "#fff";

}

function disableDarkMode() {
    body.classList.remove("dark-mode");
    messageCont.classList.remove("dark-mode-message-container");
    userLogo.classList.remove("dark-mode-user-logo");
    userName.classList.remove("dark-mode-user-name");
    msgForm.classList.remove("dark-mode-msg-form");
    msgInp.classList.remove("dark-mode-msg-inp");
    for (let i = 0; i < msgRight.length; i++) {
        msgRight[i].classList.remove("dark-mode-msg-right");
    }
    for (let i = 0; i < msgLeft.length; i++) {
        msgLeft[i].classList.remove("dark-mode-msg-left");
    }
    main[0].style.backgroundColor = "#fff";
    feedback.style.color = "#000"; // Remove the inline style
    document.getElementById("client-total").style.color = "#000";
}
