import React from "react";
import Head from "next/head";

const FooterTest: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <Head>
                <title>Footer Test - TravelBlog</title>
                <meta name="description" content="Тест футера" />
            </Head>

            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    background: "#f0f0f0",
                }}
            >
                {/* Контент */}
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "2rem",
                    }}
                >
                    <h1 style={{ fontSize: "2rem", color: "#333" }}>
                        Прокрутите вниз для просмотра футера
                    </h1>
                </div>

                {/* Футер напрямую в компоненте */}
                <footer
                    style={{
                        background:
                            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                        color: "#ffffff",
                        padding: "60px 20px 24px",
                        marginTop: "auto",
                    }}
                >
                    <div
                        style={{
                            maxWidth: "1200px",
                            margin: "0 auto",
                        }}
                    >
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                                gap: "40px",
                                marginBottom: "40px",
                            }}
                        >
                            {/* Основная информация */}
                            <div>
                                <h3
                                    style={{
                                        fontSize: "28px",
                                        fontWeight: "700",
                                        margin: "0 0 16px 0",
                                        background:
                                            "linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    TravelBlog
                                </h3>
                                <p
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

                            {/* Разделы */}
                            <div>
                                <h4
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

                            {/* Полезное */}
                            <div>
                                <h4
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

                            {/* Социальные сети */}
                            <div>
                                <h4
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
                                    style={{
                                        display: "flex",
                                        gap: "16px",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <a
                                        href="#"
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
                                        📷
                                    </a>
                                    <a
                                        href="#"
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
                                        ✈️
                                    </a>
                                    <a
                                        href="#"
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
                                        📺
                                    </a>
                                    <a
                                        href="#"
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
                                        🌐
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Нижняя часть */}
                        <div
                            style={{
                                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                                paddingTop: "24px",
                                background: "rgba(0, 0, 0, 0.2)",
                                borderRadius: "8px",
                                padding: "20px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    gap: "16px",
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: "14px",
                                        color: "rgba(255, 255, 255, 0.6)",
                                        margin: "0",
                                    }}
                                >
                                    © {currentYear} TravelBlog. Все права защищены.
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "24px",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <a
                                        href="/privacy"
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
            </div>
        </>
    );
};

export default FooterTest;
