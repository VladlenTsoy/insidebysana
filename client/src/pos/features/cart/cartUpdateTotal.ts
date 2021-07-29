import {StoreState} from "pos/store"

// Обновить итоговую стоимость
export const updateTotal = (state: StoreState["cart"]) => {
    const {discount, addtionalServices} = state
    const products = Object.values(state.entities)
    let totalPrice = 0

    // Добавление товаров
    if (products.length) {
        totalPrice += products.reduce((acc, {product, qty}: any) => {
            const price = product.discount
                ? (product.price - (product.price / 100) * product.discount.discount).toFixed(0)
                : product.price
            return acc + Number(price) * qty
        }, 0)
    }

    // Скидка
    if (discount && totalPrice > 0) {
        if (discount.type === "percent") totalPrice = totalPrice - (totalPrice / 100) * discount.discount
        else totalPrice = totalPrice - discount.discount
    }

    // Добавление допб услуг
    if (addtionalServices.length)
        totalPrice += addtionalServices.reduce(
            (acc, addtionalService) => (acc += addtionalService.price * addtionalService.qty),
            0
        )

    // Общая введенная сумма
    const totalPricePayments = state.payments.reduce((acc, payment) => (acc += payment.price), 0)
    // Осталось оплатить
    const leftToPay = totalPrice - totalPricePayments

    return [totalPrice, leftToPay]
}
