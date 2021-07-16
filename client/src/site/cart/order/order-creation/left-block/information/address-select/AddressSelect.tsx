import Select from "components/select/Select"
import React, {useEffect, useState} from "react"
import {useGetAddressesQuery} from "../../../../../../account/delivery-addresses/addressApi"
import {useUser} from "site/auth/authSlice"

interface AddressSelectProps {
    setFieldValue: any
}

const AddressSelect: React.FC<AddressSelectProps> = ({setFieldValue}) => {
    const {detail} = useUser()
    const {data: addresses = [], isLoading} = useGetAddressesQuery()
    const [deliveries, setDeliveries] = useState<any[]>([{label: "Новый адрес", value: 0}])

    const changeHandler = (e: any) => {
        const address = addresses.find(address => address.id === e.value)
        if (address) {
            setFieldValue("country", address.country, true)
            setFieldValue("city", address.city, true)
            setFieldValue("address", address.address, true)
            setFieldValue("phone", address.phone, true)
            setFieldValue("full_name", address.full_name, true)
        } else {
            setFieldValue("full_name", detail?.full_name, true)
            setFieldValue("phone", detail?.phone, true)
            setFieldValue("city", "", true)
            setFieldValue("address", "", true)
        }
    }

    useEffect(() => {
        if (addresses.length) {
            const a = addresses.map(address => ({
                label: `${address.title} \\ ${address.city} \\ ${address.address}`,
                value: address.id
            }))

            setDeliveries(prevState => [...prevState, ...a])
        }
    }, [addresses])

    return (
        <>
            <Select
                options={deliveries}
                defaultValue={deliveries[0]}
                onChange={changeHandler}
                loading={isLoading}
            />
        </>
    )
}
export default React.memo<AddressSelectProps>(AddressSelect)
