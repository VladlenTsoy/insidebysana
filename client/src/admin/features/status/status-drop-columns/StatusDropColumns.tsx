import React, {useEffect, useState} from "react"
import StatusColumn from "./StatusColumn"
import styles from "./StatusDropColumns.module.less"
import {DragDropContext, Droppable} from "react-beautiful-dnd"
import ScrollContainer from "react-indiana-drag-scroll"
import {updateStatusOrder} from "../../../store/admin/order/updateStatusOrder"
import {updatePositionStatus} from "../../../store/admin/status/updatePositionStatus"
import {useAdminDispatch} from "../../../store"
import {Skeleton} from "antd"
import {fetchStatuses} from "../../../store/admin/status/fetchStatuses"
import {
    useLoadingStatuses,
    useSelectAllStatuses
} from "../../../store/admin/status/statusSelectors"

const StatusDropColumns = () => {
    const dispatch = useAdminDispatch()
    const loading = useLoadingStatuses()
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
        const promise = dispatch(fetchStatuses())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    if (loading)
        return (
            <div className={styles.loadingBlock}>
                {Array(5)
                    .fill(1)
                    .map((_, key) => (
                        <div className={styles.loading} key={key}>
                            <Skeleton active />
                            <Skeleton active />
                            <Skeleton active />
                            <Skeleton active />
                        </div>
                    ))}
            </div>
        )

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <ScrollContainer
                hideScrollbars={false}
                ignoreElements=".order-card, .status-title"
            >
                <div className={styles.container}>
                    <Droppable
                        direction="horizontal"
                        droppableId="statuses"
                        type="status"
                    >
                        {provided => (
                            <div
                                className={styles.columns}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {statuses &&
                                    statuses.map((status, key) => (
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
    )
}

export default StatusDropColumns
