import React from "react";
import {useAdminDispatch} from "../../../../../../../../store";
import {Modal} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {deleteTag} from "../../../../../../../../store/admin/tag/deleteTag"
import {Tag} from "../../../../../../../../lib/types/Tag"

interface DeleteItemProps {
    tag: Tag
}

const DeleteItem: React.FC<DeleteItemProps> = ({tag}) => {
    const dispatch = useAdminDispatch()

    const clickHideHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите удалить тег?",
            async onOk() {
                await dispatch(deleteTag(tag.id))
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