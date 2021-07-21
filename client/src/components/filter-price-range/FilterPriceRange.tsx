import React, {useEffect, useState} from "react"
import styled from "./FilterPriceRange.module.css"
import Range from "../range/Range"
import {calcMerge} from "utils/numberFormatter"

interface FilterPriceRangeProps {
    max: number
    min: number
    defaultValues?: {
        max: number
        min: number
    }
    onChange: any
}

const FilterPriceRange: React.FC<FilterPriceRangeProps> = ({max, min, onChange, defaultValues}) => {
    const [minValue, setMinValue] = useState(defaultValues?.min || min)
    const [maxValue, setMaxValue] = useState(defaultValues?.max || max)

    const onChangeHandler = ([_min, _max]: any) => {
        setMinValue(_min)
        setMaxValue(_max)
    }

    const onAfterChangeHandler = ([_min, _max]: any) => {
        onChange({min: _min, max: _max})
    }

    const minChangeHandler = (e: any) => {
        setMinValue(Number(e.currentTarget.value))
        onChange({min: Number(e.currentTarget.value), max: maxValue})
    }

    const maxChangeHandler = (e: any) => {
        setMaxValue(Number(e.currentTarget.value))
        onChange({min: minValue, max: Number(e.currentTarget.value)})
    }

    useEffect(() => {
        setMinValue(defaultValues?.min || min)
        setMaxValue(defaultValues?.max || max)
    }, [min, max, defaultValues])

    return (
        <div className={styled.price}>
            <div className={styled.inputs}>
                <input type="number" min={min} max={max} value={Number(minValue)} onChange={minChangeHandler} />
                <input type="number" min={min} max={max} value={Number(maxValue)} onChange={maxChangeHandler} />
            </div>
            <Range
                max={max}
                min={min}
                marks={calcMerge(min, max, 5)}
                onAfterChange={onAfterChangeHandler}
                onChange={onChangeHandler}
                value={[minValue, maxValue]}
            />
        </div>
    )
}

export default FilterPriceRange