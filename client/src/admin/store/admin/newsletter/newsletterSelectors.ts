import {useSelector} from "react-redux"
import {selectAllNewsletter} from "./newsletterSlice"
import {StoreState} from "../../../store"

// Загрузка
export const useLoadingNewsletter = () => useSelector((state: StoreState) => state.newsletter.loading)

// Вывод всех
export const useSelectAllNewsletter = () => useSelector(selectAllNewsletter)
