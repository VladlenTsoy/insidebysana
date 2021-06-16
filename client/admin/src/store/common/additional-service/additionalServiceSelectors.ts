import {useSelector} from "react-redux"
import {CommonState} from "../store"
import {selectAllAdditionalServices} from "./additionalServiceSlice"

// Загрузка
export const useLoadingAdditionalServices = () =>
    useSelector((state: CommonState) => state.additionalService.loading)

// Вывод всех
export const useSelectAllAdditionalServices = () => useSelector(selectAllAdditionalServices)
