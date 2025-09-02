import React, { ReactElement, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom, Keyboard, Autoplay, EffectFade } from "swiper/modules";
import { useDispatch, useSelector } from "../../store/store";
import { fetchPosts, Post } from "../../store/slices/posts";
import PostCard from "../../components/PostCard";
import { getImageUrlFromPost } from "../../utils/imageUtils";
import ApiImage from "../../components/ApiImage";
import Footer from "../../components/Footer";
import { PostImage, PostFile } from "../../types/Post";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import styles from "./index.module.scss";
import postsStyles from "../../styles/posts.module.scss";

const TravelPage = (): ReactElement => {
    const dispatch = useDispatch();
    const { posts, loading, error } = useSelector((state) => state.posts);
    const [travelPosts, setTravelPosts] = useState<Post[]>([]);

    // Состояния для модальных окон
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [pdfModalOpen, setPdfModalOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState<PostImage[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedPdf, setSelectedPdf] = useState<PostFile | null>(null);

    // Состояние для Swiper
    const [heroSwiper, setHeroSwiper] = useState<any>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Массив фоновых изображений для hero секции
    const heroImages = [
        {
            src: "/images/travel/travel-1.jpg",
            alt: "Кемпинг в лесу",
        },
        {
            src: "/images/travel/travel-2.jpg",
            alt: "Рафтинг по реке",
        },
        {
            src: "/images/travel/travel-3.jpg",
            alt: "Геленджик",
        },
        {
            src: "/images/travel/travel-4.jpg",
            alt: "Железнодорожное путешествие",
        },
    ];

    useEffect(() => {
        // Загружаем посты при монтировании компонента
        dispatch(fetchPosts());
    }, [dispatch]);

    useEffect(() => {
        // Фильтруем посты по категории "travel"
        const filtered = posts.filter((post) => post.category === "travel");
        setTravelPosts(filtered);
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

    const handlePdfClick = (pdf: PostFile) => {
        setSelectedPdf(pdf);
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
    const adaptedPosts = travelPosts.map((post) => ({
        id: post.id.toString(),
        title: post.title,
        text: post.body,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        author: post.author?.name || "Неизвестный автор",
        images: (post.images || []).map((img) => ({
            id: img.id.toString(),
            url: getImageUrlFromPost(post.id, img),
            alt: img.alt || "",
            isMain: img.isMain,
        })),
        files: (post.files || []).map((file) => ({
            id: file.id.toString(),
            file: file.file,
            mimeType: file.mimeType,
            originalName: file.originalName,
            title: file.title || file.originalName,
            size: file.size,
        })),
        category: {
            id: "travel",
            name: "Путешествия",
            icon: "✈️",
            color: "#4A90E2",
        },
    }));

    return (
        <div className={styles.travelPage}>
            {/* Hero секция с изображением и заголовком */}
            <section
                className={styles.hero}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Фоновый слайдер с изображениями */}
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

                {/* Статичный оверлей с заголовком и цитатой */}
                <div className={styles.heroOverlay}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Путешествия</h1>
                        <p className={styles.heroQuote}>На пути к новым вершинам.</p>
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
                    {loading && travelPosts.length === 0 ? (
                        <div className={postsStyles.loading}>
                            <div className={postsStyles.spinner}></div>
                            <p>Загрузка путешествий...</p>
                        </div>
                    ) : error ? (
                        <div className={postsStyles.error}>
                            <p>Ошибка при загрузке: {error}</p>
                        </div>
                    ) : adaptedPosts.length === 0 ? (
                        <div className={postsStyles.emptyState}>
                            <div className={postsStyles.emptyIcon}>✈️</div>
                            <h3>Пока нет путешествий</h3>
                            <p>Скоро здесь появятся увлекательные истории о путешествиях!</p>
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
                            ×
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
                                                fill
                                                style={{ objectFit: "contain" }}
                                            />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                            {/* Показываем кнопки навигации только если изображений больше одного */}
                            {selectedImages.length > 1 && (
                                <>
                                    <button className={postsStyles.imageModalButtonPrev}>←</button>
                                    <button className={postsStyles.imageModalButtonNext}>→</button>
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
                                Нажмите на изображение для увеличения
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Модальное окно для PDF */}
            {pdfModalOpen && selectedPdf && (
                <div className={postsStyles.pdfModal} onClick={closePdfModal}>
                    <div
                        className={postsStyles.pdfModalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={postsStyles.pdfModalHeader}>
                            <h3 className={postsStyles.pdfModalTitle}>
                                {selectedPdf.title || selectedPdf.originalName || "Документ"}
                            </h3>
                            <div className={postsStyles.pdfModalActions}>
                                <a
                                    href={`data:${selectedPdf.mimeType};base64,${selectedPdf.file}`}
                                    download={selectedPdf.originalName}
                                    className={postsStyles.pdfDownloadButton}
                                    title="Скачать"
                                >
                                    ↓
                                </a>
                                <button
                                    className={postsStyles.pdfCloseButton}
                                    onClick={closePdfModal}
                                    title="Закрыть"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                        <div className={postsStyles.pdfModalBody}>
                            <iframe
                                src={`data:${selectedPdf.mimeType};base64,${selectedPdf.file}`}
                                className={postsStyles.pdfFrame}
                                title={
                                    selectedPdf.title || selectedPdf.originalName || "PDF документ"
                                }
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Футер */}
            <Footer />
        </div>
    );
};

export default TravelPage;
