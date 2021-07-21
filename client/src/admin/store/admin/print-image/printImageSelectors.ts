import {useSelector} from "react-redux"
import {AdminState} from "../store"
import {selectAll} from "./printImageSlice"

// Загрузка
export const useLoadingPrintImages = () => useSelector((state: AdminState) => state.printImage.loading)

// Вывод всех
export const useSelectAllPrintImages = () => useSelector(selectAll)
