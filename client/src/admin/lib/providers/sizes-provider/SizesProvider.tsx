import React, {useEffect} from "react"
import {fetchSizes} from "../../../store/common/size/fetchSizes"
import {useCommonDispatch} from "../../../store/common/store"
import {useLoadingSizes} from "../../../store/common/size/sizeSelectors"
import {Loader} from "../../ui"

const SizesProvider: React.FC = ({children}) => {
    const dispatch = useCommonDispatch()
    const loading = useLoadingSizes()

    useEffect(() => {
        const promise = dispatch(fetchSizes())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    if (loading) return <Loader text={`Загрузка цветов...`} />

    return <>{children}</>
}

export default SizesProvider
