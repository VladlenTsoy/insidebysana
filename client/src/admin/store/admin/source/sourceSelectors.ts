import {useSelector} from "react-redux"
import {getSourceById, selectAllSources} from "./sourceSlice"
import {AdminState} from "../store"
import { Color } from "../../../lib/types/Color";

// Загрузка
export const useLoadingSources = () => useSelector((state: AdminState) => state.source.loading)

// Вывод всех
export const useSelectAllSources = () => useSelector(selectAllSources)

//
export const useSelectSourceById = (id: Color['id']) => useSelector((state: AdminState) => getSourceById(state, id))