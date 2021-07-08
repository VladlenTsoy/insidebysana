import React, {useEffect, useState} from "react"
import "./ImageBlock.less"
import LoadingOutlined from "@ant-design/icons/LoadingOutlined"
import WarningOutlined from "@ant-design/icons/WarningOutlined"

interface ImageBlockProps {
    image: string
    title?: string
}

const ImageBlock: React.FC<ImageBlockProps> = ({image: src, title}) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const image = new Image()
        image.src = src
        setLoading(!image.complete)
        image.onload = () => {
            setError(false)
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
        <div className="imageBlock">
            {
                !error ?
                    loading ?
                        <div className="loading">
                            <LoadingOutlined/>
                        </div> :
                        <div className="image">
                            <img src={src} alt={title}/>
                        </div> :
                    <div className="loading">
                        <WarningOutlined/>
                    </div>
            }
        </div>
    )
}

export default ImageBlock