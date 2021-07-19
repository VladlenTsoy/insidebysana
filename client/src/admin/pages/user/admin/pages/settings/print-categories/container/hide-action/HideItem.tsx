import React from "react"
import {Category} from "../../../../../../../../lib/types/Category"
import {useDispatch} from "react-redux"
import {Modal} from "antd"
import {editCategory} from "../../../../../../../../store/admin/category/editCategory"
import {useUser} from "../../../../../../../../hooks/use-user"
import {EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons"

interface DeleteCategoryActionProps {
    category: Category
}

const {confirm} = Modal

const HideItem: React.FC<DeleteCategoryActionProps> = ({category}) => {
    const dispatch = useDispatch()
    const {userId} = useUser()

    const handleClick = async () => {
        category.hide_id ?
            confirm({
                type: "warning",
                title: `Показать категорию (${category.title})?`,
                async onOk() {
                    await dispatch(editCategory({id: category.id, data: {...category, hide_id: null}}))
                }
            }) :
            confirm({
                type: "warning",
                title: `Скрыть категорию (${category.title})?`,
                async onOk() {
                    await dispatch(editCategory({id: category.id, data: {...category, hide_id: userId}}))
                }
            })
    }

    return <div onClick={handleClick}>
        {
            category.hide_id ?
                <><EyeOutlined /> Показать</> :
                <><EyeInvisibleOutlined /> Скрыть</>
        }
    </div>
}

export default HideItem
