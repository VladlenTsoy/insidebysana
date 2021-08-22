import {useSelector} from "react-redux"
import {getColorById, selectAllColors} from "./colorSlice"
import {StoreState} from "../../../store"
import { Color } from "../../../lib/types/Color";

// Загрузка
export const useLoadingColors = () => useSelector((state: StoreState) => state.color.loading)

// Вывод всех цветов
export const useSelectAllColors = () => useSelector(selectAllColors)

//
export const useSelectColorById = (id: Color['id']) => useSelector((state: StoreState) => getColorById(state, id))