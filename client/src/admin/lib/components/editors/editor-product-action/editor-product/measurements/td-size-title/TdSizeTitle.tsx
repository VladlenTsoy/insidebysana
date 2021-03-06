import React from "react"
import {Size} from "admin/lib/types/Size"
import { useSelectSizeById } from "admin/store/common/size/sizeSelectors";

interface TdSizeTitleProps {
    sizeId: Size["id"]
}

const TdSizeTitle: React.FC<TdSizeTitleProps> = ({sizeId}) => {
    const size = useSelectSizeById(sizeId)
    return <div>{size?.title}</div>
}

export default TdSizeTitle
