import React from "react"
import {Form, Input} from "antd"
import {PrintProduct} from "admin/store/admin/print-product/PrintProduct"
import {createPrintProduct} from "admin/store/admin/print-product/createPrintProduct"
import {useAdminDispatch} from "admin/store"
import InputImage from "../../form/input-image/InputImage"
import SelectProducts from "admin/lib/components/form/select-products/SelectProducts"
import {editPrintProduct} from "admin/store/admin/print-product/editPrintProduct"

interface EditorPrintProductProps {
    printImageId: number
    close: () => void
    printProduct?: PrintProduct
    changeLoading: (loading: boolean) => void
}

const EditorPrintProduct: React.FC<EditorPrintProductProps> = ({
    printProduct,
    close,
    changeLoading,
    printImageId
}) => {
    const [form] = Form.useForm()
    const dispatch = useAdminDispatch()

    const onFinishHandler = async (values: any) => {
        changeLoading(true)
        if (printProduct)
            await dispatch(
                editPrintProduct({id: printProduct.id, data: {...values, print_image_id: printImageId}})
            )
        else await dispatch(createPrintProduct({...values, print_image_id: printImageId}))
        changeLoading(false)
        close()
    }

    return (
        <Form
            initialValues={printProduct}
            form={form}
            layout="vertical"
            id="editor-print-product"
            size="large"
            onFinish={onFinishHandler}
        >
            <InputImage
                name="url_image"
                form={form}
                rules={[{required: true, message: "Выберите картинку!"}]}
            />
            <Form.Item name="title" label="Название" rules={[{required: true, message: "Введите название!"}]}>
                <Input />
            </Form.Item>
            <SelectProducts name="product_color_id" defautlValue={printProduct?.product_color_id} />
        </Form>
    )
}
export default EditorPrintProduct
