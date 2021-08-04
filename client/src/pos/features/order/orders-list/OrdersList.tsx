import OrdersTableBlock from "components/blocks/orders-table-block/OrdersTableBlock"
import React from "react"
import {useGetOrdersQuery} from "../orderApi"
import {useGetPaymentMethodQuery} from "./paymentMethodsApi"
import "./OrdersList.less"

const Orders: React.FC = () => {
    const {data: orders, isLoading: isLoadingOrders} = useGetOrdersQuery()
    const {data: paymentMethods, isLoading: isLoadingPaymentMethods} = useGetPaymentMethodQuery()

    return (
        <div className="wrapper-orders">
            <OrdersTableBlock
                loading={isLoadingOrders || isLoadingPaymentMethods}
                orders={orders || []}
                access={"cashier"}
                payments={paymentMethods || []}
            />
        </div>
    )
}
export default Orders
