import React, {useCallback, useEffect, useState} from "react"
import "./EditorProduct.less"
import {useAdminDispatch} from "store/admin/store"
import {createProduct} from "store/admin/product/createProduct"
import {editProduct} from "store/admin/product/editProduct"
import Basic from "./basic/Basic"
import Colors from "./colors/Colors"
import Measurements from "./measurements/Measurements"
import {fetchProductById} from "store/admin/product/fetchProductById"
import {useSelectProductById} from "store/admin/product/productSelectors"
import {LoadingBlock} from "lib/ui"
import {Product} from "lib/types/product/Product"
import {unwrapResult} from "@reduxjs/toolkit"

interface EditorProductProps {
    productId?: Product["id"]
    next: any
    prev: any
    current: any
    setLoadingFinish: any
    close: any
}

const EditorProduct: React.FC<EditorProductProps> = (
    {
        next,
        prev,
        current,
        setLoadingFinish,
        close,
        productId
    }
) => {
    const [loading, setLoading] = useState(!!productId)
    const product = useSelectProductById(productId)
    const [basicValues, setBasicValues] = useState({})
    const [colorsValues, setColorsValues] = useState<any[]>([])
    const [measurementsValues, setMeasurementsValues] = useState({})

    const dispatch = useAdminDispatch()

    const onFinishHandler = useCallback(
        async measurements => {
            setLoadingFinish(true)
            await new Promise((resolve, reject) => {
                dispatch(
                    productId
                        ? editProduct({
                            productId,
                            data: {
                                basic: basicValues,
                                colors: colorsValues,
                                ...measurements
                            }
                        })
                        : createProduct({
                            basic: basicValues,
                            colors: colorsValues,
                            ...measurements
                        })
                )
                    .then(unwrapResult)
                    .then(() => {
                        setLoadingFinish(false)
                        close()
                        resolve()
                    })
                    .catch(() => {
                        setLoadingFinish(false)
                        reject()
                    })
            })
        },
        [dispatch, basicValues, colorsValues, productId, setLoadingFinish, close]
    )

    useEffect(() => {
        if (productId) {
            const promise = dispatch(fetchProductById(productId))
            return () => {
                promise.abort()
            }
        }
    }, [productId, dispatch])

    useEffect(() => {
        if (productId && product?.basic?.id === Number(productId)) {
            setBasicValues(product.basic)
            setColorsValues(product.colors)
            setMeasurementsValues({measurements: product.measurements})
            const timeout = setTimeout(() => setLoading(false), 500)
            return () => {
                clearTimeout(timeout)
            }
        }
    }, [productId, product])

    if (loading) return <LoadingBlock />

    return (
        <div className="edit-product">
            <div className="steps-content">
                {current === 0 && (
                    <Basic
                        next={next}
                        basicValues={basicValues}
                        setBasicValues={setBasicValues}
                    />
                )}
                {current === 1 && (
                    <Colors
                        next={next}
                        prev={prev}
                        colorsValues={colorsValues}
                        setColorsValues={setColorsValues}
                    />
                )}
                {current === 2 && (
                    <Measurements
                        prev={prev}
                        onFinishHandler={onFinishHandler}
                        colorsValues={colorsValues}
                        measurementsValues={measurementsValues}
                    />
                )}
            </div>
        </div>
    )
}

export default EditorProduct
