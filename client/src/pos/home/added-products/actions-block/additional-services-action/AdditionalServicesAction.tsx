import {DeleteOutlined, PlusOutlined} from "@ant-design/icons"
import {Button, Dropdown, Menu} from "antd"
import InputPlusMinus from "components/form/input-plus-minus/InputPlusMinus"
import LoadingBlock from "components/blocks/loading-block/LoadingBlock"
import React from "react"
import {useAdditionalServicesPos} from "pos/features/cart/cartSlice"
import {
    addAdditionalService,
    removeAdditionalService,
    updateQtyAdditionalService
} from "pos/features/cart/cartSlice"
import {useDispatch} from "../../../../store"
import {formatPrice} from "utils/formatPrice"
import {useGetAdditionalServicesQuery} from "./additionalServiceApi"

const AdditionalServicesAction: React.FC = () => {
    const {data: additionalServices, isLoading} = useGetAdditionalServicesQuery()
    const posAdditionalServices = useAdditionalServicesPos()
    const dispatch = useDispatch()

    const clickHandler = (additionalService: any) => {
        dispatch(addAdditionalService(additionalService))
    }

    const updateQtyHandler = (additionalServiceId: number, qty: number) => {
        dispatch(updateQtyAdditionalService({id: additionalServiceId, qty}))
    }

    const removeHandler = (additionalService: any) => {
        dispatch(removeAdditionalService(additionalService.id))
    }

    const menu = (
        <Menu>
            {isLoading ? (
                <LoadingBlock />
            ) : (
                additionalServices &&
                additionalServices.map(additionalService => (
                    <Menu.Item
                        key={additionalService.id}
                        className="additional-service-item"
                        onClick={() => clickHandler(additionalService)}
                    >
                        <span>{additionalService.title}</span>
                        <span className="price">{formatPrice(additionalService.price)} сум</span>
                    </Menu.Item>
                ))
            )}
        </Menu>
    )

    if (!additionalServices) return <></>
    if (!additionalServices.length) return <></>

    return (
        <>
            <div className="list-additional-services">
                {posAdditionalServices.map(additionalService => (
                    <div className="item-additional-service" key={additionalService.id}>
                        <div>
                            <div className="title">{additionalService.title}</div>
                            <div className="price">{formatPrice(additionalService.price)} сум</div>
                        </div>
                        <div>
                            <InputPlusMinus
                                min={1}
                                value={additionalService.qty}
                                onChange={val => updateQtyHandler(additionalService.id, val)}
                            />
                        </div>
                        <div>
                            <Button
                                danger
                                icon={<DeleteOutlined />}
                                size="large"
                                onClick={() => removeHandler(additionalService)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Dropdown overlay={menu} placement="topCenter" arrow trigger={["click"]}>
                <Button icon={<PlusOutlined />} size="large" block>
                    Добавить услугу
                </Button>
            </Dropdown>
        </>
    )
}
export default React.memo(AdditionalServicesAction)
