import React from "react"
import {Category} from "../../../../../../../../lib/types/Category"
import {useDispatch} from "react-redux"
import {deletePrintCategory} from "../../../../../../../../store/admin/print-category/deletePrintCategory"
import {Modal} from "antd"

interface DeleteCategoryActionProps {
    category: Category
}

const {confirm} = Modal

const DeleteCategoryAction: React.FC<DeleteCategoryActionProps> = ({children, category}) => {
    const dispatch = useDispatch()

    const handleClick = async () => {
        confirm({
            type: "warning",
            title: `Удалить категорию (${category.title})?`,
            async onOk() {
                await dispatch(deletePrintCategory(category.id))
            }
        })
    }

    const action = React.Children.map(children, (child: any) =>
        React.cloneElement(child, {onClick: handleClick})
    )

    return <>{action}</>
}

export default DeleteCategoryAction
