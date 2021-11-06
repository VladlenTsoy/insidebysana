const passport = require("passport")
const BearerStrategy = require("passport-http-bearer")
const jwt = require("jsonwebtoken")
const SiteOauthAccessToken = require("../../models/auth/SiteOauthAccessToken")
const {Client} = require("../../models/Client")

passport.use(
    "site-access",
    new BearerStrategy(async function (token, done) {
        console.log(1)
        if (token && jwt.decode(token)) {
            // Декодирование хэша в токен
            const {jti} = jwt.decode(token)
            // Поиск токена
            const oauthAccess = await SiteOauthAccessToken.query().findById(jti)
            if (oauthAccess) {
                // Поиск пользователя
                const client = await Client.query().findById(
                    oauthAccess.client_id
                )
                // Пользователь найден
                if (client)
                    return done(null, {...client, token}, {scope: "all"})
            }
        }
        return done(null, false)
    })
)

module.exports = passport.authenticate("site-access", {session: false})
