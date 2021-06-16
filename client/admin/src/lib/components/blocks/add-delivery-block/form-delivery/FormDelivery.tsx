import {Form, Input} from "antd"
import SelectCountries from "lib/components/form/select-countries/SelectCountries"
import SelectDeliveries from "lib/components/form/select-deliveries/SelectDeliveries"
import {Client} from "lib/types/Client"
import {Delivery} from "lib/types/Delivery"
import {OrderAddress} from "lib/types/Order"
import React, {useState} from "react"

const {TextArea} = Input

interface FormDeliveryProps {
    defaultAddress?: {country?: string}
    selectClient: Client | null
    selectDelivery: Delivery | null
    selectAddress: OrderAddress | null
    onFinishHandler: (values: OrderAddress) => void
    updateSelectDelivery: (delivery: Delivery | null) => void
}

const FormDelivery: React.FC<FormDeliveryProps> = ({
    defaultAddress,
    selectClient,
    selectAddress,
    selectDelivery,
    updateSelectDelivery,
    onFinishHandler
}) => {
    const [country, setCountry] = useState<OrderAddress["country"]>(
        selectAddress?.country || defaultAddress?.country || "uz"
    )

    const onChangeCountryHandler = (selCountry: any) => {
        setCountry(selCountry)
    }

    return (
        <Form
            layout="vertical"
            id="form-add-delivery-block"
            autoComplete="off"
            onFinish={onFinishHandler}
            initialValues={
                selectAddress ||
                (selectClient
                    ? {...defaultAddress, full_name: selectClient.full_name, phone: selectClient.phone}
                    : {...defaultAddress})
            }
        >
            <Form.Item label="Имя" name="full_name" rules={[{required: true, message: "Введите имя!"}]}>
                <Input />
            </Form.Item>
            <Form.Item label="Телефон" name="phone" rules={[{required: true, message: "Введите телефон!"}]}>
                <Input />
            </Form.Item>
            <SelectCountries onChange={onChangeCountryHandler} />
            <Form.Item label="Город" name="city" rules={[{required: true, message: "Введите город!"}]}>
                <Input />
            </Form.Item>
            <Form.Item label="Адрес" name="address" rules={[{required: true, message: "Введите адрес!"}]}>
                <TextArea rows={3} />
            </Form.Item>
            <SelectDeliveries country={country} onChange={updateSelectDelivery} />
        </Form>
    )
}
export default FormDelivery
