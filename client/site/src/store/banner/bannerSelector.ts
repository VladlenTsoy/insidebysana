import {useSelector} from "react-redux"
import {StoreState} from "../store"
import {selectAllBanners} from "./bannerSlice"

// Загрузка
export const useLoadingBanners = () => useSelector((state: StoreState) => state.category.loading)

// Вывод всех
export const useSelectAllBanners = () => useSelector(selectAllBanners)
