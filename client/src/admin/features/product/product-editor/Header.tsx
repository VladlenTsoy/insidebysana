import {ArrowLeftOutlined} from "@ant-design/icons"
import {Button, Typography} from "antd"
import React from "react"
import {useHistory} from "react-router-dom"

const {Title} = Typography

const Header: React.FC = () => {
    const history = useHistory()

    const onClickBackHandler = () => history.push("/products/all")

    return (
        <>
            <div className="header">
                <div className="back" onClick={onClickBackHandler}>
                    <ArrowLeftOutlined />
                </div>
                <Title level={1}>Добавить товар</Title>
                <div className="action">
                    <Button type="primary" size="large">
                        Сохранить
                    </Button>
                </div>
            </div>
        </>
    )
}
export default Header
