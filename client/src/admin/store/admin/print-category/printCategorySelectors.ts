import {useSelector} from "react-redux"
import {AdminState} from "../store"
import {selectAll} from "./printCategorySlice"

// Загрузка
export const useLoadingPrintCategories = () => useSelector((state: AdminState) => state.printCategory.loading)

// Вывод всех
export const useSelectAllPrintCategories = () => useSelector(selectAll)
