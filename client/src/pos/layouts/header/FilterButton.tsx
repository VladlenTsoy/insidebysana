import React, {useState} from "react"
import {CheckOutlined, FilterOutlined} from "@ant-design/icons"
import {Button, Drawer} from "antd"
import LoadingBlock from "components/blocks/loading-block/LoadingBlock"
import {
    changeCategoryId,
    changeSizeId,
    resetCategoryIdAndSizeId,
    useCategoryIdPos,
    useSizeIdPos
} from "pos/features/product/productSlice"
import {useGetCategoriesQuery} from "./categoryApi"
import {useGetSizeQuery} from "./sizeApi"
import {useDispatch} from "pos/store"
import styles from "./FilterButton.module.less"
import {motion, AnimatePresence} from "framer-motion"
import cn from "classnames"

const MotionCheckAnimation: React.FC = ({children}) => {
    return (
        <motion.span
            animate={{opacity: 1, x: 0}}
            initial={{opacity: 0, x: -20}}
            exit={{opacity: 0, x: -20}}
            key="icon"
        >
            {children}
        </motion.span>
    )
}

const FilterButton: React.FC = () => {
    const [visible, setVisible] = useState(false)
    const {data: sizes, isLoading: isLoadingSizes} = useGetSizeQuery()
    const {
        data: categories,
        isLoading: isLoadingCategories
    } = useGetCategoriesQuery()
    const dispatch = useDispatch()
    const categoryId = useCategoryIdPos()
    const sizeId = useSizeIdPos()

    // Фильтрация по категориям
    const changeCategoryHandler = async (id: number) => {
        await dispatch(changeCategoryId(id === categoryId ? 0 : id))
    }

    // Фильтрация по размеру
    const changeSizeHandler = async (id: number) => {
        await dispatch(changeSizeId(id === sizeId ? 0 : id))
    }

    // Сбросить фильтр
    const resetFilterHandler = async () => {
        await dispatch(resetCategoryIdAndSizeId({categoryId: 0, sizeId: 0}))
    }

    // Открыть фильтрацию
    const openHandler = () => setVisible(true)
    // Закрыть фильтрацию
    const closeHandler = () => setVisible(false)

    return (
        <>
            <Button
                type="link"
                size="large"
                icon={<FilterOutlined />}
                onClick={openHandler}
            >
                Фильтрация
            </Button>
            <Drawer
                closeIcon={false}
                visible={visible}
                onClose={closeHandler}
                placement="left"
                width="370"
                className={styles.drawerFilter}
            >
                <div className={styles.filter}>
                    {isLoadingCategories || isLoadingSizes ? (
                        <LoadingBlock />
                    ) : (
                        <div className={styles.container}>
                            <div className={cn(styles.list, styles.categories)}>
                                <div
                                    className={cn(
                                        styles.filterItem,
                                        styles.filterItemAll,
                                        {
                                            [styles.filterItemActive]:
                                                categoryId === 0
                                        }
                                    )}
                                    onClick={() => changeCategoryHandler(0)}
                                >
                                    <AnimatePresence>
                                        {categoryId === 0 && (
                                            <MotionCheckAnimation>
                                                <CheckOutlined />
                                            </MotionCheckAnimation>
                                        )}
                                        <motion.span
                                            animate={
                                                categoryId === 0
                                                    ? {
                                                          x: 20,
                                                          width:
                                                              "calc(100% - 20px)"
                                                      }
                                                    : {x: 0, width: "100%"}
                                            }
                                            key="title"
                                        >
                                            Все
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                                {categories?.map(category => (
                                    <div
                                        className={styles.filterGroup}
                                        key={category.id}
                                    >
                                        <span className={styles.titleGroup}>
                                            {" "}
                                            {category.title}
                                        </span>
                                        <div>
                                            {category.sub_categories?.map(
                                                sub => (
                                                    <div
                                                        className={cn(
                                                            styles.filterItem,
                                                            {
                                                                [styles.filterItemActive]:
                                                                    categoryId ===
                                                                    sub.id
                                                            }
                                                        )}
                                                        key={sub.id}
                                                        onClick={() =>
                                                            changeCategoryHandler(
                                                                sub.id
                                                            )
                                                        }
                                                    >
                                                        <AnimatePresence>
                                                            {categoryId ===
                                                                sub.id && (
                                                                <MotionCheckAnimation>
                                                                    <CheckOutlined />
                                                                </MotionCheckAnimation>
                                                            )}
                                                            <motion.span
                                                                animate={
                                                                    categoryId ===
                                                                    sub.id
                                                                        ? {
                                                                              x: 20,
                                                                              width:
                                                                                  "calc(100% - 20px)"
                                                                          }
                                                                        : {
                                                                              x: 0,
                                                                              width:
                                                                                  "100%"
                                                                          }
                                                                }
                                                                key="title"
                                                            >
                                                                {sub.title}
                                                            </motion.span>
                                                        </AnimatePresence>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={cn(styles.list, styles.sizes)}>
                                <div
                                    className={cn(
                                        styles.filterItem,
                                        styles.filterItemAll,
                                        {
                                            [styles.filterItemActive]:
                                                sizeId === 0
                                        }
                                    )}
                                    onClick={() => changeSizeHandler(0)}
                                >
                                    <AnimatePresence>
                                        {sizeId === 0 && (
                                            <MotionCheckAnimation>
                                                <CheckOutlined />
                                            </MotionCheckAnimation>
                                        )}
                                        <motion.span
                                            animate={
                                                sizeId === 0
                                                    ? {
                                                          x: 20,
                                                          width:
                                                              "calc(100% - 20px)"
                                                      }
                                                    : {x: 0, width: "100%"}
                                            }
                                            key="title"
                                        >
                                            Все
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                                {sizes?.map(size => (
                                    <div
                                        className={cn(styles.filterItem, {
                                            [styles.filterItemActive]:
                                                sizeId === size.id
                                        })}
                                        key={size.id}
                                        onClick={() =>
                                            changeSizeHandler(size.id)
                                        }
                                    >
                                        {sizeId === size.id && (
                                            <MotionCheckAnimation>
                                                <CheckOutlined />
                                            </MotionCheckAnimation>
                                        )}
                                        <motion.span
                                            animate={
                                                sizeId === size.id
                                                    ? {
                                                          x: 20,
                                                          width:
                                                              "calc(100% - 20px)"
                                                      }
                                                    : {x: 0, width: "100%"}
                                            }
                                            key="title"
                                        >
                                            {size.title}
                                        </motion.span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className={styles.filterActions}>
                        <Button block size="large" onClick={resetFilterHandler}>
                            Сбросить
                        </Button>
                        <Button
                            type="primary"
                            block
                            size="large"
                            onClick={closeHandler}
                        >
                            Применить
                        </Button>
                    </div>
                </div>
            </Drawer>
        </>
    )
}

export default FilterButton
