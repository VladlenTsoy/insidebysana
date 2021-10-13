import {useSelectAllSizes} from "admin/store/common/size/sizeSelectors"
import React from "react"

interface SizesProps {
    product: any
}

const Sizes: React.FC<SizesProps> = ({product}) => {
    const sizes = useSelectAllSizes()

    return (
        <div className="sizes-block">
            {Object.keys(product.sizes_props).map((key: any) => {
                const size = product.sizes_props[key]
                const selectSize = sizes.find((size: any) => size.id === Number(key))
                return (
                    <div
                        key={key}
                        className={`size-block ${
                            size.qty <= 0 ? "danger" : size.qty <= size.min_qty ? "warning" : ""
                        }`}
                    >
                        <b>{selectSize?.title}</b>
                        <span
                            className={size.qty <= 0 ? "danger" : size.qty <= size.min_qty ? "warning" : ""}
                        >
                            {size.qty}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}
export default Sizes
