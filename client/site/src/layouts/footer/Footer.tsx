import React from "react"
import styled from "./Footer.module.css"
import {Link} from "react-router-dom"
import Newsletter from "./newsletter/Newsletter"

const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <>
            <div className={styled.footer}>
                <div className={styled.footerColumn}>
                    <h4>Покупателям</h4>
                    <div className={styled.navigation}>
                        <Link to="/public-offer">Публичная оферта</Link>
                        <Link to="/return-policy">Политика возврата</Link>
                        <Link to="/privacy-policy">Политика конфиденциальности</Link>
                        <Link to="/payment">Оплата</Link>
                        <Link to="/delivery">Доставка</Link>
                        <Link to="/cookies">Cookies</Link>
                    </div>
                </div>
                <div className={styled.footerColumn}>
                    <h4>О компании</h4>
                    <div className={styled.navigation}>
                        <Link to="/about-us">О нас</Link>
                        <Link to="/contacts">Адрес шоурума</Link>
                        <Link to="/contacts">Контакты</Link>
                        <a href="/">Instagram</a>
                        <a href="/">Telegram</a>
                        <Link to="/lookbook">Lookbook</Link>
                    </div>
                </div>
                <div className={styled.footerColumn}>
                    <h4>Новостная рассылка</h4>
                    <Newsletter/>
                </div>
            </div>
            <div className={styled.copyright}>
                {year} © InsideBySana. All rights reserved. Design and development by <a href="http://limitless.uz">Vladlen</a>.
            </div>
        </>
    )
}

export default Footer