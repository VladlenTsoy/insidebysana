import {getProductColorById, selectAllProductColors} from "./productColorSlice"
import {useSelector} from "react-redux"
import {StoreState} from "../../../store"
import {Color} from "../../../lib/types/Color"

// Загрузка обновления хранилища
export const useLoadingProductColors = () => useSelector((state: StoreState) => state.productColor.loading)

// Вывод всех из хранилища
export const useSelectAllProductColors = () => useSelector(selectAllProductColors)

// Вывод по Id из хранилища
export const useSelectProductColorById = (id: Color["id"]) =>
    useSelector((state: StoreState) => getProductColorById(state, id))