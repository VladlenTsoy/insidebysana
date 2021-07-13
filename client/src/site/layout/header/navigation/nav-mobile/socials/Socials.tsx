import React from "react"
import styled from "./Socials.module.css"
import InstagramFilled from "@ant-design/icons/InstagramFilled"
import FacebookFilled from "@ant-design/icons/FacebookFilled"

const Socials = () => {
    return (
        <div className={styled.socials}>
            <a href="/" target="_blank"><InstagramFilled /></a>
            <a href="/" target="_blank"><FacebookFilled /></a>
        </div>
    )
}

export default Socials