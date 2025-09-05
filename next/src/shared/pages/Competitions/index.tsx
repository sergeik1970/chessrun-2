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

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import styles from "./index.module.scss";
import postsStyles from "../../styles/posts.module.scss";

const CompetitionsPage = (): ReactElement => {
    const dispatch = useDispatch();
    const { posts, loading, error } = useSelector((state) => state.posts);
    const [competitionsPosts, setCompetitionsPosts] = useState<ServerPost[]>([]);

    // Состояния для модальных окон
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [pdfModalOpen, setPdfModalOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState<PostImage[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedPdf, setSelectedPdf] = useState<PostFile | null>(null);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

    // Состояние для Swiper
    const [heroSwiper, setHeroSwiper] = useState<any>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Массив фоновых изображений для hero секции
    const heroImages = [
        {
            src: "/images/competitions/competition-1.jpg",
            alt: "Спортивные соревнования",
        },
        {
            src: "/images/competitions/competition-2.jpg",
            alt: "Турнир по футболу",
        },
        {
            src: "/images/competitions/competition-3.jpg",
            alt: "Легкая атлетика",
        },
        {
            src: "/images/competitions/competition-4.jpg",
            alt: "Командные соревнования",
        },
    ];

    useEffect(() => {
        // Загружаем посты при монтировании компонента
        dispatch(fetchPosts());
    }, [dispatch]);

    useEffect(() => {
        // Фильтруем посты по категории "competition"
        const filtered = posts.filter((post) => post.category === "competition");
        setCompetitionsPosts(filtered);
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
    const adaptedPosts = competitionsPosts.map((post) => ({
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
            id: "competitions",
            name: "Соревнования",
            icon: "🏆",
            color: "#E74C3C",
        },
    }));

    return (
        <div className={styles.competitionsPage}>
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
                        <h1 className={styles.heroTitle}>Соревнования</h1>
                        <p className={styles.heroQuote}>Стремление к победе объединяет нас.</p>
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
                    {loading && competitionsPosts.length === 0 ? (
                        <div className={postsStyles.loading}>
                            <div className={postsStyles.spinner}></div>
                            <p>Загрузка соревнований...</p>
                        </div>
                    ) : error ? (
                        <div className={postsStyles.error}>
                            <p>Ошибка при загрузке: {error}</p>
                        </div>
                    ) : adaptedPosts.length === 0 ? (
                        <div className={postsStyles.emptyState}>
                            <div className={postsStyles.emptyIcon}>🏆</div>
                            <h3>Пока нет соревнований</h3>
                            <p>Скоро здесь появятся новости о спортивных событиях и турнирах!</p>
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
                postId={selectedPostId}
            />

            <Footer />
        </div>
    );
};

export default CompetitionsPage;