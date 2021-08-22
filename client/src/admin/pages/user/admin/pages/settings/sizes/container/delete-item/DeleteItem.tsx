import React from "react"
import {useAdminDispatch} from "../../../../../../../../store"
import {Modal} from "antd"
import {DeleteOutlined} from "@ant-design/icons"
import {deleteSize} from "admin/store/admin/size/deleteSize"
import {Size} from "admin/lib/types/Size"

interface DeleteItemProps {
    size: Size
}

const DeleteItem: React.FC<DeleteItemProps> = ({size}) => {
    const dispatch = useAdminDispatch()

    const clickHideHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите удалить размер?",
            async onOk() {
                await dispatch(deleteSize(size.id))
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
