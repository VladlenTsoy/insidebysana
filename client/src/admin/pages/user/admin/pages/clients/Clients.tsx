import React, {useEffect, useState} from "react"
import {useAdminDispatch} from "../../../../../store"
import {fetchClients} from "../../../../../store/admin/client/fetchClients"
import Header from "./header/Header"
import Container from "./container/Container"
import ContainerPage from "../../../../../components/container-page/ContainerPage"
import HeaderPage from "../../../../../components/header-page/HeaderPage"
import {PlusOutlined, TeamOutlined} from "@ant-design/icons"
import EditorClientAction from "../../../../../lib/components/editors/editor-client-action/EditorClientAction"
import {Button} from "antd"

const Clients = () => {
    const [search, setSearch] = useState<string>("")
    const [sorter, setSorter] = useState({
        field: "created_at",
        order: "descend"
    })
    const [pagination, setPagination] = useState({current: 1, pageSize: 10})

    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchClients({search, sorter, pagination}))
        return () => {
            promise.abort()
        }
    }, [dispatch, search, sorter, pagination])

    return (
        <>
            <HeaderPage
                title="Клиенты"
                icon={<TeamOutlined />}
                action={
                    <EditorClientAction>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size="large"
                        >
                            Создать
                        </Button>
                    </EditorClientAction>
                }
            />
            <ContainerPage>
                <Header setSearch={setSearch} />
                <Container
                    setSorter={setSorter}
                    setPagination={setPagination}
                />
            </ContainerPage>
        </>
    )
}

export default Clients
