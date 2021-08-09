import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {ProductColorCart} from "../../types/cart"
import {StoreState} from "../store"
import {clearCart, updateQtyCart, fetchCart, addToCart, removeFromCart} from "./cartApi"
import {getCookie, setCookie} from "../../utils/cookie"
import {useSelector} from "react-redux"
import {checkDiscount} from "utils/formatPrice"

export const cartAdapter = createEntityAdapter<ProductColorCart>({
    selectId: product => product.sku
})

export interface StateProps {
    loading: boolean
    skus: ProductColorCart["sku"][]
    totalPrice: number
}

// Вывод локальной корзины
const getLocalCart = () => JSON.parse(getCookie("InsideBySana_Cart") || "[]")
// Добавить в локальную корзину
const setLocalCart = (skus: ProductColorCart["sku"][]) =>
    setCookie("InsideBySana_Cart", JSON.stringify(skus), {expires: 7})

// Акция
const cartPromotion = (products: ProductColorCart[], state: StoreState["cart"]) => {
    if (products && products.length) {
        const allQty = products.reduce((acc, product) => (acc += product.qty), 0)
        const saveProducts = products.slice()
        //
        if (allQty >= 4) {
            const productMinPriceIds = products
                .sort((a, b) =>
                    checkDiscount(b.price, b.discount) > checkDiscount(a.price, a.discount) ? -1 : 1
                )
                .reduce<any[]>((acc, product) => {
                    if (acc.length < 2 && product.qty) {
                        const a = 2 - acc.length
                        const qty = product.qty > 2 ? 2 : product.qty
                        const b = a >= qty ? qty : qty - a

                        const _skus = Array(b).fill(product.sku)
                        return [...acc, ..._skus]
                    }
                    return acc
                }, [])

            const _products = saveProducts.map(product => {
                const count = productMinPriceIds.reduce((n, x) => n + (x === product.sku), 0)
                return count
                    ? {
                          ...product,
                          promotion: count,
                          total_price: checkDiscount(product.price * (product.qty - count), product.discount)
                      }
                    : {
                          ...product,
                          promotion: 0,
                          total_price: checkDiscount(product.price * product.qty, product.discount)
                      }
            })
            cartAdapter.setMany(state, _products)
        } else {
            const _products = saveProducts.map(product => ({
                ...product,
                promotion: 0,
                total_price: checkDiscount(product.price * product.qty, product.discount)
            }))
            cartAdapter.setMany(state, _products)
        }
    }
}

let initialState = cartAdapter.getInitialState<StateProps>({
    loading: true,
    skus: getLocalCart(),
    totalPrice: 0
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Добавление в корзину
        builder.addCase(addToCart.pending, (state, action) => {
            if (!state.skus.includes(action.meta.arg)) state.skus.push(action.meta.arg)
            const products = Object.values(state.entities)
            // @ts-ignore
            cartPromotion(products, state)
            setLocalCart(state.skus)
        })
        // Удаление с корзины
        builder.addCase(removeFromCart.pending, (state, action) => {
            cartAdapter.removeOne(state, action.meta.arg)
            state.skus = state.skus.filter(sku => action.meta.arg !== sku)
            const products = Object.values(state.entities)
            // @ts-ignore
            cartPromotion(products, state)
            setLocalCart(state.skus)
        })
        // Обновление кол-во в корзине
        builder.addCase(updateQtyCart.pending, (state, action) => {
            const {sku, qty} = action.meta.arg
            cartAdapter.updateOne(state, {id: sku, changes: {qty}})
            const products = Object.values(state.entities)
            // @ts-ignore
            cartPromotion(products, state)
        })
        // Загрузка корзины
        builder.addCase(fetchCart.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            const {skus, products} = action.payload
            cartPromotion(products, state)
            state.skus = skus
            setLocalCart(skus)
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
