var webpack = require('webpack')
var path = require('path')

module.exports = {
	entry: {
		app: './src/app.js'   //filename: './src/app.js'
	},
	output: {
		filename: 'public/build/bundle.js',
        sourceMapFilename: 'public/build/bundle.map'  //filenameMap: 'public/build/bundle.js'
	},
	devtool: '#source-map',   //devtool: jsx
	// plugins: process.env.
	module: {
        loaders: [
            {
            	test: /\.jsx?$/,
            	exclude: /(node_modules)/,
            	loader: 'babel-loader',
                query: {
                    'presets': ['react', 'es2015']  //'preset': ['react', 'es2015']
                }
            }
        ]		
	}
}