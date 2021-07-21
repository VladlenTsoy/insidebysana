import React from "react"
import {Menu, Table, Tag} from "antd"
import {
    useLoadingPromoCodes,
    useSelectAllPromoCodes
} from "../../../../../../../store/admin/promo-code/promoCodeSelectors"
import {formatDate} from "../../../../../../../utils/formatDate"
import {formatPrice} from "../../../../../../../utils/formatPrice"
import MenuButton from "../../../../../../../lib/components/menu-button/MenuButton"
import {EditOutlined} from "@ant-design/icons"
import {PromoCode} from "../../../../../../../lib/types/PromoCode"
import EditorPromoCodeAction
    from "../../../../../../../lib/components/editors/editor-promo-code-action/EditorPromoCodeAction"
import StopItem from "../../newsletter/container/stop-item/StopItem"

const menu = (promoCode: PromoCode) => (
    <Menu>
        <Menu.Item>
            <EditorPromoCodeAction promoCode={promoCode}>
                <div>
                    <EditOutlined /> Редактировать
                </div>
            </EditorPromoCodeAction>
        </Menu.Item>
        <Menu.Item>
            <StopItem promoCode={promoCode} />
        </Menu.Item>
    </Menu>
)

const columns = [
    {
        title: "ID",
        dataIndex: "id"
    },
    {
        title: "Код",
        dataIndex: "code"
    },
    {
        title: "Тип",
        dataIndex: "type",
        render: (type: string) => type === "percent" ? "В процентах" : "Фиксированная"
    },
    {
        title: "Размер",
        dataIndex: "discount",
        render: (discount: string, record: any) =>
            record.type === "percent" ? `${discount}%` : `${formatPrice(discount)} сум`
    },
    {
        title: "Статус",
        dataIndex: "status",
        render: (status: string) => status === "active" ? <Tag color="green">Активный</Tag> : <Tag>Отключен</Tag>
    },
    {
        title: "Действителен",
        dataIndex: "end_at",
        render: (created: string) => formatDate(created)
    },
    {
        title: "Создан",
        dataIndex: "created_at",
        render: (created: string) => formatDate(created)
    },
    {
        render: (_: any, record: PromoCode) => <MenuButton overlay={menu(record)} />
    }
]

const Container = () => {
    const loading = useLoadingPromoCodes()
    const promoCodes = useSelectAllPromoCodes()

    return <Table columns={columns} rowKey="id" loading={loading} dataSource={promoCodes} />
}

export default Container