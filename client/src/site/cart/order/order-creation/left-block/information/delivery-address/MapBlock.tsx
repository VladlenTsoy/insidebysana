import React, {useCallback, useEffect, useRef, useState} from "react"
import styled from "./DeliveryAddress.module.css"
import {
    YMaps,
    Map,
    Placemark,
    ZoomControl,
    GeolocationControl,
    withYMaps,
    YMapsProps,
    FullscreenControl
} from "react-yandex-maps"
import LoaderBlock from "print/components/loader-block/LoaderBlock"

interface MapElementsProps {
    autoGeolocation?: boolean
    setFieldValue: any
    selectCenter: any
    position?: [number, number]
    setMapCountry: any
    setMapCity: any
}

const BASIC_ZOOM = 12
const SEARCH_ZOOM = 16

const MapElements: React.FC<YMapsProps & MapElementsProps> = ({
    ymaps,
    autoGeolocation = false,
    setFieldValue,
    // selectCenter,
    position,
    setMapCountry,
    setMapCity
}) => {
    const [center, setCenter] = useState([41.311158, 69.279737])
    const [zoom, setZoom] = useState(position ? SEARCH_ZOOM : BASIC_ZOOM)
    const placemarkRef = useRef<any>(null)
    const [mapAutoGeolocation, setMapAutoGeolocation] = useState(autoGeolocation)

    const getAddress = useCallback(
        (coords: number[], toForm: boolean = false) => {
            if (ymaps && placemarkRef.current) {
                placemarkRef.current.properties.set("iconCaption", "Поиск...")
                ymaps.geocode(coords).then(function (res: any) {
                    var firstGeoObject = res.geoObjects.get(0)

                    if (toForm) {
                        setMapCountry && setMapCountry(firstGeoObject.getCountry())
                        setMapCity && setMapCity(firstGeoObject.getAdministrativeAreas()[0])

                        setFieldValue("address", firstGeoObject.getAddressLine(), true)
                        setFieldValue("position", coords, true)
                    }

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
            }
        },
        [ymaps, setFieldValue, setMapCountry, setMapCity]
    )

    useEffect(() => {
        if (ymaps && mapAutoGeolocation) {
            ymaps.geolocation
                .get({
                    provider: "browser",
                    mapStateAutoApply: true
                })
                .then(function ({geoObjects}: any) {
                    placemarkRef.current.geometry.setCoordinates(geoObjects.position)
                    setCenter(geoObjects.position)
                    getAddress(geoObjects.position, true)
                    setZoom(SEARCH_ZOOM)
                    setMapAutoGeolocation(false)
                })
        }
    }, [ymaps, getAddress, mapAutoGeolocation])

    // useEffect(() => {
    //     setCenter(prevState => position || selectCenter || prevState)
    // }, [selectCenter, position])

    useEffect(() => {
        if (position) {
            getAddress(position)
            setCenter(position)
            setZoom(SEARCH_ZOOM)
        }
    }, [position, getAddress])

    // Поиск по подключенному input
    const suggestSearchHandler = useCallback(
        async (e: any) => {
            const request = e.originalEvent.item.value
            try {
                const myGeocoder = await ymaps.geocode(request)
                const coords = myGeocoder.geoObjects.get(0).geometry.getCoordinates()
                setCenter(coords)
                setZoom(SEARCH_ZOOM)
                placemarkRef.current.geometry.setCoordinates(coords)
                getAddress(coords, true)
            } catch (e) {
                console.error(e)
            }
        },
        [getAddress, ymaps, placemarkRef]
    )

    // Подключение поиска (Input)
    useEffect(() => {
        if (ymaps) {
            const suggestView = new ymaps.SuggestView("address")
            suggestView.events.add("select", suggestSearchHandler)
        }
    }, [ymaps, suggestSearchHandler])

    // Нажатие по карте
    const clickOnMapHandler = (e: any) => {
        const coords = e.get("coords")
        if (placemarkRef.current) {
            placemarkRef.current.geometry.setCoordinates(coords)
            getAddress(coords, true)
        }
    }

    // Поиск по геолокации (кнопка)
    const geolocationSearchHandler = (e: any) => {
        const coords = e.originalEvent.position
        placemarkRef.current.geometry.setCoordinates(coords)
        getAddress(coords, true)
    }

    if (!ymaps) return <LoaderBlock />

    return (
        <Map
            modules={["geocode", "SuggestView", "geolocation"]}
            defaultState={{
                zoom: 12,
                center: [41.311158, 69.279737]
            }}
            state={{zoom, center}}
            style={{width: "100%", height: "100%"}}
            instanceRef={(inst: any) => {
                if (inst && inst.events) inst.events.add("click", clickOnMapHandler)
            }}
        >
            <Placemark instanceRef={placemarkRef} geometry={position} />
            <ZoomControl defaultOptions={{float: "right", size: "large"}} />
            <GeolocationControl
                options={{float: "left"}}
                instanceRef={(inst: any) => {
                    if (inst && inst.events) inst.events.add("locationchange", geolocationSearchHandler)
                }}
            />
            <FullscreenControl />
        </Map>
    )
}
const YMapElements = withYMaps(MapElements)

const MapBlock: React.FC<MapElementsProps> = ({
    setFieldValue,
    selectCenter,
    position,
    autoGeolocation,
    setMapCountry,
    setMapCity
}) => {
    return (
        <div className={styled.wrapper}>
            <YMaps
                query={{
                    apikey: "4c39433a-67d6-42f4-b776-4ba711ce9508"
                }}
            >
                <YMapElements
                    autoGeolocation={autoGeolocation}
                    setMapCountry={setMapCountry}
                    setFieldValue={setFieldValue}
                    setMapCity={setMapCity}
                    selectCenter={selectCenter}
                    position={position}
                />
            </YMaps>
        </div>
    )
}
export default React.memo<MapElementsProps>(MapBlock)
