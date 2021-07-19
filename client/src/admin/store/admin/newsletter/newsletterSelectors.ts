import {useSelector} from "react-redux"
import {selectAllNewsletter} from "./newsletterSlice"
import {AdminState} from "../store"

// Загрузка
export const useLoadingNewsletter = () => useSelector((state: AdminState) => state.newsletter.loading)

// Вывод всех
export const useSelectAllNewsletter = () => useSelector(selectAllNewsletter)
