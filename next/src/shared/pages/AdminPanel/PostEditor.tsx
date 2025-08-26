import React, { ReactElement, useState, useEffect } from "react";
import { Post, PostCategory, PostImage } from "../../types/Post";
import styles from "./PostEditor.module.scss";

interface PostEditorProps {
    post: Post | null;
    categories: PostCategory[];
    onSave: (post: Post) => void;
    onClose: () => void;
}

const PostEditor = ({ post, categories, onSave, onClose }: PostEditorProps): ReactElement => {
    const [formData, setFormData] = useState({
        title: "",
        text: "",
        author: "",
        categoryId: "",
        imageUrls: [""], // Массив URL изображений
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title,
                text: post.text,
                author: post.author || "",
                categoryId: post.category.id,
                imageUrls: post.images.length > 0 ? post.images.map((img) => img.url) : [""],
            });
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

    const handleImageUrlChange = (index: number, value: string) => {
        const newImageUrls = [...formData.imageUrls];
        newImageUrls[index] = value;
        setFormData((prev) => ({
            ...prev,
            imageUrls: newImageUrls,
        }));
    };

    const addImageUrl = () => {
        setFormData((prev) => ({
            ...prev,
            imageUrls: [...prev.imageUrls, ""],
        }));
    };

    const removeImageUrl = (index: number) => {
        if (formData.imageUrls.length > 1) {
            const newImageUrls = formData.imageUrls.filter((_, i) => i !== index);
            setFormData((prev) => ({
                ...prev,
                imageUrls: newImageUrls,
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = "Заголовок обязателен";
        }

        if (!formData.text.trim()) {
            newErrors.text = "Текст поста обязателен";
        }

        if (!formData.categoryId) {
            newErrors.categoryId = "Выберите категорию";
        }

        if (!formData.author.trim()) {
            newErrors.author = "Укажите автора";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const selectedCategory = categories.find((cat) => cat.id === formData.categoryId);
        if (!selectedCategory) return;

        // Создаем изображения из URL
        const images: PostImage[] = formData.imageUrls
            .filter((url) => url.trim())
            .map((url, index) => ({
                id: `img_${Date.now()}_${index}`,
                url: url.trim(),
                alt: `Изображение ${index + 1}`,
                isMain: index === 0, // Первое изображение - главное
            }));

        const savedPost: Post = {
            id: post?.id || "",
            title: formData.title.trim(),
            text: formData.text.trim(),
            author: formData.author.trim(),
            category: selectedCategory,
            images,
            createdAt: post?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        onSave(savedPost);
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
                        <label htmlFor="author" className={styles.label}>
                            Автор *
                        </label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleInputChange}
                            className={`${styles.input} ${errors.author ? styles.error : ""}`}
                            placeholder="Укажите автора поста"
                        />
                        {errors.author && <span className={styles.errorText}>{errors.author}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="categoryId" className={styles.label}>
                            Категория *
                        </label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleInputChange}
                            className={`${styles.select} ${errors.categoryId ? styles.error : ""}`}
                        >
                            <option value="">Выберите категорию</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.icon} {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.categoryId && (
                            <span className={styles.errorText}>{errors.categoryId}</span>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="text" className={styles.label}>
                            Текст поста *
                        </label>
                        <textarea
                            id="text"
                            name="text"
                            value={formData.text}
                            onChange={handleInputChange}
                            rows={8}
                            className={`${styles.textarea} ${errors.text ? styles.error : ""}`}
                            placeholder="Введите текст поста. Можно использовать HTML теги для форматирования."
                        />
                        {errors.text && <span className={styles.errorText}>{errors.text}</span>}
                        <small className={styles.hint}>
                            Поддерживается HTML разметка: &lt;br&gt;, &lt;a&gt;, &lt;strong&gt;,
                            &lt;em&gt;
                        </small>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Изображения</label>
                        {formData.imageUrls.map((url, index) => (
                            <div key={index} className={styles.imageUrlGroup}>
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                                    className={styles.input}
                                    placeholder="https://example.com/image.jpg"
                                />
                                {formData.imageUrls.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeImageUrl(index)}
                                        className={styles.removeImageButton}
                                    >
                                        ×
                                    </button>
                                )}
                                {index === 0 && (
                                    <small className={styles.hint}>Главное изображение</small>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addImageUrl}
                            className={styles.addImageButton}
                        >
                            + Добавить изображение
                        </button>
                    </div>

                    <div className={styles.actions}>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>
                            Отмена
                        </button>
                        <button type="submit" className={styles.saveButton}>
                            {post ? "Сохранить изменения" : "Создать пост"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostEditor;
