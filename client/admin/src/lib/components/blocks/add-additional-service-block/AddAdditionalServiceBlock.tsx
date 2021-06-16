import {DeleteOutlined, PlusOutlined} from "@ant-design/icons"
import {Button, Dropdown, Menu} from "antd"
import InputPlusMinus from "lib/components/form/input-plus-minus/InputPlusMinus"
import {LoadingBlock} from "lib/ui"
import React, {Dispatch, SetStateAction, useEffect} from "react"
import {fetchAdditionalServices} from "store/admin/additional-service/fetchAdditionalServices"
import {useAdminDispatch} from "store/admin/store"
import {
    useLoadingAdditionalServices,
    useSelectAllAdditionalServices
} from "store/common/additional-service/additionalServiceSelectors"
import {formatPrice} from "utils/formatPrice"
import "./AddAdditionalServiceBlock.less"

export interface SelectAdditionalService {
    id: number
    title: string
    price: number
    qty: number
}

interface AddAdditionalServiceBlockProps {
    selectAdditionalServices: SelectAdditionalService[]
    updateSelectAdditionalServices: Dispatch<SetStateAction<SelectAdditionalService[]>>
}

const AddAdditionalServiceBlock: React.FC<AddAdditionalServiceBlockProps> = ({
    selectAdditionalServices,
    updateSelectAdditionalServices
}) => {
    const loading = useLoadingAdditionalServices()
    const additionalServices = useSelectAllAdditionalServices()
    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchAdditionalServices())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    const clickHandler = (additionalService: any) => {
        updateSelectAdditionalServices(prevState => {
            const checkAdditionalService = prevState.find(
                _additionalService => _additionalService.id === additionalService.id
            )
            if (checkAdditionalService)
                return prevState.map(_additionalService => {
                    if (additionalService.id === _additionalService.id) _additionalService.qty += 1
                    return _additionalService
                })
            else return [...prevState, {...additionalService, qty: 1}]
        })
    }

    const updateQtyHandler = (additionalServiceId: number, qty: number) => {
        updateSelectAdditionalServices(prevState =>
            prevState.map(_additionalService => {
                if (additionalServiceId === _additionalService.id) _additionalService.qty = qty
                return _additionalService
            })
        )
    }

    const removeHandler = (additionalService: any) => {
        updateSelectAdditionalServices(prevState =>
            prevState.filter(_additionalService => additionalService.id !== _additionalService.id)
        )
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
        <div className="add-additional-service">
            <div className="list-additional-services">
                {selectAdditionalServices.map(additionalService => (
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
                <div className="action-block">
                    <PlusOutlined />
                    <span>Добавить доп. услугу</span>
                </div>
            </Dropdown>
        </div>
    )
}
export default AddAdditionalServiceBlock
