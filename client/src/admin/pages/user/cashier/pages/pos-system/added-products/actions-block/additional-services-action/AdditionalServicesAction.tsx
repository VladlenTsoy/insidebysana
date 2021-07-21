import {DeleteOutlined, PlusOutlined} from "@ant-design/icons"
import {Button, Dropdown, Menu} from "antd"
import InputPlusMinus from "admin/lib/components/form/input-plus-minus/InputPlusMinus"
import {LoadingBlock} from "admin/lib/ui"
import React, {useEffect} from "react"
import {fetchAdditionalServicesCashier} from "admin/store/cashier/additional-service/fetchAdditionalServices"
import {useAdditionalServicesPos} from "admin/store/cashier/pos/posSelectors"
import {
    addAdditionalService,
    removeAdditionalService,
    updateQtyAdditionalService
} from "admin/store/cashier/pos/posSlice"
import {useCashierDispatch} from "admin/store/cashier/store"
import {
    useLoadingAdditionalServices,
    useSelectAllAdditionalServices
} from "admin/store/common/additional-service/additionalServiceSelectors"
import {formatPrice} from "admin/utils/formatPrice"

const AdditionalServicesAction: React.FC = () => {
    const loading = useLoadingAdditionalServices()
    const additionalServices = useSelectAllAdditionalServices()
    const posAdditionalServices = useAdditionalServicesPos()
    const dispatch = useCashierDispatch()

    useEffect(() => {
        const promise = dispatch(fetchAdditionalServicesCashier())
        return () => {
            promise.abort()
        }
    }, [dispatch])

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
            {loading ? (
                <LoadingBlock />
            ) : (
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
