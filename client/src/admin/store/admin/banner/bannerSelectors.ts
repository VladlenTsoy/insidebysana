import {useSelector} from "react-redux"
import {AdminState} from "../store"
import {selectAllBanners} from "./bannerSlice"

// Загрузка
export const useLoadingBanner = () => useSelector((state: AdminState) => state.banner.loading)

// Вывод всех баннеров
export const useSelectAllBanners = () => useSelector(selectAllBanners)
