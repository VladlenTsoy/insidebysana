import {Drawer} from "antd"
import React from "react"
import {useDrawerOrderPos} from "pos/home/posSelectors"
import {changeDrawer} from "pos/home/posSlice"
import {useDispatch} from "pos/store"
import PosOrder from "./PosOrder"

const PosOrderAction: React.FC = ({children}) => {
    const {visible} = useDrawerOrderPos()
    const dispatch = useDispatch()

    const handleClick = () => dispatch(changeDrawer({visible: true}))

    const action = React.Children.map(children, (child: any) =>
        React.cloneElement(child, {onClick: handleClick})
    )

    return (
        <>
            {action}
            <Drawer
                className="pos-create-order-drawer"
                visible={visible}
                width="100%"
                closable={false}
                destroyOnClose
            >
                <PosOrder />
            </Drawer>
        </>
    )
}
export default PosOrderAction
