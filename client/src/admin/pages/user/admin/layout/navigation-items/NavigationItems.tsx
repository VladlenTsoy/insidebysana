import React from "react"
import {
    HomeOutlined,
    HomeFilled,
    SkinOutlined,
    SkinFilled,
    DollarCircleOutlined,
    DollarCircleFilled,
    CrownFilled,
    CrownOutlined,
    TeamOutlined
} from "@ant-design/icons"

export const Navigations = [
    {title: "Главная", link: "/", icon: <HomeOutlined />, iconActive: <HomeFilled />},
    {title: "Сделки", link: "/orders", icon: <DollarCircleOutlined />, iconActive: <DollarCircleFilled />},
    {title: "Товар", link: "/products", icon: <SkinOutlined />, iconActive: <SkinFilled />},
    {title: "Клиенты", link: "/clients", icon: <TeamOutlined />, iconActive: <TeamOutlined />},
    {title: "Пользователи", link: "/staff", icon: <CrownOutlined />, iconActive: <CrownFilled />}
]

export const ManagerNavigations = [
    {title: "Главная", link: "/", icon: <HomeOutlined />, iconActive: <HomeFilled />},
    {title: "Сделки", link: "/orders", icon: <DollarCircleOutlined />, iconActive: <DollarCircleFilled />},
    {title: "Товар", link: "/products", icon: <SkinOutlined />, iconActive: <SkinFilled />},
    {title: "Клиенты", link: "/clients", icon: <TeamOutlined />, iconActive: <TeamOutlined />},
]
