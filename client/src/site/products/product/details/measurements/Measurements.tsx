import React from "react"
import styled from "./Measurements.module.css"
import {useGetMeasurementsApiByProductIdQuery} from "./measurementApi"
import {ProductColor} from "types/productColor"
import LoaderBlock from "components/loader-block/LoaderBlock"

interface MeasurementsProps {
    productId: ProductColor["product_id"]
}

const Measurements: React.FC<MeasurementsProps> = ({productId}) => {
    const {data: measurements} = useGetMeasurementsApiByProductIdQuery(productId)

    if (!measurements) return <LoaderBlock />

    if (measurements.sizes.length && measurements.titles.length)
        return (
            <div className={styled.measurements}>
                <table>
                    <tbody>
                        <tr>
                            <td>Размер</td>
                            {measurements.titles.map((title, key) => (
                                <td key={key}>{title}</td>
                            ))}
                        </tr>
                        {measurements.sizes.map((measurement, key) => (
                            <tr key={key}>
                                <td>{measurement.name}</td>
                                {measurement.descriptions.map((desc, key) => (
                                    <td key={key}>{desc}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )

    return <></>
}

export default Measurements
