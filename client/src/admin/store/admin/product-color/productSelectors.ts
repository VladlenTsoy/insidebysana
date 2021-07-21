import {getProductColorById, selectAllProductColors} from "./productColorSlice"
import {useSelector} from "react-redux"
import {AdminState} from "../store"
import {Color} from "../../../lib/types/Color"

// Загрузка обновления хранилища
export const useLoadingProductColors = () => useSelector((state: AdminState) => state.productColor.loading)

// Вывод всех из хранилища
export const useSelectAllProductColors = () => useSelector(selectAllProductColors)

// Вывод по Id из хранилища
export const useSelectProductColorById = (id: Color["id"]) =>
    useSelector((state: AdminState) => getProductColorById(state, id))