import Button from "components/button/Button"
import EmptyBlock from "components/empty-block/EmptyBlock"
import LoaderBlock from "components/loader-block/LoaderBlock"
import React, {useState} from "react"
import PlusOutlined from "@ant-design/icons/PlusOutlined"
import LeftOutlined from "@ant-design/icons/LeftOutlined"
import DeleteOutlined from "@ant-design/icons/DeleteOutlined"
import Drawer from "components/drawer/Drawer"
import styled from "./DeliveryAddresses.module.css"
import Form from "./Form"
import {useScreenSize} from "hooks/useScreenSize"
import {useDeleteAddressMutation, useGetAddressesQuery} from "./addressApi"

const DeliveryAddresses: React.FC = () => {
    const {data: addresses = [], isLoading} = useGetAddressesQuery()
    const [deleteAddress, {isLoading: isLoadingDelete}] = useDeleteAddressMutation()
    const [visible, setVisible] = useState(false)
    const {width} = useScreenSize()

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    const onClickHandler = async (id: number) => {
        const result = await window.confirm("Удалить?")

        if (result) {
            deleteAddress(id)
        }
    }

    return (
        <div className={styled.delivery}>
            <Button icon={<PlusOutlined />} onClick={open}>
                Добавить адрес
            </Button>
            <div>
                {isLoading || isLoadingDelete ? (
                    <LoaderBlock />
                ) : !addresses.length ? (
                    <EmptyBlock />
                ) : (
                    <div className={styled.wrapperTable}>
                        <table className={styled.tableDeliveries}>
                            <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Имя</th>
                                    <th>Телефон</th>
                                    <th>Страна</th>
                                    <th>Город</th>
                                    <th>Адрес</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {addresses.map(address => (
                                    <tr key={address.id}>
                                        <td>{address.title}</td>
                                        <td>{address.full_name}</td>
                                        <td>{address.phone}</td>
                                        <td>{address.country_name}</td>
                                        <td>{address.city_name}</td>
                                        <td>{address.address}</td>
                                        <td>
                                            <div
                                                className={styled.action}
                                                onClick={() => onClickHandler(address.id)}
                                            >
                                                <DeleteOutlined />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Drawer onClose={close} visible={visible} placement="right" width={width > 500 ? 500 : "100%"}>
                <div className={styled.wrapper}>
                    <div className={styled.header}>
                        <Button link icon={<LeftOutlined />} onClick={close}>
                            Назад
                        </Button>
                    </div>
                    <Form close={close} />
                </div>
            </Drawer>
        </div>
    )
}

export default DeliveryAddresses
