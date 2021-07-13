const CracoLessPlugin = require("craco-less")
const rewireBabelLoader = require("craco-babel-loader")
const BabelRcPlugin = require("@jackwilsdon/craco-use-babelrc")
const path = require("path")
const {webpackSplitChunks, cracoLessOptions, webpackPluginsProduction} = require("./common.config")

const isEnvProduction = process.env.NODE_ENV === "production"
// process.env.GENERATE_SOURCEMAP = !isEnvProduction
process.env.GENERATE_SOURCEMAP = true

module.exports = {
    webpack: {
        configure: (webpackConfig, {paths}) => {
            webpackConfig.optimization.splitChunks = webpackSplitChunks
            paths.appBuild = webpackConfig.output.path = path.resolve("build", "pos")
            // paths.appIndexJs = webpackConfig.entry.path = path.resolve(__dirname, 'src/pos.tsx')
            return webpackConfig
        },
        plugins: [...(isEnvProduction ? webpackPluginsProduction : [])]
    },
    plugins: [
        {
            plugin: BabelRcPlugin
        },
        {
            plugin: CracoLessPlugin,
            options: cracoLessOptions
        },
        {
            plugin: rewireBabelLoader,
            options: {
                excludes: [/(node_modules|bower_components)/] //things you want to exclude here
            }
        }
    ]
}
