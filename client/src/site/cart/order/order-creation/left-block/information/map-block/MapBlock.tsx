import React from "react"
import {YMaps} from "react-yandex-maps"
import MapElements from "./MapElements"
import styled from "./MapBlock.module.css"
// import {useSelectCountryById} from "store/country/countrySelector"
// import {useSelectCityById} from "store/city/citySelector"

interface MapBlockProps {
    setFieldValue: any
    country_id: any
    city_id: any
    position: any
}

const MapBlock: React.FC<MapBlockProps> = ({setFieldValue, country_id, city_id, position}) => {
    // const country = useSelectCountryById(country_id)
    // const city = useSelectCityById(city_id)
    // const selectCenter = city?.position || country?.position
    const selectCenter = {}

    return (
        <div className={styled.wrapper}>
            <YMaps
                query={{
                    apikey: "4c39433a-67d6-42f4-b776-4ba711ce9508"
                }}
            >
                <MapElements setFieldValue={setFieldValue} selectCenter={selectCenter} position={position} />
            </YMaps>
        </div>
    )
}
export default React.memo<MapBlockProps>(MapBlock)
