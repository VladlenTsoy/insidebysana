import Select from "components/select/Select"
import React, {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {useLoadingAddresses, useSelectAllAddresses} from "store/address/addressSelector"
import {fetchAddress} from "store/address/fetchAddress"
import {useDispatch} from "store/store"
import {userSelector} from "store/user/userSlice"

interface AddressSelectProps {
    setFieldValue: any
}

const AddressSelect: React.FC<AddressSelectProps> = ({setFieldValue}) => {
    const {detail} = useSelector(userSelector)
    const addresses = useSelectAllAddresses()
    const loading = useLoadingAddresses()
    const dispatch = useDispatch()
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
        const a = addresses.map(address => ({
            label: `${address.title} \\ ${address.city} \\ ${address.address}`,
            value: address.id
        }))

        setDeliveries(prevState => [...prevState, ...a])
    }, [addresses])

    useEffect(() => {
        const promise = dispatch(fetchAddress())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <>
            <Select
                options={deliveries}
                defaultValue={deliveries[0]}
                onChange={changeHandler}
                loading={loading}
            />
        </>
    )
}
export default AddressSelect
