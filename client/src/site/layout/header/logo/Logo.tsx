import React from "react"
import styled from "./Logo.module.css"
import LogoImage from "./logo.png"
import {useHistory} from "react-router-dom"

const Logo = () => {
    const history = useHistory()

    // Клик по логотипу
    const onClickHandler = () =>
        history.push("/")

    return (
        <div className={styled.logo} onClick={onClickHandler}>
            <img src={LogoImage} alt="inside by Sana" />
        </div>
    )
}

export default Logo