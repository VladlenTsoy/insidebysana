import {ContainerOutlined} from "@ant-design/icons"
import {Button, Drawer} from "antd"
import React, {useState} from "react"
import OrdersArchive from "./OrdersArchive"

const OrdersArchiveDrawer: React.FC = () => {
    const [visible, setVisible] = useState(false)

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    return (
        <>
            <Button type="primary" size="large" block icon={<ContainerOutlined />} onClick={open}>
                Архив
            </Button>
            <Drawer title="Архив заказов" visible={visible} onClose={close} width="100%">
                <OrdersArchive />
            </Drawer>
        </>
    )
}
export default OrdersArchiveDrawer
