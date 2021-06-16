import React from "react"
import Slider, {RangeProps as RCRangeProps} from "rc-slider"
import "rc-slider/assets/index.css"

interface RangeProps {
    onChange?: RCRangeProps["onChange"]
    onBeforeChange?: RCRangeProps["onBeforeChange"]
    onAfterChange?: RCRangeProps["onAfterChange"]
    value?: RCRangeProps["defaultValue"]
    marks?: RCRangeProps["marks"]
    max: RCRangeProps["max"]
    min: RCRangeProps["min"]
}

const Range: React.FC<RangeProps> = ({onChange, onBeforeChange, onAfterChange, value, marks, min, max}) => {
    return (
        <Slider.Range
            onChange={onChange}
            onAfterChange={onAfterChange}
            onBeforeChange={onBeforeChange}
            min={min}
            max={max}
            value={value}
            marks={marks}
        />
    )
}

export default Range