import React from "react"
import Title from "../../components/title/Title"
import styled from "./Contacts.module.css"
import {YMaps, Map, ZoomControl, Placemark} from "react-yandex-maps"
import InstagramFilled from "@ant-design/icons/InstagramFilled"
import FacebookFilled from "@ant-design/icons/FacebookFilled"

const Contacts: React.FC = () => {
    return (
        <>
            <Title level={1}>Контакты</Title>
            <div className={styled.contacts}>
                <div className={styled.info}>
                    <div className={styled.infoBlock}>
                        <div className={styled.title}>Адрес:</div>
                        <div className={styled.text}>
                            Узбекистан, г. Ташкент, ул. Моштабиб, дом 5 (ориентир задняя сторона магазина
                            "Glamour")
                        </div>
                    </div>
                    <div className={styled.infoBlock}>
                        <div className={styled.title}>Телефон:</div>
                        <div className={styled.text}>
                            <a href="tel:+998901870074">+(998-90)-187-00-74</a>
                        </div>
                    </div>
                    <div className={styled.infoBlock}>
                        <div className={styled.title}>Соц. сети:</div>
                        <div className={styled.icons}>
                            <a href="https://www.instagram.com/insidebysana" target="_blank" rel="noreferrer">
                                <InstagramFilled />
                            </a>
                            <a href="https://www.facebook.com/insidebysana" target="_blank" rel="noreferrer">
                                <FacebookFilled />
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styled.map}>
                    <YMaps
                        query={{
                            apikey: "4c39433a-67d6-42f4-b776-4ba711ce9508"
                        }}
                    >
                        <Map
                            modules={["geocode", "SuggestView"]}
                            defaultState={{
                                zoom: 17,
                                center: [41.299553, 69.288732]
                            }}
                            style={{width: "100%", height: "100%"}}
                        >
                            <Placemark geometry={[41.299553, 69.288732]} />
                            <ZoomControl defaultOptions={{float: "right", size: "large"}} />
                        </Map>
                    </YMaps>
                </div>
            </div>
        </>
    )
}

export default Contacts
