import React from "react"
import "./Details.less"
import {Col, Form, Input, InputNumber, Row} from "antd"
import TagsSelect from "./tags-select/TagsSelect"
import CategorySelect from "./category-select/CategorySelect"

const Details = () => {
    return (
        <>
            <Row gutter={15}>
                <Col xl={6} md={12} xs={24}>
                    <CategorySelect />
                </Col>
                <Col xl={6} md={12} xs={24}>
                    <Form.Item
                        label="Название"
                        name="title"
                        rules={[{required: true, message: "Введите название!"}]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xl={6} md={12} xs={24}>
                    <TagsSelect />
                </Col>
                <Col xl={6} md={12} xs={24}>
                    <Form.Item
                        label="Стоимость"
                        name="price"
                        rules={[{required: true, message: "Введите стоимость!"}]}
                    >
                        <InputNumber style={{width: "100%"}} type="number" min={0} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}

export default Details
