import {Empty} from "antd"
import LoadingBlock from "components/blocks/loading-block/LoadingBlock"
import React from "react"
import {
    changeCurrentPage,
    useLoadingProductColors,
    useProductColors,
    useProductPaginationPos
} from "pos/features/product/productSlice"
import "./GridProducts.less"
import {motion, AnimatePresence} from "framer-motion"
import {useCashierDispatch} from "admin/store/cashier/store"
import ProductCard from "./ProductCard"

const GridProducts: React.FC = () => {
    const dispatch = useCashierDispatch()
    const products = useProductColors()
    const loading = useLoadingProductColors()
    const {currentPage} = useProductPaginationPos()

    const onScrollHandler = (e: any) => {
        const {scrollTop, scrollHeight, clientHeight} = e.target
        if (scrollTop + clientHeight >= scrollHeight - clientHeight) {
            dispatch(changeCurrentPage(currentPage + 1))
        }
    }

    return (
        <div className="search-container" onScroll={onScrollHandler}>
            <AnimatePresence>
                {loading && (
                    <motion.div key="loading">
                        <LoadingBlock />
                    </motion.div>
                )}
                {!loading && !products.length && (
                    <motion.div key="empty">
                        <Empty />
                    </motion.div>
                )}
                {!loading && !!products.length && (
                    <motion.div
                        id="grid-products-list"
                        key="grid-products"
                        className="products-container"
                        animate="visible"
                        initial="hidden"
                        exit="exit"
                        variants={{
                            visible: {
                                transition: {
                                    delayChildren: 0.05,
                                    staggerChildren: 0.05
                                }
                            },
                            exit: {
                                transition: {
                                    delayChildren: 0.05,
                                    staggerChildren: 0.05,
                                    repeatType: "reverse"
                                }
                            }
                        }}
                    >
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
export default React.memo(GridProducts)
