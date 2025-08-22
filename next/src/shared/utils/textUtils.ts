// Утилиты для обработки текста в постах

/**
 * Безопасная обработка HTML контента в тексте поста
 * Поддерживает: <br>, <a href="...">...</a>
 */
export const sanitizeAndFormatText = (text: string): string => {
    return (
        text
            // Заменяем переносы строк на <br>
            .replace(/\n/g, "<br>")
            // Обрабатываем ссылки с безопасными атрибутами
            .replace(
                /<a\s+href="([^"]*)"[^>]*>([^<]*)<\/a>/gi,
                '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #007bff; text-decoration: underline;">$2</a>',
            )
    );
};

/**
 * Обрезка текста для превью с учетом HTML тегов
 */
export const truncateText = (
    text: string,
    maxLength: number = 300,
): { text: string; isTruncated: boolean } => {
    // Удаляем HTML теги для подсчета длины
    const plainText = text.replace(/<[^>]*>/g, "");

    if (plainText.length <= maxLength) {
        return { text, isTruncated: false };
    }

    // Обрезаем по символам, но стараемся не разрывать слова
    let truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");

    if (lastSpace > maxLength * 0.8) {
        truncated = truncated.substring(0, lastSpace);
    }

    return { text: truncated + "...", isTruncated: true };
};

/**
 * Извлечение первого абзаца из текста
 */
export const getFirstParagraph = (text: string): { text: string; hasMore: boolean } => {
    const paragraphs = text.split("<br><br>").filter((p) => p.trim());

    if (paragraphs.length <= 1) {
        return { text, hasMore: false };
    }

    return { text: paragraphs[0], hasMore: true };
};
