import {getProductById, selectAllProducts} from "./productSlice"
import {useSelector} from "react-redux"
import {AdminState} from "../store"
import {Product} from "../../../lib/types/product/Product"

export const useLoadingProducts = () => useSelector((state: AdminState) => state.product.loading)

//
export const useSelectAllProducts = () => useSelector(selectAllProducts)

//
export const useSelectProductById = (id: Product["id"] | undefined) =>
    useSelector((state: AdminState) => getProductById(state, id || 0))
