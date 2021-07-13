import React, {useEffect, useRef, useState} from "react"
import styled from "./FilterButton.module.css"
import UpArrowIcon from "assets/images/icons/up-arrow.svg"

interface FilterButtonProps {
    title: string
    autoClose?: boolean
    position?: "left" | "right"
}

const FilterButton: React.FC<FilterButtonProps> = ({children, title, position = "left", autoClose}) => {
    const [visible, setVisible] = useState(false)
    const buttonRef = useRef<HTMLDivElement | null>(null)
    const dropdownRef = useRef<HTMLDivElement | null>(null)

    const onClickHandler = () => {
        setVisible(prevState => !prevState)
    }

    const outsideClickHandler = (e: any) => {
        if (!buttonRef.current?.contains(e.target) && !dropdownRef.current?.contains(e.target))
            setVisible(false)
    }

    const dropdownClickHandler = () => {
        if (autoClose)
            setVisible(false)
    }

    useEffect(() => {
        if (buttonRef.current) {
            document.addEventListener("click", outsideClickHandler)
            return () => {
                document.removeEventListener("click", outsideClickHandler)
            }
        }
    }, [buttonRef])

    return (
        <>
            <div className={styled.filterWrapper}>
                <div
                    className={`${styled.filterButton} ${visible && styled.open}`}
                    onClick={onClickHandler}
                    ref={buttonRef}
                >
                    <span className={styled.title}>{title}</span>
                    <img className={styled.icon} src={UpArrowIcon} alt=""/>
                </div>
                {
                    <div
                        onClick={dropdownClickHandler}
                        className={`${styled.dropdown} ${visible ? styled.dropdownOpen : styled.dropdownClose}`}
                        ref={dropdownRef}
                    >
                        <div
                            className={`${styled.dropdownCard} ${position === "left" ? styled.dropdownLeft : styled.dropdownRight}`}
                        >
                            {children}
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default FilterButton