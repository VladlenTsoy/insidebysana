import React from "react"
import styled from "./Sizes.module.css"
import RadioButton from "components/radio-button/RadioButton"

interface SizesProps {
    sizes: any[]
    selectSizeHandler: any
    requireSize: boolean
}

const Sizes: React.FC<SizesProps> = ({sizes, selectSizeHandler, requireSize}) => {
    return (
        <div className={styled.sizes}>
            <div className={styled.title}>
                Размеры
                {requireSize && <span className={styled.error}>*Выберите размер</span>}
            </div>
            <div className={styled.sizesAction}>
                <RadioButton
                    bigBorder
                    name="sizes"
                    data={sizes.map(size => ({
                        label: `${size.title}`,
                        value: String(size.size_id),
                        disabled: Number(size.qty) <= 0
                    }))}
                    onChange={selectSizeHandler}
                />
            </div>
        </div>
    )
}

export default Sizes
