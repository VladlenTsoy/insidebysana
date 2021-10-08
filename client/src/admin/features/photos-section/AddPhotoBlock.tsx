import React from "react"
import {PlusOutlined} from "@ant-design/icons"
import "./AddPhotoBlock.less"

interface AddPhotoBlockProps {
    addPhoto: any
}

const AddPhotoBlock: React.FC<AddPhotoBlockProps> = ({addPhoto}) => {
    return (
        <label className="add-photo-block" htmlFor="add-photo">
            <div className="add-photo-content">
                <div className="add-icon">
                    <PlusOutlined />
                </div>
                <div className="add-photo-text">Добавить</div>
                <input
                    type="file"
                    onChange={addPhoto}
                    id="add-photo"
                    className="add-photo-input"
                    accept="image/x-png,image/gif,image/jpeg"
                />
            </div>
        </label>
    )
}
export default AddPhotoBlock
