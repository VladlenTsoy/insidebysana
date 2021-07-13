const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer")
const CompressionPlugin = require("compression-webpack-plugin")
const {getThemeVariables} = require("antd/dist/theme")

const webpackSplitChunks = {
    chunks: "all",
    maxInitialRequests: Infinity,
    minSize: 105000,
    cacheGroups: {
        vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
                // получает имя, то есть node_modules/packageName/not/this/part.js
                // или node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]

                // имена npm-пакетов можно, не опасаясь проблем, использовать
                // в URL, но некоторые серверы не любят символы наподобие @
                return `npm.${packageName.replace("@", "")}`
            }
        }
    }
}

const cracoLessOptions = {
    lessLoaderOptions: {
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
                ...getThemeVariables(),
                "max-width": "100%",
                "@box-shadow": "0 5px 20px rgba(146, 153, 184, 0.1)",
                "@font-family":
                    "-apple-system, Montserrat, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
                "@primary-color": "#2f45c5",
                "@success-color": "#13cd3c",
                "@warning-color": "#ff6370",
                "@error-color": "#fb2b76",
                "@border-width-base": "1px",
                "@border-radius-base": "10px",
                "@border-color-base": "#f5f6f8",
                "@black": "#161938",
                "@text-color-secondary": "#9babc5"
            }
        }
    }
}

const webpackPluginsProduction = [
    new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.(js|css)$/
    }),
    new BundleAnalyzerPlugin()
]

module.exports = {webpackSplitChunks, cracoLessOptions, webpackPluginsProduction}
