import React from "react"
import "./Properties.less"
import {Button, Form, Input, Row, Col} from "antd"
import {PlusOutlined, MinusCircleOutlined} from "@ant-design/icons"

const Properties: React.FC = () => {
    return (
        <Form.List name="properties">
            {(fields, {add, remove}) => (
                <Row gutter={15}>
                    {fields.map(field => (
                        <Col xl={12} md={12} xs={24} key={`property-${field.key}`}>
                            <div className="property" key={`property-${field.key}`}>
                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                <Form.Item
                                    label="Название"
                                    name={[field.name, "title"]}
                                    fieldKey={[field.fieldKey, "title"]}
                                    rules={[{required: true, message: "Введите название!"}]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Описание"
                                    name={[field.name, "description"]}
                                    fieldKey={[field.fieldKey, "description"]}
                                    rules={[{required: true, message: "Введите описание!"}]}
                                >
                                    <Input.TextArea />
                                </Form.Item>
                            </div>
                        </Col>
                    ))}
                    <Button type="dashed" block icon={<PlusOutlined />} onClick={() => add()}>
                        Создать свойство
                    </Button>
                </Row>
            )}
        </Form.List>
    )
}

export default Properties
