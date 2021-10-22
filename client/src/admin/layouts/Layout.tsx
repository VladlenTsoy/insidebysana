import React, {useEffect} from "react"
import {Layout as AntdLayout, Menu, Button, BackTop} from "antd"
import {NavigationItemProps} from "./header/navigation/Navigation"
// import Footer from "./footer/Footer"
import {Link, useHistory, useLocation} from "react-router-dom"
import {useScreenWindow} from "../hooks/use-screen-window.effect"
import "./Layout.less"
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
    TeamOutlined,
    UpOutlined
} from "@ant-design/icons"
import {useState} from "react"

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

interface FacebookLayout {
    navigations: NavigationItemProps[]
    sidebars: React.ReactFragment[]
    accountMenu: React.ReactFragment[]
}

const Layout: React.FC<FacebookLayout> = ({children, navigations, sidebars, accountMenu}) => {
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
                if (Titles[location.pathname]) dispatch(changeTitle(Titles[location.pathname]))
            })
            if (Titles[history.location.pathname]) dispatch(changeTitle(Titles[history.location.pathname]))
            return () => {
                unListen()
            }
        }
    }, [history, dispatch])

    return (
        <AntdLayout className="layout">
            <Sider
                collapsible
                collapsed={collapsed}
                width="250px"
                trigger={null}
                collapsedWidth={isBreakpoint ? 0 : 80}
            >
                <div className="logo-menu-sticky">
                    <div className="logo"></div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[pathnameArray[1]]}
                        className="site-layout-menu"
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
                            <Link to="clients">Клиенты</Link>
                        </Menu.Item>
                        <Menu.Item key="staff" icon={<CrownOutlined />}>
                            <Link to="staff">Сотрудники</Link>
                        </Menu.Item>
                        <Menu.SubMenu key="settings" icon={<SettingOutlined />} title="Настройки">
                            <Menu.Item key="/users" icon={<CrownOutlined />}>
                                Пользователи
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </div>
            </Sider>
            <AntdLayout className="site-layout">
                <Header className="site-layout-header">
                    {React.createElement(Button, {
                        className: "trigger",
                        onClick: onCollapsedHandler,
                        icon: collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
                        size: "large",
                        shape: "circle"
                    })}
                </Header>
                <Content className="site-layout-content">
                    {children}
                    <BackTop>
                        <Button type="primary" shape="circle" size="large" icon={<UpOutlined />} />
                    </BackTop>
                </Content>
            </AntdLayout>
        </AntdLayout>
    )

    // return (
    //     <div className="layout">
    //         <Header navigations={navigations} sidebars={sidebars} accountMenu={accountMenu} />
    //         <div id="container" className="draw-container layout-draw-container" />
    //         <div className={`layout-container`}>{children}</div>
    //         {isBreakpoint && <Footer navigations={navigations} />}
    //     </div>
    // )
}

export default Layout
