import {CheckOutlined, FilterOutlined} from "@ant-design/icons"
import {LoadingBlock} from "admin/lib/ui"
import {Button, Drawer} from "antd"
import {AnimatePresence, motion} from "framer-motion"
import React, {useState} from "react"
import {Size} from "types/Size"
import {Category} from "admin/lib/types/Category"

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

interface FilterButtonProps {
    sizes?: Size[]
    categories?: Category[]
    onCategories: (categoryId: string) => void
    onSizes: (sizeId: string) => void
    categoryIds: string[]
    sizeIds: string[]
    isLoadingCategories: boolean
    isLoadingSizes: boolean
}

const FilterButton: React.FC<FilterButtonProps> = ({
    onCategories,
    onSizes,
    categoryIds,
    sizeIds,
    categories,
    sizes,
    isLoadingCategories,
    isLoadingSizes
}) => {
    const [visible, setVisible] = useState(false)

    const changeCategoryHandler = (categoryId: number) => {
        onCategories(String(categoryId))
    }
    const changeSizeHandler = (sizeId: number) => {
        onSizes(String(sizeId))
    }

    const onClickHandler = () => {
        setVisible(true)
    }

    const close = () => {
        setVisible(false)
    }

    return (
        <>
            <Button size="large" icon={<FilterOutlined />} onClick={onClickHandler}>
                Фильтрация
            </Button>
            <Drawer
                visible={visible}
                onClose={close}
                getContainer=".site-layout-content"
                placement="left"
                style={{position: "absolute"}}
                width="370"
                closeIcon={false}
            >
                <div className="filter">
                    {isLoadingCategories || isLoadingSizes ? (
                        <LoadingBlock />
                    ) : (
                        <div className="filter-container">
                            <div className="filter-list categories-list">
                                <div
                                    className={`filter-item filter-item-all ${
                                        categoryIds.includes("0") && "filter-item-active"
                                    }`}
                                    onClick={() => changeCategoryHandler(0)}
                                >
                                    <AnimatePresence>
                                        {categoryIds.includes("0") && (
                                            <MotionCheckAnimation>
                                                <CheckOutlined />
                                            </MotionCheckAnimation>
                                        )}
                                        <motion.span
                                            animate={
                                                categoryIds.includes("0")
                                                    ? {x: 20, width: "calc(100% - 20px)"}
                                                    : {x: 0, width: "100%"}
                                            }
                                            key="title"
                                        >
                                            Все
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                                {categories?.map(category => (
                                    <div className="filter-group" key={category.id}>
                                        <span className="title-group"> {category.title}</span>
                                        <div>
                                            {category.sub_categories?.map(sub => {
                                                const isFind = categoryIds.includes(String(sub.id))
                                                return (
                                                    <div
                                                        className={`filter-item ${
                                                            isFind && "filter-item-active"
                                                        }`}
                                                        key={sub.id}
                                                        onClick={() => changeCategoryHandler(sub.id)}
                                                    >
                                                        <AnimatePresence>
                                                            {isFind && (
                                                                <MotionCheckAnimation>
                                                                    <CheckOutlined />
                                                                </MotionCheckAnimation>
                                                            )}
                                                            <motion.span
                                                                animate={
                                                                    isFind
                                                                        ? {
                                                                              x: 20,
                                                                              width: "calc(100% - 20px)"
                                                                          }
                                                                        : {x: 0, width: "100%"}
                                                                }
                                                                key="title"
                                                            >
                                                                {sub.title}
                                                            </motion.span>
                                                        </AnimatePresence>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="filter-list sizes-list">
                                <div
                                    className={`filter-item filter-item-all ${
                                        sizeIds.includes(String("0")) && "filter-item-active"
                                    }`}
                                    onClick={() => changeSizeHandler(0)}
                                >
                                    <AnimatePresence>
                                        {sizeIds.includes(String("0")) && (
                                            <MotionCheckAnimation>
                                                <CheckOutlined />
                                            </MotionCheckAnimation>
                                        )}
                                        <motion.span
                                            animate={
                                                sizeIds.includes(String("0"))
                                                    ? {x: 20, width: "calc(100% - 20px)"}
                                                    : {x: 0, width: "100%"}
                                            }
                                            key="title"
                                        >
                                            Все
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                                {sizes?.map(size => {
                                    const isFind = sizeIds.includes(String(size.id))
                                    return (
                                        <div
                                            className={`filter-item ${isFind && "filter-item-active"}`}
                                            key={size.id}
                                            onClick={() => changeSizeHandler(size.id)}
                                        >
                                            {isFind && (
                                                <MotionCheckAnimation>
                                                    <CheckOutlined />
                                                </MotionCheckAnimation>
                                            )}
                                            <motion.span
                                                animate={
                                                    isFind
                                                        ? {x: 20, width: "calc(100% - 20px)"}
                                                        : {x: 0, width: "100%"}
                                                }
                                                key="title"
                                            >
                                                {size.title}
                                            </motion.span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                    <div className="filter-actions">
                        <Button block size="large">
                            Сбросить
                        </Button>
                        <Button type="primary" block size="large">
                            Применить
                        </Button>
                    </div>
                </div>
            </Drawer>
        </>
    )
}
export default FilterButton
