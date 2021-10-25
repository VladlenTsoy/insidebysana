import React from "react"
import styles from "./Sizes.module.less"
import cn from "classnames"

interface SizesProps {
    product: any;
}

const Sizes: React.FC<SizesProps> = ({product}) => {
    return (
        <div className={styles.sizes}>
            {product.sizes.map((size: any) => {
                return (
                    <div
                        key={size.id}
                        className={cn(styles.size, {
                            [styles.danger]: size.qty <= 0,
                            [styles.warning]: size.qty <= size.min_qty
                        })}
                    >
                        <b>{size.title}</b>
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
