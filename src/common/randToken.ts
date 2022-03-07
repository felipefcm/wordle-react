
const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generate = (length: number) => {
	let token = ''

	for (let i = 0; i < length; ++i)
		token += symbols[Math.floor(Math.random() * symbols.length)]

	return token
}
