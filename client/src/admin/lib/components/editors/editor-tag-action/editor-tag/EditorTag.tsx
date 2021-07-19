import React from "react"
import {Tag} from "../../../../types/Tag"
import {Form, Input} from "antd"
import {useDispatch} from "react-redux"
import {editTag} from "../../../../../store/admin/tag/editTag"

interface EditorTagProps {
    setLoading: any
    close: any
    tag?: Tag
}

const EditorTag: React.FC<EditorTagProps> = ({setLoading, tag, close}) => {
    const dispatch = useDispatch()

    const onFinishHandler = async (values: any) => {
        setLoading(true)
        if (tag)
            await dispatch(editTag({id: tag.id, data: values}))
        setLoading(false)
        close()
    }

    return (
        <Form onFinish={onFinishHandler} id="editor-tag-modal" layout="vertical" size="large" initialValues={tag}>
            <Form.Item label="Название" required name="title">
                <Input required placeholder="Наззвание цвета" />
            </Form.Item>
        </Form>
    )
}

export default EditorTag