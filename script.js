"use strict";
// variables
const myData = "https://testdaba-a7b1d-default-rtdb.europe-west1.firebasedatabase.app";
window.addEventListener("load", start);

async function start() {
  const data = await getPosts();
  for (const obj in data) displayPosts(data[obj]);
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

function displayPosts(element) {
  const postsSelector = document.querySelector("#posts");
  console.log(`data give: ${element}`);
  const htmlObj = /*HTML*/ `
    <div class="post">
        <img src="${element.image}" alt="">
    </div>
    `;
  postsSelector.insertAdjacentHTML("beforeend", htmlObj);
}
