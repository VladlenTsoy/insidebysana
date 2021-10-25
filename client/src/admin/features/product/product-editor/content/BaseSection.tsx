import React from "react"
import {Col, Row, Typography, Form, Input} from "antd"
import CategoryFormSelect from "admin/features/category/CategoryFormSelect"
import SizesFormSelect from "admin/features/size/SizesFormSelect"
import SelectColor from "admin/features/color/SelectColor"
import TagsFormSelect from "admin/features/tag/TagsFormSelect"
import {Element} from "react-scroll"

const {Title} = Typography

interface BaseSectionProps {
    onSelectSizesHandler: any;
}

const BaseSection: React.FC<BaseSectionProps> = ({onSelectSizesHandler}) => {
    return (
        <Element name="basic">
            <Title level={3}>Основная информация</Title>
            <Row gutter={28}>
                <Col xl={12} md={12} xs={24}>
                    <CategoryFormSelect />
                </Col>
                <Col xl={12} md={12} xs={24}>
                    <SelectColor />
                </Col>
            </Row>
            <Form.Item
                label="Название"
                name="title"
                rules={[{required: true, message: "Введите название!"}]}
            >
                <Input placeholder="Введите название" />
            </Form.Item>
            <SizesFormSelect onChange={onSelectSizesHandler} />
            <TagsFormSelect />
        </Element>
    )
}
export default BaseSection
