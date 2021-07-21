import React from "react"
import {Table, Tag} from "antd"
import {formatDate} from "../../../../../../../utils/formatDate"
import {
    useLoadingNewsletter,
    useSelectAllNewsletter
} from "../../../../../../../store/admin/newsletter/newsletterSelectors"

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id"
    },
    {
        title: "Почта",
        dataIndex: "email"
    },
    {
        title: "Статус",
        dataIndex: "status",
        render: (status: string) => status === "active" ? <Tag color="green">Активный</Tag> : <Tag>Отключен</Tag>
    },
    {
        title: "Создан",
        dataIndex: "created_at",
        render: (created: string) => formatDate(created)
    }
]

const Container = () => {
    const loading = useLoadingNewsletter()
    const newsletter = useSelectAllNewsletter()

    return <Table columns={columns} rowKey="id" loading={loading} dataSource={newsletter} />
}

export default Container