import {useSelector} from "react-redux"
import {CashierState} from "../store"
import {selectAllPosProductColors} from "./posSlice"

// Загрузка
export const useLoadingPosProductColors = () => useSelector((state: CashierState) => state.pos.loading)

//
export const useTotalPricePos = () => useSelector((state: CashierState) => state.pos.totalPrice)

//
export const useDiscountPos = () => useSelector((state: CashierState) => state.pos.discount)

//
export const useCategoryIdPos = () => useSelector((state: CashierState) => state.pos.category_id)

//
export const useSizeIdPos = () => useSelector((state: CashierState) => state.pos.size_id)

export const useAdditionalServicesPos = () =>
    useSelector((state: CashierState) => state.pos.addtionalServices)

//
export const usePosProductColorCards = () => useSelector((state: CashierState) => state.pos.productsFound)

// Вывод всех
export const useSelectAllPosProductColors = () => useSelector(selectAllPosProductColors)
