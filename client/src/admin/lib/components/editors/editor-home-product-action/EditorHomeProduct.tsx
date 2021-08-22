import {createHomeProduct, editHomeProduct} from "admin/pages/user/admin/pages/settings/home/homeProductApi"
import {HomeProduct} from "admin/pages/user/admin/pages/settings/home/homeProductSlice"
import {useAdminDispatch} from "admin/store"
import {Form, InputNumber} from "antd"
import React from "react"
import SelectProducts from "../../form/select-products/SelectProducts"

interface EditorHomeProductProps {
    close: () => void
    homeProduct?: HomeProduct
    changeLoading: (loading: boolean) => void
}

const EditorHomeProduct: React.FC<EditorHomeProductProps> = ({homeProduct, changeLoading, close}) => {
    const [form] = Form.useForm()
    const dispatch = useAdminDispatch()

    const onFinishHandler = async (values: any) => {
        changeLoading(true)
        if (homeProduct) await dispatch(editHomeProduct({id: homeProduct.id, data: values}))
        else await dispatch(createHomeProduct(values))
        changeLoading(false)
        close()
    }

    return (
        <Form
            initialValues={homeProduct}
            form={form}
            layout="vertical"
            id="editor-print-product"
            size="large"
            onFinish={onFinishHandler}
        >
            <SelectProducts name="product_color_id" defautlValue={homeProduct?.product_color_id} />
            <Form.Item
                name="position"
                label="Позиция"
                rules={[{required: true, message: "Введите позицию!"}]}
            >
                <InputNumber style={{width: "100%"}} />
            </Form.Item>
        </Form>
    )
}
export default EditorHomeProduct
