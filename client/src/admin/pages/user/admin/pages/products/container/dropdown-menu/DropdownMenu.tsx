import React from "react"
import {Menu} from "antd"
import {EditOutlined} from "@ant-design/icons"
import {ProductColor} from "../../../../../../../lib/types/product/ProductColor"
import HideItem from "./hide-item/HideItem"
import {useUser} from "admin/hooks/use-user"
import {Link} from "react-router-dom"

const DropdownMenu = (productColor: ProductColor) => {
    const {user} = useUser()
    return (
        <Menu>
            <Menu.Item key="edit">
                <Link to={`/products/edit/${productColor.id}`}>
                    <span>
                        <EditOutlined /> Редактировать
                    </span>
                </Link>
            </Menu.Item>
            {user.access === "admin" && (
                <Menu.Item key="hide">
                    <HideItem productColor={productColor} />
                </Menu.Item>
            )}
        </Menu>
    )
}

export default DropdownMenu
