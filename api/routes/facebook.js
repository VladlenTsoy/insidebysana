const FacebookController = require("controllers/crm/admin/facebook/FacebookController")
const express = require("express")

const router = express.Router()

router.post("/webhook", FacebookController.Webhook)

module.exports = router
