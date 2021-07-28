import {Form, Input} from "antd"
import {Client} from "types/Client"
import LoadingBlock from "components/blocks/loading-block/LoadingBlock"
import React, {useEffect, useState} from "react"
import {apiRequest} from "utils/api"
import {formatPhone} from "utils/formatPhone"
import "./SearchClientInput.less"

interface SearchClientInputProps {
    updateSelectClient: (client: Client | null) => void
    selectClient: Client | null
}

const SearchClientInput: React.FC<SearchClientInputProps> = ({updateSelectClient, selectClient}) => {
    const [clients, setClients] = useState<Client[]>([])
    let timeout: any
    const [search, setSearch] = useState<string>("")
    const [loading, setLoading] = useState(false)

    const onChangeHandler = (e: any) => {
        if (timeout) clearTimeout(timeout)
        if (selectClient?.phone !== e.target.value) {
            updateSelectClient(null)
            timeout = setTimeout(() => {
                setSearch(e.target.value)
            }, 500)
        }
    }

    const onSelectHandler = (client: Client) => {
        updateSelectClient(client)
    }

    useEffect(() => {
        if (search.trim() !== "") {
            setLoading(true)
            ;(async () => {
                try {
                    const response = await apiRequest("post", "cashier/clients", {
                        data: {search}
                    })
                    setClients(response)
                    setLoading(false)
                } catch (e) {
                    console.error(e)
                    setClients([])
                    setLoading(false)
                }
            })()
        }
    }, [search, updateSelectClient, selectClient])

    return (
        <div className="wrapper-search-client-input">
            <Form.Item label="Номер телефона" name="phone">
                <Input
                    onChange={onChangeHandler}
                    placeholder="Введите номер телефона"
                    style={{width: "100%"}}
                />
            </Form.Item>
            {!selectClient && (!!clients.length || loading) && (
                <div className="dropdown-clients">
                    {loading ? (
                        <LoadingBlock />
                    ) : (
                        clients.map(client => (
                            <div
                                className="dropdown-client"
                                key={client.id}
                                onClick={() => onSelectHandler(client)}
                            >
                                <div>#{client.id}</div>
                                <div>{formatPhone(client.phone)}</div>
                                <div>{client.full_name}</div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
export default SearchClientInput
