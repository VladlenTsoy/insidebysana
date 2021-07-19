import React from "react"
import {Table} from "antd"
import {useLoadingSizes, useSelectAllSizes} from "../../../../../../../store/common/size/sizeSelectors"

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id"
    },
    {
        title: "Название",
        dataIndex: "title"
    }
]

const Container = () => {
    const loading = useLoadingSizes()
    const sizes = useSelectAllSizes()

    return <Table columns={columns} rowKey="id" loading={loading} dataSource={sizes} />
}

export default Container