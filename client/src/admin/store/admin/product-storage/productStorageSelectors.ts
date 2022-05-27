import {useSelector} from "react-redux"
import {selectById, selectAll} from "./productStorageSlice"
import {StoreState} from "../../../store"
import {ProductStorage} from "../../../../types/product/ProductStorage"

// Загрузка
export const useLoadingProductStorage = () => useSelector((state: StoreState) => state.productStorage.loading)

// Вывод всех
export const useSelectAllProductStorages = () => useSelector(selectAll)

//
export const useSelectProductStorageById = (id: ProductStorage["id"]) => useSelector((state: StoreState) => selectById(state, id))
