import React from "react"
import {Layout as AntdLayout} from "antd"
import Header from "./Header"
import Sider from "./Sider"
import "./Layout.less"

const Layout: React.FC = ({children}) => {
    return (
        <AntdLayout className="layout">
            <Header />
            <AntdLayout className="layout-content">
                <Sider />
                <AntdLayout.Content className="content-layout-background">{children}</AntdLayout.Content>
            </AntdLayout>
        </AntdLayout>
    )
}
export default Layout
