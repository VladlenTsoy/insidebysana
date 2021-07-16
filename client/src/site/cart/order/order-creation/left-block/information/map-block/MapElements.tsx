import React, {useCallback, useEffect, useRef, useState} from "react"
import {Map, Placemark, ZoomControl, GeolocationControl, withYMaps, YMapsProps} from "react-yandex-maps"

interface MapElementsProps {
    setFieldValue: any
    selectCenter: any
    position: any
    setMapCountry?: any
    setMapCity?: any
}

const MapElements: React.FC<YMapsProps & MapElementsProps> = ({
    ymaps,
    setFieldValue,
    selectCenter,
    position,
    setMapCountry,
    setMapCity
}) => {
    const [center, setCenter] = useState([41.311158, 69.279737])
    const [zoom, setZoom] = useState(position ? 16 : 12)
    const placemarkRef = useRef<any>(null)

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

    const getAddress = useCallback(
        (coords: number[]) => {
            placemarkRef.current.properties.set("iconCaption", "Поиск...")
            ymaps.geocode(coords).then(function (res: any) {
                var firstGeoObject = res.geoObjects.get(0)

                setMapCountry && setMapCountry(firstGeoObject.getCountry())
                setMapCity && setMapCity(firstGeoObject.getAdministrativeAreas()[0])

                setFieldValue("address", firstGeoObject.getAddressLine(), true)
                setFieldValue("position", coords, true)
                placemarkRef.current.properties.set({
                    // Формирование строки с данными объекта
                    iconCaption: [
                        // Название муниципального образования или вышестоящего административно-территориального образования.
                        firstGeoObject.getLocalities().length
                            ? firstGeoObject.getLocalities()
                            : firstGeoObject.getAdministrativeAreas(),
                        // Получение пути к топониму; если метод возвращает null, то запрашивает название здания.
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].join(", "),
                    // Указание строки с адресом объекта в качестве содержимого балуна.
                    balloonContent: firstGeoObject.getAddressLine()
                })
            })
        },
        [setFieldValue, ymaps, setMapCountry, setMapCity]
    )

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

    const search = useCallback(
        async (e: any) => {
            const request = e.originalEvent.item.value
            try {
                const myGeocoder = await ymaps.geocode(request)
                const coords = myGeocoder.geoObjects.get(0).geometry.getCoordinates()
                setCenter(coords)
                setZoom(16)
                placemarkRef.current.geometry.setCoordinates(coords)
                getAddress(coords)
            } catch (e) {
                console.error(e)
            }
        },
        [getAddress, ymaps, placemarkRef]
    )

    useEffect(() => {
        if (ymaps) {
            const suggestView = new ymaps.SuggestView("address")
            suggestView.events.add("select", search)
            if (!position) {
                var geolocation = ymaps.geolocation

                geolocation
                    .get({
                        provider: "browser",
                        mapStateAutoApply: true
                    })
                    .then(function ({geoObjects}: any) {
                        placemarkRef.current.geometry.setCoordinates(geoObjects.position)
                        setCenter(geoObjects.position)
                        getAddress(geoObjects.position)
                        setZoom(16)
                    })
            }
        }
    }, [ymaps, search, getAddress, position])

    useEffect(() => {
        setCenter(prevState => position || selectCenter || prevState)
    }, [selectCenter, position])

    return (
        <Map
            modules={["geocode", "SuggestView", "geolocation"]}
            defaultState={{
                zoom: 12,
                center: [41.311158, 69.279737]
            }}
            state={{zoom, center}}
            style={{width: "100%", height: "100%"}}
            instanceRef={instanceHandlers}
        >
            <Placemark instanceRef={placemarkRef} geometry={position} />
            <ZoomControl defaultOptions={{float: "right", size: "large"}} />
            <GeolocationControl options={{float: "left"}} instanceRef={geolocationHandler} />
            {/* <FullscreenControl /> */}
        </Map>
    )
}
export default withYMaps(MapElements)
