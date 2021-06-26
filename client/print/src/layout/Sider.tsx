import React from "react"
import {Menu, Layout} from "antd"
import {
    VideoCameraOutlined,
    TagsOutlined,
    CustomerServiceOutlined,
    ThunderboltOutlined
} from "@ant-design/icons"

const Sider: React.FC = () => {
    return (
        <Layout.Sider width={200} className="sider-left-categories">
            <Menu mode="vertical" triggerSubMenuAction="click">
                <Menu.SubMenu key="sub-1" icon={<ThunderboltOutlined />} title="Игры"></Menu.SubMenu>
                <Menu.SubMenu key="sub-2" icon={<VideoCameraOutlined />} title="Кино">
                    <Menu.Item key="1">13 причин почему</Menu.Item>
                    <Menu.Item key="2">2001:Космическая Одиссея</Menu.Item>
                    <Menu.Item key="3">7 смертных грехов</Menu.Item>
                    <Menu.Item key="4">Ahegao</Menu.Item>
                    <Menu.Item key="5">Akudama Drive</Menu.Item>
                    <Menu.Item key="6">American Horror Story</Menu.Item>
                    <Menu.Item key="7">Beastars</Menu.Item>
                    <Menu.Item key="8">Bleach</Menu.Item>
                    <Menu.Item key="9">Cells at Work</Menu.Item>
                    <Menu.Item key="10">Code Geass</Menu.Item>
                    <Menu.Item key="11">Cowboy Bebop</Menu.Item>
                    <Menu.Item key="12">Danganronpa</Menu.Item>
                    <Menu.Item key="13">Darling in the FranXX</Menu.Item>
                    <Menu.Item key="14">Death Note</Menu.Item>
                    <Menu.Item key="15">Doctor Who</Menu.Item>
                    <Menu.Item key="16">Dragon ball</Menu.Item>
                    <Menu.Item key="17">Enchantimals</Menu.Item>
                    <Menu.Item key="18">Futurama</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="sub-3" icon={<TagsOutlined />} title="Бренды"></Menu.SubMenu>
                <Menu.SubMenu key="sub-4" icon={<CustomerServiceOutlined />} title="Музыка"></Menu.SubMenu>
                <Menu.SubMenu key="sub-5" title="Животные"></Menu.SubMenu>
                <Menu.Item key="sub-6">Авто и мото</Menu.Item>
                <Menu.Item key="sub-7">Идеи для подарков</Menu.Item>
                <Menu.Item key="sub-8">Приколы</Menu.Item>
                <Menu.Item key="sub-9">Работа и хобби</Menu.Item>
                <Menu.Item key="sub-10">Россия и мир</Menu.Item>
                <Menu.Item key="sub-11">Персональные</Menu.Item>
                <Menu.Item key="sub-12">Отношения</Menu.Item>
                <Menu.Item key="sub-13">Иллюстрации</Menu.Item>
                <Menu.Item key="sub-14">Известные личности</Menu.Item>
            </Menu>
        </Layout.Sider>
    )
}
export default Sider
