// const nf = require('node-fetch');
// import fetch from "node-fetch";

// fetch('https://httpbin.org/get')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not OK');
//         }
//         return response.json();
//         })
//         .then(data => console.log(data));

import {Octokit} from "@octokit/rest"

const github = new Octokit();


const octocat = await github.request('GET /octocat')
  .then((response) => {return response;});

function printCat(cat) {
  return String.fromCharCode.apply(null, new Uint8Array(cat));
}
console.log(printCat(octocat.data));
console.log(`octocat:
Status: %d
URL: %s
Headers: %s\n`, octocat.status, octocat.url, octocat.headers);

