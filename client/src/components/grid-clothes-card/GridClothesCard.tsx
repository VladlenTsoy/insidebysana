import React from "react"
import styled from "./GridClothesCard.module.css"

const GridClothesCard: React.FC = ({children}) => {
    return (
        <div className={styled.gridClothes}>
            {children}
        </div>
    )
}

export default GridClothesCard