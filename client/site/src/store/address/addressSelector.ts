import {useSelector} from "react-redux"
import {StoreState} from "../store"
import {selectAllAddresses} from "./addressSlice"

// Загрузка
export const useLoadingAddresses = () => useSelector((state: StoreState) => state.address.loading)

// Вывод всех
export const useSelectAllAddresses = () => useSelector(selectAllAddresses)
