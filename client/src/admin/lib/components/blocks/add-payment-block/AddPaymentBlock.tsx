import {DeleteOutlined, WalletOutlined} from "@ant-design/icons"
import {Button, Modal} from "antd"
import {OrderPayment} from "admin/lib/types/Order"
import React, {useCallback, useEffect, useState} from "react"
import {fetchPaymentMethods} from "admin/store/admin/payment-method/fetchPaymentMethods"
import {useSelectAllPaymentMethods} from "admin/store/admin/payment-method/paymentMethodSelectors"
import {useAdminDispatch} from "admin/store"
import {formatPrice} from "admin/utils/formatPrice"
import "./AddPaymentBlock.less"
import FormPayment from "./form-payment/FormPayment"

interface AddPaymentBlockProps {
    payments: OrderPayment[]
    updateSelectPayments: (payments: OrderPayment[]) => void
}

const AddPaymentBlock: React.FC<AddPaymentBlockProps> = ({payments, updateSelectPayments}) => {
    const [visible, setVisible] = useState(false)
    const paymentMethods = useSelectAllPaymentMethods()
    const dispatch = useAdminDispatch()

    const handleClick = useCallback(() => setVisible(true), [])
    const close = useCallback(() => setVisible(false), [])

    useEffect(() => {
        const promise = dispatch(fetchPaymentMethods())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    const deleteHandler = useCallback(
        (key: number) => {
            const update = payments.filter((payment, _key) => _key !== key)
            updateSelectPayments(update)
        },
        [payments, updateSelectPayments]
    )

    const onFinishHandler = useCallback(
        (values: any) => {
            updateSelectPayments([...payments, values])
            close()
        },
        [close, updateSelectPayments, payments]
    )

    return (
        <>
            {!!payments.length && (
                <div className="edit-payment-block">
                    {payments.map((payment, key) => (
                        <div key={key} className="payment-block">
                            <div>
                                {paymentMethods.find(_payment => _payment.id === payment.payment_id)?.title}
                            </div>
                            <div>{formatPrice(payment.price)} сум</div>
                            <div>
                                <Button danger icon={<DeleteOutlined />} onClick={() => deleteHandler(key)} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="add-payment-block">
                <div className="action-block" onClick={handleClick}>
                    <WalletOutlined />
                    <span>Добавить оплату</span>
                </div>
            </div>
            <Modal
                visible={visible}
                title="Метод оплаты"
                onCancel={close}
                cancelButtonProps={{size: "large"}}
                okButtonProps={{
                    form: "from-add-payment-block",
                    htmlType: "submit",
                    size: "large"
                }}
                destroyOnClose
                okText="Сохранить"
            >
                <FormPayment onFinishHandler={onFinishHandler} />
            </Modal>
        </>
    )
}
export default React.memo(AddPaymentBlock)
