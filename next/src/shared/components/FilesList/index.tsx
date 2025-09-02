import React from "react";
import { PostFile } from "../../types/Post";
import styles from "./index.module.scss";

interface FilesListProps {
    files: PostFile[];
    onFileClick: (file: PostFile) => void;
}

const FilesList: React.FC<FilesListProps> = ({ files, onFileClick }) => {
    if (!files || files.length === 0) {
        return null;
    }

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
        <div className={styles.filesList}>
            <h4 className={styles.title}>Прикрепленные файлы:</h4>
            <div className={styles.files}>
                {files.map((file) => (
                    <div
                        key={file.id}
                        className={styles.fileItem}
                        onClick={() => onFileClick(file)}
                    >
                        <div className={styles.fileIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                                    fill="currentColor"
                                />
                                <path d="M14 2V8H20" fill="white" />
                                <text
                                    x="12"
                                    y="16"
                                    textAnchor="middle"
                                    fontSize="6"
                                    fill="white"
                                    fontWeight="bold"
                                >
                                    PDF
                                </text>
                            </svg>
                        </div>
                        <div className={styles.fileInfo}>
                            <div className={styles.fileName}>{file.title || file.originalName}</div>
                            <div className={styles.fileSize}>{formatFileSize(file.size)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilesList;
