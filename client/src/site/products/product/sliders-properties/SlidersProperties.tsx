import React from "react"
import styled from "./SlidersProperties.module.css"
import {ProductColor} from "types/productColor"
import Sliders from "./sliders/Sliders"
// import Properties from "./properties/Properties"

interface SlidersPropertiesProps {
    product: ProductColor
}

const SlidersProperties: React.FC<SlidersPropertiesProps> = ({product}) => {
    return (
        <div className={styled.slidersProperties}>
            <Sliders images={product.images}/>
            {/*<Properties properties={product.properties}/>*/}
        </div>
    )
}

export default SlidersProperties