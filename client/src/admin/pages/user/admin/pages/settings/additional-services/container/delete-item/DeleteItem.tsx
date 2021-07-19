import React from "react"
import {useAdminDispatch} from "../../../../../../../../store/admin/store"
import {Modal} from "antd"
import {DeleteOutlined} from "@ant-design/icons"
import {AdditionalService} from "admin/lib/types/AdditionalService"
import {deleteAdditionalService} from "admin/store/admin/additional-service/deleteAdditionalService"

interface DeleteItemProps {
    additionalService: AdditionalService
}

const DeleteItem: React.FC<DeleteItemProps> = ({additionalService}) => {
    const dispatch = useAdminDispatch()

    const clickHideHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите удалить доп. услугу?",
            async onOk() {
                await dispatch(deleteAdditionalService(additionalService.id))
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
