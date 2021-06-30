import React from "react"
import {useParams} from "react-router-dom"
import {Typography, Button, Radio} from "antd"
import "./PrintProduct.less"
import {useGetProductByIdQuery} from "./productApi"
import Colors from "./colors/Colors"
import ImageBlock from "components/image-block/ImageBlock"
import {formatPrice} from "utils/formatPrice"

const {Title} = Typography

const options = [
    {label: "M", value: "Apple"},
    {label: "XXL", value: "Pear"},
    {label: "XL", value: "Orange"}
]

interface ParamsProps {
    id: string
}

const PrintProduct: React.FC = () => {
    const {id} = useParams<ParamsProps>()
    const {data} = useGetProductByIdQuery(id)

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
                    <div className="sku">ID: PC123S22</div>

                    <div className="price">{formatPrice(200000)} сум</div>

                    <div className="colors">
                        <div className="sub-title">Цвета</div>
                        <div className="color"></div>
                        <div className="color"></div>
                    </div>

                    <Colors colors={[{id: 1, hex: "red", product_id: 1}]} />

                    <div className="sizes">
                        <div className="sub-title">Размеры</div>
                        <Radio.Group options={options} optionType="button" size="large" />
                    </div>

                    <div className="action">
                        <Button size="large" block className="btn-add-to-cart">
                            Добавить в корзину
                        </Button>
                    </div>
                </div>
            </div>
        )

    return <></>
}
export default PrintProduct
