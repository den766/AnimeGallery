"use strict";

// elements

const Email = document.getElementById("email");
const Password = document.getElementById("psw");
const PasswordRepeat = document.getElementById("psw-repeat");
const Radio = document.getElementById("toggleRadio");
const RegButton = document.querySelector(".btnR");
const mailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passChar = ["a", "b", "c", "d", "e", "f", "g", "h"];
Email.focus();

// getting stored users from localstorage
const users = JSON.parse(localStorage.getItem("users")) || [];

// Registor Button Functionality
RegButton.addEventListener("click", function (e) {
  e.preventDefault();
  const EmaiInput = Email.value.trim();
  const PassInput = Password.value.trim();
  const PassRInput = PasswordRepeat.value.trim();

  if (EmaiInput === "" || PassInput === "" || PassRInput === "") {
    return alert("Please fill out all fields");
  }

  if (!mailFormat.test(EmaiInput)) {
    return alert("Enter a valid email");
  }

  if (PassInput !== PassRInput) {
    return alert("Password Doesn't Match");
  }

  if (PassInput.length && PassRInput.length < passChar.length) {
    return alert("Password must 8 characters or more!");
  }

  if (!Radio.checked) {
    return alert("please check the Terms and Conditions");
  }

  if (localStorage.getItem(users.EmaiInput)) {
    return alert("Mail is already exist");
  }

  let newuser = {
    userId: Date.now(),
    email: EmaiInput,
    userPassword: PassRInput,
  };

  users.push(newuser);

  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "../pages/login.html";
});

console.log(Date.now());
