import React from "react"
import {Link} from "react-scroll"

const LeftSidebar: React.FC = () => {
    const menuClickHandler = (e: any) => {
        e.preventDefault()
        document.getElementById(e.target.htmlFor)?.scrollIntoView({behavior: "smooth", block: "center"})
    }

    return (
        <>
            <div className="left-block">
                <div className="color-menu">
                    <div className="menu-item active">Выберите цвет</div>
                    <nav className="menu" onClick={menuClickHandler}>
                        <Link
                            activeClass="active"
                            className="menu-item"
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
                            className="menu-item"
                            to="properties"
                            activeClass="active"
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
                            className="menu-item"
                            to="price-qty"
                            activeClass="active"
                            spy
                            hashSpy
                            smooth
                            offset={-20}
                            duration={300}
                        >
                            Cтоимость & Количество
                        </Link>
                        <Link
                            className="menu-item"
                            to="photos"
                            activeClass="active"
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
                            className="menu-item"
                            to="measurements"
                            activeClass="active"
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
                            className="menu-item"
                            to="status-publishing"
                            activeClass="active"
                            spy
                            hashSpy
                            smooth
                            offset={-20}
                            duration={300}
                        >
                            Статус & Публикация
                        </Link>
                    </nav>
                    <div className="menu-item">Черный</div>
                    <div className="menu-item">Синий</div>
                </div>
            </div>
        </>
    )
}
export default LeftSidebar
