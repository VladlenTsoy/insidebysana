import {Col, Row, Form, Button} from "antd"
import React, {useCallback, useEffect, useState} from "react"
import LeftSidebar from "./left-sidebar/LeftSidebar"
import "./ProductEditor.less"
import BaseSection from "./content/BaseSection"
import PropertiesSection from "./content/PropertiesSection"
import PriceQtySection from "./content/PriceQtySection"
import PhotosSection from "./photos-section/PhotosSection"
import StatusPublishingSection from "./content/StatusPublishingSection"
import MeasurementsSection from "./content/MeasurementsSection"
import HeaderPage from "admin/components/header-page/HeaderPage"
import ContainerPage from "admin/components/container-page/ContainerPage"
import {Moment} from "moment"
import {useCreateProductMutation} from "../productApi"
import {useHistory, useParams} from "react-router"
import {useGetProductByIdQuery} from "../productApi"

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
    imagePath?: string
    imageName?: string
}

const CreateProduct: React.FC = () => {
    const [basicValues, setBasicValues] = useState({status: "draft"})
    const [selectedSizeIds, setSelectedSizeIds] = useState<string[]>([])
    const [imageUrls, setImageUrl] = useState<TemporaryImageType[]>([])
    const [createProduct, {isLoading}] = useCreateProductMutation()
    const [form] = Form.useForm()
    const history = useHistory()
    const params = useParams<{id: string}>()
    const {data, isLoading: fetchLoading} = useGetProductByIdQuery(params?.id, {skip: !params?.id})

    // console.log(params, data)

    const onSelectSizesHandler = useCallback((sizesIds: string[]) => {
        setSelectedSizeIds(sizesIds)
    }, [])

    const clearHomePositon = useCallback(() => {
        form.setFieldsValue({home_position: undefined})
    }, [form])

    const onFinishHandler = async (values: FormData) => {
        const pathToImages = imageUrls.map(image => image.imageName)
        await createProduct({
            ...values,
            images: pathToImages
        })
        history.push(`/products/${values.status}`)
    }

    useEffect(() => {
        if (data) {
            setBasicValues(data)
            setSelectedSizeIds(data.sizes)
        }
    }, [data])

    if (fetchLoading) return <></>

    return (
        <div className="create-product-page">
            <HeaderPage
                title="Добавить товар"
                action={
                    <Button
                        type="primary"
                        size="large"
                        form="editor-product"
                        htmlType="submit"
                        loading={isLoading}
                    >
                        Сохранить
                    </Button>
                }
            />
            <ContainerPage>
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
                                clearHomePositon={clearHomePositon}
                                homePosition={data?.home_position}
                            />
                        </Form>
                    </Col>
                    <Col span={5}></Col>
                </Row>
            </ContainerPage>
        </div>
    )
}
export default CreateProduct
