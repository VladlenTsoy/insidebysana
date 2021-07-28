import React from "react"
import {ArrowLeftOutlined} from "@ant-design/icons"
import {useDispatch} from "pos/store"
import {changeDrawer} from "pos/home/posSlice"

const Header: React.FC = () => {
    const dispatch = useDispatch()
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
