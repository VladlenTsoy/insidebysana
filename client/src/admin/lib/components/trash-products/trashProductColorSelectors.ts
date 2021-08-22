import {selectAllTrashProductColors} from "./trashProductColorSlice"
import {useSelector} from "react-redux"
import {StoreState} from "admin/store"

// Загрузка обновления хранилища
export const useLoadingTrashProductColors = () => useSelector((state: StoreState) => state.trashProductColor.loading)

// Вывод всех из хранилища
export const useSelectAllTrashProductColors = () => useSelector(selectAllTrashProductColors)