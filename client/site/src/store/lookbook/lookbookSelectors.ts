import {useSelector} from "react-redux"
import {StoreState} from "../store"
import {selectAllLookbook} from "./lookbookSlice"

// Загрузка
export const useLoadingLookbook = () => useSelector((state: StoreState) => state.lookbook.loading)

// Вывод всех
export const useSelectAllLookbook = () => useSelector(selectAllLookbook)
