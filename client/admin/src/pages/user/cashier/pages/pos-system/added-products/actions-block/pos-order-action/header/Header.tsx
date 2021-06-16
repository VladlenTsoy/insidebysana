import React from "react"
import {ArrowLeftOutlined} from "@ant-design/icons"
import {useCashierDispatch} from "store/cashier/store"
import {changeDrawer} from "store/cashier/pos/posSlice"

const Header: React.FC = () => {
    const dispatch = useCashierDispatch()
    const onClickHandler = () => dispatch(changeDrawer({visible: false}))

    return (
        <div className="header">
            <div>Завершить заказ</div>
            <div className="back" onClick={onClickHandler}>
                <ArrowLeftOutlined />
                Назад
            </div>
        </div>
    )
}
export default React.memo(Header)
