import React from "react"
import EditorOrderFetchById from "../../../lib/components/editors/editor-order-action/EditorOrderFetchById"
import HeaderPage from "../../../components/header-page/HeaderPage"
import ContainerPage from "../../../components/container-page/ContainerPage"

const OrderEditor = () => {
    return (
        <>
            <HeaderPage title="Создать заказ" />
            <ContainerPage>
                <EditorOrderFetchById orderId={undefined} />
            </ContainerPage>
        </>
    )
}

export default OrderEditor
