import React from "react"
import {FileImageOutlined} from "@ant-design/icons"
import {ProductColor} from "../../../../../../../../lib/types/product/ProductColor"
import EditorPrintAction from "../../../../../../../../lib/components/editors/editor-print-action/EditorPrintAction"

interface PrintItemProps {
    productColor: ProductColor
}

const PrintItem: React.FC<PrintItemProps> = ({productColor}) => {
    return (
        <EditorPrintAction productColor={productColor}>
            <div>
                <FileImageOutlined /> Печать
            </div>
        </EditorPrintAction>
    )
}

export default PrintItem
