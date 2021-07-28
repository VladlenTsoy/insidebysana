import Modal from "antd/lib/modal/Modal"
import React, {useCallback, useState} from "react"
import Discount from "./Discount"

const DiscountAction: React.FC = ({children}) => {
    const [visible, setVisible] = useState(false)

    const close = useCallback(() => setVisible(false), [])
    const handleClick = () => setVisible(true)

    const action = React.Children.map(children, (child: any) =>
        React.cloneElement(child, {onClick: handleClick})
    )

    return (
        <>
            {action}
            <Modal
                maskClosable={false}
                title="Добавить скидку"
                visible={visible}
                destroyOnClose
                onCancel={close}
                cancelButtonProps={{size: "large"}}
                okButtonProps={{
                    form: "pos-add-discount",
                    htmlType: "submit",
                    size: "large"
                }}
                okText="Сохранить"
            >
                <Discount close={close} />
            </Modal>
        </>
    )
}
export default DiscountAction
