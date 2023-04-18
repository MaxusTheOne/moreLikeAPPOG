"use strict";
// variables
const myData = "https://testdaba-a7b1d-default-rtdb.europe-west1.firebasedatabase.app";
window.addEventListener("load", start);

async function start() {
  const data = await getPosts();
  for (const obj in data) displayPosts(data[obj]);
  // await createPost("waaaat", "https://images.unsplash.com/photo-1465779171454-aa85ccf23be6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bG9vcHN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60", "This is a thing");
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
  console.log(`data given: ${element}`);
  const htmlObj = /*HTML*/ `
    <div class="post">
        <h3>${element.title}</h3>
        <img src="${element.image}" alt="">
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
}
