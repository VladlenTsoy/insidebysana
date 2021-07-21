import React, {useCallback, useState} from "react"
import {Modal} from "antd"
import EditorSource from "./editor-source/EditorSource"
import {Source} from "../../../../../../../lib/types/Source"

interface EditorSourceActionProps {
    source?: Source
}

const EditorSourceAction: React.FC<EditorSourceActionProps> = ({children, source}) => {
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
                title={source ? `Редактировать ресурс` : `Создать ресурс`}
                okButtonProps={{form: "editor-source", htmlType: "submit", loading: loading}}
                okText="Сохранить"
                destroyOnClose
            >
                <EditorSource source={source} setLoading={setLoading} close={close} />
            </Modal>
        </>
    )
}

export default EditorSourceAction
