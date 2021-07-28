import {BellFilled, CaretDownFilled, FullscreenOutlined, DollarCircleOutlined} from "@ant-design/icons"
import {Button} from "antd"
import React from "react"
import "./Navigation.less"

const Navigation: React.FC = () => {
    return (
        <div className="navigation">
            <div className="menu">
                <Button icon={<FullscreenOutlined />} size="large" />
                <Button icon={<BellFilled />} size="large" />
                <Button icon={<CaretDownFilled />} size="large" />
            </div>
        </div>
    )
}
export default Navigation
