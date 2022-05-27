import React from "react"
import {Form, Input} from "antd"
import {useAdminDispatch} from "../../../../../../../../store"
import {createProductStorage} from "../../../../../../../../store/admin/product-storage/createProductStorage"
import {ProductStorage} from "../../../../../../../../../types/product/ProductStorage"
import {editProductStorage} from "../../../../../../../../store/admin/product-storage/editProductStorage"

interface EditorSourceProps {
    productStorage?: ProductStorage
    setLoading: any
    close: any
}

const EditorProductStorage: React.FC<EditorSourceProps> = ({setLoading, close, productStorage}) => {
    const dispatch = useAdminDispatch()

    const onFinish = async (values: any) => {
        setLoading(true)
        if (productStorage)
            await dispatch(editProductStorage({id: productStorage.id, data: values}))
        else
            await dispatch(createProductStorage(values))
        setLoading(false)
        close()
    }

    return (
        <Form id="editor-product-storage" onFinish={onFinish} size="large" layout="vertical"
              initialValues={productStorage}>
            <Form.Item name="title" label="Название" rules={[{required: true, message: "Введите название!"}]}>
                <Input />
            </Form.Item>
        </Form>
    )
}

export default EditorProductStorage
