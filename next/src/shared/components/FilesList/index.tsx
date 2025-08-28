import React from 'react';
import { PostFile } from '../../types/Post';
import styles from './index.module.scss';

interface FilesListProps {
    files: PostFile[];
    onFileClick: (file: PostFile) => void;
}

const FilesList: React.FC<FilesListProps> = ({ files, onFileClick }) => {
    if (!files || files.length === 0) {
        return null;
    }

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
                                <path
                                    d="M14 2V8H20"
                                    fill="white"
                                />
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
                            <div className={styles.fileName}>
                                {file.title || file.originalName}
                            </div>
                            <div className={styles.fileSize}>
                                {formatFileSize(file.size)}
                            </div>
                        </div>
                        <div className={styles.downloadIcon}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilesList;