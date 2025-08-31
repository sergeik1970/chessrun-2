import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import postsStyles from "../../styles/posts.module.scss";

// Универсальный интерфейс для файла
interface FileData {
    id: string | number;
    file: string;
    mimeType: string;
    originalName: string;
    title?: string;
    size: number;
}

interface PDFViewerProps {
    file: File | FileData | null;
    isOpen: boolean;
    onClose: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file, isOpen, onClose }) => {
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
                // Существующий файл (PostFile)
                if (file.file.startsWith("data:")) {
                    // Уже готовый data URL
                    setPdfUrl(file.file);
                } else {
                    // Base64 данные без префикса - создаем blob URL
                    try {
                        const byteCharacters = atob(file.file);
                        const byteNumbers = new Array(byteCharacters.length);
                        for (let i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        const byteArray = new Uint8Array(byteNumbers);
                        const blob = new Blob([byteArray], { type: file.mimeType });
                        const blobUrl = URL.createObjectURL(blob);
                        setPdfUrl(blobUrl);
                    } catch (error) {
                        console.error("Ошибка при создании blob URL:", error);
                        // Fallback к data URL
                        const dataUrl = `data:${file.mimeType};base64,${file.file}`;
                        setPdfUrl(dataUrl);
                    }
                }
                setLoading(false);
            }
        } catch (err) {
            setError("Ошибка при загрузке файла");
            setLoading(false);
        }

        return () => {
            // Очищаем URL для новых файлов и blob URL
            if (pdfUrl && (file instanceof File || pdfUrl.startsWith("blob:"))) {
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
            // Для существующих файлов
            const a = document.createElement("a");
            if (file.file.startsWith("data:")) {
                a.href = file.file;
            } else {
                a.href = `data:${file.mimeType};base64,${file.file}`;
            }
            a.download = file.originalName;
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
                        <object data={pdfUrl} type="application/pdf" className={styles.pdfFrame}>
                            <div style={{ padding: "20px", textAlign: "center" }}>
                                <p>Ваш браузер не поддерживает отображение PDF файлов.</p>
                                <button
                                    onClick={handleDownload}
                                    style={{
                                        padding: "10px 20px",
                                        background: "#007bff",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Скачать PDF
                                </button>
                            </div>
                        </object>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PDFViewer;
