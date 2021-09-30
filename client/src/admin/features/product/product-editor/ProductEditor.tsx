import {Col, Row, Form, Button} from "antd"
import React, {useCallback, useState} from "react"
import LeftSidebar from "./LeftSidebar"
import "./ProductEditor.less"
import BaseSection from "./BaseSection"
import PropertiesSection from "./PropertiesSection"
import PriceQtySection from "./PriceQtySection"
import PhotosSection from "./photos-section/PhotosSection"
import StatusPublishingSection from "./StatusPublishingSection"
import MeasurementsSection from "./MeasurementsSection"
import {Size} from "types/Size"
import HeaderPage from "admin/components/header-page/HeaderPage"
import ContainerPage from "admin/components/container-page/ContainerPage"

const CreateProduct: React.FC = () => {
    const [selectedSizeIds, setSelectedSizeIds] = useState<Size["id"][]>([])

    const onSelectSizesHandler = useCallback((sizesIds: any[]) => {
        setSelectedSizeIds(sizesIds)
    }, [])

    const onFinishHandler = (values: any) => {
        console.log(values)
    }

    return (
        <div className="create-product-page">
            <HeaderPage
                title="Добавить товар"
                action={
                    <Button type="primary" size="large" form="editor-product" htmlType="submit">
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
                            // form={form}
                            onFinish={onFinishHandler}
                            // initialValues={basicValues}
                            id="editor-product"
                        >
                            <BaseSection onSelectSizesHandler={onSelectSizesHandler} />
                            <PropertiesSection />
                            <PriceQtySection />
                            <PhotosSection />
                            <MeasurementsSection selectedSizeIds={selectedSizeIds} />
                            <StatusPublishingSection />
                        </Form>
                    </Col>
                    <Col span={5}></Col>
                </Row>
            </ContainerPage>
        </div>
    )
}
export default CreateProduct
