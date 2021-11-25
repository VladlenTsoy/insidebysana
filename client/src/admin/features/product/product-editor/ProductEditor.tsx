import {Button, Col, Form, Row} from "antd"
import React, {useCallback, useEffect, useState} from "react"
import LeftSidebar from "./left-sidebar/LeftSidebar"
import BaseSection from "./content/BaseSection"
import PropertiesSection from "./content/PropertiesSection"
import PriceQtySection from "./content/PriceQtySection"
import PhotosSection from "../../photos-section/PhotosSection"
import StatusPublishingSection from "./content/StatusPublishingSection"
import MeasurementsSectionModule from "./content/MeasurementsSection"
import HeaderPage from "admin/components/header-page/HeaderPage"
import ContainerPage from "admin/components/container-page/ContainerPage"
import {
    useCreateProductMutation,
    useEditProductMutation,
    useGetProductByIdQuery
} from "../productApi"
import {useHistory, useParams} from "react-router"
import LoadingBlock from "components/blocks/loading-block/LoadingBlock"
import {ProductFormData, TemporaryImageType} from "../../../types/Product"
import {updateDataForEditor} from "../updateData"
import moment from "moment"

interface EditorProductProps {
    product?: any;
}

const EditorProduct: React.FC<EditorProductProps> = ({product}) => {
    const [form] = Form.useForm<any>()
    const [selectedSizes, setSelectedSizes] = useState<
        {id: number, title: string}[]
    >([])
    const [images, setImages] = useState<TemporaryImageType[]>([])
    const params = useParams<{id: string, color?: string}>()
    const [isHomePosition, setIsHomePosition] = useState<boolean>(
        product?.home_position && !params.color
    )
    const history = useHistory()
    const [
        createProduct,
        {isLoading: isCreateLoading}
    ] = useCreateProductMutation()
    const [
        updateProduct,
        {isLoading: isUpdateLoading}
    ] = useEditProductMutation()

    // Выбрать размер
    const onSelectSizesHandler = useCallback((sizesIds: string[], e: any[]) => {
        setSelectedSizes(
            e.map(val => ({title: val.label, id: Number(val.value)}))
        )
    }, [])

    //
    const toggleIsHomePosition = useCallback(
        () => setIsHomePosition(prevState => !prevState),
        []
    )

    // Очистить позицию
    const clearHomePosition = useCallback(
        () => form.setFieldsValue({home_position: undefined}),
        [form]
    )

    const onFinishHandler = useCallback(
        async (values: ProductFormData) => {
            const updatedValues = updateDataForEditor(
                values,
                images,
                params.id,
                product?.product_id
            )
            if (!params.id) {
                await createProduct(updatedValues)
                history.push(`/products/${values.status}`)
            }
            if (params.color) {
                await createProduct(updatedValues)
                history.push(`/products/${values.status}`)
            } else {
                await updateProduct(updatedValues)
                history.goBack()
            }
        },
        [images, params, history, createProduct, updateProduct, product]
    )

    useEffect(() => {
        if (product) {
            form.resetFields()
            if (params.color) {
                setIsHomePosition(false)
                setImages([])
                setSelectedSizes([])
                form.setFieldsValue({
                    status: "draft",
                    colors: product.colors,
                    category_id: product.category_id,
                    properties: product.properties,
                    price: product.price
                })
            } else {
                form.setFieldsValue({
                    ...product,
                    discount: {
                        discount: product.discount.discount,
                        end_at: moment(product.discount.end_at)
                    }
                })
                setIsHomePosition(!!product.home_position)
                setSelectedSizes(
                    Object.values(product.size_props).map((size: any) => ({
                        id: size.size_id,
                        title: size.title
                    }))
                )
                setImages(
                    product.images.map((image: any) => ({
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
        }
    }, [product, form, params])

    return (
        <>
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
                <Row gutter={28}>
                    <Col span={5}>
                        <LeftSidebar colors={product?.colors} />
                    </Col>
                    <Col span={14}>
                        <Form
                            layout="vertical"
                            size="large"
                            form={form}
                            onFinish={onFinishHandler}
                            initialValues={{status: "draft"}}
                            id="editor-product"
                        >
                            <BaseSection
                                onSelectSizesHandler={onSelectSizesHandler}
                            />
                            <PropertiesSection />
                            <PriceQtySection selectedSizes={selectedSizes} />
                            <PhotosSection
                                imageUrls={images}
                                setImageUrl={setImages}
                            />
                            <MeasurementsSectionModule
                                selectedSizes={selectedSizes}
                            />
                            <StatusPublishingSection
                                homePosition={product?.home_position}
                                clearHomePosition={clearHomePosition}
                                isHomePosition={isHomePosition}
                                toggleIsHomePosition={toggleIsHomePosition}
                            />
                        </Form>
                    </Col>
                    <Col span={5} />
                </Row>
            </ContainerPage>
        </>
    )
}

const EditorProductStaticProps = () => {
    const params = useParams<{id: string, color?: string}>()
    const {data, isFetching} = useGetProductByIdQuery(params?.id, {
        skip: !params?.id
    })
    if (isFetching) return <LoadingBlock />
    return <EditorProduct product={data} />
}

export default EditorProductStaticProps
