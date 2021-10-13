import React from "react"
import {Button} from "antd"
import {SortAscendingOutlined} from "@ant-design/icons"

const Sorter: React.FC = () => {
    return (
        <>
            <Button type="text" size="large" icon={<SortAscendingOutlined />}>
                Дата создания
            </Button>
        </>
    )
}
export default Sorter
