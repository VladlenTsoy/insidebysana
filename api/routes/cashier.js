const express = require("express")
const router = express.Router()
const ProductColorController = require("controllers/crm/cashier/ProductColorController")
const ClientController = require("controllers/crm/cashier/ClientController")
const OrderController = require("controllers/crm/cashier/OrderController")
const AdditionalServiceController = require("controllers/crm/cashier/AdditionalServiceController")
const PaymentMethodController = require("controllers/crm/cashier/PaymentMethodController")

// Поиск товаров
router.post("/search-products", ProductColorController.GetBySearch)

// Поиск клиентов
router.post("/clients", ClientController.GetBySearch)

// Сделки
router.post("/orders", OrderController.GetAll)

// Создать заказ
router.post("/pos/order", OrderController.Create)

// Посик по SKU
router.post("/product-color/sku", ProductColorController.GetBySKU)

// Доп. услуги
router.get("/additional-services", AdditionalServiceController.GetAll)

//
router.get("/payment-methods", PaymentMethodController.GetAll)

module.exports = router
