import {useSelector} from "react-redux"
import {selectAllStatuses} from "./statusSlice"
import { StoreState } from "../../../store";

export const useLoadingStatuses = () => useSelector((state: StoreState) => state.status.loading)

export const useSelectAllStatuses = () => useSelector(selectAllStatuses)
