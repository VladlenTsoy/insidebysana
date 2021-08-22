import {selectAllPromoCodes} from "./promoCodeSlice"
import {useSelector} from "react-redux"
import {StoreState} from "../../../store"

// Загрузка
export const useLoadingPromoCodes = () => useSelector((state: StoreState) => state.promoCode.loading)

// Промокоды
export const useSelectAllPromoCodes = () => useSelector(selectAllPromoCodes)
