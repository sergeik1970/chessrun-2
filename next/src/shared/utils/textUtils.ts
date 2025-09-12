/**
 * Утилиты для обработки текста в постах
 */

import { TextTruncateOptions, DateFormatOptions } from "../types/utils";

/**
 * Создание HTML для ссылки с безопасными атрибутами
 * @param url - URL для ссылки
 * @param displayText - текст для отображения
 * @returns HTML строка ссылки
 */
const createLinkHtml = (url: string, displayText: string): string => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #007bff; text-decoration: underline; word-break: break-all;">${displayText}</a>`;
};

/**
 * Автоматическое распознавание и превращение URL в ссылки
 * @param text - исходный текст
 * @returns текст с преобразованными ссылками
 */
const autoLinkUrls = (text: string): string => {
    // Улучшенное регулярное выражение для поиска URL-адресов
    // Поддерживает: домены с протоколом и без, www и без www, пути, параметры запроса
    const urlRegex =
        /((?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+(?:\/[^\s<>"'\)]*)?(?:\?[^\s<>"'\)]*)?(?:#[^\s<>"'\)]*)?)/gi;

    // Разбиваем текст на части, учитывая существующие HTML-теги
    const parts: string[] = [];
    let lastIndex = 0;
    let insideTag = false;

    for (let i = 0; i < text.length; i++) {
        if (text[i] === "<") {
            insideTag = true;
        } else if (text[i] === ">") {
            insideTag = false;
        }

        if (!insideTag && i === text.length - 1) {
            // Обрабатываем последнюю часть
            const part = text.substring(lastIndex);
            parts.push(
                part.replace(urlRegex, (match) => {
                    // Добавляем протокол, если его нет
                    const url = match.startsWith("http") ? match : `https://${match}`;
                    return createLinkHtml(url, match);
                }),
            );
        }
    }

    // Простой подход: заменяем URL только вне HTML-тегов
    return text.replace(urlRegex, (match, p1, offset) => {
        // Проверяем, находится ли URL внутри HTML-тега
        const beforeMatch = text.substring(0, offset);
        const afterMatch = text.substring(offset + match.length);

        // Ищем последний открывающий тег перед URL
        const lastOpenTag = beforeMatch.lastIndexOf("<");
        const lastCloseTag = beforeMatch.lastIndexOf(">");

        // Если последний открывающий тег идет после последнего закрывающего,
        // значит мы внутри тега
        if (lastOpenTag > lastCloseTag) {
            return match; // Не обрабатываем URL внутри тегов
        }

        // Проверяем, не является ли это уже частью href атрибута
        if (
            beforeMatch.toLowerCase().includes("href=") &&
            beforeMatch.lastIndexOf("href=") > beforeMatch.lastIndexOf(">")
        ) {
            return match;
        }

        // Добавляем протокол, если его нет
        const url = match.startsWith("http") ? match : `https://${match}`;
        return createLinkHtml(url, match);
    });
};

/**
 * Безопасная обработка HTML контента в тексте поста
 * Поддерживает: <br>, <a href="...">...</a>, автоматическое распознавание URL
 * @param text - исходный текст
 * @returns отформатированный HTML текст
 */
export const sanitizeAndFormatText = (text: string): string => {
    let processedText = text
        // Заменяем переносы строк на <br>
        .replace(/\n/g, "<br>")
        // Обрабатываем уже существующие HTML ссылки с безопасными атрибутами
        .replace(
            /<a\s+href="([^"]*)"[^>]*>([^<]*)<\/a>/gi,
            '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #007bff; text-decoration: underline;">$2</a>',
        );

    // Автоматически распознаем и превращаем в ссылки URL-адреса
    return autoLinkUrls(processedText);
};

/**
 * Обрезка текста для превью с учетом HTML тегов
 * @param text - исходный текст
 * @param options - опции обрезки
 * @returns объект с обрезанным текстом и флагом обрезки
 */
export const truncateText = (
    text: string,
    options: TextTruncateOptions = { maxLength: 300 },
): { text: string; isTruncated: boolean } => {
    const { maxLength, suffix = "...", preserveWords = true } = options;

    // Удаляем HTML теги для подсчета длины
    const plainText = text.replace(/<[^>]*>/g, "");

    if (plainText.length <= maxLength) {
        return { text, isTruncated: false };
    }

    // Обрезаем по символам
    let truncated = text.substring(0, maxLength);

    // Стараемся не разрывать слова, если включена опция
    if (preserveWords) {
        const lastSpace = truncated.lastIndexOf(" ");
        if (lastSpace > maxLength * 0.8) {
            truncated = truncated.substring(0, lastSpace);
        }
    }

    return { text: truncated + suffix, isTruncated: true };
};

/**
 * Извлечение первого абзаца из текста
 * @param text - исходный текст
 * @returns объект с первым абзацем и флагом наличия дополнительного контента
 */
export const getFirstParagraph = (text: string): { text: string; hasMore: boolean } => {
    const paragraphs = text.split("<br><br>").filter((p) => p.trim());

    if (paragraphs.length <= 1) {
        return { text, hasMore: false };
    }

    return { text: paragraphs[0], hasMore: true };
};

/**
 * Форматирование даты в читаемый вид
 * @param dateString - строка с датой
 * @param options - опции форматирования
 * @returns отформатированная дата
 */
export const formatDate = (dateString: string, options: DateFormatOptions = {}): string => {
    const { locale = "ru-RU", format = "medium", includeTime = false } = options;

    const date = new Date(dateString);

    const formatOptions: Intl.DateTimeFormatOptions = {};

    switch (format) {
        case "short":
            formatOptions.day = "2-digit";
            formatOptions.month = "2-digit";
            formatOptions.year = "numeric";
            break;
        case "medium":
            formatOptions.day = "numeric";
            formatOptions.month = "long";
            formatOptions.year = "numeric";
            break;
        case "long":
            formatOptions.weekday = "long";
            formatOptions.day = "numeric";
            formatOptions.month = "long";
            formatOptions.year = "numeric";
            break;
        case "full":
            formatOptions.weekday = "long";
            formatOptions.day = "numeric";
            formatOptions.month = "long";
            formatOptions.year = "numeric";
            break;
    }

    if (includeTime) {
        formatOptions.hour = "2-digit";
        formatOptions.minute = "2-digit";
    }

    return date.toLocaleDateString(locale, formatOptions);
};

/**
 * Удаление HTML тегов из текста
 * @param text - текст с HTML тегами
 * @returns чистый текст без HTML
 */
export const stripHtml = (text: string): string => {
    return text.replace(/<[^>]*>/g, "");
};

/**
 * Подсчет слов в тексте
 * @param text - исходный текст
 * @returns количество слов
 */
export const countWords = (text: string): number => {
    const cleanText = stripHtml(text);
    return cleanText
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
};
