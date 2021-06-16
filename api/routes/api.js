const express = require("express")
const LoginController = require("../app/http/controllers/crm/auth/LoginController")
const ProductColorController = require("controllers/client/ProductColorController")
const MeasurementController = require("controllers/client/MeasurementController")
const CategoryController = require("controllers/client/CategoryController")
const PrintCategoryController = require("controllers/crm/common/PrintCategoryController")
const BannerController = require("controllers/client/BannerController")
const WishlistController = require("controllers/client/WishlistController")
const CartController = require("controllers/client/CartController")
const ClientAuthController = require("controllers/client/AuthController")
const LookbookController = require("controllers/client/LookbookController")
const NewsletterController = require("controllers/client/NewsletterController")
const PromoCodeController = require("controllers/client/PromoCodeController")
const PaymeController = require("controllers/client/PaymeController")
const DeliveryController = require("controllers/client/DeliveryController")
const OrderController = require("controllers/client/OrderController")
const CityController = require("../app/http/controllers/crm/common/CityController")
const CountryController = require("../app/http/controllers/crm/common/CountryController")
const AdditionalServicesController = require("controllers/client/AdditionalServicesController")

const router = express.Router()

// Вывод банеров (Главная)
router.get("/banners", BannerController.GetAll)
// Вывод категорий (Главная)
router.get("/categories", CategoryController.GetAll)

// Вывод новых продуктов (Главная)
router.get("/new-products", ProductColorController.GetNew)

// Вывод цветов продукта (Каталог)
router.post("/product-colors", ProductColorController.GetPagination)

// Вывод цвета продукта по ID (Продукт)
router.get("/product-color/:id", ProductColorController.GetById)
// Вывод обмеров по продукту ID (Продукт)
router.get("/measurements/:productId", MeasurementController.GetByProductId)
// Вывод похожих по продукту ID (Продукт) (ТЕГИ)
router.get("/featured-products/:productId", ProductColorController.GetByProductId)
// Недавно просмотренные продукты (Продукт)
router.post("/recent-products", ProductColorController.GetByRecentIds)

// Вывод по поиску (Поиск)
router.post("/search-products", ProductColorController.SearchValidate, ProductColorController.Search)

// Авторизация
router.post("/login", LoginController.Validate, LoginController.Index)
// Авторизация клиента
router.post("/client/login", ClientAuthController.LoginValidate, ClientAuthController.Login)
// Регистрация клиента
router.post(
    "/client/registration",
    ClientAuthController.RegistrationValidate,
    ClientAuthController.Registration
)

// Вывод списка желаемого
router.post("/wishlist", WishlistController.GetAll)

// Вывод всей корзины
router.post("/cart", CartController.GetAll)

// Лукбук
router.get("/lookbook", LookbookController.GetAll)
// Подписаться
router.post("/newsletter/subscribe", NewsletterController.SubscribeValidate, NewsletterController.Subscribe)
// Промокод
router.post("/promo-code", PromoCodeController.GetPromoCodeByCode)

//
router.post("/payme", PaymeController.Index)

// Вывод доставки
router.post("/delivery", DeliveryController.GetByCountry)

//
router.post("/order", OrderController.Create)
// Вывод сделки по id
router.get("/order/:id", OrderController.GetById)
//
router.post("/order/pay", OrderController.Pay)

//
router.get("/countries", CountryController.GetAll)

//
router.get("/cities", CityController.GetAll)

//
router.get("/additional-services", AdditionalServicesController.GetAll)

//
router.get("/print-categories", PrintCategoryController.GetAll)

module.exports = router
