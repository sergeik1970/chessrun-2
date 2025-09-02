/**
 * Типы для UI компонентов
 */

import React from "react";
import { Post, PostImage, PostFile } from "./Post";

// Типы для кнопки
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    types?: "primary";
}

// Типы для текстового поля
export interface InputTextProps extends React.HTMLAttributes<HTMLInputElement> {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
}

// Типы для чекбокса
export interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    label?: string;
}

// Типы для навигации
export interface NavigationProps {
    currentPath?: string;
    isAdmin?: boolean;
}

// Типы для провайдера авторизации
export interface AuthProviderProps {
    children: React.ReactNode;
}

// Типы для загрузчика файлов
export interface FileUploaderProps {
    onFilesSelected: (files: File[]) => void;
    accept?: string;
    multiple?: boolean;
    maxSize?: number;
    disabled?: boolean;
}

// Типы для списка файлов
export interface FilesListProps {
    files: PostFile[];
    onFileDelete?: (fileId: string) => void;
    onFileClick?: (file: PostFile) => void;
    editable?: boolean;
}

// Типы для списка постов
export interface PostsListProps {
    posts: Post[];
    isAdmin?: boolean;
    onEdit?: (postId: string) => void;
    onDelete?: (postId: string) => void;
    onLoadMore?: () => void;
    hasMore?: boolean;
    loading?: boolean;
    error?: string | null;
}

// Типы для модального окна изображений
export interface ImageModalProps {
    images: PostImage[];
    currentIndex: number;
    isOpen: boolean;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

// Типы для свайпера изображений
export interface ImageSwiperProps {
    images: PostImage[];
    postTitle: string;
    postId: string;
    onImageClick?: (imageUrl: string, index: number) => void;
    showThumbs?: boolean;
    className?: string;
}

// Типы для перетаскиваемого списка изображений
export interface DraggableImageListProps {
    images: PostImage[];
    onReorder: (newOrder: PostImage[]) => void;
    onDelete?: (imageId: string) => void;
    editable?: boolean;
}

// Типы для элемента перетаскиваемого изображения
export interface DraggableImageItemProps {
    image: PostImage;
    index: number;
    onDelete?: (imageId: string) => void;
    editable?: boolean;
}

// Типы для API изображения
export interface ApiImageProps {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
}

// Типы для PDF просмотрщика
export interface PDFViewerProps {
    file: PostFile;
    onClose: () => void;
    isOpen: boolean;
}

// Данные файла для PDF просмотрщика
export interface FileData {
    id: string;
    file: string;
    mimeType: string;
    originalName: string;
    title?: string;
    size: number;
}
