import React, {useCallback, useEffect, useRef, useState} from "react"
import styled from "./ProductsMenu.module.css"
import navStyled from "../NavDesktop.module.css"
import {createPortal} from "react-dom"
import CategoriesMenu from "./categories-menu/CategoriesMenu"
import {Transition} from "react-transition-group"

const duration = 200

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0
}

const transitionStyles: any = {
    entering: {opacity: 1},
    entered: {opacity: 1},
    exiting: {opacity: 0},
    exited: {opacity: 0}
}

interface ProductsMenuProps {
}

const ProductsMenu: React.FC<ProductsMenuProps> = ({children}) => {
    const nodeRef = useRef<HTMLDivElement>(null)
    const linkRef = useRef<HTMLDivElement>(null)
    const container = document.getElementById("menu-products")
    const [visible, setVisible] = useState<boolean>(false)
    const [rect, setRect] = useState({top: 9999, left: 9999})

    const onMouseEnterHandler = () => {
        setVisible(true)
    }

    const onMouseLeaveHandler = () => {
        setVisible(false)
    }

    const action = React.Children.map(children, (child: any) =>
        React.cloneElement(child, {
            ref: linkRef,
            className: visible ? navStyled.active : child.props.className,
            onMouseEnter: onMouseEnterHandler,
            onMouseLeave: onMouseLeaveHandler
        })
    )

    const resizeUpdate = useCallback(() => {
        if (linkRef.current) {
            const _rect = linkRef.current.getBoundingClientRect()
            setRect({
                top: _rect.top + _rect.height,
                left: _rect.left
            })
        }
    }, [linkRef])

    useEffect(() => {
        if (visible)
            resizeUpdate()
        window.addEventListener("resize", resizeUpdate)
        return () => {
            window.removeEventListener("resize", resizeUpdate)
        }
    }, [resizeUpdate, visible])

    return <>
        {action}
        {
            container ? createPortal(
                <Transition in={visible} timeout={duration} mountOnEnter unmountOnExit nodeRef={nodeRef}>
                    {state =>
                        <div
                            ref={nodeRef}
                            key="products-menu"
                            style={{
                                ...defaultStyle,
                                ...transitionStyles[state],
                                ...{top: rect.top, left: rect.left}
                            }}
                            className={`${styled.menuProducts}`}
                            onMouseEnter={onMouseEnterHandler}
                            onMouseLeave={onMouseLeaveHandler}
                        >
                            <div className={styled.menuLeft}>
                                <CategoriesMenu />
                            </div>
                        </div>
                    }
                </Transition>,
                container
            ) : null
        }
    </>
}

export default ProductsMenu