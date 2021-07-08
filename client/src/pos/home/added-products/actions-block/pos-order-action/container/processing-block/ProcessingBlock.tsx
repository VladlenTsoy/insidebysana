import React from "react"
import {Switch} from "antd"
import {useProcessing} from "../../../../../posSelectors"
import {useDispatch} from "../../../../../../store"
import {changeProcessing} from "../../../../../posSlice"

const ProcessingBlock: React.FC = () => {
    const processing = useProcessing()
    const dispatch = useDispatch()

    const changeProcessingHandler = (check: boolean) => dispatch(changeProcessing(check))

    return (
        <div>
            <label className="processing">
                <span>На обработку</span>
                <Switch onChange={changeProcessingHandler} checked={processing} />
            </label>
        </div>
    )
}
export default React.memo(ProcessingBlock)
