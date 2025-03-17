"use strict";

// Elements
const LoginBtn = document.getElementById("Log_btn");
const LogMail = document.getElementById("email");
const LogPsw = document.getElementById("psw");
const LogmailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const users = JSON.parse(localStorage.getItem("users")) || [];

LoginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const LogInputmail = LogMail.value.trim();
  const LogPassword = LogPsw.value.trim();
  const storedMail = localStorage.getItem("usermail");
  const storedPassWord = localStorage.getItem("userPassword");
  const user = users.find(
    (acc) => acc.email === LogInputmail && acc.userPassword === LogPassword
  );
  if (LogInputmail === "" || LogPassword === "") {
    return alert("Please fill the login Creditendals");
  }

  if (!LogmailFormat.test(LogInputmail)) {
    return alert("Enter a valid mail");
  }

  if (user) {
    localStorage.setItem("LoggedInuser", JSON.stringify(user.userId));
    window.location.href = "./dashboard.html";
  } else {
    alert("mail and password are Incorrect");
  }

  LogInputmail = "";
});
