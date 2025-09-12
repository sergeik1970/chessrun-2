/**
 * Утилиты для работы с Яндекс Метрикой
 */

import {
    YandexMetrikaGoalParams,
    YandexMetrikaEventParams,
    YandexMetrikaUserParams,
    YandexMetrikaEcommerceData,
} from "../types/yandexMetrika";

const YANDEX_METRIKA_ID = 104136369;

/**
 * Отправка цели в Яндекс Метрику
 * @param target - название цели
 * @param params - дополнительные параметры
 */
export const ymGoal = (target: string, params?: YandexMetrikaGoalParams) => {
    if (typeof window !== "undefined" && window.ym) {
        window.ym(YANDEX_METRIKA_ID, "reachGoal", target, params);
    }
};

/**
 * Отправка события в Яндекс Метрику
 * @param params - параметры события
 */
export const ymEvent = (params: YandexMetrikaEventParams) => {
    if (typeof window !== "undefined" && window.ym) {
        window.ym(YANDEX_METRIKA_ID, "hit", window.location.href, {
            title: document.title,
            params,
        });
    }
};

/**
 * Отправка пользовательских параметров
 * @param params - параметры пользователя
 */
export const ymUserParams = (params: YandexMetrikaUserParams) => {
    if (typeof window !== "undefined" && window.ym) {
        window.ym(YANDEX_METRIKA_ID, "userParams", params);
    }
};

/**
 * Отправка параметров визита
 * @param params - параметры визита
 */
export const ymParams = (params: Record<string, any>) => {
    if (typeof window !== "undefined" && window.ym) {
        window.ym(YANDEX_METRIKA_ID, "params", params);
    }
};

/**
 * Отправка внешней ссылки
 * @param url - URL внешней ссылки
 * @param title - заголовок ссылки
 */
export const ymExtLink = (url: string, title?: string) => {
    if (typeof window !== "undefined" && window.ym) {
        window.ym(YANDEX_METRIKA_ID, "extLink", url, { title });
    }
};

/**
 * Отправка файла для скачивания
 * @param url - URL файла
 * @param title - название файла
 */
export const ymFile = (url: string, title?: string) => {
    if (typeof window !== "undefined" && window.ym) {
        window.ym(YANDEX_METRIKA_ID, "file", url, { title });
    }
};

/**
 * Отправка данных электронной коммерции
 * @param action - действие (purchase, add, remove, detail, etc.)
 * @param data - данные о товарах/покупке
 */
export const ymEcommerce = (action: string, data: YandexMetrikaEcommerceData) => {
    if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
            ecommerce: {
                [action]: data,
            },
        });
    }
};

// Типы для TypeScript
declare global {
    interface Window {
        ym: (id: number, method: string, ...args: any[]) => void;
        dataLayer: any[];
    }
}
