import React, {useCallback, useState} from "react"
import {Modal} from "antd"
import EditorBanner from "./editor-banner/EditorBanner"
import {Banner} from "../../../../../../../../lib/types/Banner"

interface EditorBannerActionProps {
    banner?: Banner
}

const EditorBannerAction: React.FC<EditorBannerActionProps> = ({children, banner}) => {
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
                visible={visible}
                onCancel={close}
                title={banner ? "Редактировать баннер" : "Создать баннер"}
                okButtonProps={{form: "editor-banner", htmlType: "submit", loading: loading}}
                okText="Сохранить"
                destroyOnClose
            >
                <EditorBanner banner={banner} setLoading={setLoading} close={close} />
            </Modal>
        </>
    )
}

export default EditorBannerAction
