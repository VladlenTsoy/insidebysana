import React, {useCallback, useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {Typography} from "antd"
import "./PrintProduct.less"
import {useGetProductByIdQuery} from "./productApi"
import Colors from "./colors/Colors"
import ImageBlock from "components/image-block/ImageBlock"
import ErrorBlock from "components/error-block/ErrorBlock"
import LoaderBlock from "components/loader-block/LoaderBlock"
import {formatPrice} from "utils/formatPrice"
import Sizes from "./sizes/Sizes"
import CartButton from "./cart-button/CartButton"

const {Title} = Typography

interface ParamsProps {
    id: string
}

const PrintProduct: React.FC = () => {
    const {id} = useParams<ParamsProps>()
    const {data, isLoading} = useGetProductByIdQuery(id)
    const [size, setSize] = useState(null)
    const [requireSize, setRequireSize] = useState(false)

    const selectSizeHandler = useCallback(sizeId => {
        setSize(sizeId)
    }, [])

    const outputErrorSizeHandler = useCallback(() => {
        setRequireSize(true)
    }, [])

    useEffect(() => {
        if (size) setRequireSize(false)
    }, [size])

    if (isLoading) return <LoaderBlock />

    if (data)
        return (
            <div className="print-product">
                <div className="print-product-image">
                    <div className="wrapper-image">
                        <ImageBlock src={data.url_image} zoom />
                    </div>
                </div>
                <div className="print-product-details">
                    <Title level={2}>{data.title}</Title>
                    <div className="sku">
                        ID: P{data.print_image_id}PC{data.product_color_id}
                        {!!size && `S${size}`}
                    </div>
                    <div className="price">{formatPrice(data.price, data.discount)} сум</div>
                    <Colors colors={data.colors} />
                    <Sizes
                        sizes={data.sizes_props}
                        requireSize={requireSize}
                        selectSizeHandler={selectSizeHandler}
                    />
                    <CartButton
                        product={data}
                        sizeId={size}
                        outputErrorSizeHandler={outputErrorSizeHandler}
                    />
                </div>
            </div>
        )

    return <ErrorBlock />
}
export default PrintProduct
