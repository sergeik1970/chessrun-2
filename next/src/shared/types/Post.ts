// Типы для универсального компонента поста

export interface PostImage {
    id: string;
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    isMain?: boolean; // главное изображение для превью
}

export interface PostFile {
    id: string;
    file: string; // base64 данные
    mimeType: string;
    originalName: string;
    title?: string; // Название файла для отображения
    size: number;
}

export interface PostCategory {
    id: string;
    name: string;
    icon?: string; // иконка категории
    color?: string; // цвет для бейджа
}

export interface Post {
    id: string;
    title: string;
    text: string;
    createdAt: string; // дата события
    updatedAt: string; // дата публикации (для админа)
    author?: string; // автор (не показываем пользователям)
    images?: PostImage[];
    files?: PostFile[];
    category: PostCategory;
}

export interface PostComponentProps {
    post: Post;
    isAdmin?: boolean; // показывать ли админские кнопки
    onEdit?: (postId: string) => void;
    onDelete?: (postId: string) => void;
    onReadMore?: (postId: string) => void;
    maxTextLines?: number; // количество строк для обрезки (по умолчанию 3-4)
    showFullText?: boolean; // развернут ли текст
}
