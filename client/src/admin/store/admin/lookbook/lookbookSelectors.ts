import {useSelector} from "react-redux"
import {AdminState} from "../store"
import {selectAllLookbook} from "./lookbookSlice"

// Загрузка
export const useLoadingLookbook = () => useSelector((state: AdminState) => state.lookbook.loading)

// Вывод всех
export const useSelectAllLookbook = () => useSelector(selectAllLookbook)
