import React from "react"
import {DraggableProvided} from "react-beautiful-dnd"
import "./PhotoBlock.less"
import {Button} from "antd"
import cn from "classnames"
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    DeleteOutlined,
    LoadingOutlined,
    StarFilled
} from "@ant-design/icons"

interface PhotoBlockProps {
    dragProvided: DraggableProvided
    index: number
    image: {imageUrl: string; id: number; loading: boolean; imagePath: string}
    nextHandler: (index: string) => void
    prevHandler: (index: string) => void
    deletePhoto: (index: number) => void
}

const PhotoBlock: React.FC<PhotoBlockProps> = ({
    dragProvided,
    index,
    nextHandler,
    prevHandler,
    image,
    deletePhoto
}) => {
    return (
        <div
            className="draggable-photo"
            ref={dragProvided.innerRef}
            {...dragProvided.draggableProps}
            {...dragProvided.dragHandleProps}
        >
            <div className={cn("photo-block", {loading: image.loading})}>
                {index === 0 && (
                    <div className="info">
                        <StarFilled />
                    </div>
                )}
                {image.loading && (
                    <div className="photo-loading">
                        <LoadingOutlined />
                    </div>
                )}
                <div className="close" onClick={() => deletePhoto(image.id)}>
                    <DeleteOutlined />
                </div>
                <img src={image.imageUrl} alt={`${image.id}`} className="photo-img" />
                <div className="wrapper-actions">
                    <div className="actions">
                        <Button onClick={() => prevHandler(`${image.id}`)} shape="circle">
                            <ArrowLeftOutlined />
                        </Button>
                        <Button onClick={() => nextHandler(`${image.id}`)} shape="circle">
                            <ArrowRightOutlined />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PhotoBlock
