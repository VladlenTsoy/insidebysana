import {useSelector} from "react-redux"
import {StoreState} from "../store"
import {selectAllOrders} from "./orderSlice"

// Загрузка
export const useLoadingOrders = () => useSelector((state: StoreState) => state.address.loading)

// Вывод всех
export const useSelectAllOrders = () => useSelector(selectAllOrders)