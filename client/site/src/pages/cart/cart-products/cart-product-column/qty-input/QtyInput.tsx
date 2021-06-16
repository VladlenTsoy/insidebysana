import React, {useState} from "react"
import InputPlusMinus from "../../../../../components/input-plus-minus/InputPlusMinus"
import {ProductColorCart} from "../../../../../types/cart"

interface QtyInputProps {
    sizeQty: ProductColorCart["size"]["qty"]
    qty: ProductColorCart["qty"]
    onChange: (val: number) => void,
}

const QtyInput: React.FC<QtyInputProps> = (
    {
        sizeQty,
        qty,
        onChange
    }
) => {
    const [_qty, _setQty] = useState(qty)

    const onChangeHandler = (val: number) => {
        _setQty(val)
        onChange(val)
    }

    return (
        <InputPlusMinus
            min={1}
            max={sizeQty}
            value={_qty}
            onChange={onChangeHandler}
        />
    )
}

export default React.memo<QtyInputProps>(QtyInput)