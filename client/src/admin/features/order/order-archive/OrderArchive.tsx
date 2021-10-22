import React from "react"
import OrdersArchive from "../../../pages/user/admin/pages/orders/orders-archive-drawer/OrdersArchive"
import HeaderPage from "../../../components/header-page/HeaderPage"
import ContainerPage from "../../../components/container-page/ContainerPage"

const OrderArchive = () => {
    return (
        <>
            <HeaderPage title="Архив заказов" />
            <ContainerPage>
                <OrdersArchive />
            </ContainerPage>
        </>
    )
}

export default OrderArchive
