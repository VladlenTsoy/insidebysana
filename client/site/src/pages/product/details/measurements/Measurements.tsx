import React, {useEffect} from "react"
import styled from "./Measurements.module.css"
import {useSelectMeasurementById} from "../../../../store/measurement/measurementSelector"
import {ProductColor} from "../../../../types/productColor"
import LoaderBlock from "../../../../components/loader-block/LoaderBlock"
import {useDispatch} from "../../../../store/store"
import {fetchMeasurements} from "../../../../store/measurement/fetchMeasurements"

interface MeasurementsProps {
    productId: ProductColor["product_id"]
}

const Measurements: React.FC<MeasurementsProps> = ({productId}) => {
    const dispatch = useDispatch()
    const measurements = useSelectMeasurementById(productId)

    useEffect(() => {
        const promise = dispatch(fetchMeasurements(productId))
        return () => {
            promise.abort()
        }
    }, [productId, dispatch])

    if (!measurements)
        return <LoaderBlock />

    if (measurements.sizes.length && measurements.titles.length)
        return (
            <div className={styled.measurements}>
                <table>
                    <tbody>
                    <tr>
                        <td>Размер</td>
                        {measurements.titles.map((title, key) =>
                            <td key={key}>
                                {title}
                            </td>
                        )}
                    </tr>
                    {measurements.sizes.map((measurement, key) =>
                        <tr key={key}>
                            <td>{measurement.name}</td>
                            {measurement.descriptions.map((desc, key) => <td key={key}>{desc}</td>)}
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )

    return <></>
}

export default Measurements