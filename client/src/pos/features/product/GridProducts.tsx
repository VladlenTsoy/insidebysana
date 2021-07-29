import {Empty, Spin} from "antd"
import LoadingBlock from "components/blocks/loading-block/LoadingBlock"
import React, {useEffect} from "react"
import {
    changeCurrentPage,
    useCategoryIdPos,
    useGetFilterSearch,
    useLoadingProductColors,
    useProductColors,
    useProductPaginationPos,
    useSizeIdPos
} from "pos/features/product/productSlice"
import "./GridProducts.less"
import {motion, AnimatePresence} from "framer-motion"
import {useCashierDispatch} from "admin/store/cashier/store"
import ProductCard from "./ProductCard"
import {fetchProductColorBySearch} from "./fetchProductColorBySearch"
import {LoadingOutlined} from "@ant-design/icons"
// import {useState} from "react"

const GridProducts: React.FC = () => {
    const dispatch = useCashierDispatch()
    const products = useProductColors()
    const loading = useLoadingProductColors()
    const categoryId = useCategoryIdPos()
    const sizeId = useSizeIdPos()
    const search = useGetFilterSearch()
    const {currentPage} = useProductPaginationPos()

    const onScrollHandler = (e: any) => {
        const {scrollTop, scrollHeight, clientHeight} = e.target
        if (scrollTop + clientHeight >= scrollHeight - clientHeight && !loading) {
            dispatch(fetchProductColorBySearch({search, categoryId, sizeId, currentPage: currentPage}))
            dispatch(changeCurrentPage(currentPage + 1))
        }
    }

    useEffect(() => {
        const promise = dispatch(fetchProductColorBySearch({}))
        dispatch(changeCurrentPage(1))
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <div className="search-container" onScroll={onScrollHandler}>
            <AnimatePresence>
                {currentPage === 0 && loading && (
                    <motion.div key="loading-first">
                        <div className="loading-first">
                            <Spin indicator={<LoadingOutlined style={{marginBottom: "1rem"}} />} />
                            <p>Загрузка...</p>
                        </div>
                    </motion.div>
                )}
                {!loading && !products.length && (
                    <motion.div key="empty">
                        <Empty />
                    </motion.div>
                )}
                {
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
                }
                {currentPage !== 0 && loading && (
                    <motion.div key="loading-pagination">
                        <div className="loading-pagination">
                            <Spin indicator={<LoadingOutlined />} />
                            <p>Загрузка...</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
export default React.memo(GridProducts)
