import React, {useEffect} from "react"
// import {
//     useLoadingPaymentMethods,
//     useSelectAllPaymentMethods
// } from "../../../../store/admin/payment-method/paymentMethodSelectors"
// import {useCommonDispatch} from "../../../../store/common/store"
// import {fetchPaymentMethods} from "../../../../store/admin/payment-method/fetchPaymentMethods"
import {Form, Select} from "antd"

const {Option} = Select

interface SelectPaymentMethodsProps {
    label: string
    name: string
    rules?: any
}

const SelectPaymentMethods: React.FC<SelectPaymentMethodsProps> = ({label, name, rules}) => {
    // const paymentMethods = useSelectAllPaymentMethods()
    // const loading = useLoadingPaymentMethods()
    // const dispatch = useCommonDispatch()

    // useEffect(() => {
    //     const promise = dispatch(fetchPaymentMethods())

    //     return () => {
    //         promise.abort()
    //     }
    // }, [dispatch])

    // return (
    //     <Form.Item name={name} label={label} rules={rules}>
    //         <Select loading={loading}>
    //             {paymentMethods.map(method => (
    //                 <Option key={method.id} value={method.id}>
    //                     {method.title}
    //                 </Option>
    //             ))}
    //         </Select>
    //     </Form.Item>
    // )
    return <></>
}

export default SelectPaymentMethods
