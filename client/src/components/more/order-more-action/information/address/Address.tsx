import {Descriptions, Skeleton} from "antd"
import {OrderAddress} from "types/Order"
import React, {useEffect, useState} from "react"
import {apiRequest} from "utils/api"
import {formatPhone} from "utils/formatPhone"

interface AddressProps {
    orderId: number
}

const Address: React.FC<AddressProps> = ({orderId}) => {
    const [address, setAddress] = useState<OrderAddress>({
        id: 0,
        full_name: "",
        phone: "",
        city: "",
        country: "",
        address: ""
    })
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            try {
                const response = await apiRequest("get", `admin/order/${orderId}/address`)
                setAddress(response)
                setLoading(false)
            } catch (e) {
                console.error(e)
                setLoading(false)
            }
        })()
    }, [orderId])

    return (
        <>
            <Descriptions title="Адрес доставки" column={1} bordered size="small">
                <Descriptions.Item label="Имя">
                    <Skeleton loading={loading} paragraph={false}>
                        {address?.full_name}
                    </Skeleton>
                </Descriptions.Item>
                <Descriptions.Item label="Телефон">
                    <Skeleton loading={loading} paragraph={false}>
                        <a href={`tel:${address.phone}`}>{formatPhone(address.phone)}</a>
                    </Skeleton>
                </Descriptions.Item>
                <Descriptions.Item label="Страна">
                    <Skeleton loading={loading} paragraph={false}>
                        {address.country}
                    </Skeleton>
                </Descriptions.Item>
                <Descriptions.Item label="Город">
                    <Skeleton loading={loading} paragraph={false}>
                        {address.city}
                    </Skeleton>
                </Descriptions.Item>
                <Descriptions.Item label="Адрес">
                    <Skeleton loading={loading} paragraph={false}>
                        {address.address}
                    </Skeleton>
                </Descriptions.Item>
            </Descriptions>
        </>
    )
}
export default Address
