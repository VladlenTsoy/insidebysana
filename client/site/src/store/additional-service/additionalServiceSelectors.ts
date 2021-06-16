import {useSelector} from "react-redux"
import {StoreState} from "../store"
import {selectAllAdditionalServices} from "./additionalServiceSlice"

// Загрузка
export const useLoadingAdditionalServices = () =>
    useSelector((state: StoreState) => state.additionalService.loading)

// Вывод всех
export const useSelectAllAdditionalServices = () => useSelector(selectAllAdditionalServices)
