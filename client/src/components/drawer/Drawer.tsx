import React from "react"
import RcDrawer from "rc-drawer"
import "rc-drawer/assets/index.css"

interface DrawerProps {
    visible: boolean
    maskClosable?: boolean
    width?: any
    placement?: "left" | "top" | "right" | "bottom"
    onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void;
}

const Drawer: React.FC<DrawerProps> = (
    {
        visible,
        width = 350,
        onClose,
        maskClosable,
        children,
        placement
    }
) => {
    return <RcDrawer
        open={visible}
        width={width}
        level={null}
        handler={false}
        onClose={onClose}
        maskClosable={maskClosable}
        placement={placement}
    >
        {children}
    </RcDrawer>
}

export default Drawer