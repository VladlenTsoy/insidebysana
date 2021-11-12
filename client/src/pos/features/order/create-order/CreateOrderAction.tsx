import {Drawer} from "antd"
import React, {useCallback} from "react"
import CreateOrder from "./CreateOrder"
import {useState} from "react"

const CreateOrderAction: React.FC = ({children}) => {
    const [visible, setVisible] = useState(false)

    const handleClick = () => setVisible(true)
    const close = useCallback(() => setVisible(false), [])

    const action = React.Children.map(children, (child: any) =>
        React.cloneElement(child, {onClick: handleClick})
    )

    return (
        <>
            {action}
            <Drawer
                className="create-order-drawer"
                visible={visible}
                width="100%"
                closable={false}
                // destroyOnClose
            >
                <CreateOrder close={close} />
            </Drawer>
        </>
    )
}
export default CreateOrderAction
