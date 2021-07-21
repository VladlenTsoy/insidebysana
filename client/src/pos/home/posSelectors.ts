import {useSelector} from "react-redux"
import {StoreState} from "../store"
import {selectAllPosProductColors} from "./posSlice"

// Загрузка
export const useLoadingPosProductColors = () => useSelector((state: StoreState) => state.pos.loading)

// Вывод итоговой суммы
export const useTotalPricePos = () => useSelector((state: StoreState) => state.pos.totalPrice)

// Вывод скидки
export const useDiscountPos = () => useSelector((state: StoreState) => state.pos.discount)

// Вывод Категории для фильтрации
export const useCategoryIdPos = () => useSelector((state: StoreState) => state.pos.category_id)

// Вывод размера для фильтрации
export const useSizeIdPos = () => useSelector((state: StoreState) => state.pos.size_id)

// Вывод доп. услуг
export const useAdditionalServicesPos = () => useSelector((state: StoreState) => state.pos.addtionalServices)

// Вывод продуктов
export const usePosProductColorCards = () => useSelector((state: StoreState) => state.pos.productsFound)

// Вывод всех
export const useSelectAllPosProductColors = () => useSelector(selectAllPosProductColors)

// Вывод состояния на обработку
export const useProcessing = () => useSelector((state: StoreState) => state.pos.processing)

// Вывод остатка оплаты
export const useLeftToPay = () => useSelector((state: StoreState) => state.pos.leftToPay)

// Вывод сдачи
export const usePayChange = () => useSelector((state: StoreState) => state.pos.payChange)

// Вывод видов оплаты
export const usePayments = () => useSelector((state: StoreState) => state.pos.payments)

// Вывод состояние окна
export const useDrawerOrderPos = () => useSelector((state: StoreState) => state.pos.drawer)

// Вывод состояние кнопки
export const useButtonSubmit = () => useSelector((state: StoreState) => state.pos.buttonSubmit)
