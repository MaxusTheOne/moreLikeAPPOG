"use strict";
const dataUrl = "https://gateway.marvel.com:443/v1/public/characters";
const key = "954b0d51015e261f94d6e58cb4d55027c5fc51e2";
const hash = "b7c927ebf477e64b3ef47683655c259f";

window.addEventListener("load", start);

async function start() {
  const data = await getData();
}
async function getData() {
  const timestamp = Date.now();
  const rawData = await fetch(`${dataUrl}&ts=${timestamp}$apikey=${key}&hash=${hash}`, {
    method: "GET",
  });
  console.log(rawData);
}
