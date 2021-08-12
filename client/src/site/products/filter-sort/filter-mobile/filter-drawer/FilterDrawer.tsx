import React, {useEffect, useState} from "react"
import styled from "./FilterDrawer.module.css"
import CloseOutlined from "@ant-design/icons/CloseOutlined"
import LeftOutlined from "@ant-design/icons/LeftOutlined"
import Button from "../../../../../components/button/Button"
import Menu from "./menu/Menu"
import Categories from "./categories/Categories"
import Sizes from "./sizes/Sizes"
import Colors from "./colors/Colors"
import Price from "./price/Price"
import {useDispatch} from "site/store"
import {resetFilter} from "site/products/productSlice"

interface FilterDrawerProps {
    onClose: any
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({onClose}) => {
    const [page, setPage] = useState("menu")
    const [pageName, setPageName] = useState("Фильтрация")
    const dispatch = useDispatch()

    const onClickBackHandler = () => setPage("menu")
    const onResetFilter = () => dispatch(resetFilter())

    useEffect(() => {
        setPageName(() => {
            switch (page) {
                case "categories":
                    return "Категории"
                case "sizes":
                    return "Размеры"
                case "price":
                    return "Стоимость"
                case "colors":
                    return "Цвета"
            }

            return "Фильтрация"
        })
    }, [page])

    return (
        <div className={styled.filter}>
            <div className={styled.header}>
                {page !== "menu" ? (
                    <div className={styled.back} onClick={onClickBackHandler}>
                        <LeftOutlined />
                    </div>
                ) : (
                    <div />
                )}
                <div className={styled.title}>{pageName}</div>
                <div className={styled.close} onClick={onClose}>
                    <CloseOutlined />
                </div>
            </div>
            <div className={styled.body}>
                {page === "menu" && <Menu setPage={setPage} />}
                {page === "categories" && <Categories />}
                {page === "sizes" && <Sizes />}
                {page === "colors" && <Colors />}
                {page === "price" && <Price />}
            </div>
            {page === "menu" ? (
                <div className={styled.footer}>
                    <Button block filled onClick={onClose}>
                        Показать
                    </Button>
                    <Button block link size="small" onClick={onResetFilter}>
                        Сбросить фильтр
                    </Button>
                </div>
            ) : (
                <div className={styled.footer}>
                    <Button block filled onClick={onClose}>
                        Показать
                    </Button>
                </div>
            )}
        </div>
    )
}

export default FilterDrawer
