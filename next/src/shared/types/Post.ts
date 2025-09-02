/**
 * Типы для системы постов и новостей
 */

// Изображение поста
export interface PostImage {
    id: string;
    url: string; // URL изображения или base64 данные
    alt?: string; // альтернативный текст для изображения
    width?: number; // ширина изображения
    height?: number; // высота изображения
    isMain?: boolean; // главное изображение для превью
}

// Файл поста (PDF, документы и т.д.)
export interface PostFile {
    id: string;
    file: string; // base64 данные файла
    mimeType: string; // MIME тип файла
    originalName: string; // оригинальное имя файла
    title?: string; // название файла для отображения пользователю
    size: number; // размер файла в байтах
}

// Категория поста
export interface PostCategory {
    id: string;
    name: string;
    icon?: string; // иконка категории
    color?: string; // цвет для бейджа категории
}

// Основной интерфейс поста
export interface Post {
    id: string;
    title: string;
    text: string; // содержимое поста (используется в компонентах как text)
    createdAt: string; // дата события
    updatedAt: string; // дата публикации (для админа)
    author?: string; // автор (не показываем пользователям)
    images?: PostImage[];
    files?: PostFile[];
    category: PostCategory;
}

// Состояние для Redux store постов
export interface PostsState {
    posts: Post[];
    categories: PostCategory[];
    loading: boolean;
    error: string | null;
}

// Пропсы для компонента поста
export interface PostComponentProps {
    post: Post;
    isAdmin?: boolean; // показывать ли админские кнопки
    onEdit?: (postId: string) => void; // обработчик редактирования
    onDelete?: (postId: string) => void; // обработчик удаления
    onReadMore?: (postId: string) => void; // обработчик "читать далее"
    maxTextLines?: number; // количество строк для обрезки текста (по умолчанию 3-4)
    showFullText?: boolean; // развернут ли текст полностью
    onImageClick?: (images: PostImage[], index: number) => void; // обработчик клика по изображению
    onPdfClick?: (pdf: PostFile) => void; // обработчик клика по PDF файлу
}

// Данные для создания поста
export interface CreatePostData {
    title: string;
    text: string; // используем text вместо body для консистентности
    category: string;
    images?: PostImage[];
    files?: PostFile[];
}

// Данные для обновления поста
export interface UpdatePostData extends CreatePostData {
    id: string; // используем string для консистентности
}
