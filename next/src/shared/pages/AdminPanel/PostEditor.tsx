import React, { ReactElement, useState, useEffect } from "react";
import { useDispatch, useSelector } from "../../store/store";
import {
    createPost,
    updatePost,
    uploadPostImages,
    deletePostImage,
    fetchCategories,
    fetchPosts,
    PostCategory,
    PostImage,
} from "../../store/slices/posts";
import { Post } from "../../store/slices/posts";
import { getImageUrlFromPost } from "../../utils/imageUtils";
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
        link: "",
        images: [] as File[], // Массив новых файлов изображений
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<PostImage[]>([]); // Существующие изображения
    const [imagesToDelete, setImagesToDelete] = useState<number[]>([]); // ID изображений для удаления

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
                link: post.link || "",
                images: [], // Новые изображения
            });
            // Загружаем существующие изображения
            setExistingImages(post.images || []);
            setImagesToDelete([]); // Сбрасываем список изображений для удаления
        } else {
            // Сбрасываем состояние для создания нового поста
            setExistingImages([]);
            setImagesToDelete([]);
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
                category: formData.category as "travel" | "competition" | "training" | "news" | "events",
                link: formData.link.trim() || undefined,
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
                            Заголовок *
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
                            Категория *
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
                        <label htmlFor="link" className={styles.label}>
                            Ссылка (необязательно)
                        </label>
                        <input
                            type="url"
                            id="link"
                            name="link"
                            value={formData.link}
                            onChange={handleInputChange}
                            className={styles.input}
                            placeholder="https://example.com"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="body" className={styles.label}>
                            Текст поста *
                        </label>
                        <textarea
                            id="body"
                            name="body"
                            value={formData.body}
                            onChange={handleInputChange}
                            rows={8}
                            className={`${styles.textarea} ${errors.body ? styles.error : ""}`}
                            placeholder="Введите текст поста. Можно использовать HTML теги для форматирования."
                        />
                        {errors.body && <span className={styles.errorText}>{errors.body}</span>}
                        <small className={styles.hint}>
                            Поддерживается HTML разметка: &lt;br&gt;, &lt;a&gt;, &lt;strong&gt;,
                            &lt;em&gt;
                        </small>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Изображения</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className={styles.fileInput}
                        />

                        {/* Существующие изображения */}
                        {existingImages.length > 0 && (
                            <div className={styles.imagePreview}>
                                <h4 className={styles.sectionTitle}>Текущие изображения:</h4>
                                {existingImages.map((image, index) => (
                                    <div key={`existing-${image.id}`} className={styles.imagePreviewItem}>
                                        <img
                                            src={post ? getImageUrlFromPost(post.id, image) : ''}
                                            alt={image.alt || `Изображение ${index + 1}`}
                                            className={styles.previewImage}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeExistingImage(image.id)}
                                            className={styles.removeImageButton}
                                        >
                                            ×
                                        </button>
                                        <small className={styles.fileName}>
                                            {image.originalName || `Изображение ${index + 1}`}
                                        </small>
                                        {image.isMain && (
                                            <small className={styles.hint}>
                                                Главное изображение
                                            </small>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Новые изображения */}
                        {formData.images.length > 0 && (
                            <div className={styles.imagePreview}>
                                <h4 className={styles.sectionTitle}>Новые изображения:</h4>
                                {formData.images.map((file, index) => (
                                    <div key={`new-${index}`} className={styles.imagePreviewItem}>
                                        <img
                                            src={imagePreviewUrls[index]}
                                            alt={`Preview ${index + 1}`}
                                            className={styles.previewImage}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeNewImage(index)}
                                            className={styles.removeImageButton}
                                        >
                                            ×
                                        </button>
                                        <small className={styles.fileName}>{file.name}</small>
                                        {existingImages.length === 0 && index === 0 && (
                                            <small className={styles.hint}>
                                                Главное изображение
                                            </small>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        <small className={styles.hint}>
                            Поддерживаются форматы: JPG, PNG, GIF. Первое изображение будет главным.
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
        </div>
    );
};

export default PostEditor;
