const Path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackRemoveEmptyScripts = require("webpack-remove-empty-scripts");
const {ModuleFederationPlugin} = require('webpack').container;

module.exports = {
    mode: "production",
    entry: {
        "script": "./src/javascript/main.js",
        "style": "./src/sass/main.scss",
        "style2": "./src/css/main.css",
        "font": ["./src/font/Retro Gaming.ttf"]
    },
    output: {
        path: Path.resolve(__dirname, "./public"),
        filename: "dist/[name].[contenthash].js",
        //publicPath: "./",
        publicPath: "auto",
        //publicPath: "http://localhost:9001/",
        assetModuleFilename: "./dist/image/[name].[contenthash][ext][query]"
    },
    target: "web",
    optimization: {
        splitChunks: {
            chunks: "async",
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
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader"
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
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
                "!static/**"
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "dist/[name].[contenthash].css"
        }),
        new WebpackRemoveEmptyScripts(),
        new HtmlWebpackPlugin({
            template: "./src/handlebars/index.hbs",
            filename: "index.html",
            chunks: [
                "script",
                "style",
                "font"
            ]
        }),
        new HtmlWebpackPlugin({
            template: "./src/handlebars/common/header.hbs",
            filename: "./common/header.html",
            chunks: []
        }),
        new HtmlWebpackPlugin({
            template: "./src/handlebars/common/footer.hbs",
            filename: "./common/footer.html",
            chunks: []
        }),
        new ModuleFederationPlugin({
            name: "ModuleAApp",
            filename: "remoteEntry.js",
            exposes: {
                "./Test": "./src/javascript/base/test.js"
            }
        })
    ],
};