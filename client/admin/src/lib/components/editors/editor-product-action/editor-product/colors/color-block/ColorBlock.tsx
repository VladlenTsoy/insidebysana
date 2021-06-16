import React from "react"
import {Color} from "lib/types/Color"
import {Size} from "lib/types/Size"
import {useSelectColorById} from "store/admin/color/colorSelectors"
import "./ColorBlock.less"
import TagSize from "./tag-size/TagSize"
import {MinusCircleOutlined} from "@ant-design/icons"
import {Modal} from "antd"
import EditIcon from "./edit-icon/EditIcon"

interface ColorBlockProps {
    colorValues: {
        color_id: Color["id"]
        images: string[]
        sizes: Size["id"][]
        props: {
            [key: string]: {
                qty: number
                cost_price: number
                min_qty: number
            }
        }
    }
    index: number
    setColorsValues: any
}

const ColorBlock: React.FC<ColorBlockProps> = ({colorValues, index, setColorsValues}) => {
    const color = useSelectColorById(colorValues.color_id)

    const removeHandler = (index: number) => {
        Modal.confirm({
            title: "Удалить цвет?",
            onOk: () => {
                setColorsValues((prevState: any[]) => prevState.filter((state, key) => key !== index))
            }
        })
    }

    return (
        <div className="color-block">
            <div className="color-info">
                <div className="color-hex" style={{background: color?.hex}} />
                <span className="title">{color?.title}</span>
                <div className="actions">
                    <EditIcon colorValues={colorValues} index={index} setColorsValues={setColorsValues} />
                    <MinusCircleOutlined onClick={() => removeHandler(index)} />
                </div>
            </div>
            <div className="tags">
                {colorValues.sizes.map(sizeId => (
                    <TagSize sizeId={sizeId} key={`color-tag-${sizeId}`} />
                ))}
            </div>
        </div>
    )
}

export default ColorBlock
