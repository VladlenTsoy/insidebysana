import {Form, Select} from "antd"
import {Delivery} from "types/Delivery"
import React, {useEffect, useState} from "react"
import {apiRequest} from "utils/api"

interface SelectDeliveriesProps {
    country: string
    onChange: (delivery: Delivery) => void
}

const SelectDeliveries: React.FC<SelectDeliveriesProps> = ({country, onChange}) => {
    const [deliveries, setDeliveries] = useState<Delivery[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const onChangeHandler = (id: Delivery["id"]) => {
        if (onChange) {
            const selDelivery = deliveries.find(delivery => delivery.id === id)
            selDelivery && onChange(selDelivery)
        }
    }

    useEffect(() => {
        ;(async () => {
            try {
                setLoading(true)
                const response = await apiRequest("get", `admin/deliveries/select/${country}`)
                setDeliveries(response)
                setLoading(false)
            } catch (e) {
                console.error(e)
            }
        })()
    }, [country])

    return (
        <Form.Item
            name="delivery_id"
            label="Доставка"
            rules={[{required: true, message: "Выберите доставку!"}]}
        >
            <Select loading={loading} placeholder="Выберите доставку" onChange={onChangeHandler}>
                {deliveries.map(delivery => (
                    <Select.Option value={delivery.id} key={delivery.id}>
                        {delivery.title} / {delivery.price}
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>
    )
}
export default SelectDeliveries
