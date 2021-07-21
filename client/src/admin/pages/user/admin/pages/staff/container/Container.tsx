import React from "react"
import {Menu, Table, Tag} from "antd"
import {EditOutlined} from "@ant-design/icons"
import {useLoadingStaff, useSelectAllStaff} from "../../../../../../store/admin/staff/staffSelectors"
import EditorStaffAction from "../../../../../../lib/components/editors/editor-staff-action/EditorStaffAction"
import {User} from "../../../../../../lib/types/User"
import {formatDate} from "../../../../../../utils/formatDate"
import MenuButton from "../../../../../../lib/components/menu-button/MenuButton"

const menu = (user: User) => (
    <Menu>
        <Menu.Item>
            <EditorStaffAction user={user}>
                <div>
                    <EditOutlined /> Редактировать
                </div>
            </EditorStaffAction>
        </Menu.Item>
    </Menu>
)

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        sorter: true
    },
    {
        title: "Имя",
        dataIndex: "full_name",
        key: "full_name",
        sorter: true
    },
    {
        title: "Почта",
        dataIndex: "email",
        key: "email",
        sorter: true
    },
    {
        title: "Доступ",
        dataIndex: "access",
        key: "access",
        render: (access: string) => {
            return access === "admin" ? (
                <Tag color="red">Администратор</Tag>
            ) : access === "cashier" ? (
                <Tag color="blue">Кассир</Tag>
            ) : (
                <Tag color="green">Менеджер</Tag>
            )
        }
    },
    {
        title: "Дата",
        dataIndex: "created_at",
        key: "created_at",
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
    const staff = useSelectAllStaff()
    const loading = useLoadingStaff()

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
                dataSource={staff}
                columns={columns}
                onChange={onChange}
            />
        </>
    )
}

export default Container
