document.getElementById("name").addEventListener("input", valName);
document.getElementById("email").addEventListener("input", valEmail);
document.getElementById("password").addEventListener("input", valPass);
document
  .getElementById("confirm_password")
  .addEventListener("input", valConfirmPass);

function valName() {
  let name = document.getElementById("name").value.trim();
  let nameRegex = /^[A-Za-z]+$/;
  if (!nameRegex.test(name)) {
    document.getElementById("nameError").innerText =
      "Name should contain characters only.";
  } else {
    document.getElementById("nameError").innerText = "";
  }
}

function valEmail() {
  let email = document.getElementById("email").value.trim();
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById("emailError").innerText =
      "Please enter a valid email address.";
  } else {
    document.getElementById("emailError").innerText = "";
  }
}

function valPass() {
  let pass = document.getElementById("password").value.trim();
  let passwordRegex = /^(?=.*[A-Z])(?=.*[@#\*\+\-]).{8,}$/;
  if (!passwordRegex.test(pass)) {
    document.getElementById("passwordError").innerText =
      "Password must be at least 8 characters long, include at least one uppercase letter and one symbol (@, #, *, +, -).";
  } else {
    document.getElementById("passwordError").innerText = "";
  }
}

function valConfirmPass() {
  let pass = document.getElementById("password").value.trim();
  let confirmPass = document.getElementById("confirm_password").value.trim();
  if (pass !== confirmPass) {
    document.getElementById("confirmPasswordError").innerText =
      "Passwords do not match.";
  } else {
    document.getElementById("confirmPasswordError").innerText = "";
  }
}

const validateForm = () => {
  // Run all validations before checking errors
  valName();
  valEmail();
  valPass();
  valConfirmPass();

  const isValid =
    document.getElementById("nameError").innerText === "" &&
    document.getElementById("emailError").innerText === "" &&
    document.getElementById("passwordError").innerText === "" &&
    document.getElementById("confirmPasswordError").innerText === "";

  if (isValid) {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    window.location.href = "./HTML/Home.html";
  }
  return isValid;
};
