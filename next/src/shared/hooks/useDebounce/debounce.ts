import { DebouncedFunc } from "../../types/utils";

/**
 * Функция debounce для задержки выполнения функции
 * @param func - функция для выполнения с задержкой
 * @param timeout - время задержки в миллисекундах (по умолчанию 100)
 * @returns debounced функция
 */
export default function debounce<T extends (...args: any) => any>(
    func: T,
    timeout = 100,
): DebouncedFunc<T> {
    let timer: any;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            // @ts-ignore
            func.apply(this, args);
        }, timeout);
    };
}
