import {useSelector} from "react-redux"
import {CashierState} from "../store"
import {selectAllOrders} from "./orderSlice"

// Загрузка
export const useLoadingOrders = () => useSelector((state: CashierState) => state.order.loading)

//
export const useFilterDatesOrders = () => useSelector((state: CashierState) => state.order.filterDates)

// Вывод всех
export const useSelectAllOrders = () => useSelector(selectAllOrders)
