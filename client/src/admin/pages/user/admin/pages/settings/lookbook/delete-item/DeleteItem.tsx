import React from "react"
import {useAdminDispatch} from "../../../../../../../store/admin/store"
import {Modal} from "antd"
import {DeleteOutlined} from "@ant-design/icons"
import {LookbookCategory} from "../../../../../../../lib/types/Lookbook"
import {deleteLookbookCategory} from "admin/store/admin/lookbook/deleteLookbookCategory"

interface DeleteItemProps {
    lookbookCategory: LookbookCategory
}

const DeleteItem: React.FC<DeleteItemProps> = ({lookbookCategory}) => {
    const dispatch = useAdminDispatch()

    const clickHideHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите удалить категорию?",
            async onOk() {
                await dispatch(deleteLookbookCategory(lookbookCategory.id))
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
