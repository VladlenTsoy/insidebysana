import React, {useCallback} from "react"
import styled from "./Header.module.css"
import Button from "../../../../../components/button/Button"
import ArrowLeftOutlined from "@ant-design/icons/ArrowLeftOutlined"

interface HeaderProps {
    onClose: any
    changeStep: any
    step: string
}

const Header: React.FC<HeaderProps> = ({onClose, step, changeStep}) => {
    const backInformation = useCallback(() => changeStep("information"), [changeStep])
    const backDelivery = useCallback(() => changeStep("delivery"), [changeStep])
    const backAdditionalService = useCallback(() => changeStep("additional-service"), [changeStep])

    return (
        <div className={styled.header}>
            <div className="backAction">
                {step === "information" && (
                    <Button type="secondary" icon={<ArrowLeftOutlined />} link onClick={onClose}>
                        Вернуться к корзине
                    </Button>
                )}
                {step === "delivery" && (
                    <Button type="secondary" icon={<ArrowLeftOutlined />} link onClick={backInformation}>
                        Назад
                    </Button>
                )}
                {step === "additional-service" && (
                    <Button type="secondary" icon={<ArrowLeftOutlined />} link onClick={backDelivery}>
                        Назад
                    </Button>
                )}
                {step === "payment" && (
                    <Button
                        type="secondary"
                        icon={<ArrowLeftOutlined />}
                        link
                        onClick={backAdditionalService}
                    >
                        Назад
                    </Button>
                )}
            </div>
            <h1>Оформление заказа</h1>
        </div>
    )
}

export default Header
