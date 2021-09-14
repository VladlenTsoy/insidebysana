import React from "react"
import {Typography} from "antd"
import {useHistory} from "react-router"
import {ArrowLeftOutlined} from "@ant-design/icons"
import "./HeaderPage.less"

interface HeaderPageProps {
    title: string
    linkBack?: string
    action: React.ReactFragment
    icon?: React.ReactFragment
    tabs?: boolean
}

const {Title} = Typography

const HeaderPage: React.FC<HeaderPageProps> = ({title, linkBack, action, icon, tabs}) => {
    const history = useHistory()

    const onClickBackHandler = () => (linkBack ? history.push(linkBack) : history.goBack())

    return (
        <div className={`header-page ${tabs ? "tabs" : ""}`}>
            {icon ? (
                <div className="back">{icon}</div>
            ) : (
                <div className="back" onClick={onClickBackHandler}>
                    <ArrowLeftOutlined />
                </div>
            )}
            <Title level={1}>{title}</Title>
            <div className="action">{action}</div>
        </div>
    )
}
export default HeaderPage
