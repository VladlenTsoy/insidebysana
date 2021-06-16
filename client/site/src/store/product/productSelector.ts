import {useSelector} from "react-redux"
import {Product} from "../../types/product"
import {StoreState} from "../store"
import {getProductById} from "./productSlice"

// Загрузка
export const useLoadingProduct = () => useSelector((state: StoreState) => state.product.loading)

// Вывод продукта по Id
export const useSelectProductById = (id: Product['id']) => useSelector((state: StoreState) => getProductById(state, id))
