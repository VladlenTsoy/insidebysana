import {useSelector} from "react-redux"
import {selectAllTags} from "./tagSlice"
import {AdminState} from "../store"

// Загрузка
export const useLoadingTag = () => useSelector((state: AdminState) => state.tag.loading)

// Вывод всех цветов
export const useSelectAllTags = () => useSelector(selectAllTags)
