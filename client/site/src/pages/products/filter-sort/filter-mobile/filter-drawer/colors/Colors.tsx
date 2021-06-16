import React from "react"
import {
    useCurrentFilter,
    useFilterColors
} from "../../../../../../store/product-card/productCardSelector"
import {useDispatch} from "../../../../../../store/store"
import {changeCurrentFilterColors} from "../../../../../../store/product-card/productCardSlice"
import LoaderBlock from "../../../../../../components/loader-block/LoaderBlock"
import styled from "../categories/Categoires.module.css"
import CheckOutlined from "@ant-design/icons/CheckOutlined"

const Colors = () => {
    const colors = useFilterColors()
    const {colorIds} = useCurrentFilter()
    const dispatch = useDispatch()

    const onClickHandler = (colorId: number) => {
        dispatch(changeCurrentFilterColors(
            colorIds.includes(colorId) ?
                colorIds.filter(id => id !== colorId) :
                [...colorIds, colorId]
        ))
    }

    if (!colors.length)
        return <LoaderBlock />

    return (
        <>
            {colors.map(color =>
                <div className={styled.category} key={color.id} onClick={() => onClickHandler(color.id)}>
                    <div className={styled.title}>
                        <span className={styled.color} style={{background: color.hex}}/>
                        {color.title}
                    </div>
                    {colorIds.includes(color.id) && <CheckOutlined />}
                </div>
            )}
        </>
    )
}

export default Colors