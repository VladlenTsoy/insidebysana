import React, {useCallback, useState} from "react"
import {useSelectAllSizes} from "admin/store/common/size/sizeSelectors"
import {Checkbox, Col, Form, Row} from "antd"
import FormSize from "./form-size/FormSize"
import {Color} from "admin/lib/types/Color"
import { FormInstance } from "antd/es/form";

interface SizeCheckboxProps {
    form: FormInstance
    selectedColorId?: Color["id"]
}

const SizeCheckbox: React.FC<SizeCheckboxProps> = ({selectedColorId, form}) => {
    const sizes = useSelectAllSizes()
    const [selectedSizes, setSelectedSizes] = useState<string[]>(form.getFieldValue('sizes') || [])

    const onCheckBoxHandler = useCallback((sizesId: any[]) => {
        setSelectedSizes(sizesId)
    }, [])

    return (
        <>
            <Form.Item name="sizes" rules={[{required: true, message: "Выберите размер"}]}>
                <Checkbox.Group style={{width: "100%"}} onChange={onCheckBoxHandler}>
                    <Row>
                        {sizes.map(size => (
                            <Col span={8} key={size.id}>
                                <Checkbox value={String(size.id)}>{size.title}</Checkbox>
                            </Col>
                        ))}
                    </Row>
                </Checkbox.Group>
            </Form.Item>
            {(selectedColorId || form.getFieldValue("color_id")) &&
                selectedSizes.map(sizeId => <FormSize sizeId={sizeId} key={sizeId} />)}
        </>
    )
}

export default SizeCheckbox
