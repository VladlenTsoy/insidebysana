import React from "react"
import {useCurrentFilter, useFilterSizes, changeCurrentFilterSizes} from "../../../../productSlice"
import styled from "./Sizes.module.css"
import CheckOutlined from "@ant-design/icons/CheckOutlined"
import LoaderBlock from "../../../../../../components/loader-block/LoaderBlock"
import {useDispatch} from "../../../../../store"

const Sizes: React.FC = () => {
    const sizes = useFilterSizes()
    const {sizeIds} = useCurrentFilter()
    const dispatch = useDispatch()

    const onClickHandler = (sizeId: number) => {
        dispatch(
            changeCurrentFilterSizes(
                sizeIds.includes(sizeId) ? sizeIds.filter(catId => catId !== sizeId) : [...sizeIds, sizeId]
            )
        )
    }

    if (!sizes.length) return <LoaderBlock />

    return (
        <>
            {sizes.map(size => (
                <div className={styled.category} key={size.id} onClick={() => onClickHandler(size.id)}>
                    <span>{size.title}</span>
                    {sizeIds.includes(size.id) && <CheckOutlined />}
                </div>
            ))}
        </>
    )
}

export default Sizes
