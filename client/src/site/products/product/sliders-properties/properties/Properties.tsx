import React from "react"
import styled from "./Properties.module.css"
import {ProductColor} from "types/productColor"
import Property from "./property/Property"

interface PropertiesProps {
    properties: ProductColor["properties"]
}

const Properties: React.FC<PropertiesProps> = ({properties}) => {
    if (!properties.length)
        return <></>

    return (
        <div className={styled.properties} id="product-properties">
            {properties.map((property, key) =>
                <Property property={property} key={key}/>
            )}
        </div>
    )
}

export default Properties