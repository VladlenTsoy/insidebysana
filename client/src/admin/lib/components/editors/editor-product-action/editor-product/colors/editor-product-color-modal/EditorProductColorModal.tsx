import React, {useCallback, useState} from "react"
import {Button, Divider, Form, Input, Modal} from "antd"
import SelectColor from "./select-color/SelectColor"
import SizeCheckbox from "./size-checkbox/SizeCheckbox"
import {Color} from "admin/lib/types/Color"
import {PlusOutlined} from "@ant-design/icons"
import EditorColorAction from "../../../../editor-color-action/EditorColorAction"

interface EditorColorModalProps {
    initialValues?: any
    visible: boolean
    closeColorModal: () => void
    onFinishHandler: (values: any) => void
}

const EditorProductColorModal: React.FC<EditorColorModalProps> = (
    {
        visible,
        initialValues = {},
        closeColorModal,
        onFinishHandler
    }
) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [selectedColorId, setSelectedColorId] = useState<Color["id"]>()

    const closeModal = () => {
        form.resetFields()
        closeColorModal()
    }

    // Выбор цвета
    const onSelectColorHandler = useCallback((value: Color["id"]) => {
        setSelectedColorId(value)
    }, [])

    const onFinish = async (vales: any) => {
        setLoading(true)
        await onFinishHandler(vales)
        setLoading(false)
        form.resetFields()
    }

    return (
        <Modal
            visible={visible}
            onCancel={closeModal}
            title="Добавить цвет"
            okText="Сохранить"
            destroyOnClose
            okButtonProps={{htmlType: "submit", form: "form-create-sizes-modal", loading}}
        >
            <EditorColorAction>
                <Button type="dashed" icon={<PlusOutlined />} block size="large">
                    Создать цвет
                </Button>
            </EditorColorAction>
            <Divider>Цвета</Divider>
            <Form
                layout="vertical"
                initialValues={initialValues}
                id="form-create-sizes-modal"
                onFinish={onFinish}
                form={form}
            >
                <Form.Item hidden name="id">
                    <Input />
                </Form.Item>
                <SelectColor onSelectColorHandler={onSelectColorHandler} />
                <SizeCheckbox selectedColorId={selectedColorId} form={form} />
            </Form>
        </Modal>
    )
}

export default EditorProductColorModal
