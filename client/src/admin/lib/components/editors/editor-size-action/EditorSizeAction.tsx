import Modal from "antd/lib/modal/Modal"
import {Size} from "admin/lib/types/Size"
import React, {useCallback, useState} from "react"
import EditorSize from "./editor-size/EditorSize"

interface EditorSizeActionProps {
    size?: Size
}

const EditorSizeAction: React.FC<EditorSizeActionProps> = ({children, size}) => {
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
                destroyOnClose
                title={size ? "Редактировать размер" : "Создать размер"}
                visible={visible}
                onCancel={close}
                okText="Сохранить"
                confirmLoading={loading}
                okButtonProps={{htmlType: "submit", form: "editor-size-modal"}}
            >
                <EditorSize setLoading={setLoading} close={close} />
            </Modal>
        </>
    )
}
export default EditorSizeAction
