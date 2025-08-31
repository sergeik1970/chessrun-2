import React, { useState, useEffect } from "react";
import ImageSwiper from "../ImageSwiper";
import ImageModal from "../ImageModal";
import FilesList from "../FilesList";
import PDFViewer from "../PDFViewer";
import { PostComponentProps, PostFile } from "../../types/Post";
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
    onImageClick,
    onPdfClick,
}) => {
    const [isTextExpanded, setIsTextExpanded] = useState(showFullText);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageIndex, setModalImageIndex] = useState(0);
    const [pdfViewerFile, setPdfViewerFile] = useState<PostFile | null>(null);
    const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);

    // Получаем изображения и файлы поста
    const images = post.images || [];
    const files = post.files || [];

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

    const handleImageClick = (imageUrl: string, index: number) => {
        if (onImageClick) {
            // Используем внешний обработчик, если он передан
            onImageClick(images, index);
        } else {
            // Используем внутренний модальный режим
            setModalImageIndex(index);
            setIsModalOpen(true);
        }
    };

    const handleFileClick = (file: PostFile) => {
        if (onPdfClick && file.mimeType === "application/pdf") {
            // Используем внешний обработчик для PDF, если он передан
            onPdfClick(file);
        } else {
            // Используем внутренний PDF viewer
            setPdfViewerFile(file);
            setIsPdfViewerOpen(true);
        }
    };

    const closePdfViewer = () => {
        setIsPdfViewerOpen(false);
        setPdfViewerFile(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

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
                    <ImageSwiper
                        images={images}
                        postTitle={post.title}
                        onImageClick={handleImageClick}
                        className={styles.imageContainer}
                    />
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

                {/* Файлы */}
                {files.length > 0 && <FilesList files={files} onFileClick={handleFileClick} />}

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

            {/* Модальное окно для просмотра изображений */}
            <ImageModal
                images={images}
                initialIndex={modalImageIndex}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />

            {/* PDF Viewer Modal */}
            <PDFViewer file={pdfViewerFile} isOpen={isPdfViewerOpen} onClose={closePdfViewer} />
        </>
    );
};

export default PostCard;
