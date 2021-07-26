import Button from "components/button/Button"
import EmptyBlock from "components/empty-block/EmptyBlock"
import LoaderBlock from "components/loader-block/LoaderBlock"
import React from "react"
// import {ArrowLeftOutlined} from "@ant-design/icons"
import styled from "./AdditionalService.module.css"
import TypesAdditionalServices from "./types-additional-services/TypesAdditionalServices"
import {AdditionalService as AdditionalServiceType} from "types/AdditionalService"
import {useGetAdditionalServiceApisQuery} from "./additionalServiceApi"

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
    const {data: additionalServices = [], isLoading} = useGetAdditionalServiceApisQuery()

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
            {isLoading ? (
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
                {/* <Button onClick={backDelivery} link icon={<ArrowLeftOutlined />}>
                    Назад
                </Button> */}
                <Button type="default" onClick={onClickHandler}>
                    Выбрать оплату
                </Button>
            </div>
        </div>
    )
}
export default AdditionalService
