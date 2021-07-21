import OrdersTableBlock from "admin/lib/components/blocks/orders-table-block/OrdersTableBlock"
import React, {useEffect} from "react"
import {fetchOrders} from "admin/store/cashier/order/fetchOrders"
import {useFilterDatesOrders, useLoadingOrders, useSelectAllOrders} from "admin/store/cashier/order/orderSelectors"
import {fetchPaymentMethods} from "admin/store/cashier/payment-method/fetchPaymentMethods"
import {
    useLoadingPaymentMethods,
    useSelectAllPaymentMethods
} from "admin/store/cashier/payment-method/paymentMethodSelectors"
import {useCashierDispatch} from "admin/store/cashier/store"
import "./Orders.less"

const Orders: React.FC = () => {
    const payments = useSelectAllPaymentMethods()
    const loadingPayments = useLoadingPaymentMethods()
    const orders = useSelectAllOrders()
    const loading = useLoadingOrders()
    const dispatch = useCashierDispatch()
    const dates = useFilterDatesOrders()

    useEffect(() => {
        if (dates) {
            const promise = dispatch(
                fetchOrders({
                    dateFrom: dates.from,
                    dateTo: dates.to
                })
            )
            return () => {
                promise.abort()
            }
        }
    }, [dispatch, dates])

    useEffect(() => {
        const promise = dispatch(fetchPaymentMethods())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <div className="wrapper-orders">
            <OrdersTableBlock
                loading={loading || loadingPayments}
                orders={orders}
                access={"cashier"}
                payments={payments}
            />
        </div>
    )
}
export default Orders
