const {logger} = require("config/logger.config")
const {Lookbook} = require("models/settings/Lookbook")
const {LookbookCategory} = require("models/settings/LookbookCategory")

const GetLatest = async (req, res) => {
    try {
        const lookbookCategory = await LookbookCategory.query().findOne({}).orderBy("created_at", "desc")
        if (lookbookCategory)
            lookbookCategory.images = await Lookbook.query()
                .where({category_id: lookbookCategory.id})
                .orderBy("position", "asc")
        return res.send(lookbookCategory)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const GetAll = async (req, res) => {
    try {
        const {categoryId} = req.params
        const lookbook = await LookbookCategory.query()
            .whereNot({id: categoryId})
            .orderBy("created_at", "desc")

        return res.send(lookbook)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const GetByCategoryId = async (req, res) => {
    try {
        const {id} = req.params
        const lookbookCategory = await LookbookCategory.query().findOne({id}).orderBy("created_at", "desc")
        if (lookbookCategory)
            lookbookCategory.images = await Lookbook.query()
                .where({category_id: lookbookCategory.id})
                .orderBy("position", "asc")
        return res.send(lookbookCategory)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetLatest, GetAll, GetByCategoryId}
