import React from "react"
import "./ClientSearch.less"
import SearchClientInput from "../container/search-client-input/SearchClientInput"
import {Client} from "types/Client"
import {Form, Input} from "antd"

interface ClientSearchProps {
    updateSelectClient: (client: Client | null) => void
    selectClient: Client | null
}

const ClientSearch: React.FC<ClientSearchProps> = ({selectClient, updateSelectClient}) => {
    return (
        <>
            <SearchClientInput selectClient={selectClient} updateSelectClient={updateSelectClient} />
            <Form.Item label="Имя" name="full_name">
                <Input placeholder="Введите имя" />
            </Form.Item>
        </>
    )
}
export default ClientSearch
