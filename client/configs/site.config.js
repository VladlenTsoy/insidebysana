const rewireBabelLoader = require("craco-babel-loader")
const BabelRcPlugin = require("@jackwilsdon/craco-use-babelrc")
const {webpackSplitChunks, webpackPluginsProduction} = require("./common.config")
const path = require("path")
const interpolateHtml = require("craco-interpolate-html-plugin")

const isEnvProduction = process.env.NODE_ENV === "production"
// process.env.GENERATE_SOURCEMAP = !isEnvProduction
process.env.GENERATE_SOURCEMAP = true

module.exports = {
    webpack: {
        configure: (webpackConfig, {paths}) => {
            webpackConfig.optimization.splitChunks = webpackSplitChunks
            paths.appBuild = webpackConfig.output.path = path.resolve("build", "site")
            // paths.appIndexJs = webpackConfig.entry.path = path.resolve(__dirname, 'src/site.tsx')
            return webpackConfig
        },
        plugins: [...(isEnvProduction ? webpackPluginsProduction : [])]
    },
    plugins: [
        {
            plugin: BabelRcPlugin
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
                TITLE: "inside by Sana: Бренд одежды в Узбекистане",
                DESCRIPTION:
                    "Идеальные швы, натуральные ткани, местное производство. Бесплатная доставка и примерка по Ташкенту",
                MANIFEST: "site.manifest.json",
                HEAD_TAGS: isEnvProduction
                    ? `
                    <!-- Facebook Pixel Code -->
                    <script>
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '230761784901784');
                    fbq('track', 'PageView');
                    </script>
                    <noscript><img height="1" width="1" style="display:none"
                    src="https://www.facebook.com/tr?id=230761784901784&ev=PageView&noscript=1"
                    /></noscript>
                    <!-- End Facebook Pixel Code -->
                `
                    : ""
            }
        }
    ]
}
