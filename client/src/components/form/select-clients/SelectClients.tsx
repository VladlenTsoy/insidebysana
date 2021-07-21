import React, {useState} from "react"
import "./SelectClients.less"
import {Form, Select, Button, Typography} from "antd"
import {PlusOutlined} from "@ant-design/icons"
// import EditorClientAction from "lib/components/editors/editor-client-action/EditorClientAction"
import {Client} from "types/Client"
import {apiRequest} from "utils/api"

const {Text} = Typography

interface SelectClientsProps {
    addButton?: boolean
    required?: boolean
    onChange?: (client: Client) => void
}

const SelectClients: React.FC<SelectClientsProps> = ({addButton, onChange, required = true}) => {
    const [loading, setLoading] = useState(false)
    const [clients, setClients] = useState<Client[]>([])
    const [prevTimeout, setPrevTimeout] = useState<any>(0)

    const onSearchHandler = async (value: string) => {
        clearTimeout(prevTimeout)
        if (value.trim().length) {
            setLoading(true)
            setPrevTimeout(
                setTimeout(async () => {
                    await searchClient(value)
                }, 500)
            )
        } else {
            setLoading(false)
        }
    }

    const searchClient = async (value: string) => {
        try {
            const response = await apiRequest("post", `admin/clients`, {data: {search: value}})
            setClients(response)
        } catch (e) {
            console.error(e)
        }
        setLoading(false)
    }

    const onChangeHandler = (id: number) => {
        if (onChange) {
            const selClinet = clients.find(client => client.id === id)
            selClinet && onChange(selClinet)
        }
    }

    return (
        <div className="select-clients">
            <Form.Item
                name="client_id"
                label="Клиент"
                rules={[{required, message: "Выберите клиента!"}]}
                className="select-clients-form-item"
            >
                <Select
                    showSearch
                    filterOption={false}
                    onSearch={onSearchHandler}
                    loading={loading}
                    placeholder="Введите имя клиента"
                    onChange={onChangeHandler}
                >
                    {clients.map(client => (
                        <Select.Option value={client.id} key={client.id}>
                            <Text type="secondary">{client.id}</Text> {client.full_name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            {/* {addButton && (
                <EditorClientAction>
                    <Button icon={<PlusOutlined />} className="select-clients-button-add" />
                </EditorClientAction>
            )} */}
        </div>
    )
}

export default SelectClients
