import {Menu, Table, Tag} from "antd"
import React, {useEffect} from "react"
import {
    useLoadingAdditionalServices,
    useSelectAllAdditionalServices
} from "store/common/additional-service/additionalServiceSelectors"
import {fetchAdditionalServices} from "store/admin/additional-service/fetchAdditionalServices"
import {useAdminDispatch} from "store/admin/store"
import {formatPrice} from "utils/formatPrice"
import {AdditionalService} from "lib/types/AdditionalService"
import EditorAdditionalServiceAction from "lib/components/editors/editor-additional-service-action/EditorAdditionalServiceAction"
import {EditOutlined} from "@ant-design/icons"
import MenuButton from "lib/components/menu-button/MenuButton"
import ImageBlock from "lib/components/blocks/image-block/ImageBlock"
import DeleteItem from "./delete-item/DeleteItem"

const menu = (additionalService: AdditionalService) => (
    <Menu>
        <Menu.Item>
            <EditorAdditionalServiceAction additionalService={additionalService}>
                <div>
                    <EditOutlined /> Редактировать
                </div>
            </EditorAdditionalServiceAction>
        </Menu.Item>
        <Menu.Item>
            <DeleteItem additionalService={additionalService} />
        </Menu.Item>
    </Menu>
)

const columns = [
    {
        title: "ID",
        dataIndex: "id"
    },
    {
        title: "Картинка",
        dataIndex: "url_image",
        render: (image: string) => (
            <div style={{width: "140px"}}>
                <ImageBlock image={image} title={""} />
            </div>
        )
    },
    {
        title: "Название",
        dataIndex: "title"
    },
    {
        title: "Стоимость",
        dataIndex: "price",
        render: (text: any) => `${formatPrice(text)} сум`
    },
    {
        title: "Используется",
        dataIndex: "display",
        render: (display: string[]) =>
            !!display.length &&
            display.map((val, key) =>
                val === "site" ? (
                    <Tag color="red" key={key}>
                        Сайт
                    </Tag>
                ) : (
                    <Tag color="green" key={key}>
                        POS
                    </Tag>
                )
            )
    },
    {
        render: (_: any, record: AdditionalService) => <MenuButton overlay={menu(record)} />
    }
]

const Container: React.FC = () => {
    const additionalServices = useSelectAllAdditionalServices()
    const loading = useLoadingAdditionalServices()
    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchAdditionalServices())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <Table
            columns={columns}
            loading={loading}
            rowKey="id"
            dataSource={additionalServices}
            pagination={{pageSize: 20}}
        />
    )
}
export default Container
