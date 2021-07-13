import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {ProductColorCart} from "../../types/cart"
import {StoreState} from "../store"
import {clearCart, updateQtyCart, fetchCart, addToCart, removeFromCart} from "./cartApi"
import {getCookie, setCookie} from "../../utils/cookie"
import {useSelector} from "react-redux"

export const cartAdapter = createEntityAdapter<ProductColorCart>({
    selectId: product => product.sku
})

export interface StateProps {
    loading: boolean
    skus: ProductColorCart["sku"][]
}

const getLocalCart = () => JSON.parse(getCookie("InsideBySana_Cart") || "[]")

const setLocalCart = (skus: ProductColorCart["sku"][]) =>
    setCookie("InsideBySana_Cart", JSON.stringify(skus), {expires: 7})

let initialState = cartAdapter.getInitialState<StateProps>({
    loading: true,
    skus: getLocalCart()
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Добавление в корзину
        builder.addCase(addToCart.pending, (state, action) => {
            if (!state.skus.includes(action.meta.arg)) state.skus.push(action.meta.arg)
            setLocalCart(state.skus)
        })
        // Удаление с корзины
        builder.addCase(removeFromCart.pending, (state, action) => {
            cartAdapter.removeOne(state, action.meta.arg)
            state.skus = state.skus.filter(sku => action.meta.arg !== sku)
            setLocalCart(state.skus)
        })
        // Обновление кол-во в корзине
        builder.addCase(updateQtyCart.pending, (state, action) => {
            const {sku, qty} = action.meta.arg
            cartAdapter.updateOne(state, {id: sku, changes: {qty}})
        })
        // Загрузка корзины
        builder.addCase(fetchCart.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            cartAdapter.upsertMany(state, action.payload.products)
            state.skus = action.payload.skus
            setLocalCart(state.skus)
            state.loading = false
        })
        builder.addCase(fetchCart.rejected, state => {
            state.loading = false
        })
        // Очистить корзину
        builder.addCase(clearCart.pending, state => {
            cartAdapter.removeAll(state)
            state.skus = []
            setLocalCart([])
        })
    }
})

export const cartSelector = (state: StoreState) => state.cart

export const {selectAll: selectAllCarts} = cartAdapter.getSelectors<StoreState>(state => state.cart)

export const useLoadingCart = () => useSelector((state: StoreState) => state.cart.loading)

export const useSelectAllProductCart = () => useSelector(selectAllCarts)

export const useSelectAllSkuCart = () => useSelector((state: StoreState) => state.cart.skus)

export default cartSlice.reducer
