import React from "react";
import {useAdminDispatch} from "../../../../../../../../store/admin/store";
import {Modal} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {Banner} from "../../../../../../../../lib/types/Banner";
import {deleteBanner} from "../../../../../../../../store/admin/banner/deleteBanner";

interface DeleteItemProps {
    banner: Banner
}

const DeleteItem: React.FC<DeleteItemProps> = ({banner}) => {
    const dispatch = useAdminDispatch()

    const clickHideHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите удалить баннер?",
            async onOk() {
                await dispatch(deleteBanner(banner.id))
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