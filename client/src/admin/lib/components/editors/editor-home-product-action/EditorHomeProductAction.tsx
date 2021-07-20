import {HomeProduct} from "admin/pages/user/admin/pages/settings/home/homeProductSlice"
import Modal from "antd/lib/modal/Modal"
import React, {useCallback} from "react"
import {useState} from "react"
import EditorHomeProduct from "./EditorHomeProduct"

interface EditorHomeProductActionProps {
    homeProduct?: HomeProduct
}

const EditorHomeProductAction: React.FC<EditorHomeProductActionProps> = ({children, homeProduct}) => {
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
                title={homeProduct ? `Редактировать товар` : `Добавить товар`}
                visible={visible}
                onCancel={close}
                okButtonProps={{form: "editor-print-product", htmlType: "submit", loading: loading}}
                okText="Сохранить"
                destroyOnClose
            >
                <EditorHomeProduct changeLoading={changeLoading} homeProduct={homeProduct} close={close} />
            </Modal>
        </>
    )
}
export default EditorHomeProductAction
