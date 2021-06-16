import React from "react"
import {Button} from "antd"

interface EditorOrderDrawerFooterProps {
    loading: boolean
}

const EditorOrderDrawerFooter: React.FC<EditorOrderDrawerFooterProps> = ({loading}) => {
    return (
        <div className="editor-order-drawer-footer">
            <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                form={`editor-order-drawer`}
            >
                Сохранить
            </Button>
        </div>
    )
}

export default EditorOrderDrawerFooter
