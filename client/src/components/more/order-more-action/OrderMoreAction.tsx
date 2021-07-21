import {Button, Drawer, Space} from "antd"
import "./OrderMoreAction.less"
import {Order} from "types/Order"
import React, {useState} from "react"
import Information from "./information/Information"
import Products from "./products/Products"
import {EditOutlined} from "@ant-design/icons"
// import EditorOrderAction from "components/editors/editor-order-action/EditorOrderAction"

interface OrderMoreActionProps {
    orderId: Order["id"]
}

const OrderMoreAction: React.FC<OrderMoreActionProps> = ({children, orderId}) => {
    const [visible, setVisible] = useState<boolean>(false)

    const handleClick = (e: any) => {
        if (!e.target.classList.contains("phone")) setVisible(true)
    }
    const close = () => setVisible(false)

    const action = React.Children.map(children, (child: any) =>
        React.cloneElement(child, {onClick: handleClick})
    )

    return (
        <>
            {action}
            <Drawer
                visible={visible}
                onClose={close}
                width="100%"
                title={
                    <Space>
                        <div>Сделка #{orderId}</div>
                        {/* <EditorOrderAction orderId={orderId}>
                            <Button type="primary" size="small" icon={<EditOutlined />}>
                                Редактировать
                            </Button>
                        </EditorOrderAction> */}
                    </Space>
                }
            >
                <div className="order-more-container">
                    <Information orderId={orderId} />
                    <Products orderId={orderId} />
                </div>
            </Drawer>
        </>
    )
}
export default OrderMoreAction
