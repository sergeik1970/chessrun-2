import React, { useState, useRef } from "react";
import { PostFile } from "../../types/Post";
import styles from "./index.module.scss";

interface FileUploaderProps {
    files: File[];
    existingFiles: PostFile[];
    onFilesChange: (files: File[]) => void;
    onRemoveFile: (index: number) => void;
    onRemoveExistingFile: (fileId: string) => void;
    onPreviewFile: (file: File | PostFile) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
    files,
    existingFiles,
    onFilesChange,
    onRemoveFile,
    onRemoveExistingFile,
    onPreviewFile,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        const validFiles = selectedFiles.filter((file) => {
            // Разрешаем только PDF файлы
            return file.type === "application/pdf" && file.size <= 10 * 1024 * 1024; // 10MB
        });

        if (validFiles.length !== selectedFiles.length) {
            alert("Можно загружать только PDF файлы размером до 10MB");
        }

        onFilesChange([...files, ...validFiles]);

        // Сбрасываем input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleAddFilesClick = () => {
        fileInputRef.current?.click();
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const getFileName = (file: File | PostFile): string => {
        if ("originalName" in file) {
            return file.title || file.originalName;
        }
        return file.name;
    };

    const getFileSize = (file: File | PostFile): number => {
        if ("size" in file && typeof file.size === "number") {
            return file.size;
        }
        return 0;
    };

    return (
        <div className={styles.fileUploader}>
            <label className={styles.label}>Файлы (PDF)</label>
            <div className={styles.uploadSection}>
                <button
                    type="button"
                    onClick={handleAddFilesClick}
                    className={styles.addFilesButton}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M14 2V8H20"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 18V12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M9 15L12 12L15 15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Добавить PDF файлы
                </button>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                multiple
                onChange={handleFileChange}
                className={styles.hiddenFileInput}
            />

            {/* Существующие файлы */}
            {existingFiles.length > 0 && (
                <div className={styles.filesSection}>
                    <h4 className={styles.sectionTitle}>Загруженные файлы</h4>
                    <div className={styles.filesList}>
                        {existingFiles.map((file) => (
                            <div key={file.id} className={styles.fileItem}>
                                <div
                                    className={styles.fileInfo}
                                    onClick={() => onPreviewFile(file)}
                                >
                                    <div className={styles.fileIcon}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                                                fill="currentColor"
                                            />
                                            <path d="M14 2V8H20" fill="white" />
                                        </svg>
                                    </div>
                                    <div className={styles.fileDetails}>
                                        <div className={styles.fileName}>{getFileName(file)}</div>
                                        <div className={styles.fileSize}>
                                            {formatFileSize(file.size)}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onRemoveExistingFile(String(file.id))}
                                    className={styles.removeButton}
                                    title="Удалить файл"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
                        ))}
                    </div>
                </div>
            )}

            {/* Новые файлы */}
            {files.length > 0 && (
                <div className={styles.filesSection}>
                    <h4 className={styles.sectionTitle}>Новые файлы</h4>
                    <div className={styles.filesList}>
                        {files.map((file, index) => (
                            <div key={index} className={styles.fileItem}>
                                <div
                                    className={styles.fileInfo}
                                    onClick={() => onPreviewFile(file)}
                                >
                                    <div className={styles.fileIcon}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                                                fill="currentColor"
                                            />
                                            <path d="M14 2V8H20" fill="white" />
                                        </svg>
                                    </div>
                                    <div className={styles.fileDetails}>
                                        <div className={styles.fileName}>{getFileName(file)}</div>
                                        <div className={styles.fileSize}>
                                            {formatFileSize(getFileSize(file))}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onRemoveFile(index)}
                                    className={styles.removeButton}
                                    title="Удалить файл"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUploader;
