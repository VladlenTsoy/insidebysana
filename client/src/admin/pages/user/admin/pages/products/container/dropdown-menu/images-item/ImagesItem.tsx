import React from "react"
import {PictureOutlined} from "@ant-design/icons"
import EditorImagesAction from "../../../../../../../../lib/components/editors/editor-images-action/EditorImagesAction"
import {ProductColor} from "../../../../../../../../lib/types/product/ProductColor"

interface ImagesItemProps {
    productColor: ProductColor
}

const ImagesItem: React.FC<ImagesItemProps> = ({productColor}) => {
    return (
        <EditorImagesAction productColor={productColor}>
            <div>
                <PictureOutlined /> Картинки
            </div>
        </EditorImagesAction>
    )
}

export default ImagesItem