import React, {useCallback, useState} from "react"
import {ProductColor} from "../../../types/product/ProductColor"
import {Modal} from "antd"
import EditorHomeProduct from "./editor-home-products/EditorHomeProduct"

interface EditorHomeProductsActionProps {
    productColorId: ProductColor["id"]
}

const EditorHomeProductsAction: React.FC<EditorHomeProductsActionProps> = ({productColorId, children}) => {
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
            <Modal
                visible={visible}
                onCancel={close}
                title="Добавить на главную страницу"
                okButtonProps={{form: "editor-lookbook", htmlType: "submit", loading: loading}}
                okText="Сохранить"
                destroyOnClose
            >
                <EditorHomeProduct productColorId={productColorId} setLoading={setLoading} close={close}/>
            </Modal>
        </>
    )
}

export default EditorHomeProductsAction