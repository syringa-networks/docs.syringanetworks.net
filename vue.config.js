const path = require('path');

module.exports = {
	runtimeCompiler: true,
	configureWebpack: {
		resolve: {
			alias: {
				vue$: 'vue/dist/vue.esm.js',
				'@': path.resolve(__dirname, 'src/')
			}
		}
	},
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'stylus',
			patterns: [path.resolve(__dirname, 'src/assets/style/*.styl')]
		}
	}
};
