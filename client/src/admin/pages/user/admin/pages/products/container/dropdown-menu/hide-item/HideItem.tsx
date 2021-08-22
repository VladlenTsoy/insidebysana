import React from "react"
import {EyeInvisibleOutlined} from "@ant-design/icons"
import {ProductColor} from "../../../../../../../../lib/types/product/ProductColor"
import {Modal} from "antd"
import {useAdminDispatch} from "../../../../../../../../store"
import {hideProductColor} from "../../../../../../../../store/admin/product-color/hideProductColor"
import {fetchProductColorsFromTrash} from "../../../../../../../../lib/components/trash-products/fetchProductColorsFromTrash"

interface HideItemProps {
    productColor: ProductColor
}

const HideItem: React.FC<HideItemProps> = ({productColor}) => {
    const dispatch = useAdminDispatch()

    const clickHideHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите скрыть цвет продукта?",
            async onOk() {
                await dispatch(hideProductColor(productColor.id))
                dispatch(fetchProductColorsFromTrash())
            }
        })
    }

    return (
        <div onClick={clickHideHandler}>
            <EyeInvisibleOutlined /> Скрыть
        </div>
    )
}

export default HideItem
