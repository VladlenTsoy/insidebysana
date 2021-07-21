import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {AdditionalService} from "admin/lib/types/AdditionalService"
import {Category} from "admin/lib/types/Category"
import {Size} from "admin/lib/types/Size"
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
    payments: {
        payment_id: number
        label: string
        price: number
    }[]
    payChange: number
    leftToPay: number
    processing: boolean
    drawer: {
        visible: boolean
    }
    buttonSubmit: {
        loading: boolean
        disabled: boolean
    }
}

const initialState = posAdapter.getInitialState<StateProps>({
    category_id: 0,
    size_id: 0,
    loading: false,
    totalPrice: 0,
    productsFound: [],
    discount: null,
    addtionalServices: [],
    payments: [{payment_id: 3, label: "Наличные", price: 0}],
    payChange: 0,
    leftToPay: 0,
    processing: false,
    drawer: {
        visible: false
    },
    buttonSubmit: {
        loading: false,
        disabled: true
    }
})

// Обновить итоговую стоимость
const updateTotal = (state: CashierState["pos"]) => {
    const {discount, addtionalServices} = state
    const products = Object.values(state.entities)
    let totalPrice = 0

    if (products.length) {
        totalPrice += products.reduce((acc, {product, qty}: any) => {
            const price = product.discount
                ? (product.details.price - (product.details.price / 100) * product.discount.discount).toFixed(
                      0
                  )
                : product.details.price
            return acc + Number(price) * qty
        }, 0)
    }

    if (discount && totalPrice > 0) {
        if (discount.type === "percent") totalPrice = totalPrice - (totalPrice / 100) * discount.discount
        else totalPrice = totalPrice - discount.discount
    }

    if (addtionalServices.length)
        totalPrice += addtionalServices.reduce(
            (acc, addtionalService) => (acc += addtionalService.price * addtionalService.qty),
            0
        )

    const totalPricePayments = state.payments.reduce((acc, payment) => (acc += payment.price), 0)

    // Осталось оплатить
    const leftToPay = totalPrice - totalPricePayments

    return [totalPrice, leftToPay]
}

