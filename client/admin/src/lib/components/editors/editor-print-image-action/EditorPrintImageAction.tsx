import {Modal} from "antd"
import React, {useCallback, useState} from "react"
import {PrintImage} from "store/admin/print-image/PrintImage"
import EditorPrintImage from "./EditorPrintImage"

interface EditorPrintImageActionProps {
    printImage?: PrintImage
}

const EditorPrintImageAction: React.FC<EditorPrintImageActionProps> = ({children, printImage}) => {
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
                title={printImage ? `Редактировать картинку` : `Добавить картинку`}
                visible={visible}
                onCancel={close}
                okButtonProps={{form: "editor-print-image", htmlType: "submit", loading: loading}}
                okText="Сохранить"
                destroyOnClose
            >
                <EditorPrintImage changeLoading={changeLoading} printImage={printImage} close={close} />
            </Modal>
        </>
    )
}
export default EditorPrintImageAction
