import React, {useEffect} from "react"
import {useAdminDispatch} from "../../../../../../store"
import {fetchBanners} from "../../../../../../store/admin/banner/fetchBanners"
import Header from "./header/Header"
import Container from "./container/Container"

const Banners: React.FC = () => {
    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchBanners())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <div>
            <Header />
            <Container />
        </div>
    )
}

export default Banners
