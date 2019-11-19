module.exports = {
	moduleFileExtensions: ['js', 'json'],
	testURL: 'http://localhost/',
	transform: {
		'^.+\\.js$': '<rootDir>/node_modules/babel-jest',
	},
	moduleNameMapper: {
		'^src(.*)$': '<rootDir>/src/$1',
		'^test(.*)$': '<rootDir>/test/$1',
		'\\.(css|less|scss|sass)$': '<rootDir>/test/mocks/style-mock'
	},
};
