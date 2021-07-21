const express = require("express")
const ColorController = require("controllers/crm/admin/settings/ColorController")
const TagController = require("controllers/crm/admin/settings/TagController")
const StatusController = require("controllers/crm/admin/StatusController")
const OrderController = require("controllers/crm/admin/OrderController")
const CategoryController = require("controllers/crm/admin/settings/CategoryController")
const ProductController = require("controllers/crm/admin/ProductController")
const ProductDiscountController = require("controllers/crm/admin/ProductDiscountController")
const ProductColorController = require("controllers/crm/admin/ProductColorController")
const ProductColorPrintController = require("controllers/crm/admin/ProductColorPrintController")
const ProductColorImageController = require("controllers/crm/admin/ProductColorImageController")
const ClientController = require("controllers/crm/admin/ClientController")
const SourceController = require("controllers/crm/admin/settings/SourceController")
const BannerController = require("controllers/crm/admin/settings/BannerController")
const UserController = require("controllers/crm/admin/UserController")
const PaymentMethodController = require("controllers/crm/admin/payment/PaymentMethodController")
const LookbookController = require("controllers/crm/admin/settings/LookbookController")
const LookbookCategoryController = require("controllers/crm/admin/settings/LookbookCategoryController")
const NewsletterController = require("controllers/crm/admin/settings/NewsletterController")
const PromoCodeController = require("controllers/crm/admin/settings/PromoCodeController")
const DeliveryController = require("controllers/crm/admin/settings/DeliveryController")
const SizeController = require("controllers/crm/admin/settings/SizeController")
const AdditionalServiceController = require("controllers/crm/admin/settings/AdditionalServiceController")
const PrintCategoryController = require("controllers/crm/admin/settings/print/PrintCategoryController")
const PrintImageController = require("controllers/crm/admin/settings/print/PrintImageController")
const PrintProductController = require("controllers/crm/admin/settings/print/PrintProductController")
const HomeProductController = require("controllers/crm/admin/HomeProductController")
const router = express.Router()
const multer = require("multer")
const upload = multer()

// Создать цвет
router.post("/color", ColorController.CreateValidate, ColorController.Create)
// Редактировать цвет
router.patch("/color/:id", ColorController.CreateValidate, ColorController.Edit)
// Удаление цвета
router.delete("/color/:id", ColorController.Delete)
// Вывод всех цветов
router.get("/colors", ColorController.GetAll)
//
router.patch("/color/:id/hide", ColorController.Hide)
//
router.patch("/color/:id/display", ColorController.Display)

// Вывод всех тегов
router.get("/tags", TagController.GetAll)
// Изменить тег
router.patch("/tag/:id", TagController.Edit)
// Удалить тег
router.delete("/tag/:id", TagController.Delete)

// Вывод всех статусов
router.get("/statuses", StatusController.GetAll)
// Обновление статуса
router.patch("/status/:id", StatusController.Update)
// Обновление позиции статуса
router.patch("/status/:id/position", StatusController.UpdatePosition)
// Создание статуса
router.post("/status", StatusController.Create)
// Вывод сделки по статусу
router.get("/orders", OrderController.GetByAll)
// Создание сделки
router.post("/order", OrderController.Create)
// Отмена сделки
router.post("/order/:id/cancel", OrderController.Cancel)
// Вывод адреса сделки
router.get("/order/:id/address", OrderController.GetAddressByOrderId)
// Вывод товаров сделки
router.get("/order/:id/products", OrderController.GetProductsByOrderId)
// Изменить статус оплаты у сделки
router.patch("/order/:id/payment-state", OrderController.ChangePaymentState)
//
router.get("/order/:id/edit", OrderController.GetForEditById)
//
router.patch("/order/:id", OrderController.EditById)
//
router.post("/orders-archive", OrderController.GetArchiveByDates)
//
router.get("/order/:id", OrderController.GetById)

// Создание категории
router.post("/category", CategoryController.Create)
// Редактирование категории
router.patch("/category/:id", CategoryController.Edit)
// Удалить категорию
router.delete("/category/:id", CategoryController.Delete)

// Создание размеров
router.post("/size", SizeController.Create)
// Редактировать цвет
router.patch("/size/:id", SizeController.Edit)
// Удаление цвета
router.delete("/size/:id", SizeController.Delete)
//
router.patch("/size/:id/hide", SizeController.Hide)
//
router.patch("/size/:id/display", SizeController.Display)

// Поиск продукта
router.post("/product-colors", ProductColorController.GetBySearch)
// Создание продукта
router.post("/product", ProductController.Create)
// Вывод всех продуктов
router.post("/product-colors/table", ProductColorController.GetAllPaginate)
// Вывод цветов из корзины
router.post("/product-colors/trash/table", ProductColorController.GetFromTrash)
// Вывод продукта для редактирования по ID
router.get("/product/:id", ProductController.CreateValidate, ProductController.GetById)
// Редактировать продукт
router.post("/product/:id", ProductController.EditValidate, ProductController.EditById)
// Изменить скидку
router.post("/product/:productColorId/discount", ProductDiscountController.Update)
// Скрыть товар
router.delete("/product/:productColorId/hide", ProductColorController.Hide)
// Изменить статус новинки
router.patch("/product/:productColorId/is-new", ProductColorController.UpdateIsNew)
// Удаление товара
router.delete("/product/:productColorId", ProductColorController.Delete)
// Вернуть продукт
router.post("/product/:productColorId/return", ProductColorController.Return)

