import React, {useCallback, useState} from "react"
import {Modal} from "antd"
import {Lookbook} from "../../../types/Lookbook"
import EditorLookbook from "./editor-lookbook/EditorLookbook"

interface EditorLookbookActionProps {
    lookbook?: Lookbook
}

const EditorLookbookAction: React.FC<EditorLookbookActionProps> = ({children, lookbook}) => {
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
                title={lookbook ? "Редактировать lookbook" : "Добавить lookbook"}
                okButtonProps={{form: "editor-lookbook", htmlType: "submit", loading: loading}}
                okText="Сохранить"
                destroyOnClose
            >
                <EditorLookbook setLoading={setLoading} close={close} lookbook={lookbook} />
            </Modal>
        </>
    )
}

export default EditorLookbookAction