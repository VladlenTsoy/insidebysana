import React from "react"
import "./PriceBlock.less"
import {ProductColor} from "types/product/ProductColor"
import {formatPrice} from "utils/formatPrice"
import {ClockCircleOutlined} from "@ant-design/icons"
import {Tooltip} from "antd"
import {formatDate} from "utils/formatDate"
import {formatDiscount} from "utils/formatDiscount"

interface PriceBlockProps {
    discount?: ProductColor["discount"]
    price: number
}

const PriceBlock: React.FC<PriceBlockProps> = ({discount, price}) => {
    return (
        <div className="price-block">
            {discount ? (
                <>
                    {discount.end_at && (
                        <div className="end-at">
                            <Tooltip title={`До ${formatDate(discount.end_at)}`}>
                                <ClockCircleOutlined />
                            </Tooltip>
                        </div>
                    )}
                    <small>
                        {formatPrice(price)} -{" "}
                        <span className="percent">{formatDiscount(discount.discount)}%</span>
                    </small>
                    <div>{formatPrice((price - (price / 100) * discount.discount).toFixed(0))} сум</div>
                </>
            ) : (
                formatPrice(price) + " сум"
            )}
        </div>
    )
}

export default PriceBlock
