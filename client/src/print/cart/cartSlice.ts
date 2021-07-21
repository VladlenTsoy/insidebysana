import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {CartProduct} from "./CartProduct"
import {getCookie, setCookie} from "utils/cookie"
import {useSelector} from "react-redux"
import {StoreState} from "../store"

export const cartAdapter = createEntityAdapter<CartProduct>({
    selectId: product => product.sku
})

export interface StateProps {
    loading: boolean
    skus: CartProduct["sku"][]
}

const getLocalCart = () => JSON.parse(getCookie("InsideBySana_Cart") || "[]")

const setLocalCart = (skus: CartProduct["sku"][]) =>
    setCookie("InsideBySana_Cart", JSON.stringify(skus), {expires: 7})

let initialState = cartAdapter.getInitialState<StateProps>({
    loading: true,
    skus: getLocalCart()
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartProduct["sku"]>) => {
            if (!state.skus.includes(action.payload)) state.skus.push(action.payload)
            setLocalCart(state.skus)
        },
        removeFromCart: (state, action: PayloadAction<CartProduct["sku"]>) => {
            cartAdapter.removeOne(state, action.payload)
            state.skus = state.skus.filter(sku => action.payload !== sku)
            setLocalCart(state.skus)
        }
    }
})

export const {addToCart, removeFromCart} = cartSlice.actions
export const useSelectAllSkuCart = () => useSelector((state: StoreState) => state.cart.skus)

export default cartSlice.reducer
