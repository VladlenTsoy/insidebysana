import {useSelector} from "react-redux"
import {StoreState} from "../../../store"
// import {selectAllLookbook} from "./lookbookSlice"
import {selectAll} from "./lookbookCategorySlice"

// Загрузка
export const useLoadingLookbook = () => useSelector((state: StoreState) => state.lookbook.loading)

// Вывод всех
// export const useSelectAllLookbook = () => useSelector(selectAllLookbook)
export const useSelectLookbookByCategoryId = (categoryId: number) =>
    useSelector((state: StoreState) =>
        Object.values(state.lookbook.entities).filter(lookbook => lookbook?.category_id === categoryId)
    )

// Загрузка
export const useLoadingLookbookCategory = () =>
    useSelector((state: StoreState) => state.lookbookCategory.loading)

// Вывод всех
export const useSelectAllLookbookCategories = () => useSelector(selectAll)
