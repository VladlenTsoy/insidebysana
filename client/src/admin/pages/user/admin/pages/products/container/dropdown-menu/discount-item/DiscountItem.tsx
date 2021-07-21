import React, {useState} from "react"
import {PercentageOutlined} from "@ant-design/icons"
import {Modal, Form, InputNumber, DatePicker} from "antd"
import {ProductColor} from "../../../../../../../../lib/types/product/ProductColor"
import {useAdminDispatch} from "../../../../../../../../store/admin/store"
import {updateDiscount} from "../../../../../../../../store/admin/product-color/updateDiscount"
import moment from "moment"
import {fetchProductColors} from "../../../../../../../../store/admin/product-color/fetchProductColors"

interface DiscountItemProps {
    productColor: ProductColor
}

const DiscountItem: React.FC<DiscountItemProps> = ({productColor}) => {
    const dispatch = useAdminDispatch()
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    const onFinishHandler = async (values: any) => {
        setLoading(true)
        await dispatch(updateDiscount({productColorId: productColor.id, data: values}))
        setLoading(false)
        close()
        dispatch(fetchProductColors())
    }

    return (
        <>
            <div onClick={open}>
                <PercentageOutlined /> Скидки
            </div>
            <Modal
                title="Скидки"
                onCancel={close}
                visible={visible}
                destroyOnClose
                okButtonProps={{form: "editor-discount", htmlType: "submit", loading: loading}}
                okText="Сохранить"
            >
                <Form
                    onFinish={onFinishHandler}
                    id="editor-discount"
                    layout="vertical"
                    initialValues={
                        productColor?.discount
                            ? {
                                  discount: productColor.discount.discount,
                                  end_at: productColor.discount?.end_at ? moment(productColor.discount.end_at, "YYYY-MM-DD") : null
                              }
                            : {}
                    }
                >
                    <Form.Item
                        name="discount"
                        label="Скидка (%)"
                        rules={[{required: true, message: "Введите процент скидки!"}]}
                    >
                        <InputNumber min={0} max={100} style={{width: "100%"}} />
                    </Form.Item>
                    <Form.Item name="end_at" label="До какого">
                        <DatePicker format="DD-MM-YYYY" style={{width: "100%"}} showToday={false} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default DiscountItem
