import React, {useCallback, useEffect, useState} from "react"
import "./EditorProductAction.less"
import {Drawer} from "antd"
import EditorProduct from "./editor-product/EditorProduct"
import EditorProductDrawerTitle from "./editor-product-drawer/editor-product-drawer-title/EditorProductDrawerTitle"
import EditorProductDrawerFooter from "./editor-product-drawer/editor-product-drawer-footer/EditorProductDrawerFooter"
import {Product} from "admin/lib/types/product/Product"
import {useAdminDispatch} from "../../../../store/admin/store"
import {fetchProductColors} from "../../../../store/admin/product-color/fetchProductColors"

interface EditorProductActionProps {
    title: string
    productId?: Product["id"]
}

const EditorProductAction: React.FC<EditorProductActionProps> = ({children, title, productId}) => {
    const [visible, setVisible] = useState(false)
    const [current, setCurrent] = useState(0)
    const [loading, setLoading] = useState(false)
    const dispatch = useAdminDispatch()

    const close = useCallback(() => {
        setVisible(false)
        dispatch(fetchProductColors())
    }, [dispatch])
    const handleClick = () => setVisible(true)

    const next = useCallback(() => setCurrent(prevState => prevState + 1), [])
    const prev = useCallback(() => setCurrent(prevState => prevState - 1), [])

    const action = React.Children.map(children, (child: any) =>
        React.cloneElement(child, {onClick: handleClick})
    )

    useEffect(() => {
        visible && setCurrent(0)
    }, [visible])

    return (
        <>
            {action}
            <Drawer
                title={<EditorProductDrawerTitle title={title} current={current} />}
                visible={visible}
                width="100%"
                onClose={close}
                destroyOnClose
                footer={<EditorProductDrawerFooter current={current} prev={prev} loading={loading} />}
            >
                <EditorProduct
                    current={current}
                    next={next}
                    prev={prev}
                    setLoadingFinish={setLoading}
                    close={close}
                    productId={productId}
                />
            </Drawer>
        </>
    )
}

export default EditorProductAction
