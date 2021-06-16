import React from "react"
import {Switch} from "antd"
import {useProcessing} from "store/cashier/pos/posSelectors"
import {useCashierDispatch} from "store/cashier/store"
import {changeProcessing} from "store/cashier/pos/posSlice"

const ProcessingBlock: React.FC = () => {
    const processing = useProcessing()
    const dispatch = useCashierDispatch()

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