// Загрузка картинок для печати
router.post(
    "/product-color/:productColorId/print/upload",
    upload.single("image"),
    ProductColorPrintController.Upload
)
// Удаление картинки для печати
router.delete("/product-color-print/:id", ProductColorPrintController.Delete)
// Вывод картинок для печати по ProductColorId
router.get("/product-color/:productColorId/prints", ProductColorPrintController.GetByProductColorId)

// Загрузка картинок
router.post(
    "/product-color/:productColorId/image/upload",
    upload.single("image"),
    ProductColorImageController.Upload
)
// Удаление картинки
router.delete("/product-color-image/:id", ProductColorImageController.Delete)
// Вывод картинок по ProductColorId
router.get("/product-color/:productColorId/images", ProductColorImageController.GetByProductColorId)

// Вывод клинентов по поиску
router.post("/clients", ClientController.GetBySearch)
// Вывод клиентов в таблице
router.post("/clients/table", ClientController.GetAllPaginate)
// Создание клиента
router.post("/client", ClientController.Create)
// Вывод клиента
router.get("/client/:id", ClientController.GetById)
// Редактировать клиента
router.patch("/client/:id", ClientController.Edit)
// Вывод корзины клиента
router.get("/client/:id/cart", ClientController.GetProductsByCart)
// Вывод избранных клиента
router.get("/client/:id/wishlist", ClientController.GetProductsByWishlist)
// Выввод сделок
router.get("/client/:id/orders", ClientController.GetOrdersByClientId)

// Ресурсы
router.get("/sources", SourceController.GetAll)
// Создать ресурс
router.post("/source", SourceController.CreateValidate, SourceController.Create)
// Редактирование ресурса
router.patch("/source/:id", SourceController.CreateValidate, SourceController.EditById)

// Баннеры
router.get("/banners", BannerController.GetAll)
// Создать баннер
router.post("/banner", BannerController.CreateValidate, BannerController.Create)
// Редактирование баннера
router.patch("/banner/:id", BannerController.CreateValidate, BannerController.EditById)
// Удаление баннера
router.delete("/banner/:id", BannerController.DeleteById)

// Пользователи
router.post("/users", UserController.GetAllPaginate)
// Создать пользователя
router.post("/user", UserController.CreateValidate, UserController.Create)
// Редактировать пользователя
router.post("/user/:id", UserController.Edit)

// Вывод всех методов оплаты
router.get("/payment-methods", PaymentMethodController.GetAll)

// Вывод всех lookbook
router.get("/category/:categoryId/lookbook", LookbookController.GetByCategoryId)
// Создать lookbook
router.post("/lookbook", LookbookController.CreateValidate, LookbookController.Create)
// Редактирование lookbook
router.patch("/lookbook/:id", LookbookController.CreateValidate, LookbookController.EditById)
// Удаление lookbook
router.delete("/lookbook/:id", LookbookController.DeleteById)
// Вывод категорий для лукбука
router.get("/lookbook-categories", LookbookCategoryController.GetAll)
// Создать категорию для лукбука
router.post("/lookbook-category", LookbookCategoryController.Create)
// Редактировать категорию для лукбука
router.patch("/lookbook-category/:id", LookbookCategoryController.EditById)
// Удалить категорию
router.delete("/lookbook-category/:id", LookbookCategoryController.Delete)

// Вывод всех подписанных
router.get("/newsletter", NewsletterController.GetAll)

// Вывод всех промокодов
router.get("/promo-codes", PromoCodeController.GetAll)
// Создание промокода
router.post("/promo-code", PromoCodeController.CreateValidate, PromoCodeController.Create)
// Редактирование промокода
router.patch("/promo-code/:id", PromoCodeController.CreateValidate, PromoCodeController.Edit)

// Вывод доставки для формы
router.get("/deliveries/select/:country", DeliveryController.GetForSelectByCountry)

// Вывод всех дополнительных услуг
router.get("/additional-services", AdditionalServiceController.GetAll)
// Создание дополнительной услуги
router.post("/additional-service", AdditionalServiceController.Create)
// Редатирование дополнительной услуги
router.patch("/additional-service/:id", AdditionalServiceController.Edit)
// Удаление дополнительной услуги
router.delete("/additional-service/:id", AdditionalServiceController.Delete)

// Создание печать-категории
router.post("/print-category", PrintCategoryController.Create)
// Редактирование печать-категории
router.patch("/print-category/:id", PrintCategoryController.Edit)
// Удалить печать-категорию
router.delete("/print-category/:id", PrintCategoryController.Delete)

// Вывод всех изображений для печати
router.get("/print-images", PrintImageController.GetAll)
// Добавление изображения для печати
router.post("/print-image", PrintImageController.Create)
// Редактирование печать картинки
router.patch("/print-image/:id", PrintImageController.Edit)
// Удаление картинки для печати
router.delete("/print-image/:id", PrintImageController.Delete)

// Вывод всех продуктов по ID картинки для печати
router.get("/print-products/:print_image_id", PrintProductController.GetByPrintImageId)
// Добавление изображения для печати
router.post("/print-product", PrintProductController.Create)
// Редактирование печать картинки
router.patch("/print-product/:id", PrintProductController.Edit)
// Удалить товар печати
router.delete("/print-product/:id", PrintProductController.Delete)

// Вывод всех продуктов для дом. страницы
router.get("/home-products", HomeProductController.GetAll)
// Добавить продукт для дом. страницы
router.post("/home-product", HomeProductController.Create)
// Изменить продукт для дом. страницы
router.patch("/home-product/:id", HomeProductController.Edit)
// Удалить продукт с дом. страницы
router.delete("/home-product/:id", HomeProductController.Delete)

module.exports = router
