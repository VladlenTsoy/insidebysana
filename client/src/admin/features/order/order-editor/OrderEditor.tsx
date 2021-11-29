import React from "react"
import EditorOrderFetchById from "../../../lib/components/editors/editor-order-action/EditorOrderFetchById"
import HeaderPage from "../../../components/header-page/HeaderPage"
import ContainerPage from "../../../components/container-page/ContainerPage"
import {useParams} from "react-router-dom"
import {Button} from "antd"

const OrderEditor = () => {
    const {id} = useParams<{id?: string}>()
    return (
        <>
            <HeaderPage
                title="Создать заказ"
                action={
                    <Button
                        type="primary"
                        form="editor-order-drawer"
                        size="large"
                        htmlType="submit"
                    >
                        Сохранить
                    </Button>
                }
            />
            <ContainerPage>
                <EditorOrderFetchById orderId={id} />
            </ContainerPage>
        </>
    )
}

export default OrderEditor
