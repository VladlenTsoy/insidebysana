import {useSelector} from "react-redux"
import {selectAllSizes, getSizeById} from "./sizeSlice"
import {CommonState} from "../store"
import {Size} from "../../../lib/types/Size"

// Загрузка
export const useLoadingSizes = () => useSelector((state: CommonState) => state.size.loading)

// Вывод всех цветов
export const useSelectAllSizes = () => useSelector(selectAllSizes)

export const useSelectSizeById = (id: Size["id"]) =>
    useSelector((state: CommonState) => getSizeById(state, id))
