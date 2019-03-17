const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");                      // css剥离
const HTMLPlugin = require('html-webpack-plugin');                                    // html生成
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');                            // 压缩js
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');        // 压缩css
const isDev = process.env.NODE_ENV == 'development';                                  // 当前环境
const theme = {
	/* antd */
	'@primary-color': '#50C4F7',                         // 全局主色
	'@link-color': '#1EB4F4',                            // 链接色
	'@border-radius-base': '0px',                        // 组件/浮层圆角
	
	/* antd-mobile */
	'@brand-primary': '#50C4F7',                         // 全局主色
};

// 基础配置
const config = {
	output: {
		filename: '[name].[hash].js',                                                 // name为entry下对应项的名称; hash为当前项目全部文件生成的hash码,用于监听改动,以便配合浏览器的缓存机制;
		chunkFilename: '[id].[hash].js',
		path: path.resolve(__dirname, '../dist'),                                     // 指定输出路径
		publicPath: ''
	},
	resolve:{
		extensions:['.js']                                                            //用于配置程序可以自行补全哪些文件后缀
	},
	module: {
		rules: [
			{
				test:/\.ejs$/,                                                        // 编译ejs模板
				exclude: /node_modules/,
				use: 'ejs-loader'
			},
			{
				test: /\.(js|jsx)$/,                                                  // 指定一个正则表达式以匹配文件
				exclude: /node_modules/,                                              // 排除路径
				use: 'babel-loader',                                                  // 指定加载器处理匹配到的文件
			},
			{// css
				test: /\.(css|less)$/,                                               // loader顺序不能随意修改
				exclude: /node_modules/,
				use: [
					{
						loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader  // MiniCssExtractPlugin.loader不能用于热加载中,所以在开发环境里使用style-loader
					},
					{
						loader: 'css-loader',
						options: {
							modules: true                                             // Enable/Disable CSS Modules and setup mode
						}
					},
					{
						loader: "postcss-loader",
						options: {
							plugins: [
								require("autoprefixer")                               // 自动添加css兼容前缀
							]
						}
					},
					{
						loader: 'less-loader'
					}
				]
			},
			{//antd css
				test: /\.(css|less)$/,
				include: /node_modules/,
				use: [
					{
						loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
					},
					{
						loader: "postcss-loader",
						options: {
							plugins: [
								require("autoprefixer")
							]
						}
					},
					{
						loader: 'less-loader',
						options: {
							modifyVars: theme
						}
					}
				]
            },
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				exclude: /node_modules/,
				use: 'url-loader'
			},
			{
				test: /\.svg$/,
				exclude: /node_modules/,
				use: ['@svgr/webpack']
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
      　　	filename: '[name].[hash].css',
			chunkFilename: '[id].[hash].css'
   　　 }),
		new HTMLPlugin({
			title:'my first webpack',
			template: path.resolve(__dirname, './public.ejs')
		})
	]
};

// 开发环境配置
if (isDev) {
	config.devServer = {
		host: '0.0.0.0',                                                            // 本地和局域网通用访问
		port: 8888,
		contentBase: path.resolve(__dirname, '../dev'),                             // 虚拟的提供服务的目录
		hot: true,                                                                 // 热加载
		overlay: {                                                                  // 提示错误
			error: true
		},
		publicPath: config.output.publicPath
	};
} else {
	config.optimization = {
		minimizer: [
			new UglifyJSPlugin({                                                     // 压缩js
				uglifyOptions: {
					output: {
						comments: false
					},
					compress: {
						warnings: false,
						drop_debugger: true,
						drop_console: true
					}
				}
			}),
			new OptimizeCssAssetsPlugin({})                                          // 压缩css
		]
	}
}

// 导出
module.exports = config;
