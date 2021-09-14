import React from "react"
import {Menu} from "antd"
import EditorProductAction from "../../../../../../../lib/components/editors/editor-product-action/EditorProductAction"
import {EditOutlined} from "@ant-design/icons"
import {ProductColor} from "../../../../../../../lib/types/product/ProductColor"
import HideItem from "./hide-item/HideItem"
import {useUser} from "admin/hooks/use-user"

const DropdownMenu = (productColor: ProductColor) => {
    const {user} = useUser()
    return (
        <Menu>
            <Menu.Item key="edit">
                <EditorProductAction title="Редактировать" productId={productColor.details.id}>
                    <span>
                        <EditOutlined /> Редактировать
                    </span>
                </EditorProductAction>
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
