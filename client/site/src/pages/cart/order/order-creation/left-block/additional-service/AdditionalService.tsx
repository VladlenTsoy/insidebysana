import Button from "components/button/Button"
import EmptyBlock from "components/empty-block/EmptyBlock"
import LoaderBlock from "components/loader-block/LoaderBlock"
import React, {useEffect} from "react"
import {
    useLoadingAdditionalServices,
    useSelectAllAdditionalServices
} from "store/additional-service/additionalServiceSelectors"
import {fetchAdditionalServices} from "store/additional-service/fetchAdditionalServices"
import {useDispatch} from "store/store"
import {ArrowLeftOutlined} from "@ant-design/icons"
import styled from "./AdditionalService.module.css"
import TypesAdditionalServices from "./types-additional-services/TypesAdditionalServices"
import {AdditionalService as AdditionalServiceType} from "types/additionalService"

interface AdditionalServiceProps {
    additionalService: AdditionalServiceType | null
    backDelivery: any
    onChangeAdditionalService: any
    onSubmitAdditionalService: any
}

const AdditionalService: React.FC<AdditionalServiceProps> = ({
    additionalService,
    backDelivery,
    onChangeAdditionalService,
    onSubmitAdditionalService
}) => {
    const additionalServices = useSelectAllAdditionalServices()
    const loading = useLoadingAdditionalServices()
    const dispatch = useDispatch()

    useEffect(() => {
        const promise = dispatch(fetchAdditionalServices())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    const onClickHandler = async () => {
        await onSubmitAdditionalService()
    }

    const onChangeHandler = (value: string) => {
        onChangeAdditionalService(
            additionalServices.find(additionalService => additionalService.id === Number(value)) || null
        )
    }

    return (
        <div>
            <h2 style={{marginBottom: "1rem"}}>Упаковка</h2>
            {loading ? (
                <LoaderBlock />
            ) : additionalServices.length ? (
                <TypesAdditionalServices
                    defaultChecked={additionalService?.id}
                    name="additiona_services_id"
                    onChange={onChangeHandler}
                    types={additionalServices}
                />
            ) : (
                <EmptyBlock />
            )}
            <div className={styled.button}>
                <Button onClick={backDelivery} link icon={<ArrowLeftOutlined />}>
                    Назад
                </Button>
                <Button type="default" onClick={onClickHandler}>
                    Выбрать оплату
                </Button>
            </div>
        </div>
    )
}
export default AdditionalService
