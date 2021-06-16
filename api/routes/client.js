const express = require("express")
const ClientController = require("controllers/client/ClientController")
const CartController = require("controllers/client/CartController")
const WishlistController = require("controllers/client/WishlistController")
const AddressController = require("controllers/client/AddressController")
const OrderController = require("controllers/client/OrderController")

const router = express.Router()

// Вывод данных
router.get("/", ClientController.GetCurrent)

router.post("/update", ClientController.Update)

router.post("/change-password", ClientController.ChangePassword)

router.post('/order', OrderController.Create)

router.get("/orders", OrderController.GetAll)

//
router.post("/cart", CartController.SyncAndGetAll)
//
router.post("/cart/add", CartController.Add)
//
router.post("/cart/remove", CartController.Remove)
//
router.post("/cart/update/qty", CartController.UpdateQty)
//
router.post("/cart/clear", CartController.Clear)

router.delete("/logout", ClientController.Logout)

//
router.post("/wishlist", WishlistController.SyncAndGetAll)
//
router.post("/wishlist/add", WishlistController.Add)
//
router.post("/wishlist/remove", WishlistController.Remove)


//
router.get("/addresses", AddressController.GetAll)
//
router.post("/address", AddressController.Create)
//
router.delete("/address/:id", AddressController.Delete)

module.exports = router
