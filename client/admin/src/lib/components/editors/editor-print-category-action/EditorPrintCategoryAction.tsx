import React, {useCallback, useState} from "react"
import {Modal} from "antd"
import EditorCategory from "./editor-print-category/EditorPrintCategory"
import {SubCategory} from "../../../types/Category"

interface EditorCategoryActionProps {
    sub?: boolean
    category?: SubCategory
}

const EditorPrintCategoryAction: React.FC<EditorCategoryActionProps> = ({children, sub, category}) => {
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
                title={`Создать категорию`}
                okButtonProps={{form: "editor-print-category", htmlType: "submit", loading: loading}}
                okText="Сохранить"
                destroyOnClose
            >
                <EditorCategory sub={sub} close={close} setLoading={setLoading} category={category} />
            </Modal>
        </>
    )
}

export default EditorPrintCategoryAction
