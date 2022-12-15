const Path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackRemoveEmptyScripts = require("webpack-remove-empty-scripts");

module.exports = {
    mode: "development",
    entry: {
        "script": "./src/javascript/main.js",
        "style": "./src/sass/main.scss",
    },
    output: {
        path: Path.resolve(__dirname, "./public"),
        filename: "dist/[name].[contenthash].js",
        publicPath: "auto",
        assetModuleFilename: "./dist/image/[name].[contenthash][ext][query]"
    },
    target: "web",
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 20 * 1024,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    filename: 'dist/vendors.[contenthash].js',
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            }
        },
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
            }),
        ],
    },
    module : {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,

                /*type: "asset/resource"*/

                /*type: "asset/inline"*/

                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024
                    }
                }
            },
            {
                test: /\.(txt)$/i,
                type: "asset/source"
            },
            {
                test: /\.(ttf)$/i,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024
                    }
                },
                generator : {
                    filename : 'dist/font/[name].[contenthash][ext][query]',
                }
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.m?js$/i,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    useBuiltIns: "usage",
                                    corejs: {
                                        version: 3
                                    }
                                }
                            ]
                        ],
                        plugins: [
                            "@babel/plugin-proposal-class-properties"
                        ]
                    }
                }
            },
            {
                test: /\.hbs$/i,
                use: [
                    "handlebars-loader"
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin.CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                "**/*",
                "!static/**",
                "!.htaccess"
            ]
        }),
        new WebpackRemoveEmptyScripts(),
        new HtmlWebpackPlugin({
            template: "./src/html/sk/index.html",
            filename: "sk/index.html",
            chunks: [
                "script",
                "style"
            ]
        }),
        new HtmlWebpackPlugin({
            template: "./src/html/sk/common/header.html",
            filename: "./sk/common/header.html",
            chunks: []
        }),
        new HtmlWebpackPlugin({
            template: "./src/html/sk/common/footer.html",
            filename: "./sk/common/footer.html",
            chunks: []
        }),
        new HtmlWebpackPlugin({
            template: "./src/html/sk/pages/aboutUs.html",
            filename: "./sk/pages/aboutUs.html",
            chunks: []
        }),
        new HtmlWebpackPlugin({
            template: "./src/html/sk/pages/whyUs.html",
            filename: "./sk/pages/whyUs.html",
            chunks: []
        }),
        new HtmlWebpackPlugin({
            template: "./src/html/sk/pages/reference.html",
            filename: "./sk/pages/reference.html",
            chunks: []
        }),
        new HtmlWebpackPlugin({
            template: "./src/html/sk/pages/service.html",
            filename: "./sk/pages/service.html",
            chunks: []
        }),
        new HtmlWebpackPlugin({
            template: "./src/html/sk/pages/contact.html",
            filename: "./sk/pages/contact.html",
            chunks: []
        }),

        new HtmlWebpackPlugin({
            template: "./src/html/en/index.html",
            filename: "en/index.html",
            chunks: [
                "script",
                "style"
            ]
        }),
        new HtmlWebpackPlugin({
            template: "./src/html/en/common/header.html",
            filename: "./en/common/header.html",
            chunks: []
        }),
        new HtmlWebpackPlugin({
            template: "./src/html/en/common/footer.html",
            filename: "./en/common/footer.html",
            chunks: []
        }),
        new HtmlWebpackPlugin({
            template: "./src/html/en/pages/aboutUs.html",
            filename: "./en/pages/aboutUs.html",
            chunks: []
        }),
        new HtmlWebpackPlugin({
            template: "./src/html/en/pages/whyUs.html",
            filename: "./en/pages/whyUs.html",
            chunks: []
        }),
        new HtmlWebpackPlugin({
            template: "./src/html/en/pages/reference.html",
            filename: "./en/pages/reference.html",
            chunks: []
        }),
        new HtmlWebpackPlugin({
            template: "./src/html/en/pages/service.html",
            filename: "./en/pages/service.html",
            chunks: []
        }),
        new HtmlWebpackPlugin({
            template: "./src/html/en/pages/contact.html",
            filename: "./en/pages/contact.html",
            chunks: []
        })
    ],
    devtool: "eval",
    devServer: {
        port: 9000,
        hot: false,
        liveReload: true,
        open: true
    }
};
