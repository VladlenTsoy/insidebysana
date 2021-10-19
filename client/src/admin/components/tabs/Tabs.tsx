import React, {useState} from "react"
import styles from "./Tabs.module.less"
import cn from "classnames"

interface TabsProps {
    defaultActiveKey: string
    onChange? : (key: string) => void
}

const Tabs:React.FC<TabsProps> = ({defaultActiveKey, onChange, children}) => {
    const [active, setActive] = useState(defaultActiveKey)

    const tabs = React.Children.map(children, (child:any) => {
        const onChangeHandler = () => {
            setActive(child.key)
            // @ts-ignore
            onChange(child.key)
        }
        return React.cloneElement(child, {
            className: cn(styles.tab, {[styles.active]: child.key === active}),
            onClick: onChangeHandler
        })
    })

    return (
        <div className={styles.tabs} >
            {tabs}
        </div>
    )
}

interface TabProps {
    tab: string | React.ReactFragment
    className?: any
    onClick?: any
}

export const Tab: React.FC<TabProps> = ({tab,className, onClick}) => {
    return <div className={className} onClick={onClick}>{tab}</div>
}

export default Tabs