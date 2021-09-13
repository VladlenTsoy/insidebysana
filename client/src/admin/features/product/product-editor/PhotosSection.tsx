import React from "react"
import {Divider, Typography, Upload} from "antd"
import {PlusOutlined} from "@ant-design/icons"
import {Element} from "react-scroll"

const {Title} = Typography

const PhotosSection: React.FC = () => {
    return (
        <Element name="photos" className="photos">
            <Divider />
            <Title level={3}>Фотографии</Title>
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                // fileList={fileList}
                // onPreview={this.handlePreview}
                // onChange={this.handleChange}
            >
                <div>
                    <PlusOutlined />
                    <div style={{marginTop: 8}}>Upload</div>
                </div>
            </Upload>
        </Element>
    )
}
export default PhotosSection
