"use strict";

let users = [];

const listUsers = document.querySelector(".js-users");
const saveDatabtn = document.querySelector(".js-saveData");
const loadDatabtn = document.querySelector(".js-loadData");

function getData() {
  fetch("https://randomuser.me/api/?results=10")
    .then((response) => response.json())
    .then(function (data) {
      saveUsers(data);
      paintUsers(users);
      showBtn();
      handleBtns();
    })
    .catch(showError);
  function showError() {
    alert("Datos no disponibles");
    listUsers.innerHTML = `<button class="reload" onclick=location.reload()>Recargar</button>`;
  }
  function handleBtns() {
    saveDatabtn.addEventListener("click", saveFriends);
    loadDatabtn.addEventListener("click", loadFriends);

    function saveFriends() {
      localStorage.setItem("people", JSON.stringify(users));
    }

    function loadFriends() {
      listUsers.innerHTML = "";
      let saveUsers = JSON.parse(localStorage.getItem("people"));
      paintUsers(saveUsers);
    }
  }

  function saveUsers(data) {
    const datos = data.results;
    for (const dato of datos) {
      let user = {
        name: dato.name.first,
        last: dato.name.last,
        city: dato.location.city,
        picture: dato.picture.medium,
        username: dato.login.username,
        isFriend: false,
      };
      users.push(user);
    }
  }
}

function showBtn() {
  saveDatabtn.style.display = "initial";
  loadDatabtn.style.display = "initial";
}

function paintUsers(users) {
  for (let cont = 0; cont < users.length; cont++) {
    const isFriend = users[cont].isFriend;
    listUsers.innerHTML += `<div class="user" style=background-color:${isFriend ? "pink" : "lightblue"
      } id=user${cont} onclick=makeFriend(${cont})><img class="photos" src=${users[cont].picture
      }><br><b>${users[cont].name} ${users[cont].last}</b><br>${users[cont].city
      }<br>${users[cont].username}<br></div>`;
  }
}

function makeFriend(requestedUser) {
  //selección no amigos/amigos
  if (users[requestedUser].isFriend === false) {
    users[requestedUser].isFriend = true;
    //cambio de fondo
    let userFriend = document.querySelector("#user" + requestedUser);
    userFriend.style.background = "pink";
  } else {
    alert("ya es tu amigo");
  }
}
//# sourceMappingURL=main.js.map
