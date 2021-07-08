import React, {useEffect} from "react"
import {Select, Form} from "antd"
// import {fetchSources} from "../../../../store/admin/source/fetchSources"
// import {useLoadingSources, useSelectAllSources} from "../../../../store/admin/source/sourceSelectors"
// import {useCommonDispatch} from "../../../../store/common/store"

const {Option} = Select

interface SelectClientSourcesProps {
    label: string
    name: string
    rules?: any
}

const SelectClientSources: React.FC<SelectClientSourcesProps> = ({label, name, rules}) => {
    // const sources = useSelectAllSources()
    // const loading = useLoadingSources()
    // const dispatch = useCommonDispatch()

    // useEffect(() => {
    //     const promise = dispatch(fetchSources())

    //     return () => {
    //         promise.abort()
    //     }
    // }, [dispatch])

    // return (
    //     <Form.Item
    //         name={name}
    //         label={label}
    //         rules={rules}
    //     >
    //         <Select loading={loading}>
    //             {sources.map(source => (
    //                 <Option key={source.id} value={source.id}>
    //                     {source.title}
    //                 </Option>
    //             ))}
    //         </Select>
    //     </Form.Item>
    // )
    return <></>
}

export default SelectClientSources
