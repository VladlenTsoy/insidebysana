import {useSelector} from "react-redux"
import {CashierState} from "../store"
import {selectAllPosProductColors} from "./posSlice"

// Загрузка
export const useLoadingPosProductColors = () => useSelector((state: CashierState) => state.pos.loading)

// Вывод итоговой суммы
export const useTotalPricePos = () => useSelector((state: CashierState) => state.pos.totalPrice)

// Вывод скидки
export const useDiscountPos = () => useSelector((state: CashierState) => state.pos.discount)

// Вывод Категории для фильтрации
export const useCategoryIdPos = () => useSelector((state: CashierState) => state.pos.category_id)

// Вывод размера для фильтрации
export const useSizeIdPos = () => useSelector((state: CashierState) => state.pos.size_id)

// Вывод доп. услуг
export const useAdditionalServicesPos = () =>
    useSelector((state: CashierState) => state.pos.addtionalServices)

// Вывод продуктов
export const usePosProductColorCards = () => useSelector((state: CashierState) => state.pos.productsFound)

// Вывод всех
export const useSelectAllPosProductColors = () => useSelector(selectAllPosProductColors)

// Вывод состояния на обработку
export const useProcessing = () => useSelector((state: CashierState) => state.pos.processing)

// Вывод остатка оплаты
export const useLeftToPay = () => useSelector((state: CashierState) => state.pos.leftToPay)

// Вывод сдачи
export const usePayChange = () => useSelector((state: CashierState) => state.pos.payChange)

// Вывод видов оплаты
export const usePayments = () => useSelector((state: CashierState) => state.pos.payments)

// Вывод состояние окна
export const useDrawerOrderPos = () => useSelector((state: CashierState) => state.pos.drawer)

// Вывод состояние кнопки
export const useButtonSubmit = () => useSelector((state: CashierState) => state.pos.buttonSubmit)
