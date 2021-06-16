import {Empty} from "antd"
import {LoadingBlock} from "lib/ui"
import React, {Dispatch, SetStateAction, useEffect, useState} from "react"
import {apiRequest} from "utils/api"
import EditorOrder from "./editor-order/EditorOrder"

interface EditorOrderFetchByIdProps {
    orderId?: number
    setLoadingFinish: Dispatch<SetStateAction<boolean>>
    close: any
}

const EditorOrderFetchById: React.FC<EditorOrderFetchByIdProps> = ({orderId, setLoadingFinish, close}) => {
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

    return <EditorOrder setLoadingFinish={setLoadingFinish} close={close} order={order} />
}
export default EditorOrderFetchById
