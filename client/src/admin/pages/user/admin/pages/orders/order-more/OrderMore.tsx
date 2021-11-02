import React from "react"
import Information from "../../../../../../lib/components/more/order-more-action/information/Information"
import Products from "../../../../../../lib/components/more/order-more-action/products/Products"
import {useParams} from "react-router-dom"
import HeaderPage from "../../../../../../components/header-page/HeaderPage"
import ContainerPage from "../../../../../../components/container-page/ContainerPage"

const OrderMore = () => {
    const {id} = useParams<{id: string}>()

    return (
        <>
            <HeaderPage title="Создать заказ" />
            <ContainerPage>
                <div className="order-more-container">
                    <Information orderId={Number(id)} />
                    <Products orderId={Number(id)} />
                </div>
            </ContainerPage>
        </>
    )
}

export default OrderMore
