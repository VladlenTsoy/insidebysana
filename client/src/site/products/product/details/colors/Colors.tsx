import React from "react"
import styled from "./Colors.module.css"
import {useParams, useHistory} from "react-router-dom"
import {ProductParamsProps} from "../../Product"
import {ProductColor} from "types/productColor"

interface ColorsProps {
    colors: ProductColor["colors"]
}

const Colors: React.FC<ColorsProps> = ({colors}) => {
    const params = useParams<ProductParamsProps>()
    const history = useHistory()

    const onClickHandler = (id: number) => {
        history.push(`/product/${id}`)
    }

    return (
        <div className={styled.colors}>
            <div className={styled.title}>Цвета</div>
            <div className={styled.colorsAction}>
                {colors && colors.map(color =>
                    <div
                        className={`${styled.color} ${Number(params.id) === color.product_id && styled.active}`}
                        style={{background: color.hex}}
                        onClick={() => onClickHandler(color.product_id)}
                        key={color.id}
                    />
                )}
            </div>
        </div>
    )
}

export default Colors