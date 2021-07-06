const CracoLessPlugin = require("craco-less")
const rewireBabelLoader = require("craco-babel-loader")
const BabelRcPlugin = require("@jackwilsdon/craco-use-babelrc")
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer")
const {getThemeVariables} = require("antd/dist/theme")

const isEnvProduction = process.env.NODE_ENV === "production"
// process.env.GENERATE_SOURCEMAP = !isEnvProduction
process.env.GENERATE_SOURCEMAP = true

module.exports = {
    webpack: {
        configure: (webpackConfig, {env}) => {
            webpackConfig.optimization.splitChunks = {
                chunks: "all",
                maxInitialRequests: Infinity,
                minSize: 105000,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            // получает имя, то есть node_modules/packageName/not/this/part.js
                            // или node_modules/packageName
                            const packageName = module.context.match(
                                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                            )[1]

                            // имена npm-пакетов можно, не опасаясь проблем, использовать
                            // в URL, но некоторые серверы не любят символы наподобие @
                            return `npm.${packageName.replace("@", "")}`
                        }
                    }
                }
            }
            return webpackConfig
        },
        plugins: isEnvProduction ? [new BundleAnalyzerPlugin()] : []
    },
    plugins: [
        {
            plugin: BabelRcPlugin
        },
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true,
                        modifyVars: {
                            ...getThemeVariables(),
                            "max-width": "100%",
                            "@box-shadow": "0 4px 11px hsla(0, 0%, 0%, 0.1)",
                            "@font-family":
                                "-apple-system, Montserrat, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
                            "@primary-color": "#bb9196",
                            "@success-color": "#13cd3c",
                            "@warning-color": "#ff6370",
                            "@error-color": "#fb2b76",
                            "@border-width-base": "1px",
                            "@border-radius-base": "0px",
                            "@border-color-base": "#f5f6f8",
                            "@black": "#161938",
                            "@text-color-secondary": "#848484"
                        }
                    }
                }
            }
        },
        {
            plugin: rewireBabelLoader,
            options: {
                excludes: [/(node_modules|bower_components)/] //things you want to exclude here
            }
        }
    ]
}
