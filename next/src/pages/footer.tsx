import React from "react";
import Head from "next/head";
import Footer from "../shared/components/Footer";

const FooterDemo: React.FC = () => {
    return (
        <>
            <Head>
                <title>Footer Demo - TravelBlog</title>
                <meta name="description" content="Демонстрация футера" />
            </Head>

            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
            >
                {/* Контент для демонстрации */}
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "2rem",
                        textAlign: "center",
                    }}
                >
                    <div>
                        <h1
                            style={{
                                fontSize: "3.5rem",
                                color: "#ffffff",
                                marginBottom: "1rem",
                                fontWeight: "700",
                                textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                            }}
                        >
                            🎨 Footer Demo
                        </h1>
                        <p
                            style={{
                                fontSize: "1.3rem",
                                color: "rgba(255, 255, 255, 0.9)",
                                maxWidth: "600px",
                                lineHeight: "1.6",
                                textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                            }}
                        >
                            Прокрутите вниз, чтобы увидеть новый стильный футер с градиентным фоном,
                            анимациями и адаптивным дизайном!
                        </p>
                        <div
                            style={{
                                marginTop: "2rem",
                                fontSize: "2rem",
                                animation: "bounce 2s infinite",
                            }}
                        >
                            ⬇️ Скролл вниз ⬇️
                        </div>
                    </div>
                </div>

                {/* Дополнительный контент для создания скролла */}
                <div
                    style={{
                        padding: "4rem 2rem",
                        background: "rgba(255, 255, 255, 0.95)",
                        textAlign: "center",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "2.5rem",
                            color: "#2c3e50",
                            marginBottom: "2rem",
                            fontWeight: "600",
                        }}
                    >
                        ✨ Особенности нового футера
                    </h2>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "2rem",
                            maxWidth: "1200px",
                            margin: "0 auto",
                        }}
                    >
                        <div
                            style={{
                                padding: "2rem",
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                borderRadius: "16px",
                                color: "white",
                                boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
                            }}
                        >
                            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎨</div>
                            <h3
                                style={{ color: "white", marginBottom: "1rem", fontSize: "1.3rem" }}
                            >
                                Современный дизайн
                            </h3>
                            <p style={{ color: "rgba(255, 255, 255, 0.9)", lineHeight: "1.6" }}>
                                Градиентный фон, стеклянные эффекты и плавные анимации создают
                                современный вид
                            </p>
                        </div>

                        <div
                            style={{
                                padding: "2rem",
                                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                                borderRadius: "16px",
                                color: "white",
                                boxShadow: "0 10px 30px rgba(240, 147, 251, 0.3)",
                            }}
                        >
                            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📱</div>
                            <h3
                                style={{ color: "white", marginBottom: "1rem", fontSize: "1.3rem" }}
                            >
                                Адаптивность
                            </h3>
                            <p style={{ color: "rgba(255, 255, 255, 0.9)", lineHeight: "1.6" }}>
                                Отлично выглядит на всех устройствах: от мобильных до больших
                                экранов
                            </p>
                        </div>

                        <div
                            style={{
                                padding: "2rem",
                                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                                borderRadius: "16px",
                                color: "white",
                                boxShadow: "0 10px 30px rgba(79, 172, 254, 0.3)",
                            }}
                        >
                            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔗</div>
                            <h3
                                style={{ color: "white", marginBottom: "1rem", fontSize: "1.3rem" }}
                            >
                                Интерактивность
                            </h3>
                            <p style={{ color: "rgba(255, 255, 255, 0.9)", lineHeight: "1.6" }}>
                                Анимированные ссылки, социальные иконки с hover-эффектами
                            </p>
                        </div>
                    </div>

                    <div
                        style={{
                            marginTop: "3rem",
                            padding: "2rem",
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            borderRadius: "16px",
                            color: "white",
                            maxWidth: "600px",
                            margin: "3rem auto 0",
                        }}
                    >
                        <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                            🚀 Готов к использованию!
                        </h3>
                        <p style={{ color: "rgba(255, 255, 255, 0.9)", lineHeight: "1.6" }}>
                            Футер полностью готов и может быть использован на любых страницах вашего
                            сайта. Все стили настроены, анимации работают, адаптивность проверена!
                        </p>
                    </div>
                </div>

                {/* Футер */}
                <Footer />
            </div>

            <style jsx>{`
                @keyframes bounce {
                    0%,
                    20%,
                    50%,
                    80%,
                    100% {
                        transform: translateY(0);
                    }
                    40% {
                        transform: translateY(-10px);
                    }
                    60% {
                        transform: translateY(-5px);
                    }
                }
            `}</style>
        </>
    );
};

export default FooterDemo;
