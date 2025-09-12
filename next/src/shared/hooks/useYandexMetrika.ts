/**
 * Хук для работы с Яндекс Метрикой
 */

import { useCallback } from "react";
import {
    ymGoal,
    ymEvent,
    ymUserParams,
    ymParams,
    ymExtLink,
    ymFile,
    ymEcommerce,
} from "../utils/yandexMetrika";
import {
    YandexMetrikaGoalParams,
    YandexMetrikaEventParams,
    YandexMetrikaUserParams,
    YandexMetrikaEcommerceData,
} from "../types/yandexMetrika";

export const useYandexMetrika = () => {
    const goal = useCallback((target: string, params?: YandexMetrikaGoalParams) => {
        ymGoal(target, params);
    }, []);

    const event = useCallback((params: YandexMetrikaEventParams) => {
        ymEvent(params);
    }, []);

    const userParams = useCallback((params: YandexMetrikaUserParams) => {
        ymUserParams(params);
    }, []);

    const visitParams = useCallback((params: Record<string, any>) => {
        ymParams(params);
    }, []);

    const extLink = useCallback((url: string, title?: string) => {
        ymExtLink(url, title);
    }, []);

    const file = useCallback((url: string, title?: string) => {
        ymFile(url, title);
    }, []);

    const ecommerce = useCallback((action: string, data: YandexMetrikaEcommerceData) => {
        ymEcommerce(action, data);
    }, []);

    // Предустановленные цели для типичных действий
    const trackPageView = useCallback(
        (page: string) => {
            event({
                action: "page_view",
                category: "navigation",
                label: page,
            });
        },
        [event],
    );

    const trackButtonClick = useCallback(
        (buttonName: string, location?: string) => {
            event({
                action: "button_click",
                category: "interaction",
                label: buttonName,
                location,
            });
        },
        [event],
    );

    const trackFormSubmit = useCallback(
        (formName: string, success: boolean = true) => {
            event({
                action: "form_submit",
                category: "form",
                label: formName,
                value: success ? 1 : 0,
            });
        },
        [event],
    );

    const trackSearch = useCallback(
        (query: string, resultsCount?: number) => {
            event({
                action: "search",
                category: "search",
                label: query,
                value: resultsCount,
            });
        },
        [event],
    );

    const trackDownload = useCallback(
        (fileName: string, fileUrl: string) => {
            file(fileUrl, fileName);
            event({
                action: "download",
                category: "file",
                label: fileName,
            });
        },
        [file, event],
    );

    const trackOutboundLink = useCallback(
        (url: string, linkText?: string) => {
            extLink(url, linkText);
            event({
                action: "outbound_link",
                category: "navigation",
                label: url,
            });
        },
        [extLink, event],
    );

    const trackError = useCallback(
        (errorMessage: string, errorType?: string) => {
            event({
                action: "error",
                category: "error",
                label: errorMessage,
                errorType,
            });
        },
        [event],
    );

    const trackTiming = useCallback(
        (category: string, variable: string, time: number) => {
            event({
                action: "timing",
                category,
                label: variable,
                value: time,
            });
        },
        [event],
    );

    return {
        // Основные методы
        goal,
        event,
        userParams,
        visitParams,
        extLink,
        file,
        ecommerce,

        // Предустановленные методы
        trackPageView,
        trackButtonClick,
        trackFormSubmit,
        trackSearch,
        trackDownload,
        trackOutboundLink,
        trackError,
        trackTiming,
    };
};
