import React, { useState, useEffect } from "react";
import Image from "next/image";
import ApiImage from "../ApiImage";
import { PostComponentProps } from "../../types/Post";
import { sanitizeAndFormatText, truncateText } from "../../utils/textUtils";
import styles from "./index.module.scss";
import clsx from "clsx";

const PostCard: React.FC<PostComponentProps> = ({
    post,
    isAdmin = false,
    onEdit,
    onDelete,
    onReadMore,
    maxTextLines = 4,
    showFullText = false,
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTextExpanded, setIsTextExpanded] = useState(showFullText);
    const [selectedImageModal, setSelectedImageModal] = useState<string | null>(null);
    const [modalImageIndex, setModalImageIndex] = useState(0);

    // Находим главное изображение или берем первое
    const images = post.images || [];
    console.log("PostCard images:", images);
    const mainImage = images.find((img) => img.isMain) || images[0];
    const hasMultipleImages = images.length > 1;

    // Обрезка текста с использованием утилит
    const { text: truncatedText, isTruncated } = truncateText(post.text, 300);
    const shouldTruncateText = !isTextExpanded && isTruncated;
    const displayText = isTextExpanded ? post.text : truncatedText;
    const formattedText = sanitizeAndFormatText(displayText);

    const handleReadMore = () => {
        setIsTextExpanded(!isTextExpanded);
        if (onReadMore) {
            onReadMore(post.id);
        }
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleImageClick = (imageUrl: string) => {
        const clickedIndex = images.findIndex(img => img.url === imageUrl);
        setModalImageIndex(clickedIndex >= 0 ? clickedIndex : 0);
        setSelectedImageModal(imageUrl);
    };

    const handleModalPrevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newIndex = modalImageIndex === 0 ? images.length - 1 : modalImageIndex - 1;
        setModalImageIndex(newIndex);
        setSelectedImageModal(images[newIndex].url);
    };

    const handleModalNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newIndex = modalImageIndex === images.length - 1 ? 0 : modalImageIndex + 1;
        setModalImageIndex(newIndex);
        setSelectedImageModal(images[newIndex].url);
    };

    const handleCloseModal = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setSelectedImageModal(null);
    };

    // Обработка клавиш для навигации в модальном окне и блокировка прокрутки
    useEffect(() => {
        if (!selectedImageModal) return;

        // Блокируем прокрутку страницы
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'Escape':
                    handleCloseModal();
                    break;
                case 'ArrowLeft':
                    if (images.length > 1) {
                        const newIndex = modalImageIndex === 0 ? images.length - 1 : modalImageIndex - 1;
                        setModalImageIndex(newIndex);
                        setSelectedImageModal(images[newIndex].url);
                    }
                    break;
                case 'ArrowRight':
                    if (images.length > 1) {
                        const newIndex = modalImageIndex === images.length - 1 ? 0 : modalImageIndex + 1;
                        setModalImageIndex(newIndex);
                        setSelectedImageModal(images[newIndex].url);
                    }
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            // Восстанавливаем прокрутку страницы
            document.body.style.overflow = 'unset';
        };
    }, [selectedImageModal, modalImageIndex, images]);

    const formatDate = (dateString: string) => {
        // Используем более стабильный способ форматирования для SSR
        const date = new Date(dateString);
        const months = [
            "января",
            "февраля",
            "марта",
            "апреля",
            "мая",
            "июня",
            "июля",
            "августа",
            "сентября",
            "октября",
            "ноября",
            "декабря",
        ];

        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} г.`;
    };

    return (
        <>
            <article className={styles.postCard}>
                {/* Категория */}
                <div className={styles.category}>
                    {post.category.icon && (
                        <span className={styles.categoryIcon}>{post.category.icon}</span>
                    )}
                    <span className={styles.categoryName}>{post.category.name}</span>
                </div>

                {/* Заголовок */}
                <h2 className={styles.title}>{post.title}</h2>

                {/* Изображения */}
                {images.length > 0 && (
                    <div className={styles.imageContainer}>
                        <div className={styles.imageWrapper}>
                            {images[currentImageIndex].url.includes("localhost:3001") ? (
                                <ApiImage
                                    src={images[currentImageIndex].url}
                                    alt={images[currentImageIndex].alt || post.title}
                                    width={0}
                                    height={0}
                                    sizes="(max-width: 768px) 100vw, 800px"
                                    className={styles.mainImage}
                                    onClick={() => handleImageClick(images[currentImageIndex].url)}
                                />
                            ) : (
                                <Image
                                    src={images[currentImageIndex].url}
                                    alt={images[currentImageIndex].alt || post.title}
                                    width={0}
                                    height={0}
                                    sizes="(max-width: 768px) 100vw, 800px"
                                    className={styles.mainImage}
                                    onClick={() => handleImageClick(images[currentImageIndex].url)}
                                />
                            )}

                            {/* Стрелки навигации */}
                            {hasMultipleImages && (
                                <>
                                    <button
                                        className={clsx(styles.navButton, styles.prevButton)}
                                        onClick={handlePrevImage}
                                        aria-label="Предыдущее изображение"
                                    >
                                        ←
                                    </button>
                                    <button
                                        className={clsx(styles.navButton, styles.nextButton)}
                                        onClick={handleNextImage}
                                        aria-label="Следующее изображение"
                                    >
                                        →
                                    </button>

                                    {/* Счетчик */}
                                    <div className={styles.imageCounter}>
                                        {currentImageIndex + 1} / {images.length}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Текст */}
                <div className={styles.textContent}>
                    <div
                        className={clsx(styles.text, !isTextExpanded && styles.truncated)}
                        dangerouslySetInnerHTML={{ __html: formattedText }}
                    />

                    {shouldTruncateText && (
                        <button className={styles.readMoreButton} onClick={handleReadMore}>
                            {isTextExpanded ? "Свернуть" : "Читать далее"}
                        </button>
                    )}
                </div>

                {/* Футер поста */}
                <footer className={styles.postFooter}>
                    <time className={styles.date}>{formatDate(post.createdAt)}</time>

                    {/* Админские кнопки */}
                    {isAdmin && (
                        <div className={styles.adminButtons}>
                            {onEdit && (
                                <button
                                    className={styles.editButton}
                                    onClick={() => onEdit(post.id)}
                                >
                                    Редактировать
                                </button>
                            )}
                            {onDelete && (
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => onDelete(post.id)}
                                >
                                    Удалить
                                </button>
                            )}
                        </div>
                    )}
                </footer>
            </article>

            {/* Модальное окно для просмотра изображения в оригинальном размере */}
            {selectedImageModal && (
                <div className={styles.imageModal} onClick={handleCloseModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        {selectedImageModal.includes("localhost:3001") ? (
                            <ApiImage
                                src={selectedImageModal}
                                alt={`Изображение ${modalImageIndex + 1} из ${images.length}`}
                                width={0}
                                height={0}
                                sizes="100vw"
                                className={styles.modalImage}
                            />
                        ) : (
                            <Image
                                src={selectedImageModal}
                                alt={`Изображение ${modalImageIndex + 1} из ${images.length}`}
                                width={0}
                                height={0}
                                sizes="100vw"
                                className={styles.modalImage}
                            />
                        )}
                        
                        {/* Кнопка закрытия */}
                        <button
                            className={styles.closeModal}
                            onClick={handleCloseModal}
                        >
                            ×
                        </button>

                        {/* Навигация по изображениям в модальном окне */}
                        {images.length > 1 && (
                            <>
                                {/* Обычные стрелки для больших экранов */}
                                <button
                                    className={clsx(styles.modalNavButton, styles.modalPrevButton)}
                                    onClick={handleModalPrevImage}
                                    aria-label="Предыдущее изображение"
                                >
                                    ←
                                </button>
                                <button
                                    className={clsx(styles.modalNavButton, styles.modalNextButton)}
                                    onClick={handleModalNextImage}
                                    aria-label="Следующее изображение"
                                >
                                    →
                                </button>

                                {/* Счетчик изображений для больших экранов */}
                                <div className={styles.modalImageCounter}>
                                    {modalImageIndex + 1} / {images.length}
                                </div>

                                {/* Навигационная панель для маленьких экранов */}
                                <div className={styles.modalNavPanel}>
                                    <button
                                        className={styles.modalNavPanelButton}
                                        onClick={handleModalPrevImage}
                                        aria-label="Предыдущее изображение"
                                    >
                                        ←
                                    </button>
                                    <div className={styles.modalNavPanelCounter}>
                                        {modalImageIndex + 1} / {images.length}
                                    </div>
                                    <button
                                        className={styles.modalNavPanelButton}
                                        onClick={handleModalNextImage}
                                        aria-label="Следующее изображение"
                                    >
                                        →
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default PostCard;
