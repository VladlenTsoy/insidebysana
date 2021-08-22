import React from "react"
import {Form, Input, DatePicker, Row, Col} from "antd"
import {useAdminDispatch} from "../../../../../store"
import SelectClientSources from "../../../form/select-client-source/SelectClientSources"
import {createClient} from "../../../../../store/admin/client/createClient"
import {Client} from "../../../../types/Client"
import {editClient} from "../../../../../store/admin/client/editClient"
import moment from "moment"
import {emailRules, passwordRules} from "../../../../../utils/formRules";

interface EditorClientProps {
    setLoading: any
    close: any
    client?: Client
}

const EditorClient: React.FC<EditorClientProps> = ({setLoading, close, client}) => {
    const dispatch = useAdminDispatch()

    const onFinish = async (values: any) => {
        setLoading(true)
        if (client?.id) await dispatch(editClient({id: client.id, data: values}))
        else await dispatch(createClient(values))
        setLoading(false)
        close()
    }

    const initValues = client
        ? {
              ...client,
              date_of_birth: client?.date_of_birth ? moment(client.date_of_birth) : null,
              source_id: Number(client.source_id)
          }
        : {}

    return (
        <>
            <Form id="editor-client" layout="vertical" onFinish={onFinish} initialValues={initValues} size="middle">
                <Row gutter={15}>
                    <Col span={24}>
                        <SelectClientSources
                            label="Откуда"
                            name="source_id"
                            rules={[{required: true, message: "Выберите откуда!"}]}
                        />
                    </Col>
                    <Col xl={12} md={12} xs={24}>
                        <Form.Item
                            label="Имя"
                            name="full_name"
                            rules={[{required: true, message: "Введите имя!"}]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Почта"
                            name="email"
                            rules={emailRules({required: false})}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Пароль"
                            name="password"
                            rules={passwordRules({required: false})}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item label="Telegram" name="telegram">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xl={12} md={12} xs={24}>
                        <Form.Item label="Дата рождения" name="date_of_birth">
                            <DatePicker showToday={false} format="DD/MM/YYYY" style={{width: "100%"}} />
                        </Form.Item>
                        <Form.Item label="Телефон" name="phone">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Instagram" name="instagram">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Facebook" name="facebook">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default EditorClient
