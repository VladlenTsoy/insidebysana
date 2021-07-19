import React, {useLayoutEffect} from "react"
import {useState} from "react"
import DefaultImage from "assets/images/profile/default.svg"
import {LoadingOutlined} from "@ant-design/icons"
import "./Avatar.less"

interface UserImageProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string
    alt?: string
    width?: string
    mr?: string
}

/**
 * Фото профиля
 * @param src
 * @param alt
 * @param width
 * @param mr
 * @param props
 * @constructor
 */
const Avatar: React.FC<UserImageProps> = ({src, alt, width = "38px", mr}) => {
    const [image, setImage] = useState<any>(src)
    const [loading, setLoading] = useState(true)

    useLayoutEffect(() => {
        const image = new Image()
        setImage(src)
        image.src = src
        image.onerror = () => {
            setImage(DefaultImage)
            setLoading(false)
        }
        image.onload = () => setLoading(false)
        return () => {
            image.onload = null
            image.onerror = null
        }
    }, [src])

    return (
        <div className="avatar" style={{width, height: width, marginRight: mr || 'initial'}}>
            {loading ? (
                <LoadingOutlined className="loading" />
            ) : (
                <img src={image} alt={alt || "profile-image"} />
            )}
        </div>
    )
}

export default Avatar
