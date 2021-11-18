import React, {useEffect, useState} from "react"
import {Button, Layout as AntdLayout, Menu} from "antd"
import {Link, useHistory, useLocation} from "react-router-dom"
import {useScreenWindow} from "../hooks/use-screen-window.effect"
import styles from "./Layout.module.less"
import stylesMenu from "./account-menu/AccountMenu.module.less"
import {useCommonDispatch} from "../store/common/store"
import {changeTitle} from "admin/store/common/app/appSlice"
import {
    CrownOutlined,
    DollarOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    SkinOutlined,
    TeamOutlined
} from "@ant-design/icons"
import AccountMenu from "./account-menu/AccountMenu"

const {Header, Sider, Content} = AntdLayout

const Titles: any = {
    "/": "Главная",
    "/orders": "Заказы",
    "/products": "Продукты",
    "/clients": "Клиенты",
    "/settings": "Настройки",
    "/staff": "Сотрудники",
    "/profile": "Профиль"
}

const Layout: React.FC = ({children}) => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: "lg"})
    const history = useHistory()
    const dispatch = useCommonDispatch()
    const [collapsed, setCollapsed] = useState(true)
    const location = useLocation()
    const pathnameArray = location.pathname.split("/")

    const onCollapsedHandler = () => setCollapsed(prevState => !prevState)

    useEffect(() => {
        if (history.listen) {
            const unListen = history.listen((location: any) => {
                if (Titles[location.pathname])
                    dispatch(changeTitle(Titles[location.pathname]))
            })
            if (Titles[history.location.pathname])
                dispatch(changeTitle(Titles[history.location.pathname]))
            return () => {
                unListen()
            }
        }
    }, [history, dispatch])

    return (
        <AntdLayout className={styles.layout}>
            <Sider
                collapsible
                collapsed={collapsed}
                width="250px"
                trigger={null}
                collapsedWidth={isBreakpoint ? 0 : 80}
            >
                <div className={styles.logoMenuSticky}>
                    <div className={styles.logo} />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[pathnameArray[1]]}
                        className={styles.siteLayoutMenu}
                    >
                        <Menu.Item key="" icon={<HomeOutlined />}>
                            <Link to="/">Главная</Link>
                        </Menu.Item>
                        <Menu.Item key="orders" icon={<DollarOutlined />}>
                            <Link to="/orders">Заказы</Link>
                        </Menu.Item>
                        <Menu.Item key="products" icon={<SkinOutlined />}>
                            <Link to="/products/all">Одежда</Link>
                        </Menu.Item>
                        <Menu.Item key="clients" icon={<TeamOutlined />}>
                            <Link to="/clients">Клиенты</Link>
                        </Menu.Item>
                        <Menu.Item key="staff" icon={<CrownOutlined />}>
                            <Link to="/staff">Сотрудники</Link>
                        </Menu.Item>
                        <Menu.Item key="settings" icon={<SettingOutlined />}>
                            <Link to="/settings">Настройки</Link>
                        </Menu.Item>
                    </Menu>
                </div>
            </Sider>
            <AntdLayout className={styles.siteLayout}>
                <Header className={styles.siteLayoutHeader}>
                    {React.createElement(Button, {
                        className: stylesMenu.sidebarButton,
                        onClick: onCollapsedHandler,
                        icon: collapsed ? (
                            <MenuUnfoldOutlined />
                        ) : (
                            <MenuFoldOutlined />
                        ),
                        size: "large",
                        shape: "circle"
                    })}
                    <AccountMenu />
                </Header>
                <Content
                    className={styles.siteLayoutContent}
                    id="site-layout-content"
                >
                    {children}
                    {/*<BackTop>*/}
                    {/*    <Button*/}
                    {/*        type="primary"*/}
                    {/*        shape="circle"*/}
                    {/*        size="large"*/}
                    {/*        icon={<UpOutlined />}*/}
                    {/*    />*/}
                    {/*</BackTop>*/}
                </Content>
            </AntdLayout>
        </AntdLayout>
    )
}

export default Layout
