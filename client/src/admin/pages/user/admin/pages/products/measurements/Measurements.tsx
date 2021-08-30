import React, {useEffect, useState} from "react"
import "./Measurements.less"
import {Form, Input, Button} from "antd"
import {PlusOutlined, MinusCircleOutlined} from "@ant-design/icons"
import TdSizeTitle from "./td-size-title/TdSizeTitle"
import {size} from "lodash"

interface MeasurementsProps {
    selectedSizeIds: any[]
}

const Measurements: React.FC<MeasurementsProps> = ({selectedSizeIds}) => {
    return (
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
                                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                                </div>
                                            </td>
                                            {selectedSizeIds.map(sizeId => (
                                                <td key={`td-desc-${field.key}-${sizeId}`}>
                                                    <Form.Item
                                                        {...field}
                                                        name={[field.name, "descriptions", String(sizeId)]}
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
    )
}

export default Measurements
