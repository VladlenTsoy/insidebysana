import {DeleteOutlined, EditOutlined, PercentageOutlined} from "@ant-design/icons"
import Modal from "antd/lib/modal/Modal"
import {OrderDiscount} from "admin/lib/types/Order"
import FormDiscount from "./form-discount/FormDiscount"
import React, {useCallback, useState} from "react"
import "./AddDiscountBlock.less"
import {Button} from "antd"
import {formatPrice} from "admin/utils/formatPrice"

interface AddDiscountBlockProps {
    selectDiscount: OrderDiscount | null
    updateSelectDiscount: (discount: OrderDiscount | null) => void
}

const AddDiscountBlock: React.FC<AddDiscountBlockProps> = ({selectDiscount, updateSelectDiscount}) => {
    const [visible, setVisible] = useState(false)

    const handleClick = useCallback(() => setVisible(true), [])
    const close = useCallback(() => setVisible(false), [])
    const deleteDiscount = useCallback(() => updateSelectDiscount(null), [updateSelectDiscount])

    const onFinishHandler = useCallback(
        (values: any) => {
            updateSelectDiscount(values)
            close()
        },
        [close, updateSelectDiscount]
    )

    return (
        <>
            <div className="add-discount-block">
                {selectDiscount ? (
                    <div className="edit-discount-block">
                        <div className="information">
                            <span className="discount-value">
                                {selectDiscount
                                    ? `${formatPrice(selectDiscount.discount)}${
                                          selectDiscount.type === "percent" ? "%" : " сум"
                                      }`
                                    : 0}
                            </span>
                        </div>
                        <div className="actions-block">
                            <Button
                                type="primary"
                                ghost
                                icon={<EditOutlined />}
                                onClick={handleClick}
                                size="large"
                            />
                            <Button
                                type="primary"
                                ghost
                                danger
                                icon={<DeleteOutlined />}
                                onClick={deleteDiscount}
                                size="large"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="action-block" onClick={handleClick}>
                        <PercentageOutlined />
                        <span>Добавить скидку</span>
                    </div>
                )}
            </div>
            <Modal
                maskClosable={false}
                title="Скидка"
                visible={visible}
                destroyOnClose
                onCancel={close}
                cancelButtonProps={{size: "large"}}
                okButtonProps={{
                    form: "form-add-discount-block",
                    htmlType: "submit",
                    size: "large"
                }}
                okText="Сохранить"
            >
                <FormDiscount selectDiscount={selectDiscount} onFinishHandler={onFinishHandler} />
            </Modal>
        </>
    )
}
export default React.memo(AddDiscountBlock)
