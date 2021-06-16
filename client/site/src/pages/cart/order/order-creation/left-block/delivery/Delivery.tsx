import React, {useEffect, useState} from "react"
import styled from "./Delivery.module.css"
import ArrowLeftOutlined from "@ant-design/icons/ArrowLeftOutlined"
import Button from "components/button/Button"
import LoaderBlock from "components/loader-block/LoaderBlock"
import TypesDelivery from "./types-delivery/TypesDelivery"
import {Delivery} from "types/delivery"
import {api} from "utils/api"
import axios from "axios"
import EmptyBlock from "components/empty-block/EmptyBlock"

interface DeliveryProps {
    delivery: Delivery | null
    information: any
    onChangeDelivery: any
    onSubmitDelivery: any
    backInformation: any
}

const DeliveryBlock: React.FC<DeliveryProps> = (
    {
        delivery,
        information,
        onChangeDelivery,
        onSubmitDelivery,
        backInformation
    }
) => {
    const [loading, setLoading] = useState(false)
    const [typesDelivery, setTypesDelivery] = useState<Delivery[]>([])
    const [selectDelivery, setSelectDelivery] = useState<Delivery | null>(delivery)

    const onChangeHandler = (value: string) => {
        const select = typesDelivery.find(val => val.id === Number(value)) || null
        setSelectDelivery(select)
        onChangeDelivery(select)
    }

    const onClickHandler = () => {
        if (selectDelivery)
            onSubmitDelivery(selectDelivery)
    }

    useEffect(() => {
        const source = axios.CancelToken.source();

        (async () => {
            setLoading(true)
            const response = await api.guest.post("delivery", {country: information.country}, {cancelToken: source.token})
            setTypesDelivery(response.data)
            setLoading(false)
        })()

        return () => {
            source.cancel()
        }
    }, [information])

    return (
        <div className={styled.delivery}>
            <h2>Виды доставки</h2>
            {
                loading ?
                    <LoaderBlock /> :
                    typesDelivery.length ?
                        <TypesDelivery
                            types={typesDelivery}
                            name="types"
                            defaultChecked={delivery?.id}
                            onChange={onChangeHandler}
                        /> :
                        <EmptyBlock />
            }
            <div className={styled.button}>
                <Button onClick={backInformation} link icon={<ArrowLeftOutlined />}>Назад</Button>
                <Button type="default" onClick={onClickHandler} disabled={!selectDelivery}>
                    Далее
                </Button>
            </div>
        </div>
    )
}

export default DeliveryBlock