import React from "react"
import "./Carousel.css"
import {useScreenSize} from "hooks/useScreenSize"
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from "pure-react-carousel"
import styled from "./Carousel.module.css"
import ClothesCard from "components/clothes-card/ClothesCard"
import LeftOutlined from "@ant-design/icons/LeftOutlined"
import RightOutlined from "@ant-design/icons/RightOutlined"
import {ProductColorCard} from "types/productColor"

interface CarouselProps {
    products: ProductColorCard[]
}

const Carousel: React.FC<CarouselProps> = ({products}) => {
    const {width} = useScreenSize()

    const checkResponse = () => {
        if (width <= 1200 && width >= 992) {
            return {visibleSlides: 3, step: 3, dragStep: 3}
        } else if (width <= 992 && width >= 767) {
            return {visibleSlides: 2, step: 2, dragStep: 2}
        } else if (width <= 767 && width >= 576) {
            return {visibleSlides: 2.5, step: 2, dragStep: 2}
        } else if (width <= 576) {
            return {visibleSlides: 1.5, step: 1, dragStep: 1}
        }
        return {visibleSlides: 4, step: 4, dragStep: 4}
    }

    const {visibleSlides, step, dragStep} = checkResponse()

    return (
        <CarouselProvider
            naturalSlideHeight={487}
            naturalSlideWidth={326}
            totalSlides={products.length}
            visibleSlides={visibleSlides}
            step={step}
            dragStep={dragStep}
            infinite
            className={styled.carouselProvider}
        >
            <Slider className={styled.slider}>
                {
                    products.map((product, key) =>
                        <Slide index={key} className={styled.slider} key={product.id}>
                            <ClothesCard product={product} priceVisible />
                        </Slide>
                    )
                }
            </Slider>
            {products.length > step && <ButtonBack className={styled.left}><LeftOutlined /></ButtonBack>}
            {products.length > step && <ButtonNext className={styled.right}><RightOutlined /></ButtonNext>}
        </CarouselProvider>
    )
}

export default Carousel