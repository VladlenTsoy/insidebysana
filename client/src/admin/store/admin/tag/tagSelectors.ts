import {useSelector} from "react-redux"
import {selectAllTags} from "./tagSlice"
import {StoreState} from "../../../store"

// Загрузка
export const useLoadingTag = () => useSelector((state: StoreState) => state.tag.loading)

// Вывод всех цветов
export const useSelectAllTags = () => useSelector(selectAllTags)
