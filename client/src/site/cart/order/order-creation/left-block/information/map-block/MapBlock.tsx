import React from "react"
import {YMaps} from "react-yandex-maps"
import MapElements from "./MapElements"
import styled from "./MapBlock.module.css"

interface MapBlockProps {
    setFieldValue: any
    setMapCountry?: any
    setMapCity?: any
    position: [number, number]
    selectCenter?: [number, number]
}

const MapBlock: React.FC<MapBlockProps> = ({
    setFieldValue,
    selectCenter,
    position,
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
                <MapElements
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
export default React.memo<MapBlockProps>(MapBlock)
