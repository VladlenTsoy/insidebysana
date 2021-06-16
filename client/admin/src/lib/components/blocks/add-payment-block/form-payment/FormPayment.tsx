import {Form, InputNumber, Select} from "antd"
import React from "react"
import {
    useLoadingPaymentMethods,
    useSelectAllPaymentMethods
} from "store/admin/payment-method/paymentMethodSelectors"
import {formatPrice} from "utils/formatPrice"

interface FormPaymentProps {
    onFinishHandler: (value: any) => void
}

const FormPayment: React.FC<FormPaymentProps> = ({onFinishHandler}) => {
    const paymentMethods = useSelectAllPaymentMethods()
    const loading = useLoadingPaymentMethods()

    return (
        <Form layout="vertical" onFinish={onFinishHandler} id="from-add-payment-block">
            <Form.Item
                label="Тип оплаты"
                name="payment_id"
                rules={[{required: true, message: "Введите тип оплаты!"}]}
            >
                <Select loading={loading}>
                    {paymentMethods.map(payment => (
                        <Select.Option value={payment.id} key={payment.id}>
                            {payment.title}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Сумма" name="price" rules={[{required: true, message: "Введите сумму!"}]}>
                <InputNumber
                    min={0}
                    style={{width: "100%"}}
                    formatter={value => formatPrice(Number(value))}
                />
            </Form.Item>
        </Form>
    )
}
export default FormPayment
