import {useSelector} from "react-redux"
import {StoreState} from "../../../store"
import {selectAllBanners} from "./bannerSlice"

// Загрузка
export const useLoadingBanner = () => useSelector((state: StoreState) => state.banner.loading)

// Вывод всех баннеров
export const useSelectAllBanners = () => useSelector(selectAllBanners)
