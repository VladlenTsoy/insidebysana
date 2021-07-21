import React from "react"
import {useAdminDispatch} from "../../../../../../../store/admin/store"
import {Modal} from "antd"
import {DeleteOutlined} from "@ant-design/icons"
import {Lookbook} from "../../../../../../../lib/types/Lookbook"
import {deleteLookbook} from "admin/store/admin/lookbook/deleteLookbook"

interface DeleteItemProps {
    lookbook: Lookbook
}

const DeleteItem: React.FC<DeleteItemProps> = ({lookbook}) => {
    const dispatch = useAdminDispatch()

    const clickHideHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите удалить lookbook?",
            async onOk() {
                await dispatch(deleteLookbook(lookbook.id))
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
