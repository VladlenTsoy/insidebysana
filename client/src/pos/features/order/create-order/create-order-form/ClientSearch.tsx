import React, {useCallback, useEffect, useState} from "react"
import "./ClientSearch.less"
import SearchClientInput from "./search-client-input/SearchClientInput"
import {Client} from "types/Client"
import {CloseOutlined, EditOutlined, UserOutlined} from "@ant-design/icons"
import {Button, Form, Input} from "antd"
import Modal from "antd/lib/modal/Modal"
import {formatPhone} from "utils/formatPhone"
interface ClientSearchFormProps {
    updateSelectClient: (client: Client | null) => void
    selectClient: Client | null
    close: () => void
}

const ClientSearchForm: React.FC<ClientSearchFormProps> = ({selectClient, updateSelectClient, close}) => {
    const [form] = Form.useForm()

    const onFinishHandler = (values: any) => {
        updateSelectClient(selectClient || values)
        close()
    }

    useEffect(() => {
        form.setFieldsValue(
            selectClient ? {full_name: selectClient.full_name, phone: selectClient.phone} : {}
        )
    }, [form, selectClient])

    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            id="pos-select-client"
            onFinish={onFinishHandler}
            initialValues={selectClient ? {full_name: selectClient.full_name, phone: selectClient.phone} : {}}
        >
            <SearchClientInput selectClient={selectClient} updateSelectClient={updateSelectClient} />
            <Form.Item label="Имя" name="full_name">
                <Input placeholder="Введите имя" />
            </Form.Item>
        </Form>
    )
}

interface ClientSearchProps {
    updateSelectClient: (client: Client | null) => void
    selectClient: Client | null
}

const ClientSearch: React.FC<ClientSearchProps> = ({selectClient, updateSelectClient}) => {
    const [visible, setVisible] = useState(false)

    const close = useCallback(() => setVisible(false), [])
    const handleClick = () => setVisible(true)

    const clickCancelHandler = () => updateSelectClient(null)

    return (
        <>
            {selectClient ? (
                <fieldset className="client-search-edit">
                    <legend>Клиент</legend>
                    <div className="information">
                        {selectClient.full_name} <br />
                        {formatPhone(selectClient.phone)}
                    </div>
                    <div className="actions">
                        <Button
                            type="primary"
                            ghost
                            icon={<EditOutlined />}
                            onClick={handleClick}
                            size="large"
                            shape="circle"
                        />
                        <Button
                            danger
                            icon={<CloseOutlined />}
                            onClick={clickCancelHandler}
                            size="large"
                            shape="circle"
                        />
                    </div>
                </fieldset>
            ) : (
                <div className="client-search-add">
                    <Button icon={<UserOutlined />} onClick={handleClick} size="large" block>
                        Добавить клиента
                    </Button>
                </div>
            )}
            <Modal
                visible={visible}
                title="Клиент"
                onCancel={close}
                destroyOnClose
                cancelButtonProps={{size: "large"}}
                okButtonProps={{
                    form: "pos-select-client",
                    htmlType: "submit",
                    size: "large"
                }}
                okText="Сохранить"
            >
                <ClientSearchForm
                    updateSelectClient={updateSelectClient}
                    selectClient={selectClient}
                    close={close}
                />
            </Modal>
        </>
    )
}
export default ClientSearch
