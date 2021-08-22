import {useSelector} from "react-redux"
import {getSourceById, selectAllSources} from "./sourceSlice"
import {StoreState} from "../../../store"
import { Color } from "../../../lib/types/Color";

// Загрузка
export const useLoadingSources = () => useSelector((state: StoreState) => state.source.loading)

// Вывод всех
export const useSelectAllSources = () => useSelector(selectAllSources)

//
export const useSelectSourceById = (id: Color['id']) => useSelector((state: StoreState) => getSourceById(state, id))