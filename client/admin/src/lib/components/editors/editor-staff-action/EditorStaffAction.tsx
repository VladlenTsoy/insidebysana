import React, {useCallback, useState} from "react"
import {Modal} from "antd"
import {User} from "../../../types/User"
import EditorStaff from "./editor-staff/EditorStaff"

interface EditorStaffActionProps {
    user?: User
}

const EditorStaffAction: React.FC<EditorStaffActionProps> = ({children, user}) => {
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
                title={user ? `Редактировать: ${user.full_name}` : `Создать пользователя`}
                visible={visible}
                onCancel={close}
                cancelButtonProps={{size: "large"}}
                okButtonProps={{form: "editor-staff", htmlType: "submit", loading: loading, size: "large"}}
                okText="Сохранить"
                destroyOnClose
            >
                <EditorStaff user={user} setLoading={setLoading} close={close} />
            </Modal>
        </>
    )
}

export default EditorStaffAction
