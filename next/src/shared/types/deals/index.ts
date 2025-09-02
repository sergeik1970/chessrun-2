/**
 * Типы для системы сделок (deals)
 */

// Интерфейс для одной сделки
export interface IDeal {
    id: number;
    name: string;
    done: boolean; // статус выполнения сделки
}

// Интерфейс для списка сделок
export interface IDeals {
    deals: Array<IDeal>;
}
