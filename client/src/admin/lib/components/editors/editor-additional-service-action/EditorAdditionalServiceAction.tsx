import Modal from "antd/lib/modal/Modal"
import {AdditionalService} from "admin/lib/types/AdditionalService"
import React, {useCallback, useState} from "react"
import EditorAdditionalService from "./editor-additional-service/EditorAdditionalService"

interface EditorAdditionalServiceActionProps {
    additionalService?: AdditionalService
}

const EditorAdditionalServiceAction: React.FC<EditorAdditionalServiceActionProps> = ({
    children,
    additionalService
}) => {
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
                title={
                    additionalService ? `Редактировать: ${additionalService.title}` : `Добавить доп. услугу`
                }
                cancelButtonProps={{size: "large"}}
                okButtonProps={{
                    form: "editor-additional-service",
                    htmlType: "submit",
                    loading: loading,
                    size: "large"
                }}
                okText="Сохранить"
                destroyOnClose
            >
                <EditorAdditionalService
                    setLoading={setLoading}
                    close={close}
                    additionalService={additionalService}
                />
            </Modal>
        </>
    )
}
export default EditorAdditionalServiceAction
