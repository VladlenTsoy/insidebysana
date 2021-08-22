import React from "react";
import {useAdminDispatch} from "../../../../../../../../store";
import {Modal} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {Color} from "../../../../../../../../lib/types/Color"
import {deleteColor} from "../../../../../../../../store/admin/color/deleteColor"

interface DeleteItemProps {
    color: Color
}

const DeleteItem: React.FC<DeleteItemProps> = ({color}) => {
    const dispatch = useAdminDispatch()

    const clickHideHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите удалить цвет?",
            async onOk() {
                await dispatch(deleteColor(color.id))
            }
        })
    }

    return (
        <div onClick={clickHideHandler}>
            <DeleteOutlined /> Удалить
        </div>
    )
};

export default DeleteItem;