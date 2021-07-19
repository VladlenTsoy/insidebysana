import {Order} from "admin/lib/types/Order"
import {useSelector} from "react-redux"
import {AdminState} from "../store"
import {selectAllOrders, getOrderById} from "./orderSlice"

export const useLoadingOrders = () => useSelector((state: AdminState) => state.order.loading)

export const useSelectAllOrders = () => useSelector(selectAllOrders)

//
export const useSelectByStatusId = (statusId: number) =>
    useSelector((state: AdminState) => {
        return selectAllOrders(state).filter(order => {
            return typeof order?.next_status_id !== "undefined"
                ? order?.next_status_id === statusId
                : order.status_id === statusId
        })
    })

// Вывод сделки по Id
export const useSelectOrderById = (id: Order["id"] | undefined) =>
    useSelector((state: AdminState) => getOrderById(state, id || 0))
