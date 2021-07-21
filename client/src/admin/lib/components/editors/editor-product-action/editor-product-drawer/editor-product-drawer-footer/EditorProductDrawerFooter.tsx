import React from "react";
import { Button } from "antd";

interface EditorProductDrawerFooterProps {
    current: number
    prev: any
    loading: boolean
}

const EditorProductDrawerFooter: React.FC<EditorProductDrawerFooterProps> = ({current, prev, loading}) => {
    const forms = ["basic", "colors", "measurements"]

    return (
        <div
            style={{
                textAlign: "right"
            }}
        >
            {current > 0 && (
                <Button size="large" onClick={prev} style={{marginRight: 8}}>
                    Назад
                </Button>
            )}
            <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                form={`editor-product-${forms[current]}`}
            >
                {current < 3 ? "Далее" : "Сохранить"}
            </Button>
        </div>
    );
};

export default EditorProductDrawerFooter;