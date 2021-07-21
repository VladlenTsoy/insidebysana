import {CarOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons"
import {Button, Drawer} from "antd"
import {Client} from "admin/lib/types/Client"
import {Delivery} from "admin/lib/types/Delivery"
import {OrderAddress} from "admin/lib/types/Order"
import React, {useCallback, useState} from "react"
import {CountriesList} from "admin/utils/countries-list"
import {formatPhone} from "admin/utils/formatPhone"
import {formatPrice} from "admin/utils/formatPrice"
import "./AddDeliveryBlock.less"
import FormDelivery from "./form-delivery/FormDelivery"

interface AddDeliveryBlockProps {
    selectClient: Client | null
    selectDelivery: Delivery | null
    updateSelectDelivery: (delivery: Delivery | null) => void
    selectAddress: OrderAddress | null
    updateSelectAddress: (address: OrderAddress | null) => void
    defaultAddress?: {
        country?: string
    }
}

const AddDeliveryBlock: React.FC<AddDeliveryBlockProps> = ({
    defaultAddress,
    selectClient,
    selectDelivery,
    updateSelectDelivery,
    selectAddress,
    updateSelectAddress
}) => {
    const [visible, setVisible] = useState(false)

    const close = useCallback(() => setVisible(false), [])
    const handleClick = useCallback(() => setVisible(true), [])
    const deleteAddress = useCallback(() => {
        updateSelectAddress(null)
        updateSelectDelivery(null)
    }, [updateSelectAddress, updateSelectDelivery])

    const onFinishHandler = useCallback(
        (values: any) => {
            updateSelectAddress(values)
            close()
        },
        [close, updateSelectAddress]
    )

    return (
        <div className="add-delivery-block">
            {selectAddress ? (
                <div className="edit-address-block">
                    <div className="information">
                        <div>{selectAddress.full_name}</div>
                        <div>{formatPhone(selectAddress.phone)}</div>
                        <div>{CountriesList[selectAddress.country]}</div>
                        <div>{selectAddress.city}</div>
                        <div>{selectAddress.address}</div>
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
                            onClick={deleteAddress}
                            size="large"
                        />
                    </div>
                </div>
            ) : (
                <div className="action-block" onClick={handleClick}>
                    <CarOutlined />
                    <span>Добавить доставку</span>
                </div>
            )}
            {!!selectDelivery && (
                <div className="edit-delivery-block">
                    <div>{selectDelivery.title}</div>
                    <div>{formatPrice(selectDelivery.price)} сум</div>
                </div>
            )}
            <Drawer
                visible={visible}
                title="Доставка"
                onClose={close}
                width="550px"
                destroyOnClose
                footer={
                    <div style={{textAlign: "right"}}>
                        <Button type="primary" form="form-add-delivery-block" size="large" htmlType="submit">
                            Сохранить
                        </Button>
                    </div>
                }
            >
                <FormDelivery
                    defaultAddress={defaultAddress}
                    selectClient={selectClient}
                    selectDelivery={selectDelivery}
                    selectAddress={selectAddress}
                    updateSelectDelivery={updateSelectDelivery}
                    onFinishHandler={onFinishHandler}
                />
            </Drawer>
        </div>
    )
}
export default React.memo<AddDeliveryBlockProps>(AddDeliveryBlock)
