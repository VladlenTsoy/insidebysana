import React, {Dispatch, SetStateAction, useState} from "react"
import styled from "./Sort.module.css"
import FilterButton from "../../../../components/filter-button/FilterButton"

export interface SortType {
    column: string,
    dir: string
}

interface SortProps {
    setSort: Dispatch<SetStateAction<SortType>>
}

const Sort: React.FC<SortProps> = ({setSort}) => {
    const [active, setActive] = useState<number>(3)
    const sortItems = [
        {title: "Название: А-Я", column: "title", dir: "asc"},
        {title: "Название: Я-А", column: "title", dir: "desc"},
        {title: "Дата: по возрастанию", column: "created_at", dir: "asc"},
        {title: "Дата: по убыванию", column: "created_at", dir: "desc"},
        {title: "Цена: по возрастанию", column: "price", dir: "asc"},
        {title: "Цена: по убыванию", column: "price", dir: "desc"}
    ]

    const onClickHandler = (key: number, item: any) => {
        setActive(key)
        setSort({
            column: item.column,
            dir: item.dir
        })
    }

    return (
        <>
            <div className={styled.sort}>
                <FilterButton title={sortItems[active].title} position="right" autoClose>
                    <div className={styled.sortMenu}>
                        {sortItems.map((item, key) =>
                            <div
                                className={`${styled.item} ${key === active && styled.active}`}
                                key={key}
                                onClick={() => onClickHandler(key, item)}
                            >
                                {item.title}
                            </div>
                        )}
                    </div>
                </FilterButton>
            </div>
        </>
    )
}

export default Sort