import React from "react"
import {Modal} from "antd"
import {DeleteOutlined} from "@ant-design/icons"
import {HomeProduct} from "../homeProductSlice"
import {useAdminDispatch} from "admin/store"
import {deleteHomeProduct} from "../homeProductApi"

interface DeleteItemProps {
    homeProduct: HomeProduct
}

const DeleteItem: React.FC<DeleteItemProps> = ({homeProduct}) => {
    const dispatch = useAdminDispatch()

    const clickHideHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите удалить товар с главной страницы?",
            async onOk() {
                await dispatch(deleteHomeProduct(homeProduct.id))
            }
        })
    }

    return (
        <div onClick={clickHideHandler}>
            <DeleteOutlined /> Удалить
        </div>
    )
}

export default DeleteItem
