import React from "react"
import {ProductColor} from "types/productColor"
import Collapse, {Panel} from "rc-collapse"
import motion from "utils/collapseMotionUtil"
import LeftOutlined from "@ant-design/icons/LeftOutlined"
import "rc-collapse/assets/index.css"
import styled from "./Properties.module.css"
import {useGetMeasurementsApiByProductIdQuery} from "../measurements/measurementApi"

const expandIcon = ({isActive}: any) => (
    <LeftOutlined className={`${styled.icon} ${isActive && styled.active}`} />
)

interface PropertiesProps {
    properties: ProductColor["properties"]
    productId: ProductColor["product_id"]
}

const Properties: React.FC<PropertiesProps> = ({properties, productId, children}) => {
    const {data: measurements = []} = useGetMeasurementsApiByProductIdQuery(productId)

    return (
        <div className={styled.properties} id="product-properties">
            <Collapse expandIcon={expandIcon} openMotion={motion}>
                {measurements && (
                    <Panel header="Обмеры" key="measurements">
                        {children}
                    </Panel>
                )}
                {properties &&
                    properties.map((property, key) => (
                        <Panel header={property.title} key={key}>
                            <pre className={styled.pre}>{property.description}</pre>
                        </Panel>
                    ))}
            </Collapse>
        </div>
    )
}

export default Properties
