import React, { useEffect } from "react";

// Универсальный интерфейс для файла
interface FileData {
    id: string | number;
    file?: string | null; // Может быть null для файлов из S3
    url?: string; // URL для файлов из S3
    mimeType: string;
    originalName: string;
    title?: string;
    size: number;
}

interface PDFViewerProps {
    file: File | FileData | null;
    isOpen: boolean;
    onClose: () => void;
    postId?: string | number; // ID поста для формирования API URL
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file, isOpen, onClose, postId }) => {
    useEffect(() => {
        if (!file || !isOpen) {
            return;
        }

        // Всегда открываем PDF в новой вкладке
        if (file instanceof File) {
            // Для новых файлов создаем blob URL и открываем
            const url = URL.createObjectURL(file);
            window.open(url, "_blank");
            onClose(); // Закрываем модальное окно
            return;
        } else {
            // Для существующих файлов открываем через API
            if (postId && file.id) {
                const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/news/${postId}/files/${file.id}`;
                window.open(apiUrl, "_blank");
                onClose(); // Закрываем модальное окно
                return;
            }
        }
    }, [file, isOpen, onClose, postId]);

    // Компонент больше не рендерит UI, так как PDF всегда открывается в новой вкладке
    return null;
};

export default PDFViewer;
