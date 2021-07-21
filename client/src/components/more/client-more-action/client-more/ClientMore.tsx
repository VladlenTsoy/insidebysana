import {DollarCircleOutlined, HeartOutlined, ShoppingCartOutlined} from "@ant-design/icons"
import {Tabs} from "antd"
import {Client} from "types/Client"
import Orders from "./orders/Orders"
import React, {useEffect} from "react"
import Cart from "./cart/Cart"
import Wishlist from "./wishlist/Wishlist"
import Details from "./details/Details"
// import {useSelectClientById} from "store/admin/client/clientSelectors"
// import {useAdminDispatch} from "store/admin/store"
// import {fetchClientById} from "store/admin/client/fetchClientById"
// import {LoadingBlock} from "lib/ui"

const {TabPane} = Tabs

interface ClientMoreProps {
    clientId: Client["id"]
}

const ClientMore: React.FC<ClientMoreProps> = ({clientId}) => {
    // const client = useSelectClientById(clientId)
    // const dispatch = useAdminDispatch()

    // useEffect(() => {
    //     const promise = dispatch(fetchClientById(clientId))
    //     return () => {
    //         promise.abort()
    //     }
    // }, [dispatch, clientId])

    // return (
    //     <>
    //         {client ? <Details client={client} /> : <LoadingBlock maxHeight="250px" />}
    //         <Tabs defaultActiveKey="1" size="large">
    //             <TabPane
    //                 tab={
    //                     <>
    //                         <DollarCircleOutlined />
    //                         Сделки
    //                     </>
    //                 }
    //                 key="1"
    //             >
    //                 <Orders clientId={clientId} />
    //             </TabPane>
    //             <TabPane
    //                 tab={
    //                     <>
    //                         <ShoppingCartOutlined />
    //                         Корзина
    //                     </>
    //                 }
    //                 key="2"
    //             >
    //                 <Cart clientId={clientId} />
    //             </TabPane>
    //             <TabPane
    //                 tab={
    //                     <>
    //                         <HeartOutlined />
    //                         Избранное
    //                     </>
    //                 }
    //                 key="3"
    //             >
    //                 <Wishlist clientId={clientId} />
    //             </TabPane>
    //         </Tabs>
    //     </>
    // )
    return <></>
}
export default ClientMore
