const {MessengerClient} = require("messaging-api-messenger")

const facebookClient = new MessengerClient({
    accessToken: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
    appId: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET,
    version: process.env.FACEBOOK_APP_VERSION
})

module.exports = {facebookClient}
