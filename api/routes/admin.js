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

// ?????????????? ????????
router.post("/color", ColorController.CreateValidate, ColorController.Create)
// ?????????????????????????? ????????
router.patch("/color/:id", ColorController.CreateValidate, ColorController.Edit)
// ???????????????? ??????????
router.delete("/color/:id", ColorController.Delete)
// ?????????? ???????? ????????????
router.get("/colors", ColorController.GetAll)
//
router.patch("/color/:id/hide", ColorController.Hide)
//
router.patch("/color/:id/display", ColorController.Display)

// ?????????? ???????? ??????????
router.get("/tags", TagController.GetAll)
// ???????????????? ??????
router.patch("/tag/:id", TagController.Edit)
// ?????????????? ??????
router.delete("/tag/:id", TagController.Delete)

// ?????????? ???????? ????????????????
router.get("/statuses", StatusController.GetAll)
// ???????????????????? ??????????????
router.patch("/status/:id", StatusController.Update)
// ???????????????????? ?????????????? ??????????????
router.patch("/status/:id/position", StatusController.UpdatePosition)
// ???????????????? ??????????????
router.post("/status", StatusController.Create)
// ?????????? ???????????? ???? ??????????????
router.get("/orders", OrderController.GetByAll)
// ???????????????? ????????????
router.post("/order", OrderController.Create)
// ???????????? ????????????
router.post("/order/:id/cancel", OrderController.Cancel)
// ?????????? ???????????? ????????????
router.get("/order/:id/address", OrderController.GetAddressByOrderId)
// ?????????? ?????????????? ????????????
router.get("/order/:id/products", OrderController.GetProductsByOrderId)
// ???????????????? ???????????? ???????????? ?? ????????????
router.patch("/order/:id/payment-state", OrderController.ChangePaymentState)
//
router.get("/order/:id/edit", OrderController.GetForEditById)
//
router.patch("/order/:id", OrderController.EditById)
//
router.post("/orders-archive", OrderController.GetArchiveByDates)
//
router.get("/order/:id", OrderController.GetById)

// ???????????????? ??????????????????
router.post("/category", CategoryController.Create)
// ???????????????????????????? ??????????????????
router.patch("/category/:id", CategoryController.Edit)
// ?????????????? ??????????????????
router.delete("/category/:id", CategoryController.Delete)

// ???????????????? ????????????????
router.post("/size", SizeController.Create)
// ?????????????????????????? ????????
router.patch("/size/:id", SizeController.Edit)
// ???????????????? ??????????
router.delete("/size/:id", SizeController.Delete)
//
router.patch("/size/:id/hide", SizeController.Hide)
//
router.patch("/size/:id/display", SizeController.Display)

// ?????????? ????????????????
router.post("/product-colors", ProductColorController.GetBySearch)
// ???????????????? ????????????????
router.post("/product", ProductController.Create)
// ?????????? ???????? ??????????????????
router.post("/product-colors/table", ProductColorController.GetAllPaginate)
// ?????????? ???????????? ???? ??????????????
router.post("/product-colors/trash/table", ProductColorController.GetFromTrash)
// ?????????? ???????????????? ?????? ???????????????????????????? ???? ID
router.get("/product/:id", ProductController.CreateValidate, ProductController.GetById)
// ?????????????????????????? ??????????????
router.post("/product/:id", ProductController.EditValidate, ProductController.EditById)
// ???????????????? ????????????
router.post("/product/:productColorId/discount", ProductDiscountController.Update)
// ???????????? ??????????
router.delete("/product/:productColorId/hide", ProductColorController.Hide)
// ???????????????? ???????????? ??????????????
router.patch("/product/:productColorId/is-new", ProductColorController.UpdateIsNew)
// ???????????????? ????????????
router.delete("/product/:productColorId", ProductColorController.Delete)
// ?????????????? ??????????????
router.post("/product/:productColorId/return", ProductColorController.Return)

// ???????????????? ???????????????? ?????? ????????????
router.post(
    "/product-color/:productColorId/print/upload",
    upload.single("image"),
    ProductColorPrintController.Upload
)
// ???????????????? ???????????????? ?????? ????????????
router.delete("/product-color-print/:id", ProductColorPrintController.Delete)
// ?????????? ???????????????? ?????? ???????????? ???? ProductColorId
router.get("/product-color/:productColorId/prints", ProductColorPrintController.GetByProductColorId)

// ???????????????? ????????????????
router.post(
    "/product-color/:productColorId/image/upload",
    upload.single("image"),
    ProductColorImageController.Upload
)
// ???????????????? ????????????????
router.delete("/product-color-image/:id", ProductColorImageController.Delete)
// ?????????? ???????????????? ???? ProductColorId
router.get("/product-color/:productColorId/images", ProductColorImageController.GetByProductColorId)

// ?????????? ?????????????????? ???? ????????????
router.post("/clients", ClientController.GetBySearch)
// ?????????? ???????????????? ?? ??????????????
router.post("/clients/table", ClientController.GetAllPaginate)
// ???????????????? ??????????????
router.post("/client", ClientController.Create)
// ?????????? ??????????????
router.get("/client/:id", ClientController.GetById)
// ?????????????????????????? ??????????????
router.patch("/client/:id", ClientController.Edit)
// ?????????? ?????????????? ??????????????
router.get("/client/:id/cart", ClientController.GetProductsByCart)
// ?????????? ?????????????????? ??????????????
router.get("/client/:id/wishlist", ClientController.GetProductsByWishlist)
// ???????????? ????????????
router.get("/client/:id/orders", ClientController.GetOrdersByClientId)

