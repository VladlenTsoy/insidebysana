import React, {useEffect} from "react"
import {Form, Select, InputNumber, Input} from "antd"
import {
    useLoadingPrintCategories,
    useSelectAllPrintCategories
} from "store/admin/print-category/printCategorySelectors"
import {useAdminDispatch} from "store/admin/store"
import InputImage from "../../form/input-image/InputImage"
import {fetchPrintCategories} from "store/admin/print-category/fetchPrintCategories"
import {formatPrice} from "utils/formatPrice"
import {createPrintImage} from "store/admin/print-image/createPrintImage"
import {PrintImage} from "store/admin/print-image/PrintImage"
import {editPrintImage} from "store/admin/print-image/editPrintImage"

const {Option, OptGroup} = Select

interface EditorPrintImageProps {
    close: () => void
    printImage?: PrintImage
    changeLoading: (loading: boolean) => void
}

const EditorPrintImage: React.FC<EditorPrintImageProps> = ({changeLoading, close, printImage}) => {
    const [form] = Form.useForm()
    const categories = useSelectAllPrintCategories()
    const loadingCategories = useLoadingPrintCategories()
    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchPrintCategories())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    const onFinishHandler = async (values: any) => {
        changeLoading(true)
        if (printImage) await dispatch(editPrintImage({id: printImage.id, data: values}))
        else await dispatch(createPrintImage(values))
        changeLoading(false)
        close()
    }

    return (
        <Form
            initialValues={printImage ? {...printImage, category_id: printImage.category.id} : {}}
            form={form}
            layout="vertical"
            id="editor-print-image"
            size="large"
            onFinish={onFinishHandler}
        >
            <InputImage
                name="url_image"
                form={form}
                rules={[{required: true, message: "Выберите картинку!"}]}
            />
            <Form.Item name="title" label="Название" rules={[{required: true, message: "Введите название!"}]}>
                <Input />
            </Form.Item>
            <Form.Item
                name="category_id"
                label="Категорию"
                rules={[{required: true, message: "Выберите категорию!"}]}
            >
                <Select loading={loadingCategories} showSearch optionFilterProp="label">
                    {categories.map(category => (
                        <OptGroup label={category.title} key={category.id}>
                            {category.sub_categories.map(category => (
                                <Option label={category.title} value={category.id} key={category.id}>
                                    {category.title}
                                </Option>
                            ))}
                        </OptGroup>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="price"
                label="Стоимость"
                rules={[{required: true, message: "Укажите стоимость!"}]}
            >
                <InputNumber
                    min={0}
                    style={{width: "100%"}}
                    formatter={value => formatPrice(Number(value))}
                />
            </Form.Item>
        </Form>
    )
}
export default EditorPrintImage
