import {Form, Input} from "antd"
import {Client} from "lib/types/Client"
import React, {useEffect} from "react"
import SearchClientInput from "./search-client-input/SearchClientInput"

interface FormClientProps {
    selectClient: Client | null
    updateSelectClient: (client: Client | null) => void
    onFinishHandler: (values: {full_name: Client["full_name"]; phone: Client["phone"]}) => void
}

const FormClient: React.FC<FormClientProps> = ({selectClient, onFinishHandler, updateSelectClient}) => {
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue(
            selectClient ? {full_name: selectClient.full_name, phone: selectClient.phone} : {}
        )
    }, [form, selectClient])

    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            id="from-add-client-block"
            onFinish={onFinishHandler}
            initialValues={selectClient ? {full_name: selectClient.full_name, phone: selectClient.phone} : {}}
        >
            <SearchClientInput selectClient={selectClient} updateSelectClient={updateSelectClient} />
            <Form.Item label="Имя" name="full_name">
                <Input placeholder="Введите имя" />
            </Form.Item>
        </Form>
    )
}
export default FormClient
