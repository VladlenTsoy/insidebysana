import React, {useEffect, useState} from "react"
import "./ImageBlock.less"
import LoadingOutlined from "@ant-design/icons/LoadingOutlined"
import WarningOutlined from "@ant-design/icons/WarningOutlined"
import {Image as AntImage} from "antd"

interface ImageBlockProps {
    src: string
    alt?: string
    zoom?: boolean
}

const ImageBlock: React.FC<ImageBlockProps> = ({src, alt, zoom}) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const image = new Image()
        image.src = src
        setLoading(!image.complete)
        image.onload = () => {
            setLoading(false)
        }
        image.onerror = () => {
            setError(true)
        }

        return () => {
            image.onload = null
            image.onerror = null
        }
    }, [src])

    return (
        <div className="image-block">
            {!error ? (
                loading ? (
                    <div className="image-loading">
                        <LoadingOutlined />
                    </div>
                ) : (
                    <div className="image">
                        {zoom ? <AntImage src={src} alt={alt} /> : <img src={src} alt={alt} />}
                    </div>
                )
            ) : (
                <div className="image-loading">
                    <WarningOutlined />
                </div>
            )}
        </div>
    )
}

export default ImageBlock
