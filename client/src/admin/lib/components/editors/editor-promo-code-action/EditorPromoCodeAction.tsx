import React, {useCallback, useState} from "react"
import {Modal} from "antd"
import {PromoCode} from "../../../types/PromoCode"
import EditorPromoCode from "./editor-promo-code/EditorPromoCode"

interface EditorPromoCodeActionProps {
    promoCode?: PromoCode
}

const EditorPromoCodeAction: React.FC<EditorPromoCodeActionProps> = ({promoCode, children}) => {
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const close = useCallback(() => setVisible(false), [])
    const handleClick = () => setVisible(true)

    const action = React.Children.map(children, (child: any) =>
        React.cloneElement(child, {onClick: handleClick})
    )

    return (
        <>
            {action}
            <Modal
                destroyOnClose
                title={promoCode ? "Редактировать промокод" : "Создать промокод"}
                visible={visible}
                onCancel={close}
                okText="Сохранить"
                confirmLoading={loading}
                okButtonProps={{htmlType: "submit", form: "editor-promo-code-modal"}}
            >
                <EditorPromoCode close={close} promoCode={promoCode} setLoading={setLoading} />
            </Modal>
        </>
    )
}

export default EditorPromoCodeAction