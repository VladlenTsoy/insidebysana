import React from "react"
import EditorOrderFetchById from "../../../lib/components/editors/editor-order-action/EditorOrderFetchById"
import HeaderPage from "../../../components/header-page/HeaderPage"
import ContainerPage from "../../../components/container-page/ContainerPage"
import {useParams} from "react-router-dom"

const OrderEditor = () => {
    const {id} = useParams<{id?: string}>()
    return (
        <>
            <HeaderPage title="Создать заказ" />
            <ContainerPage>
                <EditorOrderFetchById orderId={id} />
            </ContainerPage>
        </>
    )
}

export default OrderEditor
