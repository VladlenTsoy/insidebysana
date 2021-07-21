import React, {useState} from "react"
import {Form, Input} from "antd"
import "./EditorColor.less"
import {HexColorPicker} from "react-colorful"
import "react-colorful/dist/index.css"
import {useDispatch} from "react-redux"
import {createColor} from "admin/store/admin/color/createColor"
import {Color} from "../../../../types/Color"
import {editColor} from "../../../../../store/admin/color/editColor"

interface EditorColorProps {
    setLoading: any
    close: any
    color?: Color
}

const EditorColor: React.FC<EditorColorProps> = ({setLoading, close, color}) => {
    const [hex, setHex] = useState(color?.hex || "#000")
    const dispatch = useDispatch()

    const handleChangeComplete = (hex: Color["hex"]) => {
        setHex(hex)
    }

    const onFinishHandler = async (values: any) => {
        setLoading(true)
        if (color)
            await dispatch(editColor({id: color.id, data: {...values, hex}}))
        else
            await dispatch(createColor({...values, hex}))
        setLoading(false)
        close()
    }

    return (
        <Form onFinish={onFinishHandler} id="editor-color-modal" layout="vertical" size="large" initialValues={color}>
            <Form.Item label="Название" required name="title">
                <Input required placeholder="Наззвание цвета" />
            </Form.Item>
            <div className="wrapper-color-picker">
                <div>
                    <div className="select-color" style={{background: hex}} />
                </div>
                <div>
                    <HexColorPicker color={hex} onChange={handleChangeComplete} />
                </div>
            </div>
        </Form>
    )
}

export default React.memo(EditorColor)
