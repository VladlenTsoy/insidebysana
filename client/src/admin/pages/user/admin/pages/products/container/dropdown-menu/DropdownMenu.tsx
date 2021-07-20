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

const DropdownMenu = (productColor: ProductColor) => {
    return (
        <Menu>
            <Menu.Item>
                <EditorProductAction title="Редактировать" productId={productColor.details.id}>
                    <span>
                        <EditOutlined /> Редактировать
                    </span>
                </EditorProductAction>
            </Menu.Item>
            <Menu.Item>
                <ImagesItem productColor={productColor} />
            </Menu.Item>
            <Menu.Item>
                <PrintItem productColor={productColor} />
            </Menu.Item>
            <Menu.Item>
                <DiscountItem productColor={productColor} />
            </Menu.Item>
            <Menu.Item>
                <UpdateIsNewItem productColor={productColor} />
            </Menu.Item>
            <Menu.Item>
                <HideItem productColor={productColor} />
            </Menu.Item>
        </Menu>
    )
}

export default DropdownMenu
