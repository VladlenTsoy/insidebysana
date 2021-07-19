import React from "react"
import {Tag} from "antd"
import {useSelectSizeById} from "admin/store/common/size/sizeSelectors"

interface TagSizeProps {
    sizeId: number
}

const TagSize: React.FC<TagSizeProps> = ({sizeId}) => {
    const size = useSelectSizeById(Number(sizeId))
    return <Tag color="#1890ff">{size?.title}</Tag>
}

export default TagSize
