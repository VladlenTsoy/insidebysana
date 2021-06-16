import {Form, Input} from "antd"
import {Size} from "lib/types/Size"
import React from "react"
import {useDispatch} from "react-redux"
import {createSize} from "store/admin/size/createSize"

interface EditorSizeProps {
    size?: Size
    close: any
    setLoading: any
}

const EditorSize: React.FC<EditorSizeProps> = ({size, close, setLoading}) => {
    const dispatch = useDispatch()

    const onFinishHandler = async (values: any) => {
        setLoading(true)
        await dispatch(createSize(values))
        setLoading(false)
        close()
    }

    return (
        <Form
            onFinish={onFinishHandler}
            id="editor-size-modal"
            layout="vertical"
            size="large"
            initialValues={size}
        >
            <Form.Item label="Название" required name="title">
                <Input placeholder="Введите название" />
            </Form.Item>
        </Form>
    )
}
export default EditorSize
