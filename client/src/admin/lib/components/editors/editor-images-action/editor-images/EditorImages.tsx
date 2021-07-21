import React, {useCallback, useEffect} from "react"
import {ProductColor} from "../../../../types/product/ProductColor"
import UploadImages from "../../../form/upload-images/UploadImages"
import {useAdminDispatch} from "../../../../../store/admin/store"
import {
    useLoadingProductColorImages,
    useSelectImagesByProductColorId
} from "../../../../../store/admin/product-color-image/productColorImageSelectors"
import {LoadingBlock} from "../../../../ui"
import {deleteImage} from "../../../../../store/admin/product-color-image/deleteImage"
import {uploadImage} from "../../../../../store/admin/product-color-image/uploadImage"
import {fetchImages} from "../../../../../store/admin/product-color-image/fetchImages"

interface EditorImagesProps {
    productColorId: ProductColor["id"]
}

const EditorImages: React.FC<EditorImagesProps> = ({productColorId}) => {
    const dispatch = useAdminDispatch()
    const images = useSelectImagesByProductColorId(productColorId)
    const fetchLoading = useLoadingProductColorImages()

    // Удаление картинки
    const removeHandler = useCallback((file: any) => {
        dispatch(deleteImage(file.id))
    }, [dispatch])

    // Загрузка картинка
    const requestHandler = useCallback(async (form: any) => {
        await dispatch(uploadImage({productColorId: productColorId, data: form}))
    }, [dispatch, productColorId])

    useEffect(() => {
        const promise = dispatch(fetchImages(productColorId))
        return () => {
            promise.abort()
        }
    }, [productColorId, dispatch])

    if (fetchLoading)
        return <LoadingBlock />


    return (
        <UploadImages
            key="editor-image-upload"
            remove={removeHandler}
            request={requestHandler}
            fileList={JSON.parse(JSON.stringify(images))}
        />
    )
}

export default React.memo<EditorImagesProps>(EditorImages)