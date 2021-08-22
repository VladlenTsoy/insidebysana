import {useSelector} from "react-redux"
import {StoreState} from "../../../store"
import {selectAll} from "./printImageSlice"

// Загрузка
export const useLoadingPrintImages = () => useSelector((state: StoreState) => state.printImage.loading)

// Вывод всех
export const useSelectAllPrintImages = () => useSelector(selectAll)
