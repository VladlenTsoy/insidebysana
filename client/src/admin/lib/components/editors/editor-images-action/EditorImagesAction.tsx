import React, {useCallback, useState} from "react"
import {ProductColor} from "../../../types/product/ProductColor"
import {Drawer} from "antd"
import EditorImages from "./editor-images/EditorImages"
import {fetchProductColors} from "../../../../store/admin/product-color/fetchProductColors"
import {useAdminDispatch} from "../../../../store"

interface EditorImagesActionProps {
    productColor: ProductColor
}

const EditorImagesAction: React.FC<EditorImagesActionProps> = (
    {
        children,
        productColor
    }
) => {
    const [visible, setVisible] = useState(false)
    const dispatch = useAdminDispatch()

    const close = useCallback(() => {
        setVisible(false)
        dispatch(fetchProductColors())
    }, [dispatch])
    const handleClick = () => setVisible(true)

    const action = React.Children.map(children, (child: any) =>
        React.cloneElement(child, {onClick: handleClick})
    )

    return (
        <>
            {action}
            <Drawer
                key="upload-image"
                title="Загрузка картинок"
                visible={visible}
                onClose={close}
                width="100%"
            >
                <EditorImages productColorId={productColor.id} />
            </Drawer>
        </>
    )
}

export default EditorImagesAction