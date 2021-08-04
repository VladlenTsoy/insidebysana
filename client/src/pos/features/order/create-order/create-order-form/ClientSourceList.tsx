import {CheckOutlined, LeftOutlined} from "@ant-design/icons"
import {Input} from "antd"
import React from "react"
import "./ClientSourceList.less"
import {motion} from "framer-motion"
import {useDispatch} from "pos/store"
import {changeClientSource, changeClientSourceComment, useCartParams} from "pos/features/cart/cartSlice"

interface ClientSourceProps {
    id: number
    title: string
    comment?: boolean
}

const sourcesList: ClientSourceProps[] = [
    {title: "Знакома с вашим брендом, покупаю не впервые", id: 1},
    {title: "Реклама в Instagram", id: 2},
    {title: "Предложка в Instagram", id: 3},
    {title: "Рекомендация подруги", id: 4},
    {title: "Другое", id: 5, comment: true}
]

const ClientSourceList: React.FC = () => {
    const {clientSource, clientSourceComment} = useCartParams()
    const dispatch = useDispatch()

    const onChangeHandler = (_clientSource: ClientSourceProps) => dispatch(changeClientSource(_clientSource))

    const backOnClickHandler = () => dispatch(changeClientSource(null))
    const textAreaChangeHandler = (e: any) => dispatch(changeClientSourceComment(e.target.value))

    return (
        <>
            {clientSource?.comment ? (
                <motion.div
                    animate={{opacity: 1, y: 0}}
                    initial={{opacity: 0, y: 20}}
                    className="comment"
                    key="comment"
                >
                    <div className="back" onClick={backOnClickHandler}>
                        <LeftOutlined />
                        <span className="text">Назад</span>
                        <span className="title">{clientSource.title}</span>
                    </div>
                    <Input.TextArea
                        autoFocus
                        rows={4}
                        onChange={textAreaChangeHandler}
                        value={clientSourceComment}
                    />
                </motion.div>
            ) : (
                <motion.fieldset
                    className="source-list"
                    animate={{opacity: 1, y: 0}}
                    initial={{opacity: 0, y: 20}}
                    key="list"
                >
                    <legend>Откуда про нас узнали</legend>
                    <div>
                        {sourcesList.map(sourceItem => (
                            <div
                                className={`source-item ${
                                    clientSource && clientSource.id === sourceItem.id ? "active" : ""
                                }`}
                                key={sourceItem.id}
                                onClick={() => onChangeHandler(sourceItem)}
                            >
                                {clientSource && clientSource.id === sourceItem.id && (
                                    <motion.span
                                        animate={{opacity: 1, x: 0}}
                                        initial={{opacity: 0, x: -20}}
                                        exit={{opacity: 0, x: -20}}
                                        key="icon"
                                    >
                                        <CheckOutlined />
                                    </motion.span>
                                )}
                                <motion.span
                                    animate={
                                        clientSource && clientSource.id === sourceItem.id
                                            ? {x: 20, width: "calc(100% - 20px)"}
                                            : {x: 0, width: "100%"}
                                    }
                                    key="title"
                                >
                                    {sourceItem.title}
                                </motion.span>
                            </div>
                        ))}
                    </div>
                </motion.fieldset>
            )}
        </>
    )
}
export default ClientSourceList
