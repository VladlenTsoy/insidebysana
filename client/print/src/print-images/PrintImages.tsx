import CardProduct from "components/card-product/CardProduct"
import React from "react"
import {useParams} from "react-router-dom"
import {useGetPrintImagesByCategoryIdQuery} from "./printImageApi"
import "./PrintImages.less"

interface ParamsProps {
    id: string
}

const PrintImages: React.FC = () => {
    const {id} = useParams<ParamsProps>()
    const {data, isLoading} = useGetPrintImagesByCategoryIdQuery(id)

    return (
        <div className="images-grid">
            {data &&
                data.map(printImage => (
                    <CardProduct
                        title={printImage.title}
                        image={printImage.url_image}
                        price={printImage.price}
                        key={printImage.id}
                        link={`/image/${printImage.id}`}
                    />
                ))}
        </div>
    )
}
export default PrintImages
