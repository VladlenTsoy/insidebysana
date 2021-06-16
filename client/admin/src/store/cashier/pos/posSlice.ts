import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {AdditionalService} from "lib/types/AdditionalService"
import {Category} from "lib/types/Category"
import {Size} from "lib/types/Size"
import {ProductColorCard, ProductColorCart} from "../../../lib/types/cashier/PosProductColor"
import {CashierState} from "../store"
import {fetchProductColorBySearch} from "./fetchProductColorBySearch"
import {fetchProductColorBySKU} from "./fetchProductColorBySKU"

export const posAdapter = createEntityAdapter<ProductColorCart>({
    selectId: product => `${product.product_color_id}${product.size_id}`
})

export interface StateProps {
    category_id: Category["id"]
    size_id: Size["id"]
    loading: boolean
    totalPrice: number
    productsFound: ProductColorCard[]
    discount: {
        type: string
        discount: number
    } | null
    addtionalServices: {
        id: number
        title: string
        price: number
        qty: number
    }[]
    paymentType: "3" | "5"
}

const initialState = posAdapter.getInitialState<StateProps>({
    category_id: 0,
    size_id: 0,
    loading: false,
    totalPrice: 0,
    productsFound: [],
    discount: null,
    addtionalServices: [],
    paymentType: "3"
})

const updateTotal = (state: CashierState["pos"]) => {
    const {discount, addtionalServices} = state
    const products = Object.values(state.entities)
    let total = 0

    if (products.length) {
        total += products.reduce((acc, {product, qty}: any) => {
            const price = product.discount
                ? (product.details.price - (product.details.price / 100) * product.discount.discount).toFixed(
                      0
                  )
                : product.details.price
            return acc + Number(price) * qty
        }, 0)
    }

    if (discount && total > 0) {
        if (discount.type === "percent") total = total - (total / 100) * discount.discount
        else total = total - discount.discount
    }

    if (addtionalServices.length)
        total += addtionalServices.reduce(
            (acc, addtionalService) => (acc += addtionalService.price * addtionalService.qty),
            0
        )

    return total
}

const posSlice = createSlice({
    name: "pos",
    initialState,
    reducers: {
        addAdditionalService: (state, action: PayloadAction<AdditionalService>) => {
            const checkAdditionalService = state.addtionalServices.find(
                additionalService => additionalService.id === action.payload.id
            )
            if (checkAdditionalService)
                state.addtionalServices = state.addtionalServices.map(additionalService => {
                    if (additionalService.id === action.payload.id) additionalService.qty += 1
                    return additionalService
                })
            else state.addtionalServices = [...state.addtionalServices, {...action.payload, qty: 1}]
            state.totalPrice = updateTotal(state)
        },
        removeAdditionalService: (state, action: PayloadAction<AdditionalService["id"]>) => {
            state.addtionalServices = state.addtionalServices.filter(
                additionalService => additionalService.id !== action.payload
            )
            state.totalPrice = updateTotal(state)
        },
        updateQtyAdditionalService: (
            state,
            action: PayloadAction<{id: AdditionalService["id"]; qty: number}>
        ) => {
            state.addtionalServices = state.addtionalServices.map(additionalService => {
                if (additionalService.id === action.payload.id) additionalService.qty = action.payload.qty
                return additionalService
            })
            state.totalPrice = updateTotal(state)
        },
        addToCart: (state, action: PayloadAction<ProductColorCart>) => {
            posAdapter.addOne(state, action.payload)
            state.totalPrice = updateTotal(state)
        },
        removeFromCart: (
            state,
            action: PayloadAction<{
                product_color_id: ProductColorCart["product_color_id"]
                size_id: ProductColorCart["size_id"]
            }>
        ) => {
            const {product_color_id, size_id} = action.payload
            posAdapter.removeOne(state, `${product_color_id}${size_id}`)
            state.totalPrice = updateTotal(state)
        },
        updateQty: (
            state,
            action: PayloadAction<{
                product_color_id: ProductColorCart["product_color_id"]
                size_id: ProductColorCart["size_id"]
                qty: ProductColorCart["qty"]
            }>
        ) => {
            const {product_color_id, size_id, qty} = action.payload
            posAdapter.updateOne(state, {id: `${product_color_id}${size_id}`, changes: {qty}})
            state.totalPrice = updateTotal(state)
        },
        clearCart: state => {
            // state.productsFound = []
            state.discount = null
            state.addtionalServices = []
            posAdapter.removeAll(state)
            state.totalPrice = updateTotal(state)
        },
        setDiscount: (state, action: PayloadAction<StateProps["discount"]>) => {
            state.discount = action.payload
            state.totalPrice = updateTotal(state)
        },
        changePaymentType: (state, action: PayloadAction<StateProps["paymentType"]>) => {
            state.paymentType = action.payload
        },
        changeCategoryId: (state, action: PayloadAction<StateProps["category_id"]>) => {
            state.category_id = action.payload
        },
        changeSizeId: (state, action: PayloadAction<StateProps["size_id"]>) => {
            state.size_id = action.payload
        }
    },
    extraReducers: builder => {
        //
        builder.addCase(fetchProductColorBySearch.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchProductColorBySearch.fulfilled, (state, action) => {
            state.productsFound = action.payload
            state.loading = false
        })
        builder.addCase(fetchProductColorBySKU.fulfilled, (state, action) => {
            if (action.payload) {
                const {product_color_id, size_id} = action.payload
                if (product_color_id && size_id && state.ids.includes(`${product_color_id}${size_id}`)) {
                    const qty = state.entities[`${product_color_id}${size_id}`]?.qty || 1
                    posAdapter.updateOne(state, {
                        id: `${product_color_id}${size_id}`,
                        changes: {qty: qty + 1}
                    })
                } else posAdapter.addOne(state, action.payload)
                state.totalPrice = updateTotal(state)
            }
        })
    }
})

export const {
    addToCart,
    removeFromCart,
    clearCart,
    updateQty,
    setDiscount,
    changePaymentType,
    changeCategoryId,
    changeSizeId,
    addAdditionalService,
    removeAdditionalService,
    updateQtyAdditionalService
} = posSlice.actions

export const {selectAll: selectAllPosProductColors} = posAdapter.getSelectors<CashierState>(
    state => state.pos
)

export default posSlice.reducer
