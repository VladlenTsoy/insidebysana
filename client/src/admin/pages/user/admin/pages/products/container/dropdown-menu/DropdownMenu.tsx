import React from "react"
import {Menu} from "antd"
import EditorProductAction from "../../../../../../../lib/components/editors/editor-product-action/EditorProductAction"
import {EditOutlined} from "@ant-design/icons"
import {ProductColor} from "../../../../../../../lib/types/product/ProductColor"
import DiscountItem from "./discount-item/DiscountItem"
import HideItem from "./hide-item/HideItem"
import PrintItem from "./print-item/PrintItem"
import ImagesItem from "./images-item/ImagesItem"
import UpdateIsNewItem from "./UpdateIsNewItem"
import {useUser} from "admin/hooks/use-user"

const DropdownMenu = (productColor: ProductColor) => {
    const {user} = useUser()
    return (
        <Menu>
            {user.access === "admin" && (
                <Menu.Item>
                    <EditorProductAction title="Редактировать" productId={productColor.details.id}>
                        <span>
                            <EditOutlined /> Редактировать
                        </span>
                    </EditorProductAction>
                </Menu.Item>
            )}
            {user.access === "admin" && (
                <Menu.Item>
                    <ImagesItem productColor={productColor} />
                </Menu.Item>
            )}
            {user.access === "admin" && (
                <Menu.Item>
                    <PrintItem productColor={productColor} />
                </Menu.Item>
            )}
            {user.access === "admin" && (
                <Menu.Item>
                    <DiscountItem productColor={productColor} />
                </Menu.Item>
            )}
            <Menu.Item>
                <UpdateIsNewItem productColor={productColor} />
            </Menu.Item>
            {user.access === "admin" && (
                <Menu.Item>
                    <HideItem productColor={productColor} />
                </Menu.Item>
            )}
        </Menu>
    )
}

export default DropdownMenu
