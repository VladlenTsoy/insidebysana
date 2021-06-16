const {logger} = require("config/logger.config")

const ReplaceVariablesToData = (text, orderId, amount) => {
    try {
        const literals = text.match(/\{[^\}]*\}/g)

        if (literals && literals.length) {
            literals.map(literal => {
                const re = new RegExp(literal, "g")
                text = text.replace(re, literal === "{orderId}" ? orderId : amount)
            })
        }
        return text
    } catch (e) {
        logger.error(e.stack)
    }
    return null
}

module.exports = {ReplaceVariablesToData}
