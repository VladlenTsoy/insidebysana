import {selectAllPromoCodes} from "./promoCodeSlice"
import {useSelector} from "react-redux"
import {AdminState} from "../store"

// Загрузка
export const useLoadingPromoCodes = () => useSelector((state: AdminState) => state.promoCode.loading)

// Промокоды
export const useSelectAllPromoCodes = () => useSelector(selectAllPromoCodes)
