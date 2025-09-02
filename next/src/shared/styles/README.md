# Универсальные стили для постов и медиа-компонентов

Этот файл содержит универсальные стили для отображения постов, модальных окон и медиа-компонентов на всех страницах проекта.

## Структура стилей

### 📝 Стили для постов

#### Контейнеры

-   `.postsContainer` - основной контейнер для постов
-   `.postsList` - список постов (вертикальное расположение)
-   `.postsGrid` - сетка постов (если нужен grid layout)
-   `.postItem` - обертка для отдельного поста

#### Состояния

-   `.loading` + `.spinner` - состояние загрузки
-   `.error` - состояние ошибки
-   `.emptyState` + `.emptyIcon` - пустое состояние

### 🖼️ Модальные окна для изображений

#### Основные классы

-   `.imageModal` - основное модальное окно
-   `.imageModalContent` - контент модального окна
-   `.imageModalCloseButton` - кнопка закрытия
-   `.imageModalSwiper` - swiper в модальном окне
-   `.imageModalSlide` - слайд в модальном окне
-   `.imageModalImage` - изображение в модальном окне

#### Навигация

-   `.imageModalButtonPrev` / `.imageModalButtonNext` - кнопки навигации
-   `.imageModalInfoPanel` - информационная панель
-   `.imageModalCounter` - счетчик изображений
-   `.imageModalZoomHint` - подсказка о зуме

### 🎠 Swiper для изображений

#### Основные классы

-   `.imageSwiper` - контейнер swiper
-   `.imageSwiperMain` - основной swiper
-   `.imageSwiperSlide` - слайд
-   `.imageSwiperImage` - изображение в слайде
-   `.imageSwiperImageWrapper` - обертка изображения

#### Навигация и миниатюры

-   `.imageSwiperButtonPrev` / `.imageSwiperButtonNext` - кнопки навигации
-   `.imageSwiperThumbs` - контейнер миниатюр
-   `.imageSwiperThumbSlide` - слайд миниатюры
-   `.imageSwiperThumbImage` - изображение миниатюры

### 📄 PDF Viewer

#### Модальное окно

-   `.pdfModal` - основное модальное окно
-   `.pdfModalContent` - контент модального окна
-   `.pdfModalHeader` - заголовок модального окна
-   `.pdfModalTitle` - заголовок документа
-   `.pdfModalActions` - действия (кнопки)
-   `.pdfModalBody` - тело модального окна

#### Кнопки и состояния

-   `.pdfDownloadButton` / `.pdfCloseButton` - кнопки действий
-   `.pdfFrame` - iframe для PDF
-   `.pdfLoading` + `.pdfSpinner` - состояние загрузки
-   `.pdfError` + `.pdfErrorButton` - состояние ошибки

## Использование

### Импорт стилей

```tsx
import postsStyles from "../../styles/posts.module.scss";
```

### Пример использования для постов

```tsx
<div className={postsStyles.postsContainer}>
    {loading ? (
        <div className={postsStyles.loading}>
            <div className={postsStyles.spinner}></div>
            <p>Загрузка...</p>
        </div>
    ) : error ? (
        <div className={postsStyles.error}>
            <p>Ошибка: {error}</p>
        </div>
    ) : posts.length === 0 ? (
        <div className={postsStyles.emptyState}>
            <div className={postsStyles.emptyIcon}>📝</div>
            <h3>Нет постов</h3>
            <p>Скоро здесь появятся посты!</p>
        </div>
    ) : (
        <div className={postsStyles.postsList}>
            {posts.map((post) => (
                <div key={post.id} className={postsStyles.postItem}>
                    <PostCard post={post} />
                </div>
            ))}
        </div>
    )}
</div>
```

### Пример использования для модального окна изображений

```tsx
<div className={postsStyles.imageModal}>
    <div className={postsStyles.imageModalContent}>
        <button className={postsStyles.imageModalCloseButton}>
            <CloseIcon />
        </button>
        <div className={postsStyles.imageModalSwiper}>{/* Swiper content */}</div>
    </div>
</div>
```

### Пример использования для PDF viewer

```tsx
<div className={postsStyles.pdfModal}>
    <div className={postsStyles.pdfModalContent}>
        <div className={postsStyles.pdfModalHeader}>
            <h3 className={postsStyles.pdfModalTitle}>Document.pdf</h3>
            <div className={postsStyles.pdfModalActions}>
                <button className={postsStyles.pdfDownloadButton}>
                    <DownloadIcon />
                </button>
                <button className={postsStyles.pdfCloseButton}>
                    <CloseIcon />
                </button>
            </div>
        </div>
        <div className={postsStyles.pdfModalBody}>
            <iframe className={postsStyles.pdfFrame} src="..." />
        </div>
    </div>
</div>
```

## Адаптивность

Все стили полностью адаптивны и включают:

-   Брейкпоинты: 768px, 480px, 360px
-   Оптимизацию для мобильных устройств
-   Правильное масштабирование элементов
-   Скрытие неактуальных элементов на маленьких экранах

## Особенности

### Посты

-   Автоматическое ограничение ширины на больших экранах (800px)
-   Полная ширина на мобильных устройствах
-   Правильные отступы и gap между элементами
-   Стили основаны на админ панели для консистентности

### Модальные окна

-   Высокий z-index (1000) для отображения поверх всех элементов
-   Backdrop blur эффект
-   Плавные анимации появления/исчезновения
-   Адаптивные размеры кнопок и элементов

### Swiper

-   Соотношение сторон 4:3 для изображений
-   Кастомные кнопки навигации (скрыты на мобильных)
-   Миниатюры с hover эффектами
-   Анимация загрузки

## Расширение

Для добавления новых стилей:

1. Добавьте новые классы в соответствующую секцию
2. Следуйте существующей структуре именования
3. Добавьте адаптивные стили для всех брейкпоинтов
4. Обновите этот README с описанием новых классов
