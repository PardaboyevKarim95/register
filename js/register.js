let elForm = document.querySelector("form");
let inpEmail = document.querySelector("#inp-email");
let inpName = document.querySelector("#inp-name");
let inpPhone = document.querySelector("#inp-phone");
let inpPassword = document.querySelector("#inp-password");
const arr = [];

const localGet = JSON.parse(localStorage.getItem("data"));
if (localGet) {
  window.location.replace("login.html");
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  arr.push({
    user_name: inpName.value,
    password: inpPassword.value,
    email: inpEmail.value,
    phone: inpPhone.value,
  });
  localStorage.setItem("data", JSON.stringify(arr[0]));
  window.location.replace("login.html");
});
