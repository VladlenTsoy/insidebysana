import React, {useCallback, useState} from "react"
import {Modal} from "antd"
import {Color} from "../../../types/Color"
import EditorColor from "./editor-color/EditorColor"

interface EditorColorActionProps {
    color?: Color
}

const EditorColorAction: React.FC<EditorColorActionProps> = ({children, color}) => {
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
                title={color ? "Редактировать цвет" : "Создать цвет"}
                visible={visible}
                onCancel={close}
                okText="Сохранить"
                confirmLoading={loading}
                okButtonProps={{htmlType: "submit", form: "editor-color-modal"}}
            >
                <EditorColor close={close} color={color} setLoading={setLoading} />
            </Modal>
        </>
    )
}

export default EditorColorAction