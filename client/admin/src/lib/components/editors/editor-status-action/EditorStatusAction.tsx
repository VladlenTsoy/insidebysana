import React, {useCallback, useState} from "react";
import {Modal} from "antd";
import {Status} from "../../../types/Status";
import EditorStatus from "./editor-status/EditorStatus";

interface EditorStatusActionProps {
    status?: Status
}

const EditorStatusAction: React.FC<EditorStatusActionProps> = ({children, status}) => {
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
                title={status ? `Редактировать: ${status.title}` : `Создать статус`}
                visible={visible}
                onCancel={close}
                width={1000}
                cancelButtonProps={{size: "large"}}
                okButtonProps={{form: "editor-status", htmlType: "submit", loading: loading, size: "large"}}
                okText="Сохранить"
                destroyOnClose
            >
                <EditorStatus setLoading={setLoading} close={close} status={status}/>
            </Modal>
        </>
    )
}

export default EditorStatusAction
