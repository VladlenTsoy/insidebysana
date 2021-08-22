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
import {PlusOutlined} from "@ant-design/icons"
import EditorStatusAction from "../../../../../lib/components/editors/editor-status-action/EditorStatusAction"
import ScrollContainer from "react-indiana-drag-scroll"
import OrdersArchiveDrawer from "./orders-archive-drawer/OrdersArchiveDrawer"

const Orders = () => {
    const dispatch = useAdminDispatch()
    const statuses = useSelectAllStatuses()
    const [, setCacheDispatches] = useState<any[]>([])

    const onDragEnd = (result: any) => {
        const {type, destination, source, draggableId} = result

        // Проверка на следующую колонну если не выбранна
        if (!destination) return
        // Проверка на следующую колонну если та же
        if (destination.droppableId === source.droppableId && destination.index === source.index) return

        if (type === "order") {
            const startStatusId = Number(source.droppableId.replace("drop-", ""))
            const finishStatusId = Number(destination.droppableId.replace("drop-", ""))
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
                const caches = prevState.filter(item => item.orderId === orderId)
                if (caches.length) {
                    caches.map(cache => cache.dispatcher.abort())
                    const nextState = prevState.filter(item => item.orderId !== orderId)
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
        const promise = dispatch(fetchOrders())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <ScrollContainer hideScrollbars={false} ignoreElements=".order-card, .title">
                <div className="container">
                    <Droppable direction="horizontal" droppableId="statuses" type="status">
                        {provided => (
                            <div className="columns" {...provided.droppableProps} ref={provided.innerRef}>
                                {statuses.map((status, key) => (
                                    <StatusColumn status={status} index={key} key={status.id} />
                                ))}
                                {provided.placeholder}
                                <div className="column-create">
                                    <EditorStatusAction>
                                        <Button type="primary" size="large" block icon={<PlusOutlined />}>
                                            Добвить статус
                                        </Button>
                                    </EditorStatusAction>
                                    <OrdersArchiveDrawer />
                                </div>
                            </div>
                        )}
                    </Droppable>
                </div>
            </ScrollContainer>
        </DragDropContext>
    )
}

export default Orders
