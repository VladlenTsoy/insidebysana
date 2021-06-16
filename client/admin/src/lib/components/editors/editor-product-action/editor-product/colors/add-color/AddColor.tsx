import React, {useState} from "react"
import {PlusOutlined} from "@ant-design/icons"
import "./AddColor.less"
import EditorProductColorModal from "../editor-product-color-modal/EditorProductColorModal"

interface AddColorProps {
    setColorsValues: any
}

const AddColor: React.FC<AddColorProps> = ({setColorsValues}) => {
    const [visible, setVisible] = useState(false)

    const closeColorModal = async () => {
        setVisible(false)
    }

    const colorModalHandler = () => setVisible(true)

    const onFinishHandler = (values: any) => {
        setColorsValues((prevState: any) => [...prevState, values])
        setVisible(false)
    }

    return (
        <>
            <div className="color-create" onClick={colorModalHandler}>
                <PlusOutlined />
            </div>
            <EditorProductColorModal
                visible={visible}
                closeColorModal={closeColorModal}
                onFinishHandler={onFinishHandler}
            />
        </>
    )
}

export default React.memo(AddColor)
