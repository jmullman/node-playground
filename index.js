import 'dotenv/config'
// import { createServer } from 'http'
// import { App } from '@octokit/app'
import { createAppAuth } from '@octokit/auth-app'
import { Octokit } from '@octokit/core'

// initial Octokit to grab installation id
const myAuthApp = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: process.env.appId,
    privateKey: process.env.privateKey,
    oauth: {
      clientId: process.env.clientId,
      clientSecret: process.env.clientSecret
    },
    webhooks: {
      secret: 'supersecret'
    }
  }
})

// authenticate and pull JWT for app authentication
// the base JWT doesn't work with all the endpoints we need
const appAuth = await myAuthApp.auth({ type: 'app' })
const appToken = appAuth.token
const myRequest = myAuthApp.request.defaults({
  headers: {
    authorization: appToken
  }
})

// pull installations of app to get installation id
// installation auth requires installation id
const appInstall = await myRequest('GET /app/installations')
const appInstToken = appInstall.data[0].id

// new Octokit using installation authentication
const github = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    type: 'installation',
    appId: process.env.appId,
    privateKey: process.env.privateKey,
    installationId: appInstToken,
    refresh: true
  }
})

// our call to octocat endpoint
const octocat = await github.request('GET /octocat')
  .then((response) => { return response })

// octocat returns an Uin8Array, change to Buffer
const buf = Buffer.from(octocat.data)

// print the pretty cat as a string, and show length of buffer
console.log(
  `The Cat says:
  %s
  \n
Length of buffer: %d
  `, buf.toString(), buf.length)

const rlTotal = octocat.headers['x-ratelimit-limit']
const rlUsed = octocat.headers['x-ratelimit-used']
const rlRemaining = octocat.headers['x-ratelimit-remaining']
const rlResetAt = octocat.headers['x-ratelimit-reset']
const rlResetAtFmtd = new Date(Date.now() + (rlResetAt / 1000)) // can't be right

console.log(`
Rate limit total: ${rlTotal}
Rate limit used: ${rlUsed}
Rate limit remaining: ${rlRemaining}
Rate limit reset at: ${rlResetAtFmtd}
`)
