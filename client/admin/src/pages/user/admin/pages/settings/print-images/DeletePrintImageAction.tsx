import React from "react"
import {useDispatch} from "react-redux"
import {deletePrintImage} from "store/admin/print-image/deletePrintImage"
import {Modal} from "antd"
import {PrintImage} from "store/admin/print-image/PrintImage"

interface DeleteCategoryActionProps {
    printImage: PrintImage
}

const {confirm} = Modal

const DeletePrintImageAction: React.FC<DeleteCategoryActionProps> = ({children, printImage}) => {
    const dispatch = useDispatch()

    const handleClick = async () => {
        confirm({
            type: "warning",
            title: `Удалить картинку (${printImage.title})?`,
            async onOk() {
                await dispatch(deletePrintImage(printImage.id))
            }
        })
    }

    const action = React.Children.map(children, (child: any) =>
        React.cloneElement(child, {onClick: handleClick})
    )

    return <>{action}</>
}

export default DeletePrintImageAction
