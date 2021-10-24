import React from "react"
import {Row, Col, Divider, Form, InputNumber} from "antd"
import {useGetAllSizesQuery} from "../../../../../features/size/sizeApi"

interface SelectedSizeProps {
    selectSizeId: string;
}

const SelectedSize: React.FC<SelectedSizeProps> = ({selectSizeId}) => {
    const {data} = useGetAllSizesQuery()
    const sizeIndex = String(selectSizeId)
    const size = data && data.find(val => val.id === Number(selectSizeId))

    return (
        <Row gutter={28}>
            <Col span={24}>
                <Divider
                    style={{margin: 0, marginBottom: "0.5rem"}}
                    orientation="left"
                >
                    {size?.title}
                </Divider>
            </Col>
            <Col xl={8}>
                <Form.Item
                    label="Количество"
                    name={["props", sizeIndex, "qty"]}
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
                        placeholder={`Количество ${size?.title}`}
                        style={{width: "100%"}}
                    />
                </Form.Item>
            </Col>
            <Col xl={8}>
                <Form.Item
                    label="Себестоимость"
                    name={["props", sizeIndex, "cost_price"]}
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
                        placeholder={`Себестоимость ${size?.title}`}
                        style={{width: "100%"}}
                    />
                </Form.Item>
            </Col>
            <Col xl={8}>
                <Form.Item
                    label="Мин. остаток"
                    name={["props", sizeIndex, "min_qty"]}
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
                        placeholder={`Мин. остаток ${size?.title}`}
                        style={{width: "100%"}}
                    />
                </Form.Item>
            </Col>
        </Row>
    )
}
export default SelectedSize
