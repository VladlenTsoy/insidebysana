import React, {useCallback, useState} from "react"
import "./EditorOrderAction.less"
import {Drawer} from "antd"
import EditorOrderDrawerFooter from "./edit-order-drawer/editor-order-drawer-footer/EditorProductDrawerFooter"
import EditorOrderFetchById from "./EditorOrderFetchById"

interface EditorOrderActionProps {
    orderId?: number
}

const EditorOrderAction: React.FC<EditorOrderActionProps> = ({children, orderId}) => {
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const close = useCallback(() => setVisible(false), [])
    const handleClick = () => setVisible(true)

    const action = React.Children.map(children, (child: any) =>
        React.cloneElement(child, {onClick: handleClick})
    )

    return (
        <>
            {action}
            <Drawer
                title={orderId ? `Редактировать сделку #${orderId}` : "Создать сделку"}
                width="100%"
                onClose={close}
                destroyOnClose
                visible={visible}
                footer={<EditorOrderDrawerFooter loading={loading} />}
            >
                <EditorOrderFetchById orderId={orderId} setLoadingFinish={setLoading} close={close} />
            </Drawer>
        </>
    )
}

export default EditorOrderAction
