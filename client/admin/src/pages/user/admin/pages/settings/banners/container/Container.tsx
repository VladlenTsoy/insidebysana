import React from "react"
import {Menu, Table} from "antd"
import {useLoadingBanner, useSelectAllBanners} from "../../../../../../../store/admin/banner/bannerSelectors"
import ImageBlock from "../../../../../../../lib/components/blocks/image-block/ImageBlock"
import MenuButton from "../../../../../../../lib/components/menu-button/MenuButton"
import {EditOutlined} from "@ant-design/icons"
import {Banner} from "../../../../../../../lib/types/Banner"
import EditorBannerAction from "../header/editor-banner-action/EditorBannerAction"
import DeleteItem from "./delete-item/DeleteItem"

const menu = (banner: Banner) => (
    <Menu>
        <Menu.Item>
            <EditorBannerAction banner={banner}>
                <div>
                    <EditOutlined /> Редактировать
                </div>
            </EditorBannerAction>
        </Menu.Item>
        <Menu.Item>
            <DeleteItem banner={banner} />
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
        render: (image: string) => <div style={{width: '140px'}}>
            <ImageBlock image={image} title={""} />
        </div>
    },
    {
        title: "Название",
        dataIndex: "title"
    },
    {
        title: "Название кнопки",
        dataIndex: "button_title"
    },
    {
        title: "Ссылка кнопки",
        dataIndex: "button_link"
    },
    {
        render: (_: any, record: Banner) => <MenuButton overlay={menu(record)} />
    }
]

const Container = () => {
    const loading = useLoadingBanner()
    const banners = useSelectAllBanners()

    return <Table columns={columns} rowKey="id" loading={loading} dataSource={banners} />
}

export default Container
