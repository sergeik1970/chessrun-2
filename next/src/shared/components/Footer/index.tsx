import React from "react";
import styles from "./index.module.scss";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className={styles.footer}
            style={{
                background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                color: "#ffffff",
                padding: "60px 20px 24px",
                marginTop: "auto",
            }}
        >
            <div
                className={styles.container}
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                <div
                    className={styles.content}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 2fr",
                        gap: "60px",
                        marginBottom: "40px",
                    }}
                >
                    {/* Основная информация */}
                    <div className={styles.mainSection}>
                        <div className={styles.brand}>
                            <h3
                                className={styles.brandTitle}
                                style={{
                                    fontSize: "28px",
                                    fontWeight: "700",
                                    margin: "0 0 16px 0",
                                    background: "linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                TravelBlog
                            </h3>
                            <p
                                className={styles.brandDescription}
                                style={{
                                    fontSize: "16px",
                                    lineHeight: "1.6",
                                    color: "rgba(255, 255, 255, 0.8)",
                                    margin: "0",
                                    maxWidth: "300px",
                                }}
                            >
                                Открывайте мир вместе с нами. Делимся впечатлениями, советами и
                                лучшими местами для путешествий.
                            </p>
                        </div>
                    </div>

                    {/* Навигация */}
                    <div
                        className={styles.linksSection}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: "40px",
                        }}
                    >
                        <div className={styles.linkGroup}>
                            <h4
                                className={styles.linkTitle}
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    margin: "0 0 20px 0",
                                    color: "#ffffff",
                                }}
                            >
                                Разделы
                            </h4>
                            <ul
                                className={styles.linkList}
                                style={{
                                    listStyle: "none",
                                    padding: "0",
                                    margin: "0",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "12px",
                                }}
                            >
                                <li>
                                    <a
                                        href="/travel"
                                        className={styles.link}
                                        style={{
                                            color: "rgba(255, 255, 255, 0.7)",
                                            textDecoration: "none",
                                            fontSize: "15px",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        Путешествия
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/deals"
                                        className={styles.link}
                                        style={{
                                            color: "rgba(255, 255, 255, 0.7)",
                                            textDecoration: "none",
                                            fontSize: "15px",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        Предложения
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/about"
                                        className={styles.link}
                                        style={{
                                            color: "rgba(255, 255, 255, 0.7)",
                                            textDecoration: "none",
                                            fontSize: "15px",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        О нас
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/contact"
                                        className={styles.link}
                                        style={{
                                            color: "rgba(255, 255, 255, 0.7)",
                                            textDecoration: "none",
                                            fontSize: "15px",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        Контакты
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className={styles.linkGroup}>
                            <h4
                                className={styles.linkTitle}
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    margin: "0 0 20px 0",
                                    color: "#ffffff",
                                }}
                            >
                                Полезное
                            </h4>
                            <ul
                                className={styles.linkList}
                                style={{
                                    listStyle: "none",
                                    padding: "0",
                                    margin: "0",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "12px",
                                }}
                            >
                                <li>
                                    <a
                                        href="/tips"
                                        className={styles.link}
                                        style={{
                                            color: "rgba(255, 255, 255, 0.7)",
                                            textDecoration: "none",
                                            fontSize: "15px",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        Советы путешественникам
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/guides"
                                        className={styles.link}
                                        style={{
                                            color: "rgba(255, 255, 255, 0.7)",
                                            textDecoration: "none",
                                            fontSize: "15px",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        Путеводители
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/blog"
                                        className={styles.link}
                                        style={{
                                            color: "rgba(255, 255, 255, 0.7)",
                                            textDecoration: "none",
                                            fontSize: "15px",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        Блог
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/faq"
                                        className={styles.link}
                                        style={{
                                            color: "rgba(255, 255, 255, 0.7)",
                                            textDecoration: "none",
                                            fontSize: "15px",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        FAQ
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className={styles.linkGroup}>
                            <h4
                                className={styles.linkTitle}
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    margin: "0 0 20px 0",
                                    color: "#ffffff",
                                }}
                            >
                                Социальные сети
                            </h4>
                            <div
                                className={styles.socialLinks}
                                style={{
                                    display: "flex",
                                    gap: "16px",
                                    flexWrap: "wrap",
                                }}
                            >
                                <a
                                    href="#"
                                    className={styles.socialLink}
                                    aria-label="Instagram"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "44px",
                                        height: "44px",
                                        background: "rgba(255, 255, 255, 0.1)",
                                        borderRadius: "12px",
                                        color: "rgba(255, 255, 255, 0.7)",
                                        textDecoration: "none",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        backdropFilter: "blur(10px)",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                    }}
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className={styles.socialLink}
                                    aria-label="Telegram"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "44px",
                                        height: "44px",
                                        background: "rgba(255, 255, 255, 0.1)",
                                        borderRadius: "12px",
                                        color: "rgba(255, 255, 255, 0.7)",
                                        textDecoration: "none",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        backdropFilter: "blur(10px)",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                    }}
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className={styles.socialLink}
                                    aria-label="YouTube"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "44px",
                                        height: "44px",
                                        background: "rgba(255, 255, 255, 0.1)",
                                        borderRadius: "12px",
                                        color: "rgba(255, 255, 255, 0.7)",
                                        textDecoration: "none",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        backdropFilter: "blur(10px)",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                    }}
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className={styles.socialLink}
                                    aria-label="VK"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "44px",
                                        height: "44px",
                                        background: "rgba(255, 255, 255, 0.1)",
                                        borderRadius: "12px",
                                        color: "rgba(255, 255, 255, 0.7)",
                                        textDecoration: "none",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        backdropFilter: "blur(10px)",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                    }}
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1.01-1.49-.9-1.49.45v1.57c0 .417-.133.667-1.25.667-1.85 0-3.898-1.119-5.35-3.202C4.842 11.834 3.5 8.5 3.5 7.5c0-.417.167-.8.9-.8h1.744c.75 0 .867.317 1.117 1.017.367 1.3 1.267 3.117 1.917 2.017.367-.617.267-2.267.233-2.717-.067-.883-.617-.883-.617-1.183 0-.317.267-.617.683-.617h2.35c.617 0 .867.317.867.983v3.35c0 .617.283.867.45.867.367 0 .683-.25 1.4-.967 1.367-1.367 2.367-3.5 2.367-3.5.2-.417.533-.8 1.25-.8h1.744c.9 0 1.1.45.9.983-.367 1.017-2.617 4.067-2.617 4.067-.283.417-.233.617 0 1.017.183.317 1.283 1.267 1.933 2.033.233.267.467.533.617.8.2.367-.117.8-.683.8z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Нижняя часть */}
                <div
                    className={styles.bottom}
                    style={{
                        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                        paddingTop: "24px",
                        background: "rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <div
                        className={styles.bottomContent}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <p
                            className={styles.copyright}
                            style={{
                                fontSize: "14px",
                                color: "rgba(255, 255, 255, 0.6)",
                                margin: "0",
                            }}
                        >
                            © {currentYear} TravelBlog. Все права защищены.
                        </p>
                        <div
                            className={styles.bottomLinks}
                            style={{
                                display: "flex",
                                gap: "24px",
                            }}
                        >
                            <a
                                href="/privacy"
                                className={styles.bottomLink}
                                style={{
                                    fontSize: "14px",
                                    color: "rgba(255, 255, 255, 0.6)",
                                    textDecoration: "none",
                                    transition: "color 0.3s ease",
                                }}
                            >
                                Политика конфиденциальности
                            </a>
                            <a
                                href="/terms"
                                className={styles.bottomLink}
                                style={{
                                    fontSize: "14px",
                                    color: "rgba(255, 255, 255, 0.6)",
                                    textDecoration: "none",
                                    transition: "color 0.3s ease",
                                }}
                            >
                                Условия использования
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
