const elcardWrapper = document.querySelector(".card-wrapper");
const elForm = document.querySelector("form");
const elFormWrap = document.querySelector(".form-wrap");
const elBtnClose = document.querySelector(".btn-closee");
const elBtnSubmit = document.querySelector(".btn-submit");
const elEvtTarget = document.querySelector(".evtTarget");
const elWrapperChildren = document.querySelector(".wrapper-children");
const elIsearch = document.querySelector(".inp-search");
const elList = document.querySelector(".list-ul");
const loading = document.querySelector(".loading");
const logout = document.querySelector(".logout");

const localGet = JSON.parse(localStorage.getItem("data"));
if (!localGet) {
  window.location.replace("register.html");
}

logout.addEventListener("click", () => {
  localStorage.removeItem("data");
  window.location.replace("register.html");
});

let isClick = false;
function btnMadal() {
  if (!isClick) {
    elFormWrap.style.top = "0";
    isClick = true;
  } else {
    elFormWrap.style.top = "-700px";
    isClick = false;
  }
  elForm.reset();
}

elBtnClose.addEventListener("click", () => {
  btnMadal();
});
let ticherr = [];
let arr = [];

function postPutfunc(crad, ticherId, studId) {
  let obj = {};

  for (let i = 0; i < elWrapperChildren.children.length; i++) {
    let a = elWrapperChildren.children[i];
    let namee = a.children[0].textContent;
    let value = a.children[1].value;
    obj[namee] = value;
  }

  const CRUD = {
    post: {
      method: crad,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj),
    },
  };
  if (ticherr != 1) {
    getApi(`ticher${ticherId}`, CRUD.post);
  } else {
    getApi(`ticher/${ticherId}${studId}`, CRUD.post);
  }
}
let editID = [];
let searchArr = [];
let array = [];
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if (array[0].student) {
    if (ticherr[0] != 1) {
      postPutfunc("PUT", `/${array[0].student}`);
    } else {
      postPutfunc("PUT", array[0].ticher, `/ticherr/${array[0].student}`);
    }
  } else {
    let tId = array[0].ticher;
    if (ticherr[0] != 1) {
      postPutfunc("POST", "");
    } else {
      postPutfunc("POST", `${tId}`, "/ticherr");
    }
  }
  btnMadal();

  array = [];
});
elEvtTarget.addEventListener("click", (evt) => {
  if (evt.target.matches(".img")) {
    let studentId = evt.target.previousElementSibling.textContent;

    editID.push(studentId);
    student(`${studentId}`);

    for (let i = 0; i < elWrapperChildren.children.length; i++) {
      elWrapperChildren.children[i].children[1].value = "";
    }
    ticherr.push(1);
    searchArr = [];
  }

  if (evt.target.matches(".dropdown-ticher")) {
    student(`${evt.target.nextElementSibling.id}`);
  }

  if (evt.target.matches(".btn-edit")) {
    let studentId =
      evt.target.parentElement.parentElement.children[0].textContent;
    let ticherId =
      evt.target.parentElement.parentElement.children[2].textContent;
    array.push({
      ticher: ticherId,
      student: studentId,
    });

    btnMadal();
  }

  if (evt.target.matches(".btn-deleted")) {
    let studentId =
      evt.target.parentElement.parentElement.children[0].textContent;
    let ticherId =
      evt.target.parentElement.parentElement.children[2].textContent;

    if (ticherr[0] != 1) {
      postPutfunc("DELETE", `/${studentId}`);
    } else {
      postPutfunc("DELETE", `${ticherId}`, `/ticherr/${studentId}`);
    }
  }

  if (evt.target.matches(".btn-post")) {
    let ticherId = editID[0];
    array.push({
      ticher: ticherId,
    });
    btnMadal();
  }
});

async function getApi(id, crud) {
  const request = await fetch(
    `https://65796112f08799dc8046c2f9.mockapi.io/${id}`,
    crud
  );
  loader(true);

  const data = await request
    .json()
    .then((data) => render(data))
    .catch((error) => {
      console.log(error);
    });
  loader(false);
}
getApi("ticher");

