import React from "react"
import {Draggable, Droppable} from "react-beautiful-dnd"
import Order from "../order/Order"
import {useSelectByStatusId} from "../../../../../../store/admin/order/orderSelectors"
import {Status} from "../../../../../../lib/types/Status"
import {PushpinFilled, SettingOutlined, PlusOutlined, LoadingOutlined} from "@ant-design/icons"
import EditorOrderAction from "../../../../../../lib/components/editors/editor-order-action/EditorOrderAction"
import {Button} from "antd"
import EditorStatusAction from "../../../../../../lib/components/editors/editor-status-action/EditorStatusAction"

interface StatusColumnProps {
    status: Status
    index: number
}

const StatusColumn: React.FC<StatusColumnProps> = ({status, index}) => {
    const orders = useSelectByStatusId(status.id)

    return (
        <Draggable draggableId={`status-${status.id}`} index={index} isDragDisabled={!!status.fixed}>
            {provided => (
                <div className="column" {...provided.draggableProps} ref={provided.innerRef}>
                    <h3 className="title" {...provided.dragHandleProps}>
                        <span className="loading">
                            {!!status.fixed && <PushpinFilled />}
                            {status.loading && <LoadingOutlined />}
                        </span>
                        <span>{status.title}</span>
                        <EditorStatusAction status={status}>
                            <span className="actions">
                                <SettingOutlined />
                            </span>
                        </EditorStatusAction>
                    </h3>

                    <Droppable droppableId={`drop-${status.id}`} type="order">
                        {provided => (
                            <div className="tasks" ref={provided.innerRef} {...provided.droppableProps}>
                                {status.id === 1 && (
                                    <EditorOrderAction>
                                        <Button
                                            size="large"
                                            icon={<PlusOutlined />}
                                            block
                                            style={{marginBottom: "1rem"}}
                                        >
                                            Создать заказ
                                        </Button>
                                    </EditorOrderAction>
                                )}
                                {orders.map((task: any, key: number) => (
                                    <Order task={task} index={key} key={key} />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    )
}

export default StatusColumn
