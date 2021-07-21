import {useSelector} from "react-redux"
import {getColorById, selectAllColors} from "./colorSlice"
import {AdminState} from "../store"
import { Color } from "../../../lib/types/Color";

// Загрузка
export const useLoadingColors = () => useSelector((state: AdminState) => state.color.loading)

// Вывод всех цветов
export const useSelectAllColors = () => useSelector(selectAllColors)

//
export const useSelectColorById = (id: Color['id']) => useSelector((state: AdminState) => getColorById(state, id))