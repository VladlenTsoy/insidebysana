import React from "react"
import styled from "./ImageLink.module.css"
import ImageBlock from "../../../../../components/image-block/ImageBlock"
import {useHistory} from "react-router-dom"
import {ProductColorCart} from "../../../../../types/cart"

interface ImageLinkProps {
    id: ProductColorCart["id"]
    image: ProductColorCart["url_thumbnail"]
}

const ImageLink: React.FC<ImageLinkProps> = ({image, id}) => {
    const history = useHistory()

    const onClickProduct = () =>
        history.push(`/product/${id}`)

    return (
        <div className={styled.image} onClick={onClickProduct}>
            <ImageBlock src={image} />
        </div>
    )
}

export default React.memo<ImageLinkProps>(ImageLink)