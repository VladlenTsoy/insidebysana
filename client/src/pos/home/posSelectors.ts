import {useSelector} from "react-redux"
import {StoreState} from "../store"
import {selectAllPosProductColors} from "./posSlice"

// Загрузка
export const useLoadingPosProductColors = () => useSelector((state: StoreState) => state.pos.loading)

// Вывод всех
export const useSelectAllPosProductColors = () => useSelector(selectAllPosProductColors)

// Вывод состояние окна
export const useDrawerOrderPos = () => useSelector((state: StoreState) => state.pos.drawer)

// Вывод состояние кнопки
export const useButtonSubmit = () => useSelector((state: StoreState) => state.pos.buttonSubmit)
