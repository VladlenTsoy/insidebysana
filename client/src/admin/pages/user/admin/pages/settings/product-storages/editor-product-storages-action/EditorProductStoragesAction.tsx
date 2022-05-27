import React, {useCallback, useState} from "react"
import {Modal} from "antd"
import EditorProductStorage from "./editor-product-storage/EditorProductStorage"
import {ProductStorage} from "../../../../../../../../types/product/ProductStorage"

interface EditorSourceActionProps {
    productStorage?: ProductStorage
}

const EditorProductStorageAction: React.FC<EditorSourceActionProps> = ({children, productStorage}) => {
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
                title={productStorage ? `Редактировать место хранения` : `Добавить место хранения`}
                okButtonProps={{form: "editor-product-storage", htmlType: "submit", loading: loading}}
                okText="Сохранить"
                destroyOnClose
            >
                <EditorProductStorage productStorage={productStorage} setLoading={setLoading} close={close} />
            </Modal>
        </>
    )
}

export default EditorProductStorageAction
