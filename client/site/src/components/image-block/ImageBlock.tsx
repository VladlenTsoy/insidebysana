import React, {useEffect, useState} from "react"
import styled from "./ImageBlock.module.css"
import LoadingOutlined from "@ant-design/icons/LoadingOutlined"
import WarningOutlined from "@ant-design/icons/WarningOutlined"

interface ImageBlockProps {
    src: string
    alt?: string
}

const ImageBlock: React.FC<ImageBlockProps> = ({src, alt}) => {
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
        <div className={styled.imageBlock}>
            {
                !error ?
                    loading ?
                        <div className={styled.loading}>
                            <LoadingOutlined/>
                        </div> :
                        <div className={styled.image}>
                            <img src={src} alt={alt}/>
                        </div> :
                    <div className={styled.loading}>
                        <WarningOutlined/>
                    </div>
            }
        </div>
    )
}

export default ImageBlock