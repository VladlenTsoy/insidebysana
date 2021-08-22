import moment from "moment"
import React, {useCallback, useEffect} from "react"
import {fetchOrdersArchive} from "admin/store/admin/order-archive/fetchOrdersArchive"
import {
    useFilterDatesOrdersArchive,
    useFilterSourceOrdersArchive,
    useLoadingOrdersArchive,
    useSelectAllOrdersArchive
} from "admin/store/admin/order-archive/orderArchiveSelectors"
import {updateFilterDates, updateFilterSource} from "admin/store/admin/order-archive/orderArchiveSlice"
import {useAdminDispatch} from "admin/store"
import OrdersTableBlock from "admin/lib/components/blocks/orders-table-block/OrdersTableBlock"
import {useUser} from "admin/hooks/use-user"
import {
    useLoadingPaymentMethods,
    useSelectAllPaymentMethods
} from "admin/store/admin/payment-method/paymentMethodSelectors"
import {fetchPaymentMethods} from "admin/store/admin/payment-method/fetchPaymentMethods"
import {useSelectAllSources} from "admin/store/admin/source/sourceSelectors"
import {fetchSources} from "admin/store/admin/source/fetchSources"

const OrderArchive: React.FC = () => {
    const {user} = useUser()
    const orders = useSelectAllOrdersArchive()
    const loading = useLoadingOrdersArchive()
    const dispatch = useAdminDispatch()
    const dates = useFilterDatesOrdersArchive()
    const loadingPayments = useLoadingPaymentMethods()
    const payments = useSelectAllPaymentMethods()
    const sources = useSelectAllSources()
    const sourceId = useFilterSourceOrdersArchive()

    const onChangeHandler = useCallback(
        (e: any) => {
            if (e)
                dispatch(
                    updateFilterDates({
                        from: moment(e[0]).toISOString(),
                        to: moment(e[1]).toISOString()
                    })
                )
        },
        [dispatch]
    )

    const onChangeSourceHandler = useCallback(
        (sourceId: number) => {
            dispatch(updateFilterSource(sourceId))
        },
        [dispatch]
    )

    useEffect(() => {
        if (dates) {
            const promise = dispatch(
                fetchOrdersArchive({
                    dateFrom: dates.from,
                    dateTo: dates.to,
                    sourceId
                })
            )
            return () => {
                promise.abort()
            }
        }
    }, [dispatch, dates, sourceId])

    useEffect(() => {
        const promise = dispatch(fetchPaymentMethods())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    useEffect(() => {
        const promise = dispatch(fetchSources())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <OrdersTableBlock
            loading={loading || loadingPayments}
            orders={orders}
            onChangeHandler={onChangeHandler}
            sources={sources}
            onChangeSourceHandler={onChangeSourceHandler}
            access={user.access}
            payments={payments}
        />
    )
}

export default OrderArchive
