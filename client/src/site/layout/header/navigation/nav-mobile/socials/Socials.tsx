import React from "react"
import styled from "./Socials.module.css"
import InstagramFilled from "@ant-design/icons/InstagramFilled"
import FacebookFilled from "@ant-design/icons/FacebookFilled"

const Socials = () => {
    return (
        <div className={styled.socials}>
            <a href="https://www.instagram.com/insidebysana" target="_blank" rel="noreferrer">
                <InstagramFilled />
            </a>
            <a href="https://www.facebook.com/insidebysana" target="_blank" rel="noreferrer">
                <FacebookFilled />
            </a>
        </div>
    )
}

export default Socials
