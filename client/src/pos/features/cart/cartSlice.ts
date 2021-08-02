import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {CartProductItemType} from "./cart"
import {StoreState} from "pos/store"
import {fetchProductColorBySKU} from "./fetchProductColorBySKU"
import {AdditionalService} from "types/AdditionalService"
import {useSelector} from "react-redux"
import {updateTotal} from "./cartUpdateTotal"

export const cartAdapter = createEntityAdapter<CartProductItemType>({
    selectId: product => `${product.product_color_id}${product.size_id}`
})

export interface StateProps {
    totalPrice: number
    discount: {
        type: "percent" | "fixed"
        discount: number
    } | null
    additionalServices: {
        id: number
        title: string
        price: number
        qty: number
    }[]
    payments: {
        payment_id: number
        label: string
        price: number
    }[]
    payChange: number // Сдачи
    leftToPay: number // Осталось оплатить
    processing: boolean // На обработку
    createOrderButton: {
        disabled: boolean
        loading: boolean
    }
}

const initialState = cartAdapter.getInitialState<StateProps>({
    totalPrice: 0,
    discount: null,
    additionalServices: [],
    payments: [{payment_id: 3, label: "Наличные", price: 0}],
    payChange: 0,
    leftToPay: 0,
    processing: false,
    createOrderButton: {
        disabled: true,
        loading: false
    }
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Добавить доп. услугу
        addAdditionalService: (state, action: PayloadAction<AdditionalService>) => {
            const checkAdditionalService = state.additionalServices.find(
                additionalService => additionalService.id === action.payload.id
            )
            if (checkAdditionalService)
                state.additionalServices = state.additionalServices.map(additionalService => {
                    if (additionalService.id === action.payload.id) additionalService.qty += 1
                    return additionalService
                })
            else state.additionalServices = [...state.additionalServices, {...action.payload, qty: 1}]
            // Сумма
            const {totalPrice, leftToPay} = updateTotal(state)
            state.totalPrice = totalPrice
            state.leftToPay = leftToPay
        },
        // Удалить доп. услугу
        removeAdditionalService: (state, action: PayloadAction<AdditionalService["id"]>) => {
            state.additionalServices = state.additionalServices.filter(
                additionalService => additionalService.id !== action.payload
            )
            // Сумма
            const {totalPrice, leftToPay} = updateTotal(state)
            state.totalPrice = totalPrice
            state.leftToPay = leftToPay
        },
        // Обновить кол-во доп. улуг
        updateQtyAdditionalService: (
            state,
            action: PayloadAction<{id: AdditionalService["id"]; qty: number}>
        ) => {
            state.additionalServices = state.additionalServices.map(additionalService => {
                if (additionalService.id === action.payload.id) additionalService.qty = action.payload.qty
                return additionalService
            })
            // Сумма
            const {totalPrice, leftToPay} = updateTotal(state)
            state.totalPrice = totalPrice
            state.leftToPay = leftToPay
        },
        // Доавить в корзину
        addToCart: (state, action: PayloadAction<CartProductItemType>) => {
            cartAdapter.addOne(state, action.payload)
            // Сумма
            const {totalPrice, leftToPay} = updateTotal(state)
            state.totalPrice = totalPrice
            state.leftToPay = leftToPay
        },
        // Удалить с корзины
        removeFromCart: (
            state,
            action: PayloadAction<{
                product_color_id: CartProductItemType["product_color_id"]
                size_id: CartProductItemType["size_id"]
            }>
        ) => {
            const {product_color_id, size_id} = action.payload
            cartAdapter.removeOne(state, `${product_color_id}${size_id}`)
            // Сумма
            const {totalPrice, leftToPay} = updateTotal(state)
            state.totalPrice = totalPrice
            state.leftToPay = leftToPay
        },
        // Обновить кол-во продукта
        updateQty: (
            state,
            action: PayloadAction<{
                product_color_id: CartProductItemType["product_color_id"]
                size_id: CartProductItemType["size_id"]
                qty: CartProductItemType["qty"]
            }>
        ) => {
            const {product_color_id, size_id, qty} = action.payload
            cartAdapter.updateOne(state, {id: `${product_color_id}${size_id}`, changes: {qty}})
            // Сумма
            const {totalPrice, leftToPay} = updateTotal(state)
            state.totalPrice = totalPrice
            state.leftToPay = leftToPay
        },
        // Очистить корзину
        clearCart: state => {
            cartAdapter.removeAll(state)
            state.discount = null
            state.additionalServices = []
            // Сумма
            state.totalPrice = 0
            state.leftToPay = 0
            state.processing = false
            state.payChange = 0
            // state.drawer = {visible: false}
            state.createOrderButton = {loading: false, disabled: true}
            state.payments = [{payment_id: 3, label: "Наличные", price: 0}]
        },
        // Задать скидку
        setDiscount: (state, action: PayloadAction<StateProps["discount"]>) => {
            state.discount = action.payload
            // Сумма
            const {totalPrice, leftToPay} = updateTotal(state)
            state.totalPrice = totalPrice
            state.leftToPay = leftToPay
        },
        // Добавить или удалить вид оплаты
        addOrDeletePayment: (state, action: PayloadAction<StateProps["payments"][0]>) => {
            const {payment_id} = action.payload

            if (!!state.payments.find(payment => payment.payment_id === payment_id))
                state.payments = state.payments.filter(payment => payment.payment_id !== payment_id)
            else state.payments = [...state.payments, action.payload]

            const {leftToPay, payChange, createOrderButtonDisabled} = updateTotal(state)
            state.leftToPay = leftToPay
            state.payChange = payChange
            state.createOrderButton.disabled = createOrderButtonDisabled
        },
        // Обновить оплату
        changePriceToPayment: (
            state,
            action: PayloadAction<{
                payment_id: StateProps["payments"][0]["payment_id"]
                price: StateProps["payments"][0]["price"]
            }>
        ) => {
            const {payment_id, price} = action.payload
            state.payments = state.payments.map(payment => {
                if (payment.payment_id === payment_id) payment.price = price
                return payment
            })

            const {leftToPay, payChange, createOrderButtonDisabled} = updateTotal(state)
            state.leftToPay = leftToPay
            state.payChange = payChange
            state.createOrderButton.disabled = createOrderButtonDisabled
        },

        // Изменить состояния на обработку
        changeProcessing: (state, action: PayloadAction<StateProps["processing"]>) => {
            state.processing = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProductColorBySKU.fulfilled, (state, action) => {
            if (action.payload) {
                const {product_color_id, size_id} = action.payload
                if (product_color_id && size_id && state.ids.includes(`${product_color_id}${size_id}`)) {
                    const qty = state.entities[`${product_color_id}${size_id}`]?.qty || 1
                    cartAdapter.updateOne(state, {
                        id: `${product_color_id}${size_id}`,
                        changes: {qty: qty + 1}
                    })
                } else cartAdapter.addOne(state, action.payload)
                // Сумма
                const {totalPrice, leftToPay} = updateTotal(state)
                state.totalPrice = totalPrice
                state.leftToPay = leftToPay
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
    addOrDeletePayment,
    addAdditionalService,
    removeAdditionalService,
    updateQtyAdditionalService,
    changeProcessing,
    changePriceToPayment
} = cartSlice.actions

export const {selectAll} = cartAdapter.getSelectors<StoreState>(state => state.cart)

export default cartSlice.reducer

export const useCartProductColors = () => useSelector(selectAll)

export const useCartAdditionalServices = () =>
    useSelector((state: StoreState) => state.cart.additionalServices)

// Вывод параметров корзины
export const useCartParams = () => useSelector((state: StoreState) => state.cart)
