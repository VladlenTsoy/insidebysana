const jwt = require("jsonwebtoken")
const CrmOauthAccessToken = require("../../models/auth/CrmOauthAccessToken")
const {User} = require("../../models/User")

const socketPassport = async (socket, next) => {
    const token = socket.handshake.auth.token
    if (token && jwt.decode(token)) {
        const {jti} = jwt.decode(token)

        const oauthAccess = await CrmOauthAccessToken.query().findById(jti)
        if (!oauthAccess) return next(new Error("!"))

        const user = await User.query().findById(oauthAccess.user_id)
        if (!user) return next(new Error("!"))

        socket.user = user
        return next()
    }
    return next(new Error("!"))
}

module.exports = socketPassport
