import React from "react"
import {useAdminDispatch} from "../../../../../../../../store/admin/store"
import {Modal} from "antd"
import {EyeOutlined, EyeInvisibleOutlined} from "@ant-design/icons"
import {Size} from "admin/lib/types/Size"
import {hideSize} from "admin/store/admin/size/hideSize"
import {displaySize} from "admin/store/admin/size/displaySize"

interface HideItemProps {
    size: Size
}

const HideItem: React.FC<HideItemProps> = ({size}) => {
    const dispatch = useAdminDispatch()

    const clickHideHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите скрыть размер?",
            async onOk() {
                await dispatch(hideSize(size.id))
            }
        })
    }

    const clickDisplayHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите отобразить размер?",
            async onOk() {
                await dispatch(displaySize(size.id))
            }
        })
    }

    if (size.hide_id)
        return (
            <div onClick={clickDisplayHandler}>
                <EyeOutlined /> Отображать
            </div>
        )
    return (
        <div onClick={clickHideHandler}>
            <EyeInvisibleOutlined /> Скрыть
        </div>
    )
}

export default HideItem
