import React, { ReactElement, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom, Keyboard, Autoplay, EffectFade } from "swiper/modules";
import { useDispatch, useSelector } from "../../store/store";
import { fetchPosts } from "../../store/slices/posts";
import PostCard from "../../components/PostCard";
import { getImageUrlFromPost } from "../../utils/imageUtils";
import ApiImage from "../../components/ApiImage";
import Footer from "../../components/Footer";
import PDFViewer from "../../components/PDFViewer";
import { Post, ServerPost, PostImage, PostFile } from "../../types/Post";

import styles from "./index.module.scss";
import postsStyles from "../../styles/posts.module.scss";

const TrainingPage = (): ReactElement => {
    const dispatch = useDispatch();
    const { posts, loading, error } = useSelector((state) => state.posts);
    const [trainingPosts, setTrainingPosts] = useState<ServerPost[]>([]);

    // Состояния для модальных окон
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [pdfModalOpen, setPdfModalOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState<PostImage[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedPdf, setSelectedPdf] = useState<PostFile | null>(null);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    // Состояние для Swiper
    const [heroSwiper, setHeroSwiper] = useState<any>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Массив фоновых изображений для hero секции
    const heroImages = [
        {
            src: "/images/training/training-1.jpg",
            alt: "Тренировка в лесу",
        },
        {
            src: "/images/training/training-2.jpg",
            alt: "Спортивное ориентирование",
        },
        {
            src: "/images/training/training-3.jpg",
            alt: "Персональные тренировки",
        },
    ];

    useEffect(() => {
        // Загружаем посты при монтировании компонента
        dispatch(fetchPosts());
        setIsMounted(true);
    }, [dispatch]);

    useEffect(() => {
        // Фильтруем посты по категории "training"
        const filtered = posts.filter((post) => post.category === "training");
        setTrainingPosts(filtered);
    }, [posts]);

    // Управление автопрокруткой при наведении мыши
    useEffect(() => {
        if (!heroSwiper) return;

        if (isHovered) {
            heroSwiper.autoplay.stop();
        } else {
            heroSwiper.autoplay.start();
        }
    }, [isHovered, heroSwiper]);

    // Функции для модальных окон
    const handleImageClick = (images: PostImage[], index: number) => {
        setSelectedImages(images);
        setSelectedImageIndex(index);
        setImageModalOpen(true);
    };

    const handlePdfClick = (pdf: PostFile, postId: string) => {
        setSelectedPdf(pdf);
        setSelectedPostId(parseInt(postId));
        setPdfModalOpen(true);
    };

    const closeImageModal = () => {
        setImageModalOpen(false);
        setSelectedImages([]);
        setSelectedImageIndex(0);
    };

    const closePdfModal = () => {
        setPdfModalOpen(false);
        setSelectedPdf(null);
        setSelectedPostId(null);
    };

    // Блокировка скролла при открытии модальных окон
    useEffect(() => {
        if (imageModalOpen || pdfModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [imageModalOpen, pdfModalOpen]);

    // Преобразуем посты для PostCard (адаптируем типы)
    const adaptedPosts = trainingPosts.map((post) => ({
        id: post.id.toString(),
        title: post.title,
        text: post.text,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        author: post.author?.name || "Неизвестный автор",
        images: (post.images || []).map((img) => ({
            id: img.id.toString(),
            url: getImageUrlFromPost(post.id.toString(), img),
            alt: img.alt || "",
            isMain: img.isMain,
        })),
        files: (post.files || []).map((file) => ({
            id: file.id.toString(),
            mimeType: file.mimeType,
            originalName: file.originalName,
            title: file.title || file.originalName,
            size: file.size,
            url: file.url || `http://localhost:3001/api/news/${post.id}/files/${file.id}`,
        })),
        category: {
            id: "training",
            name: "Тренировки",
            icon: "💪",
            color: "#27AE60",
        },
    }));

    return (
        <div className={styles.trainingPage}>
            {/* Hero секция с изображением и заголовком */}
            <section
                className={styles.hero}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Фоновый слайдер с изображениями */}
                {isMounted && (
                    <Swiper
                        modules={[Navigation, Autoplay, EffectFade]}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation={false}
                        pagination={false}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        effect="slide"
                        speed={1000}
                        loop={true}
                        className={styles.heroSwiper}
                        onSwiper={(swiper) => {
                            setHeroSwiper(swiper);
                            setCurrentSlide(swiper.realIndex);
                        }}
                        onSlideChange={(swiper) => {
                            setCurrentSlide(swiper.realIndex);
                        }}
                    >
                        {heroImages.map((image, index) => (
                            <SwiperSlide key={index} className={styles.heroSlide}>
                                <div className={styles.heroImage}>
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        style={{ objectFit: "cover" }}
                                        priority={index === 0}
                                        quality={90}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}

                {/* Статичный оверлей с заголовком и цитатой */}
                <div className={styles.heroOverlay}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Тренировки</h1>
                        <p className={styles.heroQuote}>Каждый шаг приближает к цели.</p>
                    </div>
                </div>

                {/* Кастомная пагинация с точками */}
                <div className={styles.heroCustomPagination}>
                    {heroImages.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.heroPaginationDot} ${
                                index === currentSlide ? styles.active : ""
                            }`}
                            onClick={() => {
                                if (heroSwiper) {
                                    heroSwiper.slideToLoop(index);
                                }
                            }}
                            aria-label={`Переключить на изображение ${index + 1}`}
                        />
                    ))}
                </div>
            </section>

            {/* Секция с постами */}
            <section className={styles.postsSection}>
                <div className={postsStyles.postsContainer}>
                    {loading && trainingPosts.length === 0 ? (
                        <div className={postsStyles.loading}>
                            <div className={postsStyles.spinner}></div>
                            <p>Загрузка тренировок...</p>
                        </div>
                    ) : error ? (
                        <div className={postsStyles.error}>
                            <p>Ошибка при загрузке: {error}</p>
                        </div>
                    ) : adaptedPosts.length === 0 ? (
                        <div className={postsStyles.emptyState}>
                            <div className={postsStyles.emptyIcon}>💪</div>
                            <h3>Пока нет тренировок</h3>
                            <p>Скоро здесь появятся программы тренировок и полезные советы!</p>
                        </div>
                    ) : (
                        <>
                            <div className={postsStyles.postsList}>
                                {adaptedPosts.map((post) => (
                                    <div key={post.id} className={postsStyles.postItem}>
                                        <PostCard
                                            post={post}
                                            maxTextLines={3}
                                            showFullText={false}
                                            onImageClick={handleImageClick}
                                            onPdfClick={handlePdfClick}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Модальное окно для изображений */}
            {imageModalOpen && selectedImages.length > 0 && (
                <div className={postsStyles.imageModal} onClick={closeImageModal}>
                    <div
                        className={postsStyles.imageModalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={postsStyles.imageModalCloseButton}
                            onClick={closeImageModal}
                        >
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M18 6L6 18M6 6L18 18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <Swiper
                            className={postsStyles.imageModalSwiper}
                            modules={[Navigation, Pagination, Zoom, Keyboard]}
                            spaceBetween={0}
                            slidesPerView={1}
                            initialSlide={selectedImageIndex}
                            navigation={
                                selectedImages.length > 1
                                    ? {
                                          prevEl: `.${postsStyles.imageModalButtonPrev}`,
                                          nextEl: `.${postsStyles.imageModalButtonNext}`,
                                      }
                                    : false
                            }
                            pagination={
                                selectedImages.length > 1
                                    ? {
                                          clickable: true,
                                          dynamicBullets: true,
                                      }
                                    : false
                            }
                            zoom={true}
                            keyboard={{
                                enabled: true,
                            }}
                            loop={selectedImages.length > 1}
                            onSlideChange={(swiper) => setSelectedImageIndex(swiper.activeIndex)}
                        >
                            {selectedImages.map((image, index) => (
                                <SwiperSlide key={index} className={postsStyles.imageModalSlide}>
                                    <div className={postsStyles.imageModalImageWrapper}>
                                        <div className="swiper-zoom-container">
                                            <ApiImage
                                                src={image.url}
                                                alt={image.alt || `Изображение ${index + 1}`}
                                                className={postsStyles.imageModalImage}
                                            />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                            {/* Показываем кнопки навигации только если изображений больше одного */}
                            {selectedImages.length > 1 && (
                                <>
                                    <button className={postsStyles.imageModalButtonPrev}>
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M15 18L9 12L15 6"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                    <button className={postsStyles.imageModalButtonNext}>
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9 18L15 12L9 6"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </Swiper>
                        <div className={postsStyles.imageModalInfoPanel}>
                            {/* Показываем счетчик только если изображений больше одного */}
                            {selectedImages.length > 1 && (
                                <div className={postsStyles.imageModalCounter}>
                                    {selectedImageIndex + 1} из {selectedImages.length}
                                </div>
                            )}
                            <div className={postsStyles.imageModalZoomHint}>
                                Двойной клик для увеличения
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Модальное окно для PDF */}
            <PDFViewer
                file={selectedPdf}
                isOpen={pdfModalOpen}
                onClose={closePdfModal}
                postId={`${selectedPostId}`}
            />

            <Footer />
        </div>
    );
};

export default TrainingPage;
