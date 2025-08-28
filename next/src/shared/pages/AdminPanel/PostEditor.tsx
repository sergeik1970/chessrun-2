import React, { ReactElement, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "../../store/store";
import {
    createPost,
    updatePost,
    uploadPostImages,
    deletePostImage,
    reorderPostImages,
    uploadPostFiles,
    deletePostFile,
    fetchCategories,
    fetchPosts,
    PostCategory,
    PostImage,
    PostFile,
} from "../../store/slices/posts";
import { Post } from "../../store/slices/posts";
import { getImageUrlFromPost } from "../../utils/imageUtils";
import DraggableImageList from "../../components/DraggableImageList";
import FileUploader from "../../components/FileUploader";
import PDFViewer from "../../components/PDFViewer";
import styles from "./PostEditor.module.scss";

interface PostEditorProps {
    post: Post | null;
    onSave: () => void;
    onClose: () => void;
}

const PostEditor = ({ post, onSave, onClose }: PostEditorProps): ReactElement => {
    const dispatch = useDispatch();
    const { categories, loading, error } = useSelector((state) => state.posts);

    const [formData, setFormData] = useState({
        title: "",
        body: "",
        category: "",
        images: [] as File[], // Массив новых файлов изображений
        files: [] as File[], // Массив новых PDF файлов
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<PostImage[]>([]); // Существующие изображения
    const [imagesToDelete, setImagesToDelete] = useState<number[]>([]); // ID изображений для удаления
    const [existingFiles, setExistingFiles] = useState<PostFile[]>([]); // Существующие файлы
    const [filesToDelete, setFilesToDelete] = useState<number[]>([]); // ID файлов для удаления
    const [showFileInput, setShowFileInput] = useState(false);
    const [pdfViewerFile, setPdfViewerFile] = useState<File | PostFile | null>(null);
    const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Блокируем скролл страницы при открытии модального окна
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    useEffect(() => {
        // Загружаем категории при монтировании компонента
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [dispatch, categories.length]);

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title,
                body: post.body,
                category: post.category,
                images: [], // Новые изображения
                files: [], // Новые файлы
            });
            // Загружаем существующие изображения и файлы
            setExistingImages(post.images || []);
            setExistingFiles(post.files || []);
            setImagesToDelete([]); // Сбрасываем список изображений для удаления
            setFilesToDelete([]); // Сбрасываем список файлов для удаления

            // Автоматически расширяем textarea для существующего контента
            setTimeout(() => {
                const textarea = document.getElementById("body") as HTMLTextAreaElement;
                if (textarea) {
                    textarea.style.height = "auto";
                    textarea.style.height = Math.max(120, textarea.scrollHeight) + "px";
                }
            }, 0);
        } else {
            // Сбрасываем состояние для создания нового поста
            setExistingImages([]);
            setExistingFiles([]);
            setImagesToDelete([]);
            setFilesToDelete([]);
        }
    }, [post]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Очищаем ошибку для этого поля
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        console.log(
            "Selected files:",
            files.length,
            files.map((f) => f.name),
        );

        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...files],
        }));

        // Создаем preview URLs
        const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
        setImagePreviewUrls((prev) => [...prev, ...newPreviewUrls]);

        console.log("Total images after selection:", formData.images.length + files.length);
    };

    const removeNewImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));

        // Освобождаем URL и удаляем из preview
        URL.revokeObjectURL(imagePreviewUrls[index]);
        setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (imageId: number) => {
        // Добавляем ID изображения в список для удаления
        setImagesToDelete((prev) => [...prev, imageId]);
        // Удаляем изображение из списка существующих
        setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
    };

    const handleReorderExistingImages = (newOrder: PostImage[]) => {
        setExistingImages(newOrder);
    };

    const handleReorderNewImages = (newOrder: File[], newPreviews: string[]) => {
        setFormData((prev) => ({
            ...prev,
            images: newOrder,
        }));
        setImagePreviewUrls(newPreviews);
    };

    const handleAddImagesClick = () => {
        fileInputRef.current?.click();
    };

    // Обработчики файлов
    const handleFilesChange = (newFiles: File[]) => {
        setFormData((prev) => ({
            ...prev,
            files: newFiles,
        }));
    };

    const removeNewFile = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            files: prev.files.filter((_, i) => i !== index),
        }));
    };

    const removeExistingFile = (fileId: number) => {
        // Добавляем ID файла в список для удаления
        setFilesToDelete((prev) => [...prev, fileId]);
        // Удаляем файл из списка существующих
        setExistingFiles((prev) => prev.filter((file) => file.id !== fileId));
    };

    const handlePreviewFile = (file: File | PostFile) => {
        setPdfViewerFile(file);
        setIsPdfViewerOpen(true);
    };

    const closePdfViewer = () => {
        setIsPdfViewerOpen(false);
        setPdfViewerFile(null);
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = "Заголовок обязателен";
        }

        if (!formData.body.trim()) {
            newErrors.body = "Текст поста обязателен";
        }

        if (!formData.category) {
            newErrors.category = "Выберите категорию";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const postData = {
                title: formData.title.trim(),
                body: formData.body.trim(),
                category: formData.category as
                    | "travel"
                    | "competition"
                    | "training"
                    | "news"
                    | "events",
            };

            let resultAction;
            if (post) {
                // Обновляем существующий пост
                resultAction = await dispatch(updatePost({ id: post.id, ...postData }));
            } else {
                // Создаем новый пост
                resultAction = await dispatch(createPost(postData));
            }

            if (
                createPost.fulfilled.match(resultAction) ||
                updatePost.fulfilled.match(resultAction)
            ) {
                const postId = post?.id || resultAction.payload.id;

                // Удаляем изображения, которые были помечены для удаления
                if (imagesToDelete.length > 0 && post) {
                    console.log("Deleting images:", imagesToDelete);
                    for (const imageId of imagesToDelete) {
                        await dispatch(deletePostImage({ postId: post.id, imageId }));
                    }
                }

                // Удаляем файлы, которые были помечены для удаления
                if (filesToDelete.length > 0 && post) {
                    console.log("Deleting files:", filesToDelete);
                    for (const fileId of filesToDelete) {
                        await dispatch(deletePostFile({ postId: post.id, fileId }));
                    }
                }

                // Если есть новые изображения, загружаем их
                if (formData.images.length > 0) {
                    console.log(
                        "About to upload images:",
                        formData.images.length,
                        "files for post",
                        postId,
                    );
                    const uploadResult = await dispatch(
                        uploadPostImages({ postId, files: formData.images }),
                    );

                    if (uploadPostImages.fulfilled.match(uploadResult)) {
                        console.log("Images uploaded successfully:", uploadResult.payload);
                    } else {
                        console.error("Failed to upload images:", uploadResult);
                    }
                }

                // Если есть новые файлы, загружаем их
                if (formData.files.length > 0) {
                    console.log(
                        "About to upload files:",
                        formData.files.length,
                        "files for post",
                        postId,
                    );
                    const uploadResult = await dispatch(
                        uploadPostFiles({ postId, files: formData.files }),
                    );

                    if (uploadPostFiles.fulfilled.match(uploadResult)) {
                        console.log("Files uploaded successfully:", uploadResult.payload);
                    } else {
                        console.error("Failed to upload files:", uploadResult);
                    }
                }

                // Если есть существующие изображения и их порядок мог измениться, обновляем порядок
                if (existingImages.length > 0 && post) {
                    const imageIds = existingImages.map((img) => img.id);
                    await dispatch(reorderPostImages({ postId: post.id, imageIds }));
                }

                // После всех операций обновляем список постов
                await dispatch(fetchPosts());
                onSave();
            }
        } catch (error) {
            console.error("Ошибка при сохранении поста:", error);
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        {post ? "Редактировать пост" : "Создать новый пост"}
                    </h2>
                    <button onClick={onClose} className={styles.closeButton}>
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title" className={styles.label}>
                            Заголовок
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className={`${styles.input} ${errors.title ? styles.error : ""}`}
                            placeholder="Введите заголовок поста"
                        />
                        {errors.title && <span className={styles.errorText}>{errors.title}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="category" className={styles.label}>
                            Категория
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className={`${styles.select} ${errors.category ? styles.error : ""}`}
                        >
                            <option value="">Выберите категорию</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.icon} {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <span className={styles.errorText}>{errors.category}</span>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="body" className={styles.label}>
                            Текст поста
                        </label>
                        <textarea
                            id="body"
                            name="body"
                            value={formData.body}
                            onChange={handleInputChange}
                            className={`${styles.autoExpandTextarea} ${errors.body ? styles.error : ""}`}
                            placeholder="Введите текст поста"
                            style={{
                                minHeight: "120px",
                                height: "auto",
                                resize: "vertical",
                            }}
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = "auto";
                                target.style.height = Math.max(120, target.scrollHeight) + "px";
                            }}
                        />
                        {errors.body && <span className={styles.errorText}>{errors.body}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <div className={styles.imagesHeader}>
                            <label className={styles.label}>Изображения</label>
                            <button
                                type="button"
                                onClick={handleAddImagesClick}
                                className={styles.addImagesButton}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M12 5V19M5 12H19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Добавить изображения
                            </button>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className={styles.hiddenFileInput}
                        />

                        {/* Компонент для перетаскивания изображений */}
                        {existingImages.length > 0 || formData.images.length > 0 ? (
                            <DraggableImageList
                                existingImages={existingImages}
                                newImages={formData.images}
                                newImagePreviews={imagePreviewUrls}
                                postId={post?.id}
                                onReorderExisting={handleReorderExistingImages}
                                onReorderNew={handleReorderNewImages}
                                onRemoveExisting={removeExistingImage}
                                onRemoveNew={removeNewImage}
                            />
                        ) : (
                            <div className={styles.noImagesPlaceholder}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <p>Изображения не добавлены</p>
                                <button
                                    type="button"
                                    onClick={handleAddImagesClick}
                                    className={styles.placeholderButton}
                                >
                                    Выбрать файлы
                                </button>
                            </div>
                        )}

                        <small className={styles.hint}>
                            Поддерживаются форматы: JPG, PNG, GIF.
                        </small>
                    </div>

                    {/* Секция файлов */}
                    <div className={styles.formGroup}>
                        <FileUploader
                            files={formData.files}
                            existingFiles={existingFiles}
                            onFilesChange={handleFilesChange}
                            onRemoveFile={removeNewFile}
                            onRemoveExistingFile={removeExistingFile}
                            onPreviewFile={handlePreviewFile}
                        />
                        <small className={styles.hint}>
                            Поддерживаются PDF файлы размером до 10MB.
                        </small>
                    </div>

                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.actions}>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>
                            Отмена
                        </button>
                        <button type="submit" disabled={loading} className={styles.saveButton}>
                            {loading
                                ? "Сохранение..."
                                : post
                                  ? "Сохранить изменения"
                                  : "Создать пост"}
                        </button>
                    </div>
                </form>
            </div>

            {/* PDF Viewer Modal */}
            <PDFViewer
                file={pdfViewerFile}
                isOpen={isPdfViewerOpen}
                onClose={closePdfViewer}
            />
        </div>
    );
};

export default PostEditor;
