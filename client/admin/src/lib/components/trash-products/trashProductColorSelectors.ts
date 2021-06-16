import {selectAllTrashProductColors} from "./trashProductColorSlice"
import {useSelector} from "react-redux"
import {AdminState} from "store/admin/store"

// Загрузка обновления хранилища
export const useLoadingTrashProductColors = () => useSelector((state: AdminState) => state.trashProductColor.loading)

// Вывод всех из хранилища
export const useSelectAllTrashProductColors = () => useSelector(selectAllTrashProductColors)