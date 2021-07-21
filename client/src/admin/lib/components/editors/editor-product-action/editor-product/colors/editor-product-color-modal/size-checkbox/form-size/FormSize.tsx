import React from "react"
import {Col, Divider, Form, InputNumber, Row} from "antd"
import {useSelectSizeById} from "admin/store/common/size/sizeSelectors"

interface FormSizeProps {
    sizeId: any
}

const FormSize: React.FC<FormSizeProps> = ({sizeId}) => {
    const sizeIndex = String(sizeId)
    const size = useSelectSizeById(Number(sizeId))

    return (
        <>
            <div>
                <Divider style={{margin: 0, marginBottom: "0.5rem"}}>{size?.title}</Divider>
                <Row gutter={15}>
                    <Col xl={8}>
                        <Form.Item
                            label="Количество"
                            name={['props', sizeIndex, "qty"]}
                            rules={[{required: true, message: "Введите количество"}]}
                        >
                            <InputNumber type="number" style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                    <Col xl={8}>
                        <Form.Item
                            label="Себестоимость"
                            name={['props', sizeIndex, "cost_price"]}
                            rules={[{required: true, message: "Введите себестоимость!"}]}
                        >
                            <InputNumber type="number" style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                    <Col xl={8}>
                        <Form.Item
                            label="Мин. остаток"
                            name={['props', sizeIndex, "min_qty"]}
                            rules={[{required: true, message: "Введите мин. остаток!"}]}
                        >
                            <InputNumber type="number" style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default FormSize
