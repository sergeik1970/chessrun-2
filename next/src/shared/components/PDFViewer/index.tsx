import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import postsStyles from "../../styles/posts.module.scss";

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
    const [pdfUrl, setPdfUrl] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (!file || !isOpen) {
            setPdfUrl("");
            setError("");
            return;
        }

        setLoading(true);
        setError("");

        try {
            if (file instanceof File) {
                // Новый файл
                const url = URL.createObjectURL(file);
                setPdfUrl(url);
                setLoading(false);
            } else {
                // Существующий файл (PostFile) - только через S3/API
                if (!postId || !file.id) {
                    setError("Не удалось определить файл");
                    setLoading(false);
                    return;
                }

                const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/news/${postId}/files/${file.id}`;

                // Загружаем файл как blob для обхода CORS
                fetch(apiUrl)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP ${response.status}`);
                        }
                        return response.blob();
                    })
                    .then((blob) => {
                        const blobUrl = URL.createObjectURL(blob);
                        setPdfUrl(blobUrl);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error loading file:", error);
                        setError("Ошибка при загрузке файла");
                        setLoading(false);
                    });
            }
        } catch (err) {
            setError("Ошибка при загрузке файла");
            setLoading(false);
        }

        return () => {
            // Очищаем blob URLs
            if (pdfUrl && pdfUrl.startsWith("blob:")) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [file, isOpen]);

    // Обработка клавиши Escape
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen || !file) {
        return null;
    }

    const getFileName = (): string => {
        if (file instanceof File) {
            return file.name;
        }
        return file.title || file.originalName;
    };

    const handleDownload = () => {
        if (file instanceof File) {
            const url = URL.createObjectURL(file);
            const a = document.createElement("a");
            a.href = url;
            a.download = file.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else {
            // Для существующих файлов - только через API
            if (!postId || !file.id) {
                console.error("Cannot download: missing postId or file.id");
                return;
            }

            const a = document.createElement("a");
            a.href = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/news/${postId}/files/${file.id}?download=true`;
            a.download = file.originalName || file.title || "document.pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    return (
        <div className={styles.modal} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>{getFileName()}</h3>
                    <div className={styles.modalActions}>
                        <button
                            onClick={() => {
                                if (postId && "id" in file) {
                                    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/news/${postId}/files/${file.id}`;
                                    window.open(apiUrl, "_blank");
                                }
                            }}
                            className={styles.openButton}
                            title="Открыть в новой вкладке"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={handleDownload}
                            className={styles.downloadButton}
                            title="Скачать файл"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M7 10L12 15L17 10"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 15V3"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <button onClick={onClose} className={styles.closeButton} title="Закрыть">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M18 6L6 18M6 6L18 18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={styles.modalBody}>
                    {loading && (
                        <div className={styles.loading}>
                            <div className={styles.spinner}></div>
                            <p>Загрузка файла...</p>
                        </div>
                    )}

                    {error && (
                        <div className={styles.error}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M15 9L9 15M9 9L15 15"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                            </svg>
                            <p>{error}</p>
                            <button onClick={onClose} className={styles.errorButton}>
                                Закрыть
                            </button>
                        </div>
                    )}

                    {!loading && !error && pdfUrl && (
                        <div className={styles.pdfContainer}>
                            <iframe
                                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&page=1&view=FitH&zoom=page-fit`}
                                className={styles.pdfFrame}
                                title="PDF Viewer"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PDFViewer;
