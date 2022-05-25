import React from "react"
import {Form, Select} from "antd"
import {useGetProductStoragesQuery} from "./productStorageApi"

const {Option} = Select

interface ProductStorageFormSelectProps {
    onChange?: (e: any) => void;
}

const ProductStoragesFormSelect: React.FC<ProductStorageFormSelectProps> = ({onChange}) => {
    const {data, isLoading} = useGetProductStoragesQuery()

    return (
        <Form.Item
            label="Место хранения"
            name="storage_id"
        >
            <Select
                showSearch
                loading={isLoading}
                placeholder="Добавить место хранения"
                optionFilterProp="label"
                onChange={onChange}
            >
                {data &&
                    data.map(storage => (
                        <Option
                            value={storage.id}
                            key={`storage-${storage.id}`}
                            label={storage.title}
                        >
                            {storage.title}
                        </Option>
                    ))}
            </Select>
        </Form.Item>
    )
}
export default React.memo<ProductStorageFormSelectProps>(ProductStoragesFormSelect)
