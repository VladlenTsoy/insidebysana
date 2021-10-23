import React from "react"
import {PlusOutlined} from "@ant-design/icons"
import styles from "./AddPhotoBlock.module.less"

interface AddPhotoBlockProps {
    addPhoto: any;
}

const AddPhotoBlock: React.FC<AddPhotoBlockProps> = ({addPhoto}) => {
    return (
        <label className={styles.addPhoto} htmlFor="add-photo">
            <div className={styles.content}>
                <div className={styles.addPhotoIcon}>
                    <PlusOutlined />
                </div>
                <div className={styles.addPhotoText}>Добавить</div>
                <input
                    type="file"
                    onChange={addPhoto}
                    id="add-photo"
                    className={styles.addPhotoInput}
                    accept="image/x-png,image/gif,image/jpeg"
                />
            </div>
        </label>
    )
}
export default AddPhotoBlock
