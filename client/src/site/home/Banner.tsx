import React from "react"
import styled from "./Banner.module.css"
import {Link} from "react-router-dom"
import ImageBlock from "components/image-block/ImageBlock"
import Button from "components/button/Button"
import {CarouselProvider, Slider, Slide, Dot} from "pure-react-carousel"
import {useGetBannersQuery} from "./bannerApi"

const Banner: React.FC = () => {
    const {data: banners = [], isLoading} = useGetBannersQuery()

    return (
        <CarouselProvider
            naturalSlideHeight={window.innerHeight}
            naturalSlideWidth={window.innerWidth}
            totalSlides={banners.length}
            infinite
            isPlaying={true}
            touchEnabled={true}
            dragEnabled={false}
            interval={10000}
            className={styled.banner}
            hasMasterSpinner={isLoading}
        >
            <Slider>
                {banners.map((banner, key) => (
                    <Slide index={key} className={styled.slider} key={key}>
                        <ImageBlock src={banner.url_image} />
                        <div className={styled.container}>
                            <div className={styled.info}>
                                <div className={styled.title}>{banner.title}</div>
                                <div className={styled.action}>
                                    <Link to={banner.button_link}>
                                        <Button filled>{banner.button_title}</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Slide>
                ))}
            </Slider>
            <div className={styled.dots}>
                {banners.map((banner, key) => (
                    <Dot slide={key} className={styled.dot} key={key} />
                ))}
            </div>
        </CarouselProvider>
    )
}

export default Banner
