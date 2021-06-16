import {
    YMaps,
    Map,
    Placemark,
    ZoomControl,
    GeolocationControl,
    SearchControl,
    FullscreenControl,
    withYMaps
} from "react-yandex-maps"
import React, {useRef} from "react"
import styled from "./GoogleMapSelect.module.css"
import CloseOutlined from "@ant-design/icons/CloseOutlined"
import LeftOutlined from "@ant-design/icons/LeftOutlined"

interface GoogleMapReactProps {
    close: any
}

const MapAction = withYMaps(({ymaps}: any) => {
    const placemarkRef = useRef<any>(null)
    console.log(ymaps)

    // new ymaps.SuggestView("address")

    const clickOnMap = (e: any) => {
        const coords = e.get("coords")

        if (placemarkRef.current) {
            placemarkRef.current.geometry.setCoordinates(coords)
            getAddress(coords)
        }
    }

    const instanceHandlers = (inst: any) => {
        if (inst && inst.events) inst.events.add("click", clickOnMap)
    }

    function getAddress(coords: number[]) {
        placemarkRef.current.properties.set("iconCaption", "Поиск...")

        ymaps.geocode(coords).then(function (res: any) {
            var firstGeoObject = res.geoObjects.get(0)
            console.log(firstGeoObject.getAddressLine(), coords)
            placemarkRef.current.properties.set({
                // Формирование строки с данными объекта
                iconCaption: [
                    // Название муниципального образования или вышестоящего административно-территориального образования.
                    firstGeoObject.getLocalities().length
                        ? firstGeoObject.getLocalities()
                        : firstGeoObject.getAdministrativeAreas(),
                    // Получение пути к топониму; если метод возвращает null, то запрашивает название здания.
                    firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                ]
                    .filter(Boolean)
                    .join(", "),
                // Указание строки с адресом объекта в качестве содержимого балуна.
                balloonContent: firstGeoObject.getAddressLine()
            })
        })
    }

    const geolocationSearch = (e: any) => {
        const coords = e.originalEvent.position

        placemarkRef.current.geometry.setCoordinates(coords)
        getAddress(coords)
    }

    const geolocationHandler = (inst: any) => {
        if (inst && inst.events) {
            inst.events.add("locationchange", geolocationSearch)
        }
    }

    const search = async (e: any, a: any) => {
        const request = e.originalEvent.request
        try {
            const myGeocoder = await ymaps.geocode(request)
            const coords = myGeocoder.geoObjects.get(0).geometry.getCoordinates()

            placemarkRef.current.geometry.setCoordinates(coords)
            getAddress(coords)
        } catch (e) {
            console.error(e)
        }
    }

    const searchHandler = (inst: any) => {
        if (inst && inst.events) inst.events.add("submit", search)
    }

    const loadSuggest = (ymaps: any) => {
        console.log(ymaps)
        const suggestView = new ymaps.SuggestView("address")
    }

    return (
        <Map
            onLoad={ymaps => loadSuggest(ymaps)}
            modules={["geocode", "SuggestView"]}
            defaultState={{
                zoom: 12,
                center: [41.311158, 69.279737]
            }}
            style={{width: "100%", height: "100%"}}
            instanceRef={instanceHandlers}
        >
            <Placemark instanceRef={placemarkRef} />
            <ZoomControl defaultOptions={{float: "right", size: "large"}} />
            <GeolocationControl options={{float: "left"}} instanceRef={geolocationHandler} />
            <SearchControl
                options={{noPlacemark: true, float: "right", size: "large"}}
                instanceRef={searchHandler}
            />
            <FullscreenControl />
        </Map>
    )
})

const GoogleMapSelect: React.FC<GoogleMapReactProps> = ({close}) => {
    return (
        <div className={styled.container}>
            <div className={styled.header}>
                <div className={styled.action} onClick={close}>
                    <LeftOutlined />
                </div>
                <div className={styled.title}>Выберите локацию</div>
                <div className={styled.action} onClick={close}>
                    <CloseOutlined />
                </div>
            </div>
            <YMaps
                query={{
                    apikey: "4c39433a-67d6-42f4-b776-4ba711ce9508"
                }}
            >
                <MapAction />
            </YMaps>
        </div>
    )
}
export default React.memo<GoogleMapReactProps>(GoogleMapSelect)
