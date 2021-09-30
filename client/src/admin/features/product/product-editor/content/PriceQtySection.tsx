import React from "react"
import {Col, Row, Typography, Form, InputNumber, DatePicker, Divider} from "antd"
import {Element} from "react-scroll"

const {Title} = Typography

const PriceQtySection: React.FC = () => {
    return (
        <Element name="price-qty">
            <Divider />
            <Title level={3}>Стоимость & Количество</Title>
            <Form.Item
                label="Отображаемая стоимость"
                name="price"
                rules={[
                    {
                        required: true,
                        message: "Введите отображаемую стоимость!"
                    }
                ]}
            >
                <InputNumber
                    style={{width: "100%"}}
                    type="number"
                    min={0}
                    keyboard={false}
                    placeholder="Введите отображаемую стоимость"
                />
            </Form.Item>
            <Row gutter={28}>
                <Col xl={12} md={12} xs={24}>
                    <Form.Item name="discount" label="Скидка (%)">
                        <InputNumber min={0} max={100} style={{width: "100%"}} />
                    </Form.Item>
                </Col>

                <Col xl={12} md={12} xs={24}>
                    <Form.Item name="end_at" label="До какого">
                        <DatePicker format="DD-MM-YYYY" style={{width: "100%"}} showToday={false} />
                    </Form.Item>
                </Col>
            </Row>
        </Element>
    )
}
export default PriceQtySection
