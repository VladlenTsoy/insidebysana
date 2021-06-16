import {DeleteOutlined, EditOutlined, UserAddOutlined} from "@ant-design/icons"
import {Button} from "antd"
import {Modal} from "antd"
import {Client} from "lib/types/Client"
import React, {useCallback, useState} from "react"
import {formatPhone} from "utils/formatPhone"
import "./AddClientBlock.less"
import FormClient from "./form-client/FormClient"

interface AddClientBlockProps {
    updateSelectClient: (client: Client | null) => void
    selectClient: Client | null
}

const AddClientBlock: React.FC<AddClientBlockProps> = ({updateSelectClient, selectClient}) => {
    const [visible, setVisible] = useState(false)

    const close = useCallback(() => setVisible(false), [])
    const handleClick = useCallback(() => setVisible(true), [])
    const deleteClient = useCallback(() => updateSelectClient(null), [updateSelectClient])

    const onFinishHandler = useCallback(
        async (values: any) => {
            await updateSelectClient(selectClient || values)
            setVisible(false)
        },
        [updateSelectClient, selectClient]
    )

    return (
        <div className="add-client-block">
            {selectClient ? (
                <div className="edit-client-block">
                    <div className="information">
                        <div>{selectClient.full_name}</div>
                        <div>{formatPhone(selectClient.phone)}</div>
                    </div>
                    <div className="actions-block">
                        <Button
                            type="primary"
                            ghost
                            icon={<EditOutlined />}
                            onClick={handleClick}
                            size="large"
                        />
                        <Button
                            type="primary"
                            ghost
                            danger
                            icon={<DeleteOutlined />}
                            onClick={deleteClient}
                            size="large"
                        />
                    </div>
                </div>
            ) : (
                <div className="action-block" onClick={handleClick}>
                    <UserAddOutlined />
                    <span>Добавить клиента</span>
                </div>
            )}
            <Modal
                visible={visible}
                title="Клиент"
                onCancel={close}
                destroyOnClose
                cancelButtonProps={{size: "large"}}
                okButtonProps={{
                    form: "from-add-client-block",
                    htmlType: "submit",
                    size: "large"
                }}
                okText="Сохранить"
            >
                <FormClient
                    selectClient={selectClient}
                    updateSelectClient={updateSelectClient}
                    onFinishHandler={onFinishHandler}
                />
            </Modal>
        </div>
    )
}
export default React.memo<AddClientBlockProps>(AddClientBlock)
