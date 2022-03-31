module.exports = {
	transform: {
		'\\.ts$': ['babel-jest', { configFile: './tests/config/babel.jest.config.js' }]
	},
	moduleNameMapper: {
		"^@client/(.*)$": "<rootDir>/src/client/$1",
		"^@server/(.*)$": "<rootDir>/src/server/$1",
		"^@common/(.*)$": "<rootDir>/src/common/$1",
	}
}