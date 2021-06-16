import React from "react";
import {useSelectSizeById} from "store/common/size/sizeSelectors";

interface TagSizeProps {
    sizeId: number
}

const TagSize: React.FC<TagSizeProps> = ({sizeId}) => {
    const size = useSelectSizeById(sizeId)

    return (
        <div>
            {size?.title}
        </div>
    );
};

export default TagSize;