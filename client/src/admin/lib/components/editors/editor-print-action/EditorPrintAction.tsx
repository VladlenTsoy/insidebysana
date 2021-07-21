import React, {useCallback, useState} from "react"
import {Drawer} from "antd"
import {ProductColor} from "../../../types/product/ProductColor"
import EditorPrint from "./editor-print/EditorPrint"

interface EditorPrintActionProps {
    productColor: ProductColor
}

const EditorPrintAction: React.FC<EditorPrintActionProps> = (
    {
        children,
        productColor
    }
) => {
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
                title="Картинки для печати"
                visible={visible}
                onClose={close}
                width="100%"
            >
                <EditorPrint productColor={productColor} />
            </Drawer>
        </>
    )
}

export default EditorPrintAction