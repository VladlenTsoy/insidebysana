import React, {useCallback, useState} from "react"
import {Drawer} from "antd"
import TableTrashProducts from "./TableTrashProducts"

const TrashProducts: React.FC = ({children}) => {
    const [visible, setVisible] = useState(false)

    const close = useCallback(() => setVisible(false), [])
    const handleClick = () => setVisible(true)

    const action = React.Children.map(children, (child: any) =>
        React.cloneElement(child, {onClick: handleClick})
    )

    return (
        <>
            {action}
            <Drawer
                visible={visible}
                width="100%"
                title="Корзина"
                onClose={close}
            >
                <TableTrashProducts/>
            </Drawer>
        </>
    )
}

export default TrashProducts