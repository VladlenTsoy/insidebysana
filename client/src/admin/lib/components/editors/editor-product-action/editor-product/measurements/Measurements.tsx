import React, {useEffect, useState} from "react"
import "./Measurements.less"
import {Form, Input, Button} from "antd"
import {PlusOutlined, MinusCircleOutlined} from "@ant-design/icons"
import TdSizeTitle from "./td-size-title/TdSizeTitle";

interface MeasurementsProps {
    prev: () => void
    onFinishHandler: (values: any) => void
    colorsValues: any[]
    measurementsValues: any
}

const Measurements: React.FC<MeasurementsProps> = ({onFinishHandler, colorsValues, measurementsValues}) => {
    const [sizes, setSizes] = useState<number[]>([])

    useEffect(() => {
        const _sizes: number[] = colorsValues.reduce((prev, curr) => [...prev, ...curr.sizes], [])
        const uniqueSizes = _sizes.filter((value, index, self) => self.indexOf(value) === index)
        setSizes(uniqueSizes.sort())
    }, [colorsValues])

    return (
        <div className="measurements">
            <Form layout="vertical" initialValues={measurementsValues} onFinish={onFinishHandler} id="editor-product-measurements">
                <Form.List name="measurements">
                    {(fields, {add, remove}) => (
                        <table className="table-measurements">
                            <tbody>
                                <tr>
                                    <td>Размеры</td>
                                    {fields.map(field => (
                                        <td key={`td-title-${field.key}`}>
                                            <div className="title">
                                                <Form.Item
                                                  hidden
                                                  {...field}
                                                  name={[field.name, "id"]}
                                                  fieldKey={[field.fieldKey, "id"]}
                                                  key={`id-${field.key}`}
                                                >
                                                    <Input/>
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "title"]}
                                                    fieldKey={[field.fieldKey, "title"]}
                                                    rules={[{required: true, message: "Введите название!"}]}
                                                >
                                                    <Input placeholder="Название"/>
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                            </div>
                                        </td>
                                    ))}
                                    <td rowSpan={sizes.length + 1}>
                                        <Button
                                            icon={<PlusOutlined />}
                                            shape="circle"
                                            size="large"
                                            onClick={() => add()}
                                        />
                                    </td>
                                </tr>
                                {sizes.map(sizeId => (
                                    <tr key={`tr-size-${sizeId}`}>
                                        <td>
                                            <TdSizeTitle sizeId={sizeId}/>
                                        </td>
                                        {fields.map(field => (
                                            <td key={`td-desc-${field.key}`}>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "descriptions", String(sizeId)]}
                                                    fieldKey={[field.fieldKey, "descriptions", String(sizeId)]}
                                                    rules={[{required: true, message: "Введите описание"}]}
                                                >
                                                    <Input.TextArea placeholder="Описание"/>
                                                </Form.Item>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </Form.List>
            </Form>
        </div>
    )
}

export default Measurements
