import {CloseCircleOutlined, PlusOutlined} from "@ant-design/icons"
import {Col, Row, Select, Form, Divider, Button, Switch} from "antd"
import {Status} from "admin/lib/types/Status"
import React, {useEffect, useState} from "react"
import {fetchPaymentMethods} from "admin/store/admin/payment-method/fetchPaymentMethods"
import {
    useLoadingPaymentMethods,
    useSelectAllPaymentMethods
} from "admin/store/admin/payment-method/paymentMethodSelectors"
import {fetchSources} from "admin/store/admin/source/fetchSources"
import {useLoadingSources, useSelectAllSources} from "admin/store/admin/source/sourceSelectors"
import {useAdminDispatch} from "admin/store"

interface PaymentConditionsProps {
    conditions?: Status["conditions"]
}

const PaymentConditions: React.FC<PaymentConditionsProps> = ({conditions}) => {
    const [visible, setVisible] = useState(!!conditions)
    const loadingPaymentMethods = useLoadingPaymentMethods()
    const paymentMethods = useSelectAllPaymentMethods()
    const sources = useSelectAllSources()
    const loadingSources = useLoadingSources()
    const dispatch = useAdminDispatch()

    const close = () => setVisible(false)
    const open = () => setVisible(true)

    useEffect(() => {
        const promise = dispatch(fetchPaymentMethods())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    useEffect(() => {
        const promise = dispatch(fetchSources())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <>
            {!visible && (
                <Form.Item>
                    <Button block onClick={open} size="large" icon={<PlusOutlined />} type="dashed">
                        Добавить условия попадание заказа
                    </Button>
                </Form.Item>
            )}
            {visible && (
                <>
                    <div className="title-action">
                        <div className="divider-block">
                            <Divider orientation="left">Условия попадание сделок</Divider>
                        </div>
                        <div className="delete-block">
                            <CloseCircleOutlined onClick={close} />
                        </div>
                    </div>
                    <Row gutter={15}>
                        <Col span={12}>
                            <Form.Item
                                label="Тип оплаты"
                                name={["conditions", "payments"]}
                                rules={[{required: true, message: "Выберите тип оплаты!"}]}
                            >
                                <Select mode="multiple" loading={loadingPaymentMethods}>
                                    {paymentMethods.map(payment => (
                                        <Select.Option key={payment.id} value={payment.id}>
                                            {payment.title}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Статус оплаты"
                                name={["conditions", "payments_state"]}
                                rules={[{required: true, message: "Выберите статус оплаты!"}]}
                            >
                                <Select mode="multiple">
                                    <Select.Option value={1}>Оплачен</Select.Option>
                                    <Select.Option value={0}>В ожидании</Select.Option>
                                    <Select.Option value={-1}>Отменен</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Откуда"
                                name={["conditions", "source_ids"]}
                                rules={[{required: true, message: "Выберите статус откуда!"}]}
                            >
                                <Select mode="multiple" loading={loadingSources}>
                                    {sources.map(source => (
                                        <Select.Option key={source.id} value={source.id}>
                                            {source.title}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="На обработку (POS)" name={["conditions", "processing"]} valuePropName="checked">
                                <Switch />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}
export default PaymentConditions
