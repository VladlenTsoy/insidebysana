import {
    Col,
    Row,
    Typography,
    Form,
    Input,
    InputNumber,
    Button,
    Upload,
    Divider,
    DatePicker,
    Checkbox,
    Select
} from "antd"
import React, {useCallback, useState} from "react"
import Header from "./Header"
import LeftSidebar from "./LeftSidebar"
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons"
import CategorySelect from "admin/features/category/CategorySelect"
import "./ProductEditor.less"
import SelectColor from "admin/features/color/SelectColor"

const {Title} = Typography

const CreateProduct: React.FC = () => {
    const [selectedSizeIds, setSelectedSizeIds] = useState<string[]>([])
    // const [selectedSizes, setSelectedSizes] = useState<string[]>(form.getFieldValue('sizes') || [])
    const onSelectColorHandler = () => null

    const onSelectSizesHandler = useCallback((sizesIds: any[]) => {
        setSelectedSizeIds(sizesIds)
    }, [])

    const propertieOptions: any = [
        {label: "Доставка", value: "Apple"},
        {label: "Возврат товара", value: "Pear"}
    ]

    return (
        <>
            <div className="create-product-page">
                <Header />
                <div className="container">
                    <div className="content">
                        <Row gutter={28}>
                            <Col span={5}>
                                <LeftSidebar />
                            </Col>
                            <Col span={14}>
                                <Form
                                    layout="vertical"
                                    size="large"
                                    // form={form}
                                    // onFinish={onFinishHandler}
                                    // initialValues={basicValues}
                                    id="editor-product-basic"
                                >
                                    <section id="basic">
                                        <Title level={3}>Основная информация</Title>
                                        <Row gutter={28}>
                                            <Col xl={12} md={12} xs={24}>
                                                <CategorySelect />
                                            </Col>
                                            <Col xl={12} md={12} xs={24}>
                                                <SelectColor onSelectColorHandler={onSelectColorHandler} />
                                            </Col>
                                        </Row>
                                        <Form.Item
                                            label="Название"
                                            name="title"
                                            rules={[{required: true, message: "Введите название!"}]}
                                        >
                                            <Input placeholder="Введите название" />
                                        </Form.Item>
                                        {/* <SizesSelect onSelectSizesHandler={onSelectSizesHandler} /> */}
                                        {/* <TagsSelect /> */}
                                    </section>
                                    <Divider />
                                    <section id="properties">
                                        <Title level={3}>Свойства</Title>
                                        <Form.Item name="save-properties">
                                            <Checkbox.Group options={propertieOptions} />
                                        </Form.Item>
                                        <Form.List name="properties">
                                            {(fields, {add, remove}) => (
                                                <div>
                                                    {fields.map(field => (
                                                        <div
                                                            className="properties"
                                                            key={`property-${field.key}`}
                                                        >
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
                                    </section>
                                    <Divider />
                                    <section id="price-qty">
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
                                                <Form.Item
                                                    name="discount"
                                                    label="Скидка (%)"
                                                    rules={[
                                                        {required: true, message: "Введите процент скидки!"}
                                                    ]}
                                                >
                                                    <InputNumber min={0} max={100} style={{width: "100%"}} />
                                                </Form.Item>
                                            </Col>

                                            <Col xl={12} md={12} xs={24}>
                                                <Form.Item name="end_at" label="До какого">
                                                    <DatePicker
                                                        format="DD-MM-YYYY"
                                                        style={{width: "100%"}}
                                                        showToday={false}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        {/* {selectedSizeIds.map(selectSizeId => (
                                            <SelectedSize selectSizeId={selectSizeId} key={selectSizeId} />
                                        ))} */}
                                    </section>
                                    <Divider />
                                    <section id="photos" className="photos">
                                        <Title level={3}>Фотографии</Title>
                                        <Upload
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            listType="picture-card"
                                            // fileList={fileList}
                                            // onPreview={this.handlePreview}
                                            // onChange={this.handleChange}
                                        >
                                            <div>
                                                <PlusOutlined />
                                                <div style={{marginTop: 8}}>Upload</div>
                                            </div>
                                        </Upload>
                                    </section>
                                    <Divider />
                                    <section id="measurements">
                                        <Title level={3}>Обмеры</Title>
                                        {/* <Measurements selectedSizeIds={selectedSizeIds} /> */}
                                    </section>
                                    <Divider />
                                    <section id="status-publishing">
                                        <Title level={3}>Статус & Публикация</Title>
                                        <Form.Item name="status" label="Статус">
                                            <Select style={{width: "250px", marginBottom: "1rem"}}>
                                                <Select.Option value="draft">В проекте</Select.Option>
                                                <Select.Option value="published">Опубликовать</Select.Option>
                                                <Select.Option value="archive">В архив</Select.Option>
                                                <Select.Option value="ending">Закончился</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        <Title level={5} style={{marginBottom: "1.5rem"}}>
                                            Дополнительно
                                        </Title>
                                        <Form.Item name="sub">
                                            <Checkbox value={1}>
                                                Новинка
                                                <br />
                                                <Typography.Text type="secondary">
                                                    Отобразить тег <b>new</b> на карточке одежды
                                                </Typography.Text>
                                            </Checkbox>
                                        </Form.Item>
                                        <Form.Item style={{marginBottom: ".5rem"}}>
                                            <Checkbox value={2}>
                                                На главной
                                                <br />
                                                <Typography.Text type="secondary">
                                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                                    Saepe animi facere minus maxime.
                                                </Typography.Text>
                                            </Checkbox>
                                        </Form.Item>
                                        <div style={{marginLeft: "1.5rem"}}>
                                            <Form.Item name="status_1">
                                                <Select
                                                    size="middle"
                                                    style={{width: "200px"}}
                                                    disabled
                                                    placeholder="Выберите позицию"
                                                >
                                                    <Select.Option value="draft">В проекте</Select.Option>
                                                    <Select.Option value="published">
                                                        Опубликовать
                                                    </Select.Option>
                                                    <Select.Option value="archive">В архив</Select.Option>
                                                    <Select.Option value="ending">Закончился</Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                    </section>
                                </Form>
                            </Col>
                            <Col span={5}></Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CreateProduct
