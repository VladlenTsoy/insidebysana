import React from "react"
import {Menu, Table} from "antd"
import {useLoadingClient, useSelectAllClients} from "../../../../../../store/admin/client/clientSelectors"
import {EditOutlined, InfoCircleOutlined} from "@ant-design/icons"
import EditorClientAction from "../../../../../../lib/components/editors/editor-client-action/EditorClientAction"
import {Client} from "../../../../../../lib/types/Client"
import {formatPhone} from "../../../../../../utils/formatPhone"
import {formatDate} from "../../../../../../utils/formatDate"
import moment from "moment"
import MenuButton from "../../../../../../lib/components/menu-button/MenuButton"
import ClientMoreAction from "admin/lib/components/more/client-more-action/ClientMoreAction"

const menu = (client: Client) => (
    <Menu>
        <Menu.Item>
            <ClientMoreAction clientId={client.id}>
                <div>
                    <InfoCircleOutlined /> Подробнее
                </div>
            </ClientMoreAction>
        </Menu.Item>
        <Menu.Item>
            <EditorClientAction client={client}>
                <div>
                    <EditOutlined /> Редактировать
                </div>
            </EditorClientAction>
        </Menu.Item>
    </Menu>
)

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        sorter: true
    },
    {
        title: "Имя",
        dataIndex: "full_name",
        sorter: true
    },
    {
        title: "Телефон",
        dataIndex: "phone",
        render: (phone: string) => <a href={`tel:${phone}`}>{formatPhone(phone)}</a>
    },
    {
        title: "Почта",
        dataIndex: "email",
        sorter: true
    },
    {
        title: "День рождения",
        dataIndex: "date_of_birth",
        key: "date_of_birth",
        render: (date_of_birth: string) => (date_of_birth ? moment(date_of_birth).format("DD/MM/YYYY") : null)
    },
    {
        title: "Откуда",
        dataIndex: ["source", "title"]
    },
    {
        title: "Instagram",
        dataIndex: "instagram"
    },
    {
        title: "Telegram",
        dataIndex: "telegram"
    },
    {
        title: "Facebook",
        dataIndex: "facebook"
    },
    {
        title: "Дата",
        dataIndex: "created_at",
        sorter: true,
        defaultSortOrder: "descend" as "descend",
        render: (created: string) => formatDate(created)
    },
    {
        render: (_: undefined, record: any) => <MenuButton overlay={menu(record)} size="large" />
    }
]

interface ContainerProps {
    setSorter: any
    setPagination: any
}

const Container: React.FC<ContainerProps> = ({setSorter, setPagination}) => {
    const clients = useSelectAllClients()
    const loading = useLoadingClient()

    function onChange(pagination: any, filters: any, sorter: any) {
        setSorter({
            field: sorter.field,
            order: sorter.order
        })
        setPagination(pagination)
    }

    return (
        <>
            <Table
                loading={loading}
                scroll={{x: "100%"}}
                rowKey="id"
                dataSource={clients}
                columns={columns}
                onChange={onChange}
            />
        </>
    )
}

export default Container
