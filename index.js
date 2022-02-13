import 'dotenv/config'
// import { createServer } from 'http'
// import { App, createNodeMiddleware } from '@octokit/app'
import { createAppAuth } from '@octokit/auth-app'
import { Octokit } from '@octokit/core'

const myAuthApp = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: process.env.appId,
    privateKey: process.env.privateKey
    // installationId: 171973
    // oauth: {
    // clientId: process.env.clientId,
    // clientSecret: process.env.clientSecret
  // }
  // webhooks: {
  //   secret: 'supersecret'
  }// }
})
const appAuth = await myAuthApp.auth({ type: 'app' })
console.log(appAuth.token)
// Send requests as GitHub App
// const { slug } = await myAuthApp.request('GET /user')
// console.log('authenticated as %s', slug)

// myAuthApp.webhooks.on('issues.opened', async ({ octokit, payload }) => {
//   await octokit.request(
//     'POST /repos/{owner}/{repo}/issues/{issue_number}/comments',
//     {
//       owner: payload.repository.owner.login,
//       repo: payload.repository.name,
//       issue_number: payload.issue.number,
//       body: 'Hello World!'
//     }
//   )
// })
// myAuthApp.webhooks.onAny((id, name, payload) => {
//   console.log('id: %d name: %s payload: %s', id, name, payload)
// })

// createServer(createNodeMiddleware(myAuthApp)).listen(3000)

// console.log('authenticated as name: %s, with token: %s', data.name, data.token)
// import { Octokit } from '@octokit/rest'

// const github = new Octokit()

// const githubProps = Object.getOwnPropertyNames(github)
// const githubRestProps = Object.getOwnPropertyNames(github.rest)

// console.log('Base Property Names: %s', githubProps)
// console.log('Rest Property Names: %s', githubRestProps)

// console.log(Object.getOwnPropertyNames(github.rest))
// const octocat = await github.request('GET /octocat')
//   .then((response) => { return response })

// const buf = Buffer.from(octocat.data)

// console.log(
//   `The Cat says:
//   %s
//   \n
// Length of buffer: %d
//   `, buf.toString(), buf.length)
// function printCat (cat) {
//   return String.fromCharCode.apply(null, new Uint8Array(cat))
// }
// console.log(printCat(octocat.data))
// console.log(`octocat:
// Status: %d
// URL: %s
// Headers: %s\n`, octocat.status, octocat.url, octocat.headers)
