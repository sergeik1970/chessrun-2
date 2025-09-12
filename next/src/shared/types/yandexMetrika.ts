/**
 * Типы для Яндекс Метрики
 */

export interface YandexMetrikaGoalParams {
    [key: string]: string | number | boolean;
}

export interface YandexMetrikaEventParams {
    action: string;
    category?: string;
    label?: string;
    value?: number;
    [key: string]: any;
}

export interface YandexMetrikaUserParams {
    UserID?: string | number;
    [key: string]: string | number | boolean | undefined;
}

export interface YandexMetrikaEcommerceItem {
    id: string | number;
    name: string;
    category?: string;
    quantity?: number;
    price?: number;
    brand?: string;
    variant?: string;
}

export interface YandexMetrikaEcommercePurchase {
    id: string | number;
    affiliation?: string;
    revenue?: number;
    tax?: number;
    shipping?: number;
    coupon?: string;
    items: YandexMetrikaEcommerceItem[];
}

export interface YandexMetrikaEcommerceAdd {
    items: YandexMetrikaEcommerceItem[];
}

export interface YandexMetrikaEcommerceRemove {
    items: YandexMetrikaEcommerceItem[];
}

export interface YandexMetrikaEcommerceDetail {
    items: YandexMetrikaEcommerceItem[];
}

export type YandexMetrikaEcommerceData =
    | YandexMetrikaEcommercePurchase
    | YandexMetrikaEcommerceAdd
    | YandexMetrikaEcommerceRemove
    | YandexMetrikaEcommerceDetail;
