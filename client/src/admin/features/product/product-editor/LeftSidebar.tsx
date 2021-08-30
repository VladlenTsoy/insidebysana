import React from "react"

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
                        <label htmlFor="basic" className="menu-item active">
                            Основная информация
                        </label>
                        <label htmlFor="properties" className="menu-item">
                            Свойства
                        </label>
                        <label htmlFor="price-qty" className="menu-item">
                            Cтоимость & Количество
                        </label>
                        <label htmlFor="photos" className="menu-item">
                            Фотографии
                        </label>
                        <label htmlFor="measurements" className="menu-item">
                            Обмеры
                        </label>
                        <label htmlFor="status-publishing" className="menu-item">
                            Статус & Публикация
                        </label>
                    </nav>
                    <div className="menu-item">Черный</div>
                    <div className="menu-item">Синий</div>
                </div>
            </div>
        </>
    )
}
export default LeftSidebar
