import {useSelector} from "react-redux"
import {selectAllStatuses} from "./statusSlice"
import { AdminState } from "../store";

export const useLoadingStatuses = () => useSelector((state: AdminState) => state.status.loading)

export const useSelectAllStatuses = () => useSelector(selectAllStatuses)
