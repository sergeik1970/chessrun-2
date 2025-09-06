import React, { ReactElement } from "react";
import Image from "next/image";
import Footer from "../../components/Footer";
import styles from "./index.module.scss";

const ContactsPage = (): ReactElement => {
    // Контактная информация
    const contactInfo = {
        vk: "https://vk.ru/public143799052",
        vkDisplay: "vk.ru/public143799052",
        federationEmail: "nvizotova44@mail.ru",
        telegram: "https://t.me/sergey_kdsv",
        telegramDisplay: "@sergey_kdsv"
    };



    return (
        <div className={styles.contactsPage}>
            {/* Hero секция */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}>
                    <Image
                        src="/images/home/desktop/contacts-hero.jpg"
                        alt="Контакты"
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </div>
                <div className={styles.heroOverlay}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Контакты</h1>
                        <p className={styles.heroSubtitle}>
                            Свяжитесь с нами любым удобным способом
                        </p>
                    </div>
                </div>
            </section>

            {/* Основной контент */}
            <section className={styles.mainContent}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        {/* Контактная информация */}
                        <div className={styles.contactInfo}>
                            <h2 className={styles.sectionTitle}>Как с нами связаться</h2>
                            
                            <div className={styles.contactCards}>
                                <div className={styles.contactCard}>
                                    <div className={styles.contactIcon}>📱</div>
                                    <div className={styles.contactDetails}>
                                        <h4>ВКонтакте</h4>
                                        <p>
                                            <a
                                                href={contactInfo.vk}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {contactInfo.vkDisplay}
                                            </a>
                                        </p>
                                        <span className={styles.contactDescription}>
                                            Новости, анонсы тренировок и мероприятий
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.contactCard}>
                                    <div className={styles.contactIcon}>✉️</div>
                                    <div className={styles.contactDetails}>
                                        <h4>Email федерации</h4>
                                        <p>
                                            <a href={`mailto:${contactInfo.federationEmail}`}>
                                                {contactInfo.federationEmail}
                                            </a>
                                        </p>
                                        <span className={styles.contactDescription}>
                                            По вопросам федерации и официальным запросам
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.contactCard}>
                                    <div className={styles.contactIcon}>🛠️</div>
                                    <div className={styles.contactDetails}>
                                        <h4>Техническая поддержка</h4>
                                        <p>
                                            <a
                                                href={contactInfo.telegram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {contactInfo.telegramDisplay}
                                            </a>
                                        </p>
                                        <span className={styles.contactDescription}>
                                            Сообщения об ошибках сайта и предложения по разработке
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Информация о тренировках */}
                            <div className={styles.trainingInfo}>
                                <h3 className={styles.trainingTitle}>
                                    <span className={styles.trainingIcon}>💪</span>
                                    Тренировки круглый год
                                </h3>
                                <p className={styles.trainingDescription}>
                                    Мы проводим тренировки в любое время года! Зимой — лыжные гонки и ориентирование на лыжах, 
                                    летом — классическое ориентирование бегом. Присоединяйтесь к нашему сообществу в ВКонтакте, 
                                    чтобы быть в курсе всех тренировок и мероприятий.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ContactsPage;