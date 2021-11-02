import React, {useEffect} from "react"
import {Button} from "antd"
import "./Orders.less"
import {useAdminDispatch} from "../../../../../store"
import {fetchOrders} from "../../../../../store/admin/order/fetchOrders"
import {
    ContainerOutlined,
    DollarOutlined,
    PlusOutlined
} from "@ant-design/icons"
import HeaderPage from "../../../../../components/header-page/HeaderPage"
import ContainerPage from "../../../../../components/container-page/ContainerPage"
import {Link} from "react-router-dom"
import StatusDropColumns from "../../../../../features/status/status-drop-columns/StatusDropColumns"

const Orders = () => {
    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchOrders())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <>
            <HeaderPage
                title="Заказы"
                action={
                    <>
                        <Link to="/orders/create">
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                size="large"
                            >
                                Создать
                            </Button>
                        </Link>
                        <Link to="/orders/archive">
                            <Button
                                type="dashed"
                                icon={<ContainerOutlined />}
                                size="large"
                            >
                                Архив
                            </Button>
                        </Link>
                    </>
                }
                icon={<DollarOutlined />}
            />
            <ContainerPage full>
                <StatusDropColumns />
            </ContainerPage>
        </>
    )
}

export default Orders
