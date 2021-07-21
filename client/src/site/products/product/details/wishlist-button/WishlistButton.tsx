import React from "react"
import {ProductColor} from "types/productColor"
import styled from "../Details.module.css"
import Button from "components/button/Button"
import HeartOutlined from "@ant-design/icons/HeartOutlined"
import HeartFilled from "@ant-design/icons/HeartFilled"
import {useDispatch} from "../../../../store"
import {wishlistSelector} from "../../../../wishlist/wishlistSlice"
import {useSelector} from "react-redux"
import {removeFromWishlist, addToWishlist} from "../../../../wishlist/wishlistApi"

interface WishlistButtonProps {
    productId: ProductColor["id"]
}

const WishlistButton: React.FC<WishlistButtonProps> = ({productId}) => {
    const wishlist = useSelector(wishlistSelector)
    const dispatch = useDispatch()

    const addToWishlistHandler = () => dispatch(addToWishlist(productId))

    const removeFromWishlistHandler = () => dispatch(removeFromWishlist(productId))

    return (
        <div className={styled.addToWishlist}>
            {wishlist.items.includes(productId) ? (
                <Button
                    type="primary"
                    link
                    block
                    size="small"
                    icon={<HeartFilled />}
                    onClick={removeFromWishlistHandler}
                >
                    Удалить из избранного
                </Button>
            ) : (
                <Button
                    type="primary"
                    link
                    block
                    size="small"
                    icon={<HeartOutlined />}
                    onClick={addToWishlistHandler}
                >
                    Добавить в избранное
                </Button>
            )}
        </div>
    )
}

export default WishlistButton
