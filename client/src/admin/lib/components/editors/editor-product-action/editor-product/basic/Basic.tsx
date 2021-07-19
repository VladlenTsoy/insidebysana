import React from "react"
import {Form} from "antd"
import Details from "./details/Details"
import Properties from "./properties/Properties"

interface BasicProps {
    basicValues: any
    setBasicValues: any
    next: () => void
}

const Basic: React.FC<BasicProps> = ({next, basicValues, setBasicValues}) => {
    const [form] = Form.useForm()

    const onFinishHandler = (values: any) => {
        setBasicValues(values)
        next()
    }

    return (
        <Form
            layout="vertical"
            size="large"
            form={form}
            onFinish={onFinishHandler}
            initialValues={basicValues}
            id="editor-product-basic"
        >
            <Details />
            <Properties />
        </Form>
    )
}

export default Basic
