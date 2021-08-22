import {useSelector} from "react-redux"
import {StoreState} from "../../../store"
import {selectAll} from "./printCategorySlice"

// Загрузка
export const useLoadingPrintCategories = () => useSelector((state: StoreState) => state.printCategory.loading)

// Вывод всех
export const useSelectAllPrintCategories = () => useSelector(selectAll)
