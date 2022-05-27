import React from "react"
import {Input, Form} from "antd"
import {useAdminDispatch} from "../../../../../../../../store"
import {createSource} from "../../../../../../../../store/admin/source/createSource"
import {Source} from "../../../../../../../../lib/types/Source"
import {editSource} from "../../../../../../../../store/admin/source/editSource"

interface EditorSourceProps {
    source?: Source
    setLoading: any
    close: any
}

const EditorSource: React.FC<EditorSourceProps> = ({setLoading, close, source}) => {
    const dispatch = useAdminDispatch()

    const onFinish = async (values: any) => {
        setLoading(true)
        if (source)
            await dispatch(editSource({id: source.id, data: values}))
        else
            await dispatch(createSource(values))
        setLoading(false)
        close()
    }

    return (
        <Form id="editor-source" onFinish={onFinish} size="large" layout="vertical" initialValues={source}>
            <Form.Item name="title" label="Название" rules={[{required: true, message: "Введите название!"}]}>
                <Input />
            </Form.Item>
        </Form>
    )
}

export default EditorSource
