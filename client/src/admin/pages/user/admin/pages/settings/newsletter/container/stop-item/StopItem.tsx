import React from "react"
import {StopOutlined, FlagOutlined} from "@ant-design/icons"
import {PromoCode} from "../../../../../../../../lib/types/PromoCode"
import {useAdminDispatch} from "../../../../../../../../store/admin/store"
import {editPromoCode} from "../../../../../../../../store/admin/promo-code/editPromoCode"
import {Modal} from "antd"

const {confirm} = Modal

interface StopItemProps {
    promoCode: PromoCode
}

const StopItem: React.FC<StopItemProps> = ({promoCode}) => {
    const dispatch = useAdminDispatch()

    const clickStopHandler = async () => {
        confirm({
            type: "warning",
            title: `Остановить действие промокода?`,
            async onOk () {
                dispatch(editPromoCode({id: promoCode.id, data: {...promoCode, status: "inactive"}}))
            }
        })
    }

    const clickStartHandler = async () => {
        confirm({
            type: "warning",
            title: `Активировать промокод?`,
            async onOk () {
                dispatch(editPromoCode({id: promoCode.id, data: {...promoCode, status: "active"}}))
            }
        })
    }

    if (promoCode.status === "active")
        return (
            <div onClick={clickStopHandler}>
                <StopOutlined /> Остановить
            </div>
        )

    return (
        <div onClick={clickStartHandler}>
            <FlagOutlined /> Активировать
        </div>
    )
}

export default StopItem