function loader(item) {
  if (item) {
    loading.style.display = "block";
  } else {
    loading.style.display = "none";
  }
}
function student(id) {
  getApi(`ticher/${id}/ticherr`);
}

function render(data, sorchinp) {
  if (!data.firstName) {
    searchArr.push(data);
  }
  elcardWrapper.innerHTML = "";
  if (!data.firstName) {
    if (!data[0].ticherId) {
      elList.innerHTML = "";

      data.forEach((card) => {
        let nam = card.firstName;
        if (sorchinp) {
          let regex = new RegExp(sorchinp, "gi");
          const mark = card.firstName.replace(regex, `<mark>$&</mark>`);

          nam = mark;
        } else {
          nam = card.firstName;
        }

        elList.innerHTML += `<li> <img src="${card.avatar}" class="card-img-top dropdown-ticher " width="50" height="50" alt="foto"><a class=" dropdown-item" id="${card.id}" href="#">${card.firstName}</a></li>`;

        elcardWrapper.innerHTML += `
          <div class="card col card-create" style="width: 18rem;">
          <div class=" visually-hidden opacity-0"  >${card.id}</div>
          <img src="${card.avatar}" class="card-img-top img"  alt="foto">
          <h3 class="card-title">Ticher</h3>

          <ul class="list-group list-cardd list-group-flush">
          <li class="list-group-item">firsname: <span>${nam}</span></li>
          <li class="list-group-item">lastName: <span>${card.lastName}</span></li>
          <li class="list-group-item">field: <span>Jukki</span></li>
          <li class="list-group-item">${card.isMerid}</li>

          </ul>
          <div class="card-body ">
          <a href="mailto:${card.email}" class="card-link d-block">Email: ${card.email}</a>
          <a href="tel:${card.phone}" class="card-link d-block ms-0">Tel: ${card.phone}</a>
          </div>
          <div class="wrapper-btn d-flex">

          <button class="btn btn-info btn-edit w-50">edit</button>
          <button type="submit" class="btn btn-danger btn-deleted w-50">deleted</button>
          </div>
          </div>`;
      });
    } else if (data[0].ticherId) {
      data.forEach((card) => {
        let nam = card.firstName;

        if (sorchinp) {
          let regex = new RegExp(sorchinp, "gi");
          const mark = card.firstName.replace(regex, `<mark>$&</mark>`);
          nam = mark;
        } else {
          nam = card.firstName;
        }
        console.log(card);
        elcardWrapper.innerHTML += `
          <div class="card col card-create" style="width: 18rem;">
          <div  class="visually-hidden opacity-0">${card.id}</div>
          <img src="${card.avatar}" class="card-img-top " alt="foto">
          <div class=" visually-hidden opacity-0">${card.ticherId}</div>
          <h3 class="card-title">Studet</h3>
          <ul class="list-group list-cardd list-group-flush">
          <li class="list-group-item">firstname: <span>${nam}</span></li>
          <li class="list-group-item">lastName: <span>${card.lastName}</span></li>
          <li class="list-group-item">${card.isMerid}</li>
          </ul>
          <div class="card-body ">
          <a href="mailto:${card.email}" class="card-link d-block">Email: ${card.email}</a>
          <a href="tel:${card.phone}" class="card-link d-block ms-0">Tel: ${card.phone}</a>
          </div>
          <div class="wrapper-btn d-flex">
          <button class="btn btn-info btn-edit w-50">edit</button>
          <button type="submit"  class="btn btn-danger btn-deleted w-50">deleted</button>
          </div>
          </div>`;
      });
    }
  } else {
    if (ticherr[0] == 1) {
      student(data.ticherId);
    } else {
      getApi("ticher");
    }
  }
}

elIsearch.addEventListener("keyup", () => {
  let inpValue = elIsearch.value.trim().toLowerCase();
  let rezalt = searchArr[0].filter((item) => {
    let searchName = item.firstName.toLowerCase();

    return searchName.includes(inpValue);
  });

  render(rezalt, inpValue);
});
