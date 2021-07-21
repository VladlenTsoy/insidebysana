import {useSelector} from "react-redux"
import {AdminState} from "../store"
import {selectAllStaff} from "./staffSlice"

// Загрузка
export const useLoadingStaff = () => useSelector((state: AdminState) => state.staff.loading)

// Вывод всех
export const useSelectAllStaff = () => useSelector(selectAllStaff)
