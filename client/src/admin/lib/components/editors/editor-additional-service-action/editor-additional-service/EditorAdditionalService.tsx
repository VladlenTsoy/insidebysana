import {Form, Input, InputNumber, Select} from "antd"
import {useForm} from "antd/lib/form/Form"
import InputImage from "admin/lib/components/form/input-image/InputImage"
import {AdditionalService} from "admin/lib/types/AdditionalService"
import React from "react"
import {useDispatch} from "react-redux"
import {createAdditionalService} from "admin/store/admin/additional-service/createAdditionalService"
import {editAdditionalService} from "admin/store/admin/additional-service/editAdditionalService"

interface EditorAdditionalServiceProps {
    additionalService?: AdditionalService
    setLoading: any
    close: any
}

const EditorAdditionalService: React.FC<EditorAdditionalServiceProps> = ({
    additionalService,
    setLoading,
    close
}) => {
    const [form] = useForm()
    const dispatch = useDispatch()

    const onFinishHandler = async (values: any) => {
        setLoading(true)
        if (additionalService) await dispatch(editAdditionalService({id: additionalService.id, data: values}))
        else await dispatch(createAdditionalService(values))
        setLoading(false)
        close()
    }

    return (
        <Form
            initialValues={additionalService}
            id="editor-additional-service"
            onFinish={onFinishHandler}
            layout="vertical"
            size="large"
            form={form}
        >
            <Form.Item name="title" label="Название" rules={[{required: true, message: "Введите название!"}]}>
                <Input />
            </Form.Item>
            <InputImage name="url_image" form={form} />
            <Form.Item
                name="price"
                label="Стоимость"
                rules={[{required: true, message: "Введите название!"}]}
            >
                <InputNumber style={{width: "100%"}} />
            </Form.Item>
            <Form.Item name="display" label="Используется">
                <Select mode="multiple">
                    <Select.Option value="site">Сайт</Select.Option>
                    <Select.Option value="pos">POS-система</Select.Option>
                </Select>
            </Form.Item>
        </Form>
    )
}
export default EditorAdditionalService
