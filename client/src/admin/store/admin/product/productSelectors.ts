import {getProductById, selectAllProducts} from "./productSlice"
import {useSelector} from "react-redux"
import {StoreState} from "../../../store"
import {Product} from "../../../lib/types/product/Product"

export const useLoadingProducts = () => useSelector((state: StoreState) => state.product.loading)

//
export const useSelectAllProducts = () => useSelector(selectAllProducts)

//
export const useSelectProductById = (id: Product["id"] | undefined) =>
    useSelector((state: StoreState) => getProductById(state, id || 0))
