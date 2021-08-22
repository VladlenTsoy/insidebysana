import {useSelector} from "react-redux"
import {StoreState} from "../../../store"
import {selectAllOrdersAchive} from "./orderArchiveSlice"

// Загрузка
export const useLoadingOrdersArchive = () => useSelector((state: StoreState) => state.orderArchive.loading)

//
export const useFilterDatesOrdersArchive = () =>
    useSelector((state: StoreState) => state.orderArchive.filterDates)


//
export const useFilterSourceOrdersArchive = () =>
useSelector((state: StoreState) => state.orderArchive.sourceId)

// Вывод всех
export const useSelectAllOrdersArchive = () => useSelector(selectAllOrdersAchive)