// ??????????????
router.get("/sources", SourceController.GetAll)
// ?????????????? ????????????
router.post("/source", SourceController.CreateValidate, SourceController.Create)
// ???????????????????????????? ??????????????
router.patch("/source/:id", SourceController.CreateValidate, SourceController.EditById)

// ??????????????
router.get("/banners", BannerController.GetAll)
// ?????????????? ????????????
router.post("/banner", BannerController.CreateValidate, BannerController.Create)
// ???????????????????????????? ??????????????
router.patch("/banner/:id", BannerController.CreateValidate, BannerController.EditById)
// ???????????????? ??????????????
router.delete("/banner/:id", BannerController.DeleteById)

// ????????????????????????
router.post("/users", UserController.GetAllPaginate)
// ?????????????? ????????????????????????
router.post("/user", UserController.CreateValidate, UserController.Create)
// ?????????????????????????? ????????????????????????
router.post("/user/:id", UserController.Edit)

// ?????????? ???????? ?????????????? ????????????
router.get("/payment-methods", PaymentMethodController.GetAll)

// ?????????? ???????? lookbook
router.get("/category/:categoryId/lookbook", LookbookController.GetByCategoryId)
// ?????????????? lookbook
router.post("/lookbook", LookbookController.CreateValidate, LookbookController.Create)
// ???????????????????????????? lookbook
router.patch("/lookbook/:id", LookbookController.CreateValidate, LookbookController.EditById)
// ???????????????? lookbook
router.delete("/lookbook/:id", LookbookController.DeleteById)
// ?????????? ?????????????????? ?????? ??????????????
router.get("/lookbook-categories", LookbookCategoryController.GetAll)
// ?????????????? ?????????????????? ?????? ??????????????
router.post("/lookbook-category", LookbookCategoryController.Create)
// ?????????????????????????? ?????????????????? ?????? ??????????????
router.patch("/lookbook-category/:id", LookbookCategoryController.EditById)
// ?????????????? ??????????????????
router.delete("/lookbook-category/:id", LookbookCategoryController.Delete)

// ?????????? ???????? ??????????????????????
router.get("/newsletter", NewsletterController.GetAll)

// ?????????? ???????? ????????????????????
router.get("/promo-codes", PromoCodeController.GetAll)
// ???????????????? ??????????????????
router.post("/promo-code", PromoCodeController.CreateValidate, PromoCodeController.Create)
// ???????????????????????????? ??????????????????
router.patch("/promo-code/:id", PromoCodeController.CreateValidate, PromoCodeController.Edit)

// ?????????? ???????????????? ?????? ??????????
router.get("/deliveries/select/:country", DeliveryController.GetForSelectByCountry)

// ?????????? ???????? ???????????????????????????? ??????????
router.get("/additional-services", AdditionalServiceController.GetAll)
// ???????????????? ???????????????????????????? ????????????
router.post("/additional-service", AdditionalServiceController.Create)
// ?????????????????????????? ???????????????????????????? ????????????
router.patch("/additional-service/:id", AdditionalServiceController.Edit)
// ???????????????? ???????????????????????????? ????????????
router.delete("/additional-service/:id", AdditionalServiceController.Delete)

// ???????????????? ????????????-??????????????????
router.post("/print-category", PrintCategoryController.Create)
// ???????????????????????????? ????????????-??????????????????
router.patch("/print-category/:id", PrintCategoryController.Edit)
// ?????????????? ????????????-??????????????????
router.delete("/print-category/:id", PrintCategoryController.Delete)

// ?????????? ???????? ?????????????????????? ?????? ????????????
router.get("/print-images", PrintImageController.GetAll)
// ???????????????????? ?????????????????????? ?????? ????????????
router.post("/print-image", PrintImageController.Create)
// ???????????????????????????? ???????????? ????????????????
router.patch("/print-image/:id", PrintImageController.Edit)
// ???????????????? ???????????????? ?????? ????????????
router.delete("/print-image/:id", PrintImageController.Delete)

// ?????????? ???????? ?????????????????? ???? ID ???????????????? ?????? ????????????
router.get("/print-products/:print_image_id", PrintProductController.GetByPrintImageId)
// ???????????????????? ?????????????????????? ?????? ????????????
router.post("/print-product", PrintProductController.Create)
// ???????????????????????????? ???????????? ????????????????
router.patch("/print-product/:id", PrintProductController.Edit)
// ?????????????? ?????????? ????????????
router.delete("/print-product/:id", PrintProductController.Delete)

// ?????????? ???????? ?????????????????? ?????? ??????. ????????????????
router.get("/home-products", HomeProductController.GetAll)
// ???????????????? ?????????????? ?????? ??????. ????????????????
router.post("/home-product", HomeProductController.Create)
// ???????????????? ?????????????? ?????? ??????. ????????????????
router.patch("/home-product/:id", HomeProductController.Edit)
// ?????????????? ?????????????? ?? ??????. ????????????????
router.delete("/home-product/:id", HomeProductController.Delete)

module.exports = router
