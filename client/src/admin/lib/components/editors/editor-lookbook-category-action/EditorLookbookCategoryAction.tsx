import React, {useCallback, useState} from "react"
import {Modal} from "antd"
import {LookbookCategory} from "../../../types/Lookbook"
import EditorLookbookCategory from "./EditorLookbookCategory"

interface EditorLookbookActionProps {
    lookbookCategory?: LookbookCategory
}

const EditorLookbookCategoryAction: React.FC<EditorLookbookActionProps> = ({children, lookbookCategory}) => {
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
                title={lookbookCategory ? "Редактировать lookbook" : "Добавить lookbook"}
                okButtonProps={{form: "editor-lookbook-category", htmlType: "submit", loading: loading}}
                okText="Сохранить"
                destroyOnClose
            >
                <EditorLookbookCategory
                    setLoading={setLoading}
                    close={close}
                    lookbookCategory={lookbookCategory}
                />
            </Modal>
        </>
    )
}

export default EditorLookbookCategoryAction
