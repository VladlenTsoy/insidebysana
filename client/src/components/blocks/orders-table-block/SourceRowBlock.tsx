import React, {useEffect} from "react"
// import {fetchSources} from "store/admin/source/fetchSources"
// import {useLoadingSources, useSelectSourceById} from "store/admin/source/sourceSelectors"
// import {useCommonDispatch} from "store/common/store"
import {OrderTableColumn} from "./OrderTableColumn"

interface SourceRowBlockProps {
    sourdeId: OrderTableColumn["source_id"]
}

const SourceRowBlock: React.FC<SourceRowBlockProps> = ({sourdeId}) => {
    // const source = useSelectSourceById(sourdeId || 0)
    // const loading = useLoadingSources()
    // const dispatch = useCommonDispatch()

    // useEffect(() => {
    // const promise = dispatch(fetchSources())
    // return () => {
    // promise.abort()
    // }
    // }, [dispatch])

    // return <>{loading && !source ? "Загрука..." : source?.title}</>
    return <></>
}
export default SourceRowBlock
