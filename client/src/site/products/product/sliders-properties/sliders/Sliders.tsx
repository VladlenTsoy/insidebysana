import React from "react"
import styled from "./Sliders.module.css"
import {ProductColor} from "types/productColor"
import ImageBlock from "components/image-block/ImageBlock"
import {useScreenSize} from "hooks/useScreenSize"
import {CarouselProvider, Slider, Slide, Dot} from "pure-react-carousel"

interface SlidersProps {
    images: ProductColor["images"]
}

const Sliders: React.FC<SlidersProps> = ({images}) => {
    const {width} = useScreenSize()

    if (width <= 992)
        return <CarouselProvider
            naturalSlideHeight={487}
            naturalSlideWidth={326}
            totalSlides={images.length}
            visibleSlides={1}
            step={1}
            dragStep={1}
            infinite
        >
            <Slider>
                {
                    images.map((image, key) =>
                        <Slide index={image.id} key={key}>
                            <div className={styled.image}>
                                <ImageBlock src={image.url} alt={`image-${image.id}`} />
                            </div>
                        </Slide>
                    )
                }
            </Slider>
            <div className={styled.dots}>
                {
                    images.map((img, key) =>
                        <Dot slide={key} className={styled.dot} key={key} />
                    )
                }
            </div>
        </CarouselProvider>

    return (
        <div className={styled.sliders} id="product-sliders">
            {images.map((image, key) =>
                <div className={styled.slider} key={key}>
                    <div className={styled.image}>
                        <ImageBlock src={image.url} alt={`image-${key}`} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Sliders