import React from "react"
import styled from "./NavMobile.module.css"
import MenuIcon from "assets/images/icons/menu.svg"
import Menu from "./menu/Menu"
import CloseOutlined from "@ant-design/icons/CloseOutlined"
import UserOutlined from "@ant-design/icons/UserOutlined"
import Drawer from "components/drawer/Drawer"
import Socials from "./socials/Socials"
import {useHistory} from "react-router-dom"
import {useDispatch} from "../../../../store"
import {appSelector, changeMobileMenuVisible} from "../../../appSlice"
import {useSelector} from "react-redux"
import {useUser} from "site/auth/authSlice"

const NavMobile = () => {
    const {mobileDrawerVisible} = useSelector(appSelector)
    const history = useHistory()
    const dispatch = useDispatch()
    const {detail} = useUser()

    // Открыть
    const onOpenHandler = () => dispatch(changeMobileMenuVisible(true))

    // Закрыть
    const onCloseHandler = () => dispatch(changeMobileMenuVisible(false))

    // Переход на аккаунт
    const onAccountHandler = () => history.push("/account")

    return (
        <div>
            <button className={styled.buttonMenu} onClick={onOpenHandler}>
                <img src={MenuIcon} alt="" />
            </button>
            <Drawer width={350} visible={mobileDrawerVisible} maskClosable onClose={onCloseHandler}>
                <div className={styled.container}>
                    <div className={styled.header}>
                        <div className={styled.close} onClick={onCloseHandler}>
                            <CloseOutlined />
                        </div>
                        <div className={styled.account} onClick={onAccountHandler}>
                            <span className={styled.text}>{detail ? "Кабинет" : "Войти"}</span>
                            <UserOutlined className={styled.icon} />
                        </div>
                    </div>
                    <Menu />
                    <Socials />
                </div>
            </Drawer>
        </div>
    )
}

export default NavMobile
