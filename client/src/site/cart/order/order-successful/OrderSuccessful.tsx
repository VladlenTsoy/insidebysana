import React from "react"
import styled from "./OrderSuccessful.module.css"
import CheckCircleOutlined from "@ant-design/icons/CheckCircleOutlined"
import ArrowLeftOutlined from "@ant-design/icons/ArrowLeftOutlined"
import Button from "components/button/Button"

interface OrderSuccessfulProps {
    onClose?: any
    orderId: any
}

const OrderSuccessful: React.FC<OrderSuccessfulProps> = ({onClose, orderId}) => {
    return (
        <div className={styled.wrapper}>
            <div className={styled.icon}>
                <CheckCircleOutlined />
            </div>
            <div className={styled.title}>Спасибо, ваш заказ уже оформлен. #{orderId}</div>
            <div className={styled.description}>
                <p>Наш курьер свяжется с вами в самое ближайшее время.</p>
                <p>
                    При возникновении вопросов вы всегда можете обратиться к нам по номеру{" "}
                    <a href="+998901870074">+(998-90)-187-00-74</a>.
                </p>
                <p>Хорошего дня и до скорой встречи :)</p>
            </div>
            {!!onClose && (
                <Button icon={<ArrowLeftOutlined />} onClick={onClose}>
                    Вернуться
                </Button>
            )}
        </div>
    )
}
export default OrderSuccessful
