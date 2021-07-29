import {PlusOutlined} from "@ant-design/icons"
import {Button, Dropdown, Menu} from "antd"
import LoadingBlock from "components/blocks/loading-block/LoadingBlock"
import React from "react"
import {addAdditionalService} from "pos/features/cart/cartSlice"
import {useDispatch} from "pos/store"
import {formatPrice} from "utils/formatPrice"
import {useGetAdditionalServicesQuery} from "./additionalServiceApi"
import "./AdditionalServicesAction.less"

const AdditionalServicesAction: React.FC = () => {
    const {data: additionalServices, isLoading} = useGetAdditionalServicesQuery()
    const dispatch = useDispatch()

    if (!(additionalServices && additionalServices.length)) return <></>

    // Добавление доп. услуги
    const clickHandler = (additionalService: any) => dispatch(addAdditionalService(additionalService))

    const menu = (
        <Menu>
            {isLoading ? (
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

    return (
        <>
            <div className="additional-services-action">
                <Dropdown overlay={menu} placement="topCenter" arrow trigger={["click"]}>
                    <Button icon={<PlusOutlined />} size="large" block>
                        Добавить услугу
                    </Button>
                </Dropdown>
            </div>
        </>
    )
}
export default React.memo(AdditionalServicesAction)
