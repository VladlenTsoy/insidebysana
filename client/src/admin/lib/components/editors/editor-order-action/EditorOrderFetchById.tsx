import {Empty} from "antd"
import {LoadingBlock} from "admin/lib/ui"
import React, {Dispatch, SetStateAction, useEffect, useState} from "react"
import {apiRequest} from "admin/utils/api"
import EditorOrder from "./editor-order/EditorOrder"

interface EditorOrderFetchByIdProps {
    orderId?: string
    setLoadingFinish?: Dispatch<SetStateAction<boolean>>
    close?: any
}

const EditorOrderFetchById: React.FC<EditorOrderFetchByIdProps> = ({orderId}) => {
    const [order, setOrder] = useState<any>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (orderId)
            (async () => {
                setLoading(true)
                try {
                    const response = await apiRequest("get", `admin/order/${orderId}/edit`)
                    setOrder(response)
                } catch (e) {
                    console.error(e)
                }
                setLoading(false)
            })()
    }, [orderId])

    if (orderId && loading) return <LoadingBlock />

    if (orderId && !order) return <Empty />

    return <EditorOrder order={order} />
}
export default EditorOrderFetchById
