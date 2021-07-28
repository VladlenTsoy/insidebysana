import {useSelector} from "react-redux"
import {StoreState} from "../store"

// Вывод состояние окна
export const useDrawerOrderPos = () => useSelector((state: StoreState) => state.pos.drawer)

// Вывод состояние кнопки
export const useButtonSubmit = () => useSelector((state: StoreState) => state.pos.buttonSubmit)
