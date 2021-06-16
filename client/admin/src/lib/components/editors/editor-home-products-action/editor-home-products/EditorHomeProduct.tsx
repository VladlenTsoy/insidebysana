import React from "react"
import {ProductColor} from "../../../../types/product/ProductColor"
import "./EditorHomeProducts.less"

interface EditorHomeProductProps {
    productColorId: ProductColor["id"]
    setLoading: any
    close: any
}

const EditorHomeProduct: React.FC<EditorHomeProductProps> = ({productColorId, setLoading, close}) => {
    return (
        <div className="editor-home-product">
            <div className="container">
                {
                    new Array(24).fill(1).map((_, key) =>
                        <div key={key} className="column">
                            {key + 1}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default EditorHomeProduct