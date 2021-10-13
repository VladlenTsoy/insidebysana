import {SearchOutlined} from "@ant-design/icons"
import {Input} from "antd"
import React from "react"

interface SearchProps {
    onSearch: (e: any) => void
}

const Search: React.FC<SearchProps> = ({onSearch}) => {
    return (
        <>
            <Input
                prefix={<SearchOutlined />}
                placeholder="Введите название"
                allowClear
                size="large"
                onChange={onSearch}
            />
        </>
    )
}
export default Search
