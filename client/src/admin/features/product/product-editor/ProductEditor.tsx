import {Col, Row, Form} from "antd"
import React, {useCallback, useState} from "react"
import Header from "./Header"
import LeftSidebar from "./LeftSidebar"
import "./ProductEditor.less"
import BaseSection from "./BaseSection"
import PropertiesSection from "./PropertiesSection"
import PriceQtySection from "./PriceQtySection"
import PhotosSection from "./PhotosSection"
import StatusPublishingSection from "./StatusPublishingSection"
import MeasurementsSection from "./MeasurementsSection"
import {Size} from "types/Size"

const CreateProduct: React.FC = () => {
    const [selectedSizeIds, setSelectedSizeIds] = useState<Size["id"][]>([])

    const onSelectSizesHandler = useCallback((sizesIds: any[]) => {
        setSelectedSizeIds(sizesIds)
    }, [])

    return (
        <>
            <div className="create-product-page">
                <Header />
                <div className="container">
                    <div className="content">
                        <Row gutter={28}>
                            <Col span={5}>
                                <LeftSidebar />
                            </Col>
                            <Col span={14}>
                                <Form
                                    layout="vertical"
                                    size="large"
                                    // form={form}
                                    // onFinish={onFinishHandler}
                                    // initialValues={basicValues}
                                    id="editor-product-basic"
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
                    </div>
                </div>
            </div>
        </>
    )
}
export default CreateProduct
