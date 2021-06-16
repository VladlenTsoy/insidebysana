import {Drawer} from "antd"
import React from "react"
import {useDrawerOrderPos} from "store/cashier/pos/posSelectors"
import {changeDrawer} from "store/cashier/pos/posSlice"
import {useCashierDispatch} from "store/cashier/store"
import PosOrder from "./PosOrder"

const PosOrderAction: React.FC = ({children}) => {
    const {visible} = useDrawerOrderPos()
    const dispatch = useCashierDispatch()

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
