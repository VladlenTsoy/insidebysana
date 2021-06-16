const express = require("express")
const UserController = require("../app/http/controllers/crm/UserController")
const CategoryController = require("../app/http/controllers/crm/common/CategoryController")
const SizeController = require("../app/http/controllers/crm/common/SizeController")

const router = express.Router()

// Вывод данных
router.get("/", UserController.GetCurrent)
// Выход
router.delete("/logout", UserController.Logout)

// Вывод всех категорий
router.get("/categories", CategoryController.GetAll)

// Вывод всех размеров
router.get("/sizes", SizeController.GetAll)


module.exports = router
