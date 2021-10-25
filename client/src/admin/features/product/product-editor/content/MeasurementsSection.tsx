import React from "react"
import {Typography, Form, Input, Button, Divider} from "antd"
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons"
import styles from "./MeasurementsSection.module.less"
import {Element} from "react-scroll"

const {Title} = Typography

interface MeasurementsSectionProps {
    selectedSizes: {id: number, title: string}[];
}

const MeasurementsSection: React.FC<MeasurementsSectionProps> = ({
    selectedSizes
}) => {
    return (
        <Element name="measurements">
            <Divider />
            <Title level={3}>Обмеры</Title>
            <div className={styles.measurements}>
                <Form.List name="measurements">
                    {(fields, {add, remove}) => (
                        <>
                            <div className={styles.container}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th className={styles.left}>
                                                Размеры
                                            </th>
                                            {selectedSizes.map(size => (
                                                <th key={`tr-size-${size.id}`}>
                                                    {size.title}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fields.map(field => (
                                            <tr key={`tr-size-${field.key}`}>
                                                <td
                                                    key={`td-title-${field.key}`}
                                                >
                                                    <div
                                                        className={styles.title}
                                                    >
                                                        <Form.Item
                                                            hidden
                                                            {...field}
                                                            name={[
                                                                field.name,
                                                                "id"
                                                            ]}
                                                            fieldKey={[
                                                                field.fieldKey,
                                                                "id"
                                                            ]}
                                                            key={`id-${field.key}`}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...field}
                                                            name={[
                                                                field.name,
                                                                "title"
                                                            ]}
                                                            fieldKey={[
                                                                field.fieldKey,
                                                                "title"
                                                            ]}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message:
                                                                        "Введите название!"
                                                                }
                                                            ]}
                                                        >
                                                            <Input
                                                                placeholder="Название"
                                                                style={{
                                                                    minWidth:
                                                                        "150px"
                                                                }}
                                                            />
                                                        </Form.Item>
                                                        <MinusCircleOutlined
                                                            onClick={() =>
                                                                remove(
                                                                    field.name
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                                {selectedSizes.map(sizes => (
                                                    <td
                                                        key={`td-desc-${field.key}-${sizes.id}`}
                                                    >
                                                        <Form.Item
                                                            {...field}
                                                            name={[
                                                                field.name,
                                                                "descriptions",
                                                                String(sizes.id)
                                                            ]}
                                                            fieldKey={[
                                                                field.fieldKey,
                                                                "descriptions",
                                                                String(sizes.id)
                                                            ]}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message:
                                                                        "Введите описание!"
                                                                }
                                                            ]}
                                                        >
                                                            <Input.TextArea
                                                                placeholder="Описание"
                                                                rows={1}
                                                                style={{
                                                                    minWidth:
                                                                        "150px"
                                                                }}
                                                            />
                                                        </Form.Item>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className={styles.action}>
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
