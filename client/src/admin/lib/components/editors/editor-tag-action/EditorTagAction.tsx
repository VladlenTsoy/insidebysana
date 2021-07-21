import React, {useCallback, useState} from "react"
import {Modal} from "antd"
import {Tag} from "../../../types/Tag"
import EditorTag from "./editor-tag/EditorTag"

interface EditorTagActionProps {
    tag?: Tag
}

const EditorTagAction: React.FC<EditorTagActionProps> = ({children, tag}) => {
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
                title={tag ? "Редактировать тег" : "Создать тег"}
                visible={visible}
                onCancel={close}
                okText="Сохранить"
                confirmLoading={loading}
                okButtonProps={{htmlType: "submit", form: "editor-tag-modal"}}
            >
                <EditorTag close={close} tag={tag} setLoading={setLoading} />
            </Modal>
        </>
    )
}

export default EditorTagAction