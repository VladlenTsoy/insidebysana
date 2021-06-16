const express = require("express")
const router = express.Router()
const ProductColorController = require("controllers/crm/cashier/ProductColorController")
const ClientController = require("controllers/crm/cashier/ClientController")
const OrderController = require("controllers/crm/cashier/OrderController")
const AdditionalServiceController = require("controllers/crm/cashier/AdditionalServiceController")

//
router.post("/search-products", ProductColorController.GetBySearch)
//
router.post("/clients", ClientController.GetBySearch)

//
router.post("/orders", OrderController.GetAll)
//
router.post("/pos/order", OrderController.Create)

//
router.post("/product-color/sku", ProductColorController.GetBySKU)
//
router.get("/additional-services", AdditionalServiceController.GetAll)

module.exports = router
