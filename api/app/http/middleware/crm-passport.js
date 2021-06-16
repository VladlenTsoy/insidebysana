const passport = require("passport")
const BearerStrategy = require("passport-http-bearer")
const jwt = require("jsonwebtoken")
const CrmOauthAccessToken = require("../../models/auth/CrmOauthAccessToken")
const {User} = require("../../models/User")

passport.use(
    "crm-access",
    new BearerStrategy(async function (token, done) {
        if (token && jwt.decode(token)) {
            // Декодирование хэша в токен
            const {jti} = jwt.decode(token)
            // Поиск токена
            const oauthAccess = await CrmOauthAccessToken.query().findById(jti)
            if (oauthAccess) {
                // Поиск пользователя
                const user = await User.query()
                    .findById(oauthAccess.user_id)
                    .select("id", "full_name", "photo", "email", "access", "created_at")
                // Пользователь найден
                if (user) return done(null, {...user, token: jti}, {scope: "all"})
            }
        }
        return done(null, false)
    })
)

module.exports = passport.authenticate("crm-access", {session: false})
