import React, { useState, useEffect } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PostImage } from "../../store/slices/posts";
import { getImageUrlFromPost } from "../../utils/imageUtils";
import styles from "./index.module.scss";

interface DraggableImageItemProps {
    id: string;
    image: PostImage | File;
    index: number;
    isExisting: boolean;
    postId?: number;
    previewUrl?: string;
    onRemove: () => void;
    isMain: boolean;
    onPreview: () => void;
}

const DraggableImageItem: React.FC<DraggableImageItemProps> = ({
    id,
    image,
    index,
    isExisting,
    postId,
    previewUrl,
    onRemove,
    isMain,
    onPreview,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const getImageSrc = () => {
        if (isExisting && postId) {
            return getImageUrlFromPost(postId, image as PostImage);
        }
        return previewUrl || "";
    };

    const getImageName = () => {
        if (isExisting) {
            return (image as PostImage).originalName || `Изображение ${index + 1}`;
        }
        return (image as File).name;
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`${styles.imageCard} ${isDragging ? styles.dragging : ""}`}
        >
            <div
                className={styles.imageContainer}
                onClick={(e) => {
                    e.stopPropagation();
                    onPreview();
                }}
            >
                <div className={styles.dragHandle} {...attributes} {...listeners}>
                    <img src={getImageSrc()} alt={getImageName()} className={styles.image} />
                </div>

                {/* Номер изображения */}
                <div className={styles.imageNumber}>{index + 1}</div>

                {/* Бейдж главного изображения */}
                {isMain && (
                    <div className={styles.mainBadge}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                )}

                {/* Кнопка удаления - внутри контейнера, но вне области перетаскивания */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onRemove();
                    }}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    onTouchStart={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    className={styles.removeButton}
                    title="Удалить изображение"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M18 6L6 18M6 6L18 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

interface DraggableImageListProps {
    existingImages: PostImage[];
    newImages: File[];
    newImagePreviews: string[];
    postId?: number;
    onReorderExisting: (newOrder: PostImage[]) => void;
    onReorderNew: (newOrder: File[], newPreviews: string[]) => void;
    onRemoveExisting: (imageId: number) => void;
    onRemoveNew: (index: number) => void;
}

const DraggableImageList: React.FC<DraggableImageListProps> = ({
    existingImages,
    newImages,
    newImagePreviews,
    postId,
    onReorderExisting,
    onReorderNew,
    onRemoveExisting,
    onRemoveNew,
}) => {
    const [previewImage, setPreviewImage] = useState<{
        src: string;
        alt: string;
        index: number;
    } | null>(null);

    const openPreview = (item: any, globalIndex: number) => {
        const src =
            item.type === "existing" && postId
                ? getImageUrlFromPost(postId, item.data as PostImage)
                : newImagePreviews[item.index] || "";

        const alt =
            item.type === "existing"
                ? (item.data as PostImage).originalName || `Изображение ${globalIndex + 1}`
                : (item.data as File).name;

        setPreviewImage({
            src,
            alt,
            index: globalIndex + 1,
        });
    };

    const closePreview = () => {
        setPreviewImage(null);
    };

    // Обработка клавиши Escape для закрытия предпросмотра
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && previewImage) {
                closePreview();
            }
        };

        if (previewImage) {
            document.addEventListener("keydown", handleKeyDown);
            // Блокируем скролл страницы при открытом модальном окне
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [previewImage]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    // Создаем объединенный список для отображения порядка
    const allImages = [
        ...existingImages.map((img, index) => ({
            id: `existing-${img.id}`,
            type: "existing" as const,
            data: img,
            index,
        })),
        ...newImages.map((file, index) => ({
            id: `new-${index}`,
            type: "new" as const,
            data: file,
            index,
        })),
    ];

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        const activeIndex = allImages.findIndex((item) => item.id === active.id);
        const overIndex = allImages.findIndex((item) => item.id === over.id);

        if (activeIndex === -1 || overIndex === -1) {
            return;
        }

        const activeItem = allImages[activeIndex];
        const overItem = allImages[overIndex];

        // Если перетаскиваем в пределах одного типа (existing или new)
        if (activeItem.type === overItem.type) {
            if (activeItem.type === "existing") {
                const newOrder = arrayMove(existingImages, activeItem.index, overItem.index);
                onReorderExisting(newOrder);
            } else {
                const newOrder = arrayMove(newImages, activeItem.index, overItem.index);
                const newPreviews = arrayMove(newImagePreviews, activeItem.index, overItem.index);
                onReorderNew(newOrder, newPreviews);
            }
        }
        // Если перетаскиваем между типами, пока не поддерживаем
        // (можно добавить позже, если нужно)
    };

    if (allImages.length === 0) {
        return null;
    }

    return (
        <div className={styles.container}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={allImages.map((item) => item.id)}
                    strategy={rectSortingStrategy}
                >
                    <div className={styles.imageGrid}>
                        {allImages.map((item, globalIndex) => (
                            <DraggableImageItem
                                key={item.id}
                                id={item.id}
                                image={item.data}
                                index={globalIndex}
                                isExisting={item.type === "existing"}
                                postId={postId}
                                previewUrl={
                                    item.type === "new" ? newImagePreviews[item.index] : undefined
                                }
                                onRemove={() => {
                                    if (item.type === "existing") {
                                        onRemoveExisting((item.data as PostImage).id);
                                    } else {
                                        onRemoveNew(item.index);
                                    }
                                }}
                                onPreview={() => openPreview(item, globalIndex)}
                                isMain={globalIndex === 0}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {allImages.length > 0 && (
                <div className={styles.hint}>
                    💡 Первое изображение будет главным. Перетащите для изменения порядка.
                </div>
            )}

            {/* Модальное окно предпросмотра */}
            {previewImage && (
                <div className={styles.previewModal} onClick={closePreview}>
                    <div className={styles.previewContent}>
                        <img
                            src={previewImage.src}
                            alt={previewImage.alt}
                            className={styles.previewImage}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            className={styles.previewClose}
                            onClick={closePreview}
                            title="Закрыть"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M18 6L6 18M6 6L18 18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <div className={styles.previewInfo}>
                            Изображение #{previewImage.index}
                            {previewImage.index === 1 && " (главное)"}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DraggableImageList;
