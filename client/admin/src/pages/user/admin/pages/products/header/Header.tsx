import React, {Dispatch, SetStateAction} from "react"
import CategorySelect from "./category-select/CategorySelect"
import {Button, Input} from "antd"
import {PlusOutlined, EyeOutlined, EyeInvisibleOutlined, DeleteOutlined} from "@ant-design/icons"
import EditorProductAction from "../../../../../../lib/components/editors/editor-product-action/EditorProductAction"
import {useAdminDispatch} from "../../../../../../store/admin/store"
import {changeSearch} from "../../../../../../store/admin/product-color/productColorSlice"
import {fetchProductColors} from "../../../../../../store/admin/product-color/fetchProductColors"
import TrashProducts from "../../../../../../lib/components/trash-products/TrashProducts"

const {Search} = Input

interface HeaderProps {
    isMiniColumns: boolean
    setMiniColumns: Dispatch<SetStateAction<boolean>>
}

const Header: React.FC<HeaderProps> = (
    {
        setMiniColumns,
        isMiniColumns
    }
) => {
    const dispatch = useAdminDispatch()
    const onSearchHandler = async (value: string) => {
        await dispatch(changeSearch(value))
        await dispatch(fetchProductColors())
    }

    const onClickCollapse = () => {
        setMiniColumns(prevState => !prevState)
    }

    return (
        <div className="header-actions">
            <div className="left">
                <CategorySelect />
                <Search
                    placeholder="Введите название"
                    allowClear
                    enterButton="Поиск"
                    size="large"
                    onSearch={onSearchHandler}
                />
            </div>
            <div className="right">
                <TrashProducts>
                    <Button
                        size="large"
                        icon={<DeleteOutlined />}
                    >
                        Корзина
                    </Button>
                </TrashProducts>
                <Button
                    size="large"
                    onClick={onClickCollapse}
                    icon={isMiniColumns ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                >
                    {isMiniColumns ? "Все размеры" : "Основные размеры"}
                </Button>
                <EditorProductAction title="Добавить товар">
                    <Button type="primary" icon={<PlusOutlined />} size="large">
                        Добавить товар
                    </Button>
                </EditorProductAction>
            </div>
        </div>
    )
}

export default Header
