import {
    CreateDataParams,
    EditDataParams,
    ProductFormData,
    TemporaryImageType
} from "../../types/Product"

type UpdateDataForEditorType = (
    values: ProductFormData,
    images: TemporaryImageType[],
    id?: string,
    productId?: number
) => CreateDataParams | EditDataParams

export const updateDataForEditor: UpdateDataForEditorType = (
    values,
    images,
    id,
    productId
) => {
    const formValues: any = values
    const formImages = images.map(image => ({
        id: image.id,
        name: image.imageName,
        path: image.imagePath,
        size: image.imageSize,
        isSaved: image.isSaved
    }))
    formValues.sizes = Object.keys(values.props).map(key => ({
        size_id: Number(key),
        ...values.props[Number(key)]
    }))
    if (id) formValues.id = Number(id)
    if (productId) formValues.product_id = productId
    delete formValues.props
    return {...formValues, image: formImages}
}
