import React from "react"
import {UndoOutlined} from "@ant-design/icons"
import {useAdminDispatch} from "../../../../store/admin/store"
import {Modal} from "antd"
import {ProductColor} from "../../../types/product/ProductColor"
import {returnProductColorFromTrash} from "./returnProductColorFromTrash"
import {fetchProductColors} from "../../../../store/admin/product-color/fetchProductColors"

interface ReturnItemProps {
    productColorId: ProductColor["id"]
}

const ReturnItem: React.FC<ReturnItemProps> = ({productColorId}) => {
    const dispatch = useAdminDispatch()

    const clickHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите вернуть продукт?",
            async onOk() {
                await dispatch(returnProductColorFromTrash(productColorId))
                dispatch(fetchProductColors())
            }
        })
    }

    return (
        <div onClick={clickHandler}>
            <UndoOutlined /> Вернуть
        </div>
    )
}

export default ReturnItem