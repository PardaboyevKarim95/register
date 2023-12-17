const elForm = document.querySelector("form");
const elEmail = document.querySelector("#email");
const elPassword = document.querySelector("#password");

const localGet = JSON.parse(localStorage.getItem("data"));
if (!localGet) {
  window.location.replace("register.html");
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (localGet.email != elEmail.value) {
    elEmail.classList.add("is-invalid");
    return elEmail.nextElementSibling.classList.remove("opacity-0");
  } else {
    elEmail.classList.remove("is-invalid");
    elEmail.nextElementSibling.classList.add("opacity-0");
  }
  if (localGet.password != elPassword.value) {
    elPassword.classList.add("is-invalid");
    return elPassword.nextElementSibling.classList.remove("opacity-0");
  } else {
    elPassword.classList.remove("is-invalid");
    elPassword.nextElementSibling.classList.add("opacity-0");
  }
  window.location.replace("index.html");

});
