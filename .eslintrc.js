module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/essential',
		'plugin:prettier/recommended',
		'@vue/prettier'
	],
	rules: {
		'no-console':
			process.env.NODE_ENV === 'production'
				? 'error'
				: 'off',
		'no-debugger':
			process.env.NODE_ENV === 'production'
				? 'error'
				: 'off',
		'vue/no-parsing-error': [
			2,
			{ 'x-invalid-end-tag': false }
		]
	},
	plugins: ['prettier', 'vue'],
	parserOptions: {
		parser: 'babel-eslint'
	}
};
