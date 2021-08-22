import {useSelector} from "react-redux"
import {StoreState} from "../../../store"
import {selectAllPaymentMethods} from "./paymentMethodSlice"

// Загрузка
export const useLoadingPaymentMethods = () => useSelector((state: StoreState) => state.paymentMethod.loading)

// Вывод всех
export const useSelectAllPaymentMethods = () => useSelector(selectAllPaymentMethods)
