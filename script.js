"use strict";
// variables
const myData = "https://testdaba-a7b1d-default-rtdb.europe-west1.firebasedatabase.app";
window.addEventListener("load", start);

async function start() {
  const postData = await getPosts();
  const userData = await getUsers();
  displayPosts(postData);
  displayUsers(userData);
  // await createPost("waaaat", "https://images.unsplash.com/photo-1465779171454-aa85ccf23be6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bG9vcHN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60", "This is a thing");
  // updatePost("-NTJ2b6NrXk-E8yJyRO2", "My Second Post", "https://images.unsplash.com/photo-1641876749963-550554c7258d");
  // deletePost("-NTJ2b6NrXk-E8yJyRO2");
}

async function getPosts() {
  const rawData = await fetch(myData + "/posts.json");
  const data = await rawData.json();
  return preparePostsData(data);
}

function preparePostsData(dataObject) {
  const postArray = [];
  for (const key in dataObject) {
    const post = dataObject[key];
    postArray.push(post);
  }
  return postArray;
}

async function getUsers() {
  const rawData = await fetch(myData + "/users.json");
  const data = await rawData.json();
  return prepareUsersData(data);
}
function prepareUsersData(dataObject) {
  const userArray = [];
  for (const key in dataObject) {
    const user = dataObject[key];
    userArray.push(user);
  }
  return userArray;
}

function displayPosts(objList) {
  for (const obj in objList) displayPost(objList[obj]);
}

function displayPost(element) {
  const postsSelector = document.querySelector("#posts");
  console.log(`data given: ${element}`);
  const htmlObj = /*HTML*/ `
    <div class="post card">
        <h3>${element.title}</h3>
        <img src="${element.image}" alt="">
        <div class="body">${element.body}</div>
    </div>
    `;
  postsSelector.insertAdjacentHTML("beforeend", htmlObj);
}
async function createPost(title, image, body) {
  const postObj = {
    title: `${title}`,
    image: `${image}`,
    body: `${body}`,
  };
  console.log(postObj);
  const postToJson = JSON.stringify(postObj);
  console.log(postToJson);
  const response = await fetch(`${myData}/posts.json`, {
    method: "POST",
    body: postToJson,
  });
  displayNewPost(postObj);
}

function displayNewPost(element) {
  displayPost(element);
}
async function updatePost(id, title, image) {
  const postToUpdate = { title, image };
  const postAsJson = JSON.stringify(postToUpdate);
  const url = `${myData}/posts/${id}.json`;

  const res = await fetch(url, { method: "PUT", body: postAsJson });
  const data = await res.json();
  console.log(data);
  // updateNewPost(id);
}

async function deletePost(id) {
  const url = `${myData}/posts/${id}.json`;
  const res = await fetch(url, { method: "DELETE" });
  console.log(res);
}

function displayUsers(objList) {
  for (const obj in objList) displayUser(objList[obj]);
}

function displayUser(element) {
  const usersSelector = document.querySelector("#users");
  console.log(`data given: ${element}`);
  const htmlObj = /*HTML*/ `
    <div class="user card">
        <h3>${element.title}</h3>
        <h3>${element.name}</h3>
        <h4>${element.mail}</h4>
        <img src="${element.image}" alt="">
        <div class="body">${element.phone}</div>
    </div>
    `;
  usersSelector.insertAdjacentHTML("beforeend", htmlObj);
}
