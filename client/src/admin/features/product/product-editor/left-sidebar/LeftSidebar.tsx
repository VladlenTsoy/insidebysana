import React from "react"
import {Link} from "react-scroll"
import {Button} from "antd"
import {PlusOutlined} from "@ant-design/icons"
import {Link as RouteLink, useParams} from "react-router-dom"
import styles from "./LeftSidebar.module.less"
import cn from "classnames"

interface LeftSidebarProps {
    colors?: {id: number, title: string, hex: string, product_id: number}[];
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({colors}) => {
    const params = useParams<{id: string, color: string}>()

    const menuClickHandler = (e: any) => {
        e.preventDefault()
        document
            .getElementById(e.target.htmlFor)
            ?.scrollIntoView({behavior: "smooth", block: "center"})
    }

    return (
        <>
            <div className={styles.content}>
                <div className={styles.colorMenu}>
                    <div className={cn(styles.menuItem, styles.active)}>
                        Выберите цвет
                    </div>
                    <nav className={styles.menu} onClick={menuClickHandler}>
                        <Link
                            activeClass={styles.active}
                            className={styles.menuItem}
                            to="basic"
                            spy
                            hashSpy
                            smooth
                            offset={-20}
                            duration={300}
                        >
                            Основная информация
                        </Link>
                        <Link
                            className={styles.menuItem}
                            to="properties"
                            activeClass={styles.active}
                            spy
                            hashSpy
                            isDynamic
                            smooth
                            offset={-20}
                            duration={300}
                        >
                            Свойства
                        </Link>
                        <Link
                            className={styles.menuItem}
                            to="price-qty"
                            activeClass={styles.active}
                            spy
                            hashSpy
                            smooth
                            offset={-20}
                            duration={300}
                        >
                            Cтоимость & Количество
                        </Link>
                        <Link
                            className={styles.menuItem}
                            to="photos"
                            activeClass={styles.active}
                            spy
                            hashSpy
                            isDynamic
                            smooth
                            offset={-20}
                            duration={300}
                        >
                            Фотографии
                        </Link>
                        <Link
                            className={styles.menuItem}
                            to="measurements"
                            activeClass={styles.active}
                            spy
                            hashSpy
                            isDynamic
                            smooth
                            offset={-20}
                            duration={300}
                        >
                            Обмеры
                        </Link>
                        <Link
                            className={styles.menuItem}
                            to="status-publishing"
                            activeClass={styles.active}
                            spy
                            hashSpy
                            smooth
                            offset={-20}
                            duration={300}
                        >
                            Статус & Публикация
                        </Link>
                    </nav>
                    {colors && colors.map(
                        color =>
                            color.product_id !== Number(params.id) && (
                                <RouteLink
                                    key={color.id}
                                    to={`/products/edit/${color.product_id}`}
                                    className={styles.menuItem}
                                >
                                    #{color.product_id} {color.title}
                                </RouteLink>
                            )
                    )}
                    {params.id && !params.color && (
                        <div className={styles.menuItem}>
                            <RouteLink to={`/products/edit/${params.id}/color`}>
                                <Button
                                    type="dashed"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    block
                                >
                                    Добавить цвет
                                </Button>
                            </RouteLink>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default LeftSidebar
