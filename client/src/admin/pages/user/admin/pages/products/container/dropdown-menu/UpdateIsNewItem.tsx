import {ProductColor} from "admin/lib/types/product/ProductColor"
import {updateIsNewProductColor} from "admin/store/admin/product-color/updateIsNewProductColor"
import {useAdminDispatch} from "admin/store/admin/store"
import {Modal} from "antd"
import React from "react"
import {CheckOutlined, CloseOutlined} from "@ant-design/icons"

interface UpdateIsNewItemProps {
    productColor: ProductColor
}

const UpdateIsNewItem: React.FC<UpdateIsNewItemProps> = ({productColor}) => {
    const dispatch = useAdminDispatch()

    const clickHandler = () => {
        Modal.confirm({
            title: productColor.is_new
                ? "Вы действительно хотите удалить цвет продукта из новинок?"
                : "Вы действительно хотите добавить цвет продукта в новинки?",
            async onOk() {
                await dispatch(
                    updateIsNewProductColor({
                        productColorId: productColor.id,
                        isNew: !productColor.is_new
                    })
                )
            }
        })
    }

    return (
        <div onClick={clickHandler}>{productColor.is_new ? <CloseOutlined /> : <CheckOutlined />} Новика</div>
    )
}
export default UpdateIsNewItem
