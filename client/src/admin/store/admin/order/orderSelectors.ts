import {Order} from "admin/lib/types/Order"
import {useSelector} from "react-redux"
import {StoreState} from "../../../store"
import {selectAllOrders, getOrderById} from "../../../features/order/orderSlice"

export const useLoadingOrders = () => useSelector((state: StoreState) => state.order.loading)

export const useSelectAllOrders = () => useSelector(selectAllOrders)

//
export const useSelectByStatusId = (statusId: number) =>
    useSelector((state: StoreState) => {
        return selectAllOrders(state).filter(order => {
            return order.status_id === statusId
        })
    })

// Вывод Заказы по Id
export const useSelectOrderById = (id: Order["id"] | undefined) =>
    useSelector((state: StoreState) => getOrderById(state, id || 0))
