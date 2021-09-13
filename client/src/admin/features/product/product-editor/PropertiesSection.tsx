import React from "react"
import {Typography, Form, Input, Button, Checkbox, Divider} from "antd"
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons"
import {Element} from "react-scroll"

const {Title} = Typography

const PropertiesSection: React.FC = () => {
    const propertieOptions: any = [
        {label: "Доставка", value: "Apple"},
        {label: "Возврат товара", value: "Pear"}
    ]

    return (
        <Element name="properties">
            <Divider />
            <Title level={3}>Свойства</Title>
            <Form.Item name="save-properties">
                <Checkbox.Group options={propertieOptions} />
            </Form.Item>
            <Form.List name="properties">
                {(fields, {add, remove}) => (
                    <div>
                        {fields.map(field => (
                            <div className="properties" key={`property-${field.key}`}>
                                <div className="title-action-block">
                                    <Form.Item
                                        label="Название"
                                        name={[field.name, "title"]}
                                        fieldKey={[field.fieldKey, "title"]}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Введите название!"
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Button
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => remove(field.name)}
                                    />
                                </div>
                                <Form.Item
                                    label="Описание"
                                    name={[field.name, "description"]}
                                    fieldKey={[field.fieldKey, "description"]}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Введите описание!"
                                        }
                                    ]}
                                >
                                    <Input.TextArea />
                                </Form.Item>
                            </div>
                        ))}
                        <Form.Item>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => add()}
                                className="blue"
                            >
                                Создать свойство
                            </Button>
                        </Form.Item>
                    </div>
                )}
            </Form.List>
        </Element>
    )
}
export default PropertiesSection
