import React, {Dispatch, SetStateAction} from "react"
import "./EditorStatus.less"
import {Form, Input, Button, Divider, Row, Col, Select, InputNumber, Mentions} from "antd"
import {PlusOutlined, MinusCircleOutlined} from "@ant-design/icons"
import {useAdminDispatch} from "../../../../../store"
import {createStatus} from "../../../../../store/admin/status/createStatus"
import {Status} from "../../../../types/Status"
import {updateStatus} from "../../../../../store/admin/status/updateStatus"
import PaymentConditions from "./payment-conditions/PaymentConditions"

interface EditorStatusProps {
    setLoading: Dispatch<SetStateAction<boolean>>
    close: any
    status?: Status
}

const EditorStatus: React.FC<EditorStatusProps> = ({setLoading, close, status}) => {
    const dispatch = useAdminDispatch()

    const onFinishHandler = async (values: any) => {
        setLoading(true)
        if (status) await dispatch(updateStatus({id: status.id, data: values}))
        else await dispatch(createStatus(values))
        setLoading(false)
        close()
    }

    return (
        <Form layout="vertical" id="editor-status" onFinish={onFinishHandler} initialValues={status || {}}>
            <Row gutter={15}>
                <Col span={12}>
                    <Form.Item
                        label="Название"
                        name="title"
                        rules={[{required: true, message: "Введите название!"}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Доступ"
                        name="access"
                        rules={[{required: true, message: "Выберите доступ!"}]}
                    >
                        <Select>
                            <Select.Option value="admin">только Администратор</Select.Option>
                            <Select.Option value="manager">Менеджер и Администратор</Select.Option>
                        </Select>
                    </Form.Item>
                    <PaymentConditions conditions={status?.conditions} />
                </Col>
                <Col span={12}>
                    <Form.List name="sms">
                        {(fields, {add, remove}) => (
                            <>
                                {fields.map(field => (
                                    <div key={field.key}>
                                        <div className="title-action">
                                            <div className="divider-block">
                                                <Divider orientation="left">SMS</Divider>
                                            </div>
                                            <div className="delete-block">
                                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                            </div>
                                        </div>
                                        <Row gutter={15}>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Статус оптаты"
                                                    name={[field.name, "payment_state"]}
                                                    fieldKey={[field.fieldKey, "payment_state"]}
                                                    rules={[
                                                        {required: true, message: "Введите статус оплаты"}
                                                    ]}
                                                >
                                                    <Select mode="multiple">
                                                        <Select.Option value="1">Оплачен</Select.Option>
                                                        <Select.Option value="0">В ожидании</Select.Option>
                                                        <Select.Option value="-1">Отменен</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Через (мин)"
                                                    name={[field.name, "timeout"]}
                                                    fieldKey={[field.fieldKey, "timeout"]}
                                                    rules={[{required: true, message: "Введите через"}]}
                                                >
                                                    <InputNumber
                                                        style={{width: "100%"}}
                                                        placeholder="Введите время в минутах"
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Form.Item
                                            label="Сообщение"
                                            name={[field.name, "message"]}
                                            fieldKey={[field.fieldKey, "message"]}
                                            rules={[{required: true, message: "Введите сообщение"}]}
                                        >
                                            <Mentions autoSize={{minRows: 2, maxRows: 6}} split="" prefix="{">
                                                <Mentions.Option value="orderId}">Id Заказы</Mentions.Option>
                                                <Mentions.Option value="amount}">Сумма</Mentions.Option>
                                            </Mentions>
                                        </Form.Item>
                                    </div>
                                ))}
                                <Button
                                    type="dashed"
                                    block
                                    size="large"
                                    icon={<PlusOutlined />}
                                    onClick={() => add()}
                                >
                                    Добавить действие
                                </Button>
                            </>
                        )}
                    </Form.List>
                </Col>
            </Row>
        </Form>
    )
}

export default EditorStatus
