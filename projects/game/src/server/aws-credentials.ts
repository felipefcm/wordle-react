
import { Credentials } from '@aws-sdk/types'

const isVercel = process.env.VERCEL || false

const localCredentials: Credentials = {
	accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
	sessionToken: process.env.AWS_SESSION_TOKEN || '',
	expiration: new Date(process.env.AWS_SESSION_EXPIRATION || '')
}

const remoteCredentials: Credentials = {
	accessKeyId: process.env.AWS_KEY_ID || '',
	secretAccessKey: process.env.AWS_SECRET || '',
}

export default (isVercel ? remoteCredentials : localCredentials)
