import React from "react"
import {Row, Col, Divider, Form, InputNumber} from "antd"

interface SelectedSizeProps {
    selectSize: {id: number, title: string};
}

const SelectedSize: React.FC<SelectedSizeProps> = ({selectSize}) => {
    const sizeIndex = String(selectSize.id)

    return (
        <Row gutter={28}>
            <Col span={24}>
                <Divider
                    style={{margin: 0, marginBottom: "0.5rem"}}
                    orientation="left"
                >
                    {selectSize.title}
                </Divider>
            </Col>
            <Col xl={8}>
                <Form.Item name={["size_props", sizeIndex, "id"]} hidden>
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="Количество"
                    name={["size_props", sizeIndex, "qty"]}
                    rules={[
                        {
                            required: true,
                            message: "Введите количество"
                        }
                    ]}
                >
                    <InputNumber
                        min={0}
                        keyboard={false}
                        placeholder={`Количество ${selectSize.title}`}
                        style={{width: "100%"}}
                    />
                </Form.Item>
            </Col>
            <Col xl={8}>
                <Form.Item
                    label="Себестоимость"
                    name={["size_props", sizeIndex, "cost_price"]}
                    rules={[
                        {
                            required: true,
                            message: "Введите себестоимость!"
                        }
                    ]}
                >
                    <InputNumber
                        min={0}
                        keyboard={false}
                        placeholder={`Себестоимость ${selectSize.title}`}
                        style={{width: "100%"}}
                    />
                </Form.Item>
            </Col>
            <Col xl={8}>
                <Form.Item
                    label="Мин. остаток"
                    name={["size_props", sizeIndex, "min_qty"]}
                    rules={[
                        {
                            required: true,
                            message: "Введите мин. остаток!"
                        }
                    ]}
                >
                    <InputNumber
                        min={0}
                        keyboard={false}
                        placeholder={`Мин. остаток ${selectSize.title}`}
                        style={{width: "100%"}}
                    />
                </Form.Item>
            </Col>
        </Row>
    )
}
export default SelectedSize
