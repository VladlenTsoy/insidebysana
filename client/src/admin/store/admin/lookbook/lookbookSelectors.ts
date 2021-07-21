import {useSelector} from "react-redux"
import {AdminState} from "../store"
import {selectAllLookbook} from "./lookbookSlice"
import {selectAll} from "./lookbookCategorySlice"

// Загрузка
export const useLoadingLookbook = () => useSelector((state: AdminState) => state.lookbook.loading)

// Вывод всех
export const useSelectAllLookbook = () => useSelector(selectAllLookbook)

// Загрузка
export const useLoadingLookbookCategory = () =>
    useSelector((state: AdminState) => state.lookbookCategory.loading)

// Вывод всех
export const useSelectAllLookbookCategories = () => useSelector(selectAll)
