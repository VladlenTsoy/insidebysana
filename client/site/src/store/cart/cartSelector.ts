import {useSelector} from "react-redux"
import {selectAllCarts} from "./cartSlice"
import {StoreState} from "../store"

export const useLoadingCart = () => useSelector((state: StoreState) => state.cart.loading)

export const useSelectAllProductCart = () => useSelector(selectAllCarts)

export const useSelectAllSkuCart = () => useSelector((state: StoreState) => state.cart.skus)
