import {Col, Row, Form, Button} from "antd"
import React, {useCallback, useEffect, useState} from "react"
import LeftSidebar from "./left-sidebar/LeftSidebar"
import "./ProductEditor.less"
import BaseSection from "./content/BaseSection"
import PropertiesSection from "./content/PropertiesSection"
import PriceQtySection from "./content/PriceQtySection"
import PhotosSection from "../../photos-section/PhotosSection"
import StatusPublishingSection from "./content/StatusPublishingSection"
import MeasurementsSection from "./content/MeasurementsSection"
import HeaderPage from "admin/components/header-page/HeaderPage"
import ContainerPage from "admin/components/container-page/ContainerPage"
import {Moment} from "moment"
import {useCreateProductMutation, useEditProductMutation} from "../productApi"
import {useHistory, useParams} from "react-router"
import {useGetProductByIdQuery} from "../productApi"
import LoadingBlock from "components/blocks/loading-block/LoadingBlock"

export interface FormData {
    category_id: number
    color_id: number
    sizes?: string[]
    title: string
    price: number
    discount?: number
    end_at?: Moment
    home_position?: number
    is_new?: boolean
    measurements?: {
        id?: undefined | number
        title: string
        descriptions: {[sizeId: number]: string}
    }[]
    properties?: {title: string; description: string}[]
    save_properties?: string[]
    status: "draft" | "published" | "archive" | "ending"
    tags_id?: string[]
}

export interface TemporaryImageType {
    id: number
    imageUrl: string
    loading: boolean
    isSaved?: boolean
    imagePath?: string
    imageName?: string
    imageSize?: number
}

const CreateProduct: React.FC = () => {
    const [basicValues, setBasicValues] = useState({status: "draft"})
    const [selectedSizeIds, setSelectedSizeIds] = useState<string[]>([])
    const [imageUrls, setImageUrl] = useState<TemporaryImageType[]>([])
    const [createProduct, {isLoading: isCreateLoading}] = useCreateProductMutation()
    const [updateProduct, {isLoading: isUpdateLoading}] = useEditProductMutation()
    const [form] = Form.useForm()
    const history = useHistory()
    const params = useParams<{id: string}>()
    const {data, isLoading: isFetchLoading} = useGetProductByIdQuery(params?.id, {skip: !params?.id})

    const onSelectSizesHandler = useCallback((sizesIds: string[]) => {
        setSelectedSizeIds(sizesIds)
    }, [])

    const clearHomePosition = useCallback(() => {
        form.setFieldsValue({home_position: undefined})
    }, [form])

    const onFinishHandler = async (values: FormData) => {
        const images = imageUrls.map(image => ({
            id: image.id,
            name: image.imageName,
            path: image.imagePath,
            size: image.imageSize,
            isSaved: image.isSaved
        }))
        if (data) {
            await updateProduct({
                ...values,
                images: images,
                id: data.id
            })
            history.goBack()
        } else {
            await createProduct({
                ...values,
                images: images
            })
            history.push(`/products/${values.status}`)
        }
    }

    useEffect(() => {
        if (data) {
            setBasicValues(data)
            setSelectedSizeIds(data.sizes)
            setImageUrl(
                data.images.map((image: any) => ({
                    id: image.id,
                    imageUrl: image.url,
                    imagePath: image.path,
                    imageName: image.name,
                    imageSize: image.size,
                    isSaved: true,
                    loading: false
                }))
            )
        }
    }, [data])

    return (
        <div className="create-product-page">
            <HeaderPage
                title={params.id ? `Изменить товар` : `Добавить товар`}
                action={
                    <Button
                        type="primary"
                        size="large"
                        form="editor-product"
                        htmlType="submit"
                        loading={isCreateLoading || isUpdateLoading}
                    >
                        Сохранить
                    </Button>
                }
            />
            <ContainerPage>
                {isFetchLoading ? (
                    <LoadingBlock />
                ) : (
                    <Row gutter={28}>
                        <Col span={5}>
                            <LeftSidebar />
                        </Col>
                        <Col span={14}>
                            <Form
                                layout="vertical"
                                size="large"
                                form={form}
                                onFinish={onFinishHandler}
                                initialValues={data || basicValues}
                                id="editor-product"
                            >
                                <BaseSection onSelectSizesHandler={onSelectSizesHandler} />
                                <PropertiesSection />
                                <PriceQtySection selectedSizeIds={selectedSizeIds} />
                                <PhotosSection imageUrls={imageUrls} setImageUrl={setImageUrl} />
                                <MeasurementsSection selectedSizeIds={selectedSizeIds} />
                                <StatusPublishingSection
                                    clearHomePositon={clearHomePosition}
                                    homePosition={data?.home_position}
                                />
                            </Form>
                        </Col>
                        <Col span={5}/>
                    </Row>
                )}
            </ContainerPage>
        </div>
    )
}
export default CreateProduct
