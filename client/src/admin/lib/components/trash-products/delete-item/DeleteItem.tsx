import React from "react"
import {CloseOutlined} from "@ant-design/icons"
import {Modal} from "antd"
import {useAdminDispatch} from "../../../../store"
import {ProductColor} from "../../../types/product/ProductColor"
import {deleteProductColorFromTrash} from "./deleteProductColorFromTrash"

interface HideItemProps {
    productColorId: ProductColor["id"]
}

const HideItem: React.FC<HideItemProps> = ({productColorId}) => {
    const dispatch = useAdminDispatch()

    const clickDeleteHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите УДАЛИТЬ цвет продукта?",
            async onOk() {
                await dispatch(deleteProductColorFromTrash(productColorId))
            }
        })
    }

    return (
        <div onClick={clickDeleteHandler}>
            <CloseOutlined /> Удалить
        </div>
    )
}

export default HideItem
