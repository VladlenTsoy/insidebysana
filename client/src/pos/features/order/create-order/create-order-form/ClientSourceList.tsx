import {CheckOutlined, LeftOutlined} from "@ant-design/icons"
import {Input} from "antd"
import React from "react"
import {useState} from "react"
import "./ClientSourceList.less"
import {motion} from "framer-motion"

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
    const [selectClientSource, setSelectClientSource] = useState<ClientSourceProps>()

    const onChangeHandler = (_selectClientSource: ClientSourceProps) => {
        setSelectClientSource(prevState =>
            prevState && prevState.id === _selectClientSource.id ? undefined : _selectClientSource
        )
    }

    const backOnClickHandler = () => setSelectClientSource(undefined)

    return (
        <>
            {selectClientSource?.comment ? (
                <motion.div
                    animate={{opacity: 1, y: 0}}
                    initial={{opacity: 0, y: 20}}
                    className="comment"
                    key="comment"
                >
                    <div className="back" onClick={backOnClickHandler}>
                        <LeftOutlined />
                        <span className="text">Назад</span>
                        <span className="title">{selectClientSource.title}</span>
                    </div>
                    <Input.TextArea autoFocus rows={4} />
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
                                    selectClientSource && selectClientSource.id === sourceItem.id
                                        ? "active"
                                        : ""
                                }`}
                                key={sourceItem.id}
                                onClick={() => onChangeHandler(sourceItem)}
                            >
                                {selectClientSource && selectClientSource.id === sourceItem.id && (
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
                                        selectClientSource && selectClientSource.id === sourceItem.id
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
