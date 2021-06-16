import {useSelector} from "react-redux"
import {selectAllNewProduct} from "./newProductSlice"
import {StoreState} from "../store"

export const useLoadingNewProduct = () => useSelector((state: StoreState) => state.newProduct.loading)

export const useSelectAllNewProduct = () => useSelector(selectAllNewProduct)
