import React from "react"
import {Typography} from "antd"
import {useHistory} from "react-router"
import {ArrowLeftOutlined} from "@ant-design/icons"
import styles from "./HeaderPage.module.less"
import cn from "classnames"

interface HeaderPageProps {
    title: string
    linkBack?: string
    action?: React.ReactFragment
    icon?: React.ReactFragment
    tabs?: boolean
    full?: boolean
}

const {Title} = Typography

const HeaderPage: React.FC<HeaderPageProps> = (
    {
        title,
        linkBack,
        action,
        icon,
        tabs,
        full
    }
) => {
    const history = useHistory()
    const onClickBackHandler = () => (linkBack ? history.push(linkBack) : history.goBack())

    return (
        <div className={cn(styles.headerPage, {[styles.tabs]: tabs, [styles.full]: full})}>
            {icon ? (
                <div className={styles.back}>{icon}</div>
            ) : (
                <div className={styles.back} onClick={onClickBackHandler}>
                    <ArrowLeftOutlined />
                </div>
            )}
            <Title level={1}>{title}</Title>
            {action && <div className={styles.action}>{action}</div>}
        </div>
    )
}
export default HeaderPage
