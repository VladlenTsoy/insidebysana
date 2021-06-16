import React from "react"
import Title from "../../components/title/Title"
import styled from "./Contacts.module.css"
import GoogleMapReact from "google-map-react"

const center = {
    lat: 59.955413,
    lng: 30.337844
}

const Contacts = () => {
    const renderMarkers = (map: any, maps: any) => {
        new maps.Marker({
            position: center,
            map,
            title: "Hello World!"
        })
    }

    return (
        <>
            <Title level={1}>Контакты</Title>
            <div className={styled.contacts}>
                <div className={styled.info}>
                    <div className={styled.infoBlock}>
                        <div className={styled.title}>Адрес:</div>
                        <div className={styled.text}>Узбекистан, г. Ташкент, ул. Баку, 1-ый тупик</div>
                    </div>
                    <div className={styled.infoBlock}>
                        <div className={styled.title}>Телефон:</div>
                        <div className={styled.text}><a href="tel:+998901870074">+(998-90)-187-00-74</a></div>
                    </div>
                </div>
                <div className={styled.map}>
                    <GoogleMapReact
                        bootstrapURLKeys={{key: "AIzaSyBSNRntfWg3WQpwR8JWs_36lIXUFbIKpcI"}}
                        defaultCenter={center}
                        defaultZoom={14}
                        onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps)}
                    />
                </div>
            </div>
        </>
    )
}

export default Contacts