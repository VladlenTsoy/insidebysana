import React, {useState} from "react"
import "./ActionButton.less"
import {Button, Radio} from "antd"
import {PlusOutlined, DeleteOutlined} from "@ant-design/icons"
import {message} from "admin/lib/ui"
import {ProductColor} from "admin/lib/types/product/ProductColor"

interface ActionButtonProps {
    addProduct: any
    deleteProduct: any
    addedProducts: any[]
    product: ProductColor
}

const ActionButton: React.FC<ActionButtonProps> = ({addedProducts, addProduct, deleteProduct, product}) => {
    const [size, setSize] = useState<number | null>(null)

    const isChecked = (key: number) =>
        addedProducts.find(_product => _product.size_id === key && _product.product_color_id === product.id)

    const onChangeHandler = (e: any) => {
        setSize(Number(e.target.value))
    }

    const addClickHandler = (e: any) => {
        e.preventDefault()
        addProduct({
            size_id: size,
            product_color_id: product.id,
            product
        })
        message({type: "success", content: "Товар добавлен!"})
    }

    const deleteClickHandler = (e: any) => {
        e.preventDefault()
        deleteProduct({
            size_id: size,
            product_color_id: product.id
        })
        message({type: "info", content: "Товар удален!"})
    }

    const isAdded = addedProducts.find(
        _product => _product.size_id === size && _product.product_color_id === product.id
    )

    return (
        <div className="action-button">
            <Radio.Group size="large" onChange={onChangeHandler}>
                {product.sizes.map(size => (
                    <Radio.Button
                        key={size.id}
                        value={size.size_id}
                        data-max={size.qty}
                        className={isChecked(size.size_id) && "added"}
                    >
                        {size.title}
                    </Radio.Button>
                ))}
            </Radio.Group>
            {isAdded ? (
                <Button
                    size="large"
                    type="primary"
                    danger
                    disabled={!size}
                    icon={<DeleteOutlined />}
                    onClick={deleteClickHandler}
                />
            ) : (
                <Button
                    size="large"
                    type="primary"
                    disabled={!size}
                    icon={<PlusOutlined />}
                    onClick={addClickHandler}
                />
            )}
        </div>
    )
}

export default ActionButton
