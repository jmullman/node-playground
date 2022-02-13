import 'dotenv/config'
import { createAppAuth } from '@octokit/auth-app'
import { Octokit } from '@octokit/core'

// easy way to create a new app
const myAuthApp = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: process.env.appId,
    privateKey: process.env.privateKey
  }
})

// requesting JWT for other calls
const appAuth = await myAuthApp.auth({ type: 'app' })
const APPAUTHTOKEN = appAuth.token
export default APPAUTHTOKEN
