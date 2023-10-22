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

// Dark mode Management
darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
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
    } else {
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

    }
});
