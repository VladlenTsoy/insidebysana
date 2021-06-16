import React, {useEffect} from "react"
import Title from "../../../components/title/Title"
import {useDispatch} from "../../../store/store"
import {fetchLookbook} from "../../../store/lookbook/fetchLookbook"
import {useLoadingLookbook, useSelectAllLookbook} from "../../../store/lookbook/lookbookSelectors"
import styled from "./Lookbook.module.css"
import LoaderBlock from "../../../components/loader-block/LoaderBlock"
import EmptyBlock from "../../../components/empty-block/EmptyBlock"

const Lookbook = () => {
    const dispatch = useDispatch()
    const loading = useLoadingLookbook()
    const lookbook = useSelectAllLookbook()

    useEffect(() => {
        const promise = dispatch(fetchLookbook())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <>
            <Title level={1}>LOOKBOOK</Title>
            <div className="container">
                {loading ? (
                    <LoaderBlock />
                ) : lookbook.length ? (
                    lookbook.map(item => (
                        <div className={styled.lookbookItem} key={item.id}>
                            <img src={item.url_image} alt={`lookbook-${item.id}`} />
                        </div>
                    ))
                ) : (
                    <EmptyBlock />
                )}
            </div>
        </>
    )
}

export default Lookbook
