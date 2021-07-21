import React from "react"
import {useAdminDispatch} from "../../../../../../../../store/admin/store"
import {Modal} from "antd"
import {EyeOutlined, EyeInvisibleOutlined} from "@ant-design/icons"
import {Color} from "../../../../../../../../lib/types/Color"
import {hideColor} from "admin/store/admin/color/hideColor"
import {displayColor} from "admin/store/admin/color/displayColor"

interface HideItemProps {
    color: Color
}

const HideItem: React.FC<HideItemProps> = ({color}) => {
    const dispatch = useAdminDispatch()

    const clickHideHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите скрыть цвет?",
            async onOk() {
                await dispatch(hideColor(color.id))
            }
        })
    }

    const clickDisplayHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите отобразить цвет?",
            async onOk() {
                await dispatch(displayColor(color.id))
            }
        })
    }

    if (color.hide_id)
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
