import React, {useEffect, useState} from "react"
import styled from './ScrollActionButton.module.css'
import RightOutlined from "@ant-design/icons/RightOutlined"
import LeftOutlined from "@ant-design/icons/LeftOutlined"

const ScrollActionButton = () => {
    const [action, setAction] = useState(false)

    const onClickHandler = () => {
        if (action) {
            let element = document.querySelector("#product-sliders")
            element && element.scrollIntoView({behavior: "smooth", block: "start"})
        } else {
            let element = document.querySelector("#product-properties")
            element && element.scrollIntoView({behavior: "smooth", block: "center"})
        }
    }

    useEffect(() => {
        let element = document.getElementById("product-properties")

        const listenToScroll = () => {
            if (element) {
                const blockPositionY = element?.offsetTop - window.innerHeight / 2
                if (window.scrollY > blockPositionY)
                    setAction(true)
                else
                    setAction(false)
            }
        }

        window.addEventListener("scroll", listenToScroll)
        return () => {
            window.removeEventListener("scroll", listenToScroll)
        }
    }, [])

    return (
        <div className={styled.moreInformation} onClick={onClickHandler}>
            {
                action ?
                    <>
                        <div className={styled.moreInformationTitle}>Просмотр изображений</div>
                        <LeftOutlined/>
                    </> :
                    <>
                        <div className={styled.moreInformationTitle}>Дополнительная информация</div>
                        <RightOutlined/>
                    </>
            }
        </div>
    )
}

export default ScrollActionButton