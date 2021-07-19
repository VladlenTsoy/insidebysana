import {useSelector} from "react-redux"
import {CashierState} from "../store"
import {selectAllPaymentMethods} from "./paymentMethodSlice"

// Загрузка
export const useLoadingPaymentMethods = () =>
    useSelector((state: CashierState) => state.paymentMethod.loading)

// Вывод всех
export const useSelectAllPaymentMethods = () => useSelector(selectAllPaymentMethods)
