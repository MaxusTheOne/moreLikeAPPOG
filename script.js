"use strict";
// variables
const myData = "https://testdaba-a7b1d-default-rtdb.europe-west1.firebasedatabase.app";
window.addEventListener("load", start);

async function start() {
  console.log(await getPosts());
}

async function getPosts() {
  const rawData = await fetch(myData + "/posts.json");
  const data = await rawData.json();
  preparePostsData(data);
  return data;
}

function preparePostsData(dataObject) {
  const postArray = [];
  for (const key in dataObject) {
    const post = dataObject[key];
    postArray.push(post);
  }
  console.log(postArray);
  return postArray;
}
