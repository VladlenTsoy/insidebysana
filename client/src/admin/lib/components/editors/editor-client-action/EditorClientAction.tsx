import React, {useCallback, useState} from "react"
import {Modal} from "antd"
import EditorClient from "./editor-client/EditorClient"
import {Client} from "../../../types/Client"

interface EditorClientActionProps {
    client?: Client
}

const EditorClientAction: React.FC<EditorClientActionProps> = ({children, client}) => {
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
                title={client ? `Редактировать: ${client.full_name}` : `Создать клиента`}
                cancelButtonProps={{size: "large"}}
                okButtonProps={{form: "editor-client", htmlType: "submit", loading: loading, size: "large"}}
                okText="Сохранить"
                destroyOnClose
            >
                <EditorClient setLoading={setLoading} client={client} close={close} />
            </Modal>
        </>
    )
}

export default EditorClientAction
