import React, {useCallback, useState} from "react"
import {Modal} from "antd"
import EditorPrintProduct from "./EditorPrintProduct"
import { PrintProduct } from "admin/store/admin/print-product/PrintProduct"

interface EditorPrintProductActionProps {
    printProduct?: PrintProduct
    printImageId: number
}

const EditorPrintProductAction: React.FC<EditorPrintProductActionProps> = ({children, printProduct, printImageId}) => {
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const close = useCallback(() => setVisible(false), [])
    const changeLoading = useCallback(loading => setLoading(loading), [])
    const handleClick = () => setVisible(true)

    const action = React.Children.map(children, (child: any) =>
        React.cloneElement(child, {onClick: handleClick})
    )

    return (
        <>
            {action}
            <Modal
                title={printProduct ? `Редактировать товар` : `Добавить товар`}
                visible={visible}
                onCancel={close}
                okButtonProps={{form: "editor-print-product", htmlType: "submit", loading: loading}}
                okText="Сохранить"
                destroyOnClose
            >
                <EditorPrintProduct changeLoading={changeLoading} printProduct={printProduct} close={close} printImageId={printImageId} />
            </Modal>
        </>
    )
}
export default EditorPrintProductAction
