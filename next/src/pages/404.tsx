import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@mantine/core";
import { Input } from "@mantine/core";

const Custom404: React.FC = () => {
    return (
        <>
            <Head>
                <title>Страница не найдена - Федерация спортивного ориентирования</title>
                <meta name="description" content="Запрашиваемая страница не найдена" />
            </Head>

            <main
                style={{
                    minHeight: "100vh",
                    backgroundColor: "#f8f9fa",
                    paddingTop: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        maxWidth: "600px",
                        padding: "40px 20px",
                        backgroundColor: "white",
                        borderRadius: "12px",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                        margin: "20px",
                    }}
                >
                    {/* Изображение 404 */}
                    <div style={{ marginBottom: "30px" }}>
                        <Image
                            src="/404.png"
                            alt="Страница не найдена"
                            width={200}
                            height={200}
                            style={{
                                maxWidth: "100%",
                                height: "auto",
                                opacity: 0.8,
                            }}
                        />
                    </div>

                    {/* Заголовок */}
                    <h1
                        style={{
                            fontSize: "3rem",
                            fontWeight: "bold",
                            color: "#dc3545",
                            marginBottom: "20px",
                            fontFamily: "inherit",
                        }}
                    >
                        404
                    </h1>

                    {/* Подзаголовок */}
                    <h2
                        style={{
                            fontSize: "1.5rem",
                            color: "#495057",
                            marginBottom: "20px",
                            fontWeight: "600",
                        }}
                    >
                        Страница не найдена
                    </h2>

                    {/* Описание */}
                    <p
                        style={{
                            fontSize: "1.1rem",
                            color: "#6c757d",
                            marginBottom: "30px",
                            lineHeight: "1.6",
                        }}
                    >
                        К сожалению, запрашиваемая страница не существует или была перемещена.
                        <br />
                        Возможно, вы ошиблись в адресе или перешли по устаревшей ссылке.
                    </p>

                    {/* Кнопки навигации */}
                    <div
                        style={{
                            display: "flex",
                            gap: "15px",
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <Link
                            href="/"
                            style={{
                                display: "inline-block",
                                padding: "12px 24px",
                                backgroundColor: "#007bff",
                                color: "white",
                                textDecoration: "none",
                                borderRadius: "8px",
                                fontWeight: "500",
                                transition: "all 0.3s ease",
                                border: "none",
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#0056b3";
                                e.currentTarget.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "#007bff";
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >
                            🏠 На главную
                        </Link>

                        <Link
                            href="/posts-demo"
                            style={{
                                display: "inline-block",
                                padding: "12px 24px",
                                backgroundColor: "#28a745",
                                color: "white",
                                textDecoration: "none",
                                borderRadius: "8px",
                                fontWeight: "500",
                                transition: "all 0.3s ease",
                                border: "none",
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#1e7e34";
                                e.currentTarget.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "#28a745";
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >
                            📰 Новости
                        </Link>

                        <Button
                            onClick={() => window.history.back()}
                            style={{
                                padding: "12px 24px",
                                backgroundColor: "#6c757d",
                                color: "white",
                                textDecoration: "none",
                                borderRadius: "8px",
                                fontWeight: "500",
                                transition: "all 0.3s ease",
                                border: "none",
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#545b62";
                                e.currentTarget.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "#6c757d";
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >
                            ⬅️ Назад
                        </Button>
                        <Input placeholder="Input component" />
                    </div>

                    {/* Дополнительная информация */}
                    <div
                        style={{
                            marginTop: "40px",
                            padding: "20px",
                            backgroundColor: "#f8f9fa",
                            borderRadius: "8px",
                            border: "1px solid #e9ecef",
                        }}
                    >
                        <h3
                            style={{
                                fontSize: "1.2rem",
                                color: "#495057",
                                marginBottom: "15px",
                                fontWeight: "600",
                            }}
                        >
                            🧭 Популярные разделы:
                        </h3>
                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                justifyContent: "center",
                                flexWrap: "wrap",
                            }}
                        >
                            <Link
                                href="/competitions"
                                style={{
                                    color: "#007bff",
                                    textDecoration: "none",
                                    padding: "5px 10px",
                                    borderRadius: "4px",
                                    backgroundColor: "white",
                                    border: "1px solid #dee2e6",
                                    fontSize: "0.9rem",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#007bff";
                                    e.currentTarget.style.color = "white";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "white";
                                    e.currentTarget.style.color = "#007bff";
                                }}
                            >
                                🏃‍♂️ Соревнования
                            </Link>
                            <Link
                                href="/training"
                                style={{
                                    color: "#007bff",
                                    textDecoration: "none",
                                    padding: "5px 10px",
                                    borderRadius: "4px",
                                    backgroundColor: "white",
                                    border: "1px solid #dee2e6",
                                    fontSize: "0.9rem",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#007bff";
                                    e.currentTarget.style.color = "white";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "white";
                                    e.currentTarget.style.color = "#007bff";
                                }}
                            >
                                💪 Тренировки
                            </Link>
                            <Link
                                href="/contacts"
                                style={{
                                    color: "#007bff",
                                    textDecoration: "none",
                                    padding: "5px 10px",
                                    borderRadius: "4px",
                                    backgroundColor: "white",
                                    border: "1px solid #dee2e6",
                                    fontSize: "0.9rem",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#007bff";
                                    e.currentTarget.style.color = "white";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "white";
                                    e.currentTarget.style.color = "#007bff";
                                }}
                            >
                                📞 Контакты
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Custom404;