const posSlice = createSlice({
    name: "pos",
    initialState,
    reducers: {
        // Добавить доп. услугу
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
            // Сумма
            const [totalPrice, leftToPay] = updateTotal(state)
            state.totalPrice = totalPrice
            state.leftToPay = leftToPay
        },
        // Удалить доп. услугу
        removeAdditionalService: (state, action: PayloadAction<AdditionalService["id"]>) => {
            state.addtionalServices = state.addtionalServices.filter(
                additionalService => additionalService.id !== action.payload
            )
            // Сумма
            const [totalPrice, leftToPay] = updateTotal(state)
            state.totalPrice = totalPrice
            state.leftToPay = leftToPay
        },
        // Обновить кол-во доп. улуг
        updateQtyAdditionalService: (
            state,
            action: PayloadAction<{id: AdditionalService["id"]; qty: number}>
        ) => {
            state.addtionalServices = state.addtionalServices.map(additionalService => {
                if (additionalService.id === action.payload.id) additionalService.qty = action.payload.qty
                return additionalService
            })
            // Сумма
            const [totalPrice, leftToPay] = updateTotal(state)
            state.totalPrice = totalPrice
            state.leftToPay = leftToPay
        },
        // Доавить в корзину
        addToCart: (state, action: PayloadAction<ProductColorCart>) => {
            posAdapter.addOne(state, action.payload)
            // Сумма
            const [totalPrice, leftToPay] = updateTotal(state)
            state.totalPrice = totalPrice
            state.leftToPay = leftToPay
        },
        // Удалить с корзины
        removeFromCart: (
            state,
            action: PayloadAction<{
                product_color_id: ProductColorCart["product_color_id"]
                size_id: ProductColorCart["size_id"]
            }>
        ) => {
            const {product_color_id, size_id} = action.payload
            posAdapter.removeOne(state, `${product_color_id}${size_id}`)
            // Сумма
            const [totalPrice, leftToPay] = updateTotal(state)
            state.totalPrice = totalPrice
            state.leftToPay = leftToPay
        },
        // Обновить кол-во продукта
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
            // Сумма
            const [totalPrice, leftToPay] = updateTotal(state)
            state.totalPrice = totalPrice
            state.leftToPay = leftToPay
        },
        // Очистить корзину
        clearCart: state => {
            posAdapter.removeAll(state)
            // state.productsFound = []
            state.discount = null
            state.addtionalServices = []
            // Сумма
            state.totalPrice = 0
            state.leftToPay = 0
            state.processing = false
            state.payChange = 0
            state.drawer = {visible: false}
            state.buttonSubmit = {loading: false, disabled: true}
            state.payments = [{payment_id: 3, label: "Наличные", price: 0}]
        },
        // Задать скидку
        setDiscount: (state, action: PayloadAction<StateProps["discount"]>) => {
            state.discount = action.payload
            // Сумма
            const [totalPrice, leftToPay] = updateTotal(state)
            state.totalPrice = totalPrice
            state.leftToPay = leftToPay
        },
        // Добавить или удалить вид оплаты
        addOrDeletePayment: (state, action: PayloadAction<StateProps["payments"][0]>) => {
            const {payment_id} = action.payload

            if (!!state.payments.find(payment => payment.payment_id === payment_id))
                state.payments = state.payments.filter(payment => payment.payment_id !== payment_id)
            else state.payments = [...state.payments, action.payload]

            const totalPricePayments = state.payments.reduce((acc, payment) => (acc += payment.price), 0)
            // Осталось оплатить
            state.leftToPay = state.totalPrice - totalPricePayments
            // Сдачи
            state.payChange =
                totalPricePayments - state.totalPrice > 0 ? totalPricePayments - state.totalPrice : 0
            // Блокировка кнопки
            state.buttonSubmit.disabled = state.totalPrice > totalPricePayments
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
            const totalPricePayments = state.payments.reduce((acc, payment) => (acc += payment.price), 0)
            // Осталось оплатить
            state.leftToPay = state.totalPrice - totalPricePayments
            // Сдачи
            state.payChange =
                totalPricePayments - state.totalPrice > 0 ? totalPricePayments - state.totalPrice : 0
            // Блокировка кнопки
            state.buttonSubmit.disabled = state.totalPrice > totalPricePayments
        },
        // Изменить Категорию для фильтации
        changeCategoryId: (state, action: PayloadAction<StateProps["category_id"]>) => {
            state.category_id = action.payload
        },
        // Изменить Размер для фильтрации
        changeSizeId: (state, action: PayloadAction<StateProps["size_id"]>) => {
            state.size_id = action.payload
        },
        // Изменить состояния на обработку
        changeProcessing: (state, action: PayloadAction<StateProps["processing"]>) => {
            state.processing = action.payload
        },
        // Изменения состояние окна
        changeDrawer: (state, action: PayloadAction<StateProps["drawer"]>) => {
            state.drawer = action.payload
        },
        // Изменеия состояние кнопки
        changeButtonSubmit: (state, action: PayloadAction<{loading?: boolean; disabled?: boolean}>) => {
            state.buttonSubmit = {...state.buttonSubmit, ...action.payload}
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
                // Сумма
                const [totalPrice, leftToPay] = updateTotal(state)
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
    changeCategoryId,
    changeSizeId,
    addAdditionalService,
    removeAdditionalService,
    updateQtyAdditionalService,
    changeProcessing,
    changePriceToPayment,
    changeDrawer,
    changeButtonSubmit
} = posSlice.actions

export const {selectAll: selectAllPosProductColors} = posAdapter.getSelectors<CashierState>(
    state => state.pos
)

export default posSlice.reducer
