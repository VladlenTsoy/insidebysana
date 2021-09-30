import React from "react"
import {Typography, Form, Input, Button, Divider} from "antd"
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons"
import {useSelectSizeById} from "admin/store/common/size/sizeSelectors"
import "./MeasurementsSection.less"
import {Element} from "react-scroll"

const {Title} = Typography

interface TdSizeTitleProps {
    sizeId: string
}

const TdSizeTitle: React.FC<TdSizeTitleProps> = ({sizeId}) => {
    const size = useSelectSizeById(Number(sizeId))
    return <div>{size?.title}</div>
}

interface MeasurementsSectionProps {
    selectedSizeIds: string[]
}

const MeasurementsSection: React.FC<MeasurementsSectionProps> = ({selectedSizeIds}) => {
    return (
        <Element name="measurements">
            <Divider />
            <Title level={3}>Обмеры</Title>
            <div className="measurements">
                <Form.List name="measurements">
                    {(fields, {add, remove}) => (
                        <>
                            <div className="measurements-container">
                                <table className="table-measurements">
                                    <thead>
                                        <tr>
                                            <th className="left">Размеры</th>
                                            {selectedSizeIds.map(sizeId => (
                                                <th key={`tr-size-${sizeId}`}>
                                                    <TdSizeTitle sizeId={sizeId} />
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fields.map(field => (
                                            <tr key={`tr-size-${field.key}`}>
                                                <td key={`td-title-${field.key}`}>
                                                    <div className="title">
                                                        <Form.Item
                                                            hidden
                                                            {...field}
                                                            name={[field.name, "id"]}
                                                            fieldKey={[field.fieldKey, "id"]}
                                                            key={`id-${field.key}`}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...field}
                                                            name={[field.name, "title"]}
                                                            fieldKey={[field.fieldKey, "title"]}
                                                            rules={[
                                                                {required: true, message: "Введите название!"}
                                                            ]}
                                                        >
                                                            <Input
                                                                placeholder="Название"
                                                                style={{minWidth: "150px"}}
                                                            />
                                                        </Form.Item>
                                                        <MinusCircleOutlined
                                                            onClick={() => remove(field.name)}
                                                        />
                                                    </div>
                                                </td>
                                                {selectedSizeIds.map(sizeId => (
                                                    <td key={`td-desc-${field.key}-${sizeId}`}>
                                                        <Form.Item
                                                            {...field}
                                                            name={[
                                                                field.name,
                                                                "descriptions",
                                                                String(sizeId)
                                                            ]}
                                                            fieldKey={[
                                                                field.fieldKey,
                                                                "descriptions",
                                                                String(sizeId)
                                                            ]}
                                                            rules={[
                                                                {required: true, message: "Введите описание!"}
                                                            ]}
                                                        >
                                                            <Input.TextArea
                                                                placeholder="Описание"
                                                                rows={1}
                                                                style={{minWidth: "150px"}}
                                                            />
                                                        </Form.Item>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="action">
                                <Button
                                    type="dashed"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    block
                                    onClick={() => add()}
                                >
                                    Добавить
                                </Button>
                            </div>
                        </>
                    )}
                </Form.List>
            </div>
        </Element>
    )
}
export default MeasurementsSection
