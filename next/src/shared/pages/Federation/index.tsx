import React, { ReactElement, useState, useEffect } from "react";
import Image from "next/image";
import Footer from "../../components/Footer";
import styles from "./index.module.scss";

const FederationPage = (): ReactElement => {
    const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

    // Информация о федерации
    const federationInfo = {
        vk: "https://vk.com/chessrun",
        vkDisplay: "vk.com/chessrun",
        email: "nvizotova44@mail.ru",
    };

    // Документы федерации
    const documents = [
        {
            id: "charter",
            title: "Устав ФСОКО",
            description: "Устав Федерации спортивного ориентирования Костромской области",
            type: "PDF",
            size: "1.2 МБ",
            url: "/documents/federation/charter.pdf",
        },
        {
            id: "calendar",
            title: "Единый календарный план 2025",
            description:
                "Единый календарный план физкультурных и спортивных мероприятий на 2025 год",
            type: "PDF",
            size: "650 КБ",
            url: "/documents/federation/Ediniy-kalendarniy-plan-2025.pdf",
        },
        {
            id: "statement",
            title: "Заявление о приеме",
            description: "Заявление о приеме в члены Федерации спортивного ориентирования",
            type: "PDF",
            size: "320 КБ",
            url: "/documents/federation/statement.pdf",
        },
        {
            id: "accreditation",
            title: "Аккредитация",
            description: "Документ об аккредитации Федерации спортивного ориентирования",
            type: "JPG",
            size: "480 КБ",
            url: "/images/federation/accreditation.jpg",
            isImage: true,
        },
        {
            id: "svidetelstvo",
            title: "Свидетельство",
            description: "Свидетельство о государственной регистрации федерации",
            type: "JPG",
            size: "520 КБ",
            url: "/images/federation/svidetelstvo.jpg",
            isImage: true,
        },
    ];

    const handleDocumentClick = (documentId: string) => {
        setSelectedDocument(documentId);
        // Блокируем скролл страницы при открытии модального окна
        document.body.style.overflow = "hidden";
    };

    const handleCloseModal = () => {
        setSelectedDocument(null);
        // Восстанавливаем скролл страницы
        document.body.style.overflow = "unset";
    };

    const handleDownloadDocument = (url: string, title: string, isImage?: boolean) => {
        if (isImage) {
            // Для изображений открываем в новой вкладке
            window.open(url, "_blank");
        } else {
            // Для PDF создаем ссылку для скачивания
            const link = document.createElement("a");
            link.href = url;
            link.download = title;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    // Закрытие модального окна по Escape
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === "Escape" && selectedDocument) {
                handleCloseModal();
            }
        };

        document.addEventListener("keydown", handleEscapeKey);
        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
            // Восстанавливаем скролл при размонтировании компонента
            document.body.style.overflow = "unset";
        };
    }, [selectedDocument]);

    // Получаем выбранный документ
    const selectedDoc = documents.find((doc) => doc.id === selectedDocument);

    return (
        <div className={styles.federationPage}>
            {/* Hero секция */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}>
                    <Image
                        src="/images/federation/federation-hero.jpg"
                        alt="Федерация спортивного ориентирования"
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </div>
                <div className={styles.heroOverlay}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>
                            <span className={styles.heroTitleLine}>
                                Федерация спортивного ориентирования
                            </span>
                            <span className={styles.heroTitleLine}>Костромской области</span>
                        </h1>
                    </div>
                </div>
            </section>

            {/* Документы */}
            <section className={styles.documentsSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Документы федерации</h2>
                    <div className={styles.documentsGrid}>
                        {documents.map((doc) => (
                            <div
                                key={doc.id}
                                className={styles.documentCard}
                                onClick={() => handleDocumentClick(doc.id)}
                            >
                                <div className={styles.documentIcon}>
                                    {doc.isImage ? "🖼️" : "📄"}
                                </div>
                                <div className={styles.documentInfo}>
                                    <h4 className={styles.documentTitle}>{doc.title}</h4>
                                    <p className={styles.documentDescription}>{doc.description}</p>
                                    <div className={styles.documentMeta}>
                                        <span className={styles.documentType}>{doc.type}</span>
                                        <span className={styles.documentSize}>{doc.size}</span>
                                    </div>
                                </div>
                                <div className={styles.documentDownload}>
                                    {/* Убираем эмодзи-иконки */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Контактная информация */}
            <section className={styles.contactSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Контактная информация</h2>
                    <div className={styles.contactGrid}>
                        <div className={styles.contactCard}>
                            <div className={styles.contactIcon}>📱</div>
                            <h4>ВКонтакте</h4>
                            <p>
                                <a
                                    href={federationInfo.vk}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "#666", textDecoration: "none" }}
                                >
                                    {federationInfo.vkDisplay}
                                </a>
                            </p>
                        </div>

                        <div className={styles.contactCard}>
                            <div className={styles.contactIcon}>✉️</div>
                            <h4>Email</h4>
                            <p>
                                <a
                                    href={`mailto:${federationInfo.email}`}
                                    style={{ color: "#666", textDecoration: "none" }}
                                >
                                    {federationInfo.email}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Модальное окно для документов */}
            {selectedDocument && selectedDoc && (
                <div className={styles.modal} onClick={handleCloseModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3 className={styles.modalTitle}>{selectedDoc.title}</h3>
                            <div className={styles.modalActions}>
                                {selectedDoc.type === "PDF" && (
                                    <button
                                        onClick={() => window.open(selectedDoc.url, "_blank")}
                                        className={styles.openButton}
                                        title="Открыть в новой вкладке"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                )}
                                <button
                                    onClick={() =>
                                        handleDownloadDocument(
                                            selectedDoc.url,
                                            selectedDoc.title,
                                            selectedDoc.isImage,
                                        )
                                    }
                                    className={styles.downloadButton}
                                    title={
                                        selectedDoc.isImage
                                            ? "Открыть в полном размере"
                                            : "Скачать файл"
                                    }
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M7 10L12 15L17 10"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M12 15V3"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                                <button
                                    onClick={handleCloseModal}
                                    className={styles.closeButton}
                                    title="Закрыть"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M18 6L6 18M6 6L18 18"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className={styles.modalBody}>
                            {selectedDoc.isImage ? (
                                <div className={styles.imagePreview}>
                                    <Image
                                        src={selectedDoc.url}
                                        alt={selectedDoc.title}
                                        fill
                                        style={{
                                            objectFit: "contain",
                                        }}
                                    />
                                </div>
                            ) : selectedDoc.type === "PDF" ? (
                                <div className={styles.pdfContainer}>
                                    <iframe
                                        src={`${selectedDoc.url}#toolbar=0&navpanes=0&scrollbar=1&page=1&view=FitH&zoom=page-fit`}
                                        className={styles.pdfFrame}
                                        title="PDF Viewer"
                                    />
                                </div>
                            ) : (
                                <div className={styles.documentIcon}>📄</div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default FederationPage;
