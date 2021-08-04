const CracoLessPlugin = require("craco-less")
const rewireBabelLoader = require("craco-babel-loader")
const BabelRcPlugin = require("@jackwilsdon/craco-use-babelrc")
const path = require("path")
const {webpackSplitChunks, webpackPluginsProduction} = require("./common.config")
const interpolateHtml = require("craco-interpolate-html-plugin")
const {getThemeVariables} = require("antd/dist/theme")

const isEnvProduction = process.env.NODE_ENV === "production"
// process.env.GENERATE_SOURCEMAP = !isEnvProduction
process.env.GENERATE_SOURCEMAP = true

module.exports = {
    webpack: {
        configure: (webpackConfig, {paths}) => {
            webpackConfig.optimization.splitChunks = webpackSplitChunks
            paths.appBuild = webpackConfig.output.path = path.resolve("build", "pos")
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
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true,
                        modifyVars: {
                            ...getThemeVariables({dark: true}),
                            "@font-family":
                                "-apple-system, Montserrat, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
                            // background
                            "@popover-background": "#010b24",
                            "@component-background": "#010b24",
                            "@secondary-background": "#262b48",
                            "@gradient-background": "linear-gradient(160deg, #2f3957 0%, #0c132c 50%);",
                            // border
                            "@border-color-base": "#ffffff12",
                            "@border-color-split": "#ffffff12",
                            "@border-width-base": "1px",
                            "@border-radius-base": "10px",
                            // font-size
                            "@font-size-big": "20px",
                            "@font-size-xl": "18px",
                            // color
                            "@success-color": "#4cc279",
                            "@warning-color": "#ff6370",
                            "@error-color": "#ff6370",
                            "@black": "#161938",
                            "@primary-color": "#fe9c64",
                            "@text-color-secondary": "#9babc5"
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
        },
        {
            plugin: interpolateHtml,
            // Enter the variable to be interpolated in the html file
            options: {
                TITLE: "InsideBySana CRM: Панель администрирования",
                DESCRIPTION: "InsideBySana CRM: Панель администрирования",
                MANIFEST: "manifest.json",
                HEAD_TAGS: ""
            }
        }
    ]
}
