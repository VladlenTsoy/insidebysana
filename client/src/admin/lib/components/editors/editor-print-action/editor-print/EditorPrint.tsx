import React, {useCallback, useEffect} from "react"
import "./EditorPrint.less"
import {deletePrintImage} from "../../../../../store/admin/product-color-print-image/deletePrintImage"
import {uploadPrintImage} from "../../../../../store/admin/product-color-print-image/uploadPrintImage"
import {fetchPrintImage} from "../../../../../store/admin/product-color-print-image/fetchPrintImage"
import {useAdminDispatch} from "../../../../../store/admin/store"
import {ProductColor} from "../../../../types/product/ProductColor"
import {
    useLoadingPrints,
    useSelectPrintsByProductColorId
} from "../../../../../store/admin/product-color-print-image/productColorPrintSelectors"
import {LoadingBlock} from "../../../../ui"
import UploadImages from "../../../form/upload-images/UploadImages"

interface EditorPrintProps {
    productColor: ProductColor
}

const EditorPrint: React.FC<EditorPrintProps> = ({productColor}) => {
    const prints = useSelectPrintsByProductColorId(productColor.id)
    const dispatch = useAdminDispatch()
    const fetchLoading = useLoadingPrints()

    // Удаление картинки
    const removeHandler = useCallback(
        (file: any) => {
            dispatch(deletePrintImage(file.id))
        },
        [dispatch]
    )

    // Загрузка картинка
    const requestHandler = useCallback(
        async (form: any) => {
            await dispatch(uploadPrintImage({productColorId: productColor.id, data: form}))
        },
        [dispatch, productColor]
    )

    useEffect(() => {
        const promise = dispatch(fetchPrintImage(productColor.id))
        return () => {
            promise.abort()
        }
    }, [productColor, dispatch])

    if (fetchLoading) return <LoadingBlock />

    return (
        <UploadImages
            remove={removeHandler}
            request={requestHandler}
            fileList={JSON.parse(JSON.stringify(prints))}
        />
    )
}

export default EditorPrint
