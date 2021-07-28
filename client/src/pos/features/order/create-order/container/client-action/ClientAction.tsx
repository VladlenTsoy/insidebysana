import {EditOutlined, UserOutlined} from "@ant-design/icons"
import {Button, Form, Input} from "antd"
import Modal from "antd/lib/modal/Modal"
import {Client} from "types/Client"
import React, {useCallback, useEffect, useState} from "react"
import {formatPhone} from "utils/formatPhone"
import SearchClientInput from "../search-client-input/SearchClientInput"
import "./ClientAction.less"

interface ClientActionProps {
    updateSelectClient: (client: Client | null) => void
    selectClient: Client | null
}

const ClientAction: React.FC<ClientActionProps> = ({updateSelectClient, selectClient}) => {
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(false)

    const close = useCallback(() => setVisible(false), [])
    const handleClick = () => {
        setVisible(true)
    }

    const onFinishHandler = (values: any) => {
        updateSelectClient(selectClient || values)
        setVisible(false)
    }

    useEffect(() => {
        form.setFieldsValue(
            selectClient ? {full_name: selectClient.full_name, phone: selectClient.phone} : {}
        )
    }, [form, selectClient])

    return (
        <>
            {selectClient ? (
                <div className="client-action-edit">
                    <div className="information">
                        <span>Клиент:</span>
                        <div>
                            {selectClient.full_name} <br />
                            {formatPhone(selectClient.phone)}
                        </div>
                    </div>
                    <Button type="primary" ghost icon={<EditOutlined />} onClick={handleClick} size="large">
                        Редактировать
                    </Button>
                </div>
            ) : (
                <div className="client-action-add">
                    <Button icon={<UserOutlined />} onClick={handleClick} size="large" block>
                        Клиент
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
                <Form
                    form={form}
                    size="large"
                    layout="vertical"
                    id="pos-select-client"
                    onFinish={onFinishHandler}
                    initialValues={
                        selectClient ? {full_name: selectClient.full_name, phone: selectClient.phone} : {}
                    }
                >
                    <SearchClientInput selectClient={selectClient} updateSelectClient={updateSelectClient} />
                    <Form.Item label="Имя" name="full_name">
                        <Input placeholder="Введите имя" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default ClientAction
