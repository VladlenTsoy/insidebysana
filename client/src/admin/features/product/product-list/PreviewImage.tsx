import React, {useState} from "react"
import ImageBlock from "components/blocks/image-block/ImageBlock"
import {Image} from "antd"
import "./PreviewImage.less"

interface PreviewImageProps {
    image: string
    product: any
}

const PreviewImage: React.FC<PreviewImageProps> = ({image, product}) => {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <div style={{width: "45px"}} onClick={() => setVisible(prevState => !prevState)}>
                <div className="preview-image">
                    <ImageBlock image={image} title={product.title} />
                </div>
            </div>
            <div style={{display: "none"}}>
                <Image.PreviewGroup preview={{visible, onVisibleChange: vis => setVisible(vis)}}>
                    <Image src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
                    <Image src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
                    <Image src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" />
                </Image.PreviewGroup>
            </div>
        </>
    )
}
export default PreviewImage
