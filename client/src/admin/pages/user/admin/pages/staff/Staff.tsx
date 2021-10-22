import React, {useEffect, useState} from "react"
import Header from "./header/Header"
import {useAdminDispatch} from "../../../../../store"
import {fetchStaff} from "../../../../../store/admin/staff/fetchStaff"
import Container from "./container/Container"
import ContainerPage from "../../../../../components/container-page/ContainerPage"
import HeaderPage from "../../../../../components/header-page/HeaderPage"
import {CrownOutlined, PlusOutlined} from "@ant-design/icons"
import EditorStaffAction from "../../../../../lib/components/editors/editor-staff-action/EditorStaffAction"
import {Button} from "antd"

const Staff = () => {
    const [search, setSearch] = useState("")
    const [sorter, setSorter] = useState({
        field: "created_at",
        order: "descend"
    })
    const [pagination, setPagination] = useState({current: 1, pageSize: 10})

    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchStaff({search, sorter, pagination}))
        return () => {
            promise.abort()
        }
    }, [dispatch, search, sorter, pagination])

    return (
        <>
            <HeaderPage
                title="Сотрудники"
                icon={<CrownOutlined />}
                action={
                    <EditorStaffAction>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size="large"
                        >
                            Создать
                        </Button>
                    </EditorStaffAction>
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

export default Staff
