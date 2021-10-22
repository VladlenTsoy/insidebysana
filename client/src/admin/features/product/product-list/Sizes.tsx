import {useSelectAllSizes} from "admin/store/common/size/sizeSelectors"
import React from "react"
import styles from "./Sizes.module.less"
import cn from "classnames"

interface SizesProps {
    product: any;
}

const Sizes: React.FC<SizesProps> = ({product}) => {
    const sizes = useSelectAllSizes()

    return (
        <div className={styles.sizes}>
            {Object.keys(product.sizes_props).map((key: any) => {
                const size = product.sizes_props[key]
                const selectSize = sizes.find(
                    (size: any) => size.id === Number(key)
                )
                return (
                    <div
                        key={key}
                        className={cn(styles.size, {
                            [styles.danger]: size.qty <= 0,
                            [styles.warning]: size.qty <= size.min_qty
                        })}
                    >
                        <b>{selectSize?.title}</b>
                        <span
                            className={cn(styles.size, {
                                [styles.danger]: size.qty <= 0,
                                [styles.warning]: size.qty <= size.min_qty
                            })}
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
