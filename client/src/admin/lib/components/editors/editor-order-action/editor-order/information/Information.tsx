import React, {Dispatch, SetStateAction} from "react"
import {Form, Typography, DatePicker} from "antd"
import {Client} from "admin/lib/types/Client"
import AddClientBlock from "../../../../blocks/add-client-block/AddClientBlock"
import moment from "moment"
import AddDeliveryBlock from "admin/lib/components/blocks/add-delivery-block/AddDeliveryBlock"
import AddPaymentBlock from "admin/lib/components/blocks/add-payment-block/AddPaymentBlock"
import AddDiscountBlock from "admin/lib/components/blocks/add-discount-block/AddDiscountBlock"
import {OrderAddress, OrderDiscount, OrderPayment} from "admin/lib/types/Order"
import {Delivery} from "admin/lib/types/Delivery"
import AddAdditionalServiceBlock, {
    SelectAdditionalService
} from "admin/lib/components/blocks/add-additional-service-block/AddAdditionalServiceBlock"

const {Title} = Typography

interface InformationProps {
    created_at?: string
    additionalServices: SelectAdditionalService[]
    client: Client | null
    delivery: Delivery | null
    address: OrderAddress | null
    discount: OrderDiscount | null
    payments: OrderPayment[]
    updateSelectAdditionalServices: Dispatch<SetStateAction<SelectAdditionalService[]>>
    updateSelectClient: (client: Client | null) => void
    updateSelectDelivery: (delivery: Delivery | null) => void
    updateSelectAddress: (address: OrderAddress | null) => void
    updateSelectDiscount: (discount: OrderDiscount | null) => void
    updateSelectPayments: (payments: OrderPayment[]) => void
    onSubmitHandler: (values: any) => void
}

const Information: React.FC<InformationProps> = ({
    created_at,
    onSubmitHandler,
    additionalServices,
    client,
    delivery,
    address,
    discount,
    payments,
    updateSelectAdditionalServices,
    updateSelectAddress,
    updateSelectClient,
    updateSelectDelivery,
    updateSelectDiscount,
    updateSelectPayments
}) => {
    return (
        <>
            <Title level={3}>Информация</Title>
            <Form
                id="editor-order-drawer"
                size="large"
                onFinish={onSubmitHandler}
                layout="vertical"
                initialValues={{
                    created_at: created_at ? moment(created_at) : moment()
                }}
            >
                <Form.Item
                    label="Дата содания"
                    name="created_at"
                    rules={[{required: true, message: "Введите дату содания!"}]}
                >
                    <DatePicker format="DD-MM-YYYY" style={{width: "100%"}} />
                </Form.Item>
                <AddClientBlock selectClient={client} updateSelectClient={updateSelectClient} />
                <AddDeliveryBlock
                    defaultAddress={{country: "uz"}}
                    selectClient={client}
                    selectAddress={address}
                    updateSelectAddress={updateSelectAddress}
                    selectDelivery={delivery}
                    updateSelectDelivery={updateSelectDelivery}
                />
                <AddAdditionalServiceBlock
                    selectAdditionalServices={additionalServices}
                    updateSelectAdditionalServices={updateSelectAdditionalServices}
                />
                <AddDiscountBlock selectDiscount={discount} updateSelectDiscount={updateSelectDiscount} />
                <AddPaymentBlock payments={payments} updateSelectPayments={updateSelectPayments} />
            </Form>
        </>
    )
}
export default Information
