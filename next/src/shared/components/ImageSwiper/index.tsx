import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import Image from "next/image";
import ApiImage from "../ApiImage";
import { PostImage } from "../../types/Post";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

import styles from "./index.module.scss";
import postsStyles from "../../styles/posts.module.scss";

interface ImageSwiperProps {
    images: PostImage[];
    postTitle: string;
    postId: string;
    onImageClick?: (imageUrl: string, index: number) => void;
    showThumbs?: boolean;
    className?: string;
}

const ImageSwiper: React.FC<ImageSwiperProps> = ({
    images,
    postTitle,
    postId,
    onImageClick,
    showThumbs = false,
    className = "",
}) => {
    const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null);

    if (!images || images.length === 0) {
        return null;
    }

    const handleSlideClick = (imageUrl: string, index: number) => {
        if (onImageClick) {
            onImageClick(imageUrl, index);
        }
    };

    return (
        <div className={`${styles.swiperContainer} ${className}`}>
            {/* Основной слайдер */}
            <Swiper
                modules={[Navigation, Pagination, Thumbs, FreeMode]}
                spaceBetween={10}
                slidesPerView={1}
                navigation={
                    images.length > 1
                        ? {
                              nextEl: `.${styles.swiperButtonNext}`,
                              prevEl: `.${styles.swiperButtonPrev}`,
                          }
                        : false
                }
                pagination={
                    images.length > 1
                        ? {
                              clickable: true,
                              dynamicBullets: true,
                          }
                        : false
                }
                thumbs={showThumbs ? { swiper: thumbsSwiper } : undefined}
                className={styles.mainSwiper}
                loop={images.length > 1}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={image.id || index} className={styles.slide}>
                        <div
                            className={styles.imageWrapper}
                            onClick={() => handleSlideClick(image.url, index)}
                        >
                            <ApiImage
                                src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/news/${postId}/images/${image.id}`}
                                alt={image.alt || `${postTitle} - изображение ${index + 1}`}
                                width={0}
                                height={0}
                                sizes="(max-width: 768px) 100vw, 800px"
                                className={styles.image}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Кастомные кнопки навигации */}
            {images.length > 1 && (
                <>
                    <div className={styles.swiperButtonPrev}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M15 18L9 12L15 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <div className={styles.swiperButtonNext}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M9 18L15 12L9 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </>
            )}

            {/* Миниатюры (если включены) */}
            {showThumbs && images.length > 1 && (
                <Swiper
                    onSwiper={setThumbsSwiper}
                    modules={[FreeMode, Thumbs]}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    className={styles.thumbsSwiper}
                    breakpoints={{
                        640: {
                            slidesPerView: 5,
                        },
                        768: {
                            slidesPerView: 6,
                        },
                        1024: {
                            slidesPerView: 8,
                        },
                    }}
                >
                    {images.map((image, index) => (
                        <SwiperSlide
                            key={`thumb-${image.id || index}`}
                            className={styles.thumbSlide}
                        >
                            <ApiImage
                                src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/news/${postId}/images/${image.id}`}
                                alt={`Миниатюра ${index + 1}`}
                                width={0}
                                height={0}
                                sizes="80px"
                                className={styles.thumbImage}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default ImageSwiper;
