import {useSelector} from "react-redux"
import {StoreState} from "../../../store"
import {selectAllStaff} from "./staffSlice"

// Загрузка
export const useLoadingStaff = () => useSelector((state: StoreState) => state.staff.loading)

// Вывод всех
export const useSelectAllStaff = () => useSelector(selectAllStaff)
