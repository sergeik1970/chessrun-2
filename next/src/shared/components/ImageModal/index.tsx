import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom, Keyboard } from "swiper/modules";
import Image from "next/image";
import ApiImage from "../ApiImage";
import { PostImage } from "../../types/Post";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";

import styles from "./index.module.scss";
import postsStyles from "../../styles/posts.module.scss";

interface ImageModalProps {
    images: PostImage[];
    initialIndex: number;
    isOpen: boolean;
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ images, initialIndex, isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            // Блокируем прокрутку страницы
            document.body.style.overflow = "hidden";
        } else {
            // Восстанавливаем прокрутку страницы
            document.body.style.overflow = "unset";
        }

        // Очистка при размонтировании
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen || !images || images.length === 0) {
        return null;
    }

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.modal} onClick={handleBackdropClick}>
            <div className={styles.modalContent}>
                {/* Кнопка закрытия */}
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Закрыть модальное окно"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M18 6L6 18M6 6L18 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                {/* Swiper для модального окна */}
                <Swiper
                    modules={[Navigation, Pagination, Zoom, Keyboard]}
                    spaceBetween={20}
                    slidesPerView={1}
                    initialSlide={initialIndex}
                    navigation={
                        images.length > 1
                            ? {
                                  nextEl: `.${styles.modalButtonNext}`,
                                  prevEl: `.${styles.modalButtonPrev}`,
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
                    zoom={{
                        maxRatio: 3,
                        minRatio: 1,
                    }}
                    keyboard={{
                        enabled: true,
                        onlyInViewport: false,
                    }}
                    className={styles.modalSwiper}
                    loop={images.length > 1}
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={image.id || index} className={styles.modalSlide}>
                            <div className="swiper-zoom-container">
                                <div className={styles.modalImageWrapper}>
                                    {image.url.includes("localhost:3001") ? (
                                        <ApiImage
                                            src={image.url}
                                            alt={
                                                image.alt ||
                                                `Изображение ${index + 1} из ${images.length}`
                                            }
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            className={styles.modalImage}
                                        />
                                    ) : (
                                        <Image
                                            src={image.url}
                                            alt={
                                                image.alt ||
                                                `Изображение ${index + 1} из ${images.length}`
                                            }
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            className={styles.modalImage}
                                        />
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Кастомные кнопки навигации для модального окна */}
                {images.length > 1 && (
                    <>
                        <div className={styles.modalButtonPrev}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M15 18L9 12L15 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div className={styles.modalButtonNext}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
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

                {/* Информационная панель */}
                <div className={styles.infoPanel}>
                    {/* Показываем счетчик только если изображений больше одного */}
                    {images.length > 1 && (
                        <div className={styles.imageCounter}>
                            {initialIndex + 1} / {images.length}
                        </div>
                    )}
                    <div className={styles.zoomHint}>Двойной клик для увеличения</div>
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
