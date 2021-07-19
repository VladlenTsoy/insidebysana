import React from "react";
import AddColor from "./add-color/AddColor";
import { Form, Modal } from "antd";
import ColorBlock from "./color-block/ColorBlock";
import "./Colors.less";

interface ColorsProps {
    next: () => void
    prev: () => void
    colorsValues: any[]
    setColorsValues: any
}

const Colors: React.FC<ColorsProps> = ({ next, colorsValues, setColorsValues }) => {
    const onFinishHandler = () => {
        if (colorsValues.length) next();
        else Modal.warning({ title: "Добавьте цвет!" });
    };

    return (
        <Form onFinish={onFinishHandler} id="editor-product-colors">
            <div className="colors">
                {colorsValues.map((colorValues, key) => (
                    <ColorBlock
                        colorValues={colorValues}
                        index={key}
                        key={`color-block-${key}`}
                        setColorsValues={setColorsValues}
                    />
                ))}
                <AddColor setColorsValues={setColorsValues}/>
            </div>
        </Form>
    );
};

export default Colors;
