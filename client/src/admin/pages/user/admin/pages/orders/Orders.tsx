import React, {useEffect, useState} from "react"
import {DragDropContext, Droppable} from "react-beautiful-dnd"
import {Button} from "antd"
import "./Orders.less"
import StatusColumn from "./status-column/StatusColumn"
import {useSelectAllStatuses} from "../../../../../store/admin/status/statusSelectors"
import {useAdminDispatch} from "../../../../../store"
import {updateStatusOrder} from "../../../../../store/admin/order/updateStatusOrder"
import {fetchOrders} from "../../../../../store/admin/order/fetchOrders"
import {updatePositionStatus} from "../../../../../store/admin/status/updatePositionStatus"
import {
    ContainerOutlined,
    DollarOutlined,
    PlusOutlined
} from "@ant-design/icons"
// import EditorStatusAction from "../../../../../lib/components/editors/editor-status-action/EditorStatusAction"
import ScrollContainer from "react-indiana-drag-scroll"
import HeaderPage from "../../../../../components/header-page/HeaderPage"
import ContainerPage from "../../../../../components/container-page/ContainerPage"
import {Link} from "react-router-dom"
import {fetchStatuses} from "../../../../../store/admin/status/fetchStatuses"

const Orders = () => {
    const dispatch = useAdminDispatch()
    const statuses = useSelectAllStatuses()
    const [, setCacheDispatches] = useState<any[]>([])

    const onDragEnd = (result: any) => {
        const {type, destination, source, draggableId} = result

        // Проверка на следующую колонну если не выбранна
        if (!destination) return
        // Проверка на следующую колонну если та же
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return

        if (type === "order") {
            const startStatusId = Number(
                source.droppableId.replace("drop-", "")
            )
            const finishStatusId = Number(
                destination.droppableId.replace("drop-", "")
            )
            const orderId = Number(draggableId.replace("order-", ""))
            // Загрузить обновлениие
            const dispatcher = dispatch(
                updateStatusOrder({
                    id: orderId,
                    prevStatusId: startStatusId,
                    nextStatusId: finishStatusId,
                    position: destination.index,
                    prevPosition: source.index
                })
            )
            // Отменить предыдущее действие
            setCacheDispatches(prevState => {
                const caches = prevState.filter(
                    item => item.orderId === orderId
                )
                if (caches.length) {
                    caches.map(cache => cache.dispatcher.abort())
                    const nextState = prevState.filter(
                        item => item.orderId !== orderId
                    )
                    return [...nextState, {orderId, dispatcher}]
                }
                return [...prevState, {orderId, dispatcher}]
            })
        } else if (type === "status") {
            const finishStatusId = Number(draggableId.replace("status-", ""))
            dispatch(
                updatePositionStatus({
                    id: finishStatusId,
                    position: destination.index,
                    prevPosition: source.index
                })
            )
        }
    }

    useEffect(() => {
        const promiseStatuses = dispatch(fetchStatuses())
        const promise = dispatch(fetchOrders())
        return () => {
            promise.abort()
            promiseStatuses.abort()
        }
    }, [dispatch])

    return (
        <>
            <HeaderPage
                title="Заказы"
                action={
                    <>
                        <Link to="/orders/create">
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                size="large"
                            >
                                Создать
                            </Button>
                        </Link>
                        <Link to="/orders/archive">
                            <Button
                                type="dashed"
                                icon={<ContainerOutlined />}
                                size="large"
                            >
                                Архив
                            </Button>
                        </Link>
                    </>
                }
                icon={<DollarOutlined />}
            />
            <ContainerPage full>
                <DragDropContext onDragEnd={onDragEnd}>
                    <ScrollContainer
                        hideScrollbars={false}
                        ignoreElements=".order-card, .title"
                    >
                        <div className="container">
                            <Droppable
                                direction="horizontal"
                                droppableId="statuses"
                                type="status"
                            >
                                {provided => (
                                    <div
                                        className="columns"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {statuses.map((status, key) => (
                                            <StatusColumn
                                                status={status}
                                                index={key}
                                                key={status.id}
                                            />
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </ScrollContainer>
                </DragDropContext>
            </ContainerPage>
        </>
    )
}

export default Orders
