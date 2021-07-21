import {useSelector} from "react-redux"
import {AdminState} from "../store"
import {selectAllPaymentMethods} from "./paymentMethodSlice"

// Загрузка
export const useLoadingPaymentMethods = () => useSelector((state: AdminState) => state.paymentMethod.loading)

// Вывод всех
export const useSelectAllPaymentMethods = () => useSelector(selectAllPaymentMethods)
