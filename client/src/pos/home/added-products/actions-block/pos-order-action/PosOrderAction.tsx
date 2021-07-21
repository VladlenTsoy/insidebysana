import {Drawer} from "antd"
import React from "react"
import {useDrawerOrderPos} from "../../../posSelectors"
import {changeDrawer} from "../../../posSlice"
import {useDispatch} from "../../../../store"
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
