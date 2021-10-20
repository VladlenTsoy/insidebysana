import {SearchOutlined} from "@ant-design/icons"
import {Input} from "antd"
import React, {useState} from "react"

interface SearchProps {
    search: string
    onSearch: (e: any) => void
}

const Search: React.FC<SearchProps> = ({search, onSearch}) => {
    const [value, setValue] = useState(search)

    const onSearchHandler = (e: any) => {
        setValue(e.target.value)
        onSearch(e)
    }

    return (
        <Input
            prefix={<SearchOutlined />}
            placeholder="Введите название"
            allowClear
            size="large"
            value={value}
            defaultValue={search}
            onChange={onSearchHandler}
        />
    )
}
export default React.memo<SearchProps>(Search)
