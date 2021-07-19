import React, {useState} from "react"
import EditorProductColorModal from "../../editor-product-color-modal/EditorProductColorModal"
import {EditOutlined} from "@ant-design/icons"

interface EditIconProps {
    colorValues: any
    setColorsValues: any
    index: number
}

const EditIcon: React.FC<EditIconProps> = ({colorValues, index, setColorsValues}) => {
    const [visible, setVisible] = useState(false)

  const openModal = () => setVisible(true)

  const closeColorModal = async () => {
        setVisible(false)
    }

    const onFinishHandler = (values: any) => {
        setColorsValues((prevState: any[]) => prevState.map((state, key) => (key === index ? values : state)))
        setVisible(false)
    }

    return (
        <>
            <EditOutlined onClick={openModal} />
            <EditorProductColorModal
                initialValues={colorValues}
                visible={visible}
                closeColorModal={closeColorModal}
                onFinishHandler={onFinishHandler}
            />
        </>
    )
}

export default EditIcon
