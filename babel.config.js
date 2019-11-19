module.exports = {
	presets: [
		['@babel/preset-env', {
			targets: {
				browsers: ['last 2 versions', 'ie >= 11']
			},
			modules: false
		}]
	],
	env: {
		test: {
			presets: [
					[
							'@babel/preset-env',
							{
									modules: 'commonjs',
									debug: false
							}
					],
					'@babel/preset-react'
			],
			plugins: [
					'@babel/plugin-syntax-dynamic-import',
					'@babel/plugin-proposal-class-properties'
			]
		},
	}
};
