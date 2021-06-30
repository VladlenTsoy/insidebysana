import React from "react"
import {useDispatch} from "react-redux"
import {Modal} from "antd"
import {PrintProduct} from "store/admin/print-product/PrintProduct"
import {deletePrintProduct} from "store/admin/print-product/deletePrintProduct"

interface DeleteCategoryActionProps {
    printProduct: PrintProduct
}

const {confirm} = Modal

const DeletePrintProductAction: React.FC<DeleteCategoryActionProps> = ({children, printProduct}) => {
    const dispatch = useDispatch()

    const handleClick = async () => {
        confirm({
            type: "warning",
            title: `Удалить товар (${printProduct.title})?`,
            async onOk() {
                await dispatch(deletePrintProduct(printProduct.id))
            }
        })
    }

    const action = React.Children.map(children, (child: any) =>
        React.cloneElement(child, {onClick: handleClick})
    )

    return <>{action}</>
}

export default DeletePrintProductAction
