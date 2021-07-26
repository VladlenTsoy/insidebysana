import React, {useCallback} from "react"
import styled from "./LeftBlock.module.css"
import Header from "../header/Header"
import Information from "./information/Information"
import Delivery from "./delivery/Delivery"
import Payment from "./payment/Payment"
import AdditionalService from "./additional-service/AdditionalService"
import {AdditionalService as AdditionalServiceType} from "types/AdditionalService"

interface LeftBlockProps {
    step: any
    delivery: any
    onClose: any
    changeStep: any
    information: any
    additionalService: AdditionalServiceType | null
    onChangeInformation: any
    onChangeDelivery: any
    onSubmitDelivery: any
    onSubmitPayment: any
    onSubmitAdditionalService: any
    onChangeAdditionalService: any
}

const LeftBlock: React.FC<LeftBlockProps> = ({
    onClose,
    changeStep,
    delivery,
    additionalService,
    onChangeDelivery,
    onSubmitDelivery,
    onChangeInformation,
    information,
    step,
    onSubmitPayment,
    onSubmitAdditionalService,
    onChangeAdditionalService
}) => {
    const backInformation = useCallback(() => changeStep("information"), [changeStep])
    const backDelivery = useCallback(() => changeStep("delivery"), [changeStep])
    const backAdditionalService = useCallback(() => changeStep("additional-service"), [changeStep])

    return (
        <div className={styled.leftBlock}>
            <div className={styled.header}>
                <Header onClose={onClose} step={step} changeStep={changeStep} />
            </div>
            {step === "information" && (
                <Information onChangeInformation={onChangeInformation} information={information} />
            )}
            {step === "delivery" && (
                <Delivery
                    information={information}
                    delivery={delivery}
                    onSubmitDelivery={onSubmitDelivery}
                    onChangeDelivery={onChangeDelivery}
                    backInformation={backInformation}
                />
            )}
            {step === "additional-service" && (
                <AdditionalService
                    additionalService={additionalService}
                    onChangeAdditionalService={onChangeAdditionalService}
                    backDelivery={backDelivery}
                    onSubmitAdditionalService={onSubmitAdditionalService}
                />
            )}
            {step === "payment" && (
                <Payment
                    delivery={delivery}
                    information={information}
                    backAdditionalService={backAdditionalService}
                    onSubmitPayment={onSubmitPayment}
                />
            )}
        </div>
    )
}

export default LeftBlock
