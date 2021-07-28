import {useSelector} from "react-redux"
import {AdminState} from "../store"
import {selectAllOrdersAchive} from "./orderArchiveSlice"

// Загрузка
export const useLoadingOrdersArchive = () => useSelector((state: AdminState) => state.orderArchive.loading)

//
export const useFilterDatesOrdersArchive = () =>
    useSelector((state: AdminState) => state.orderArchive.filterDates)


//
export const useFilterSourceOrdersArchive = () =>
useSelector((state: AdminState) => state.orderArchive.sourceId)

// Вывод всех
export const useSelectAllOrdersArchive = () => useSelector(selectAllOrdersAchive)
