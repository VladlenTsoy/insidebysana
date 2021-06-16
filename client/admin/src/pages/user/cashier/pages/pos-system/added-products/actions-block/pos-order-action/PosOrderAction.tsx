import {Modal} from "antd"
import React, {useCallback, useState} from "react"
import PosOrder from "./PosOrder"

const PosOrderAction: React.FC = ({children}) => {
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(false)

    const close = useCallback(() => setVisible(false), [])
    const handleClick = () => {
        setVisible(true)
    }

    const updateDisabled = useCallback((val: boolean) => setDisabled(val), [])

    const action = React.Children.map(children, (child: any) =>
        React.cloneElement(child, {onClick: handleClick})
    )

    return (
        <>
            {action}
            <Modal
                title="Сделка"
                visible={visible}
                onCancel={close}
                maskClosable={false}
                destroyOnClose
                cancelButtonProps={{size: "large"}}
                okButtonProps={{
                    form: "pos-create-order",
                    htmlType: "submit",
                    loading: loading,
                    size: "large",
                    disabled: disabled
                }}
                okText="Сохранить"
            >
                <PosOrder setLoading={setLoading} close={close} updateDisabled={updateDisabled} />
            </Modal>
        </>
    )
}
export default PosOrderAction
