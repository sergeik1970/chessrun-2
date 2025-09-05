import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './index.module.scss';

// Компонент для адаптивных изображений
const ResponsiveImage: React.FC<{
    desktopSrc: string;
    mobileSrc: string;
    alt: string;
    priority?: boolean;
}> = ({ desktopSrc, mobileSrc, alt, priority = false }) => {
    return (
        <>
            {/* Десктопное изображение */}
            <Image
                src={desktopSrc}
                alt={alt}
                fill
                priority={priority}
                style={{ objectFit: 'cover' }}
                className={styles.desktopImage}
            />
            {/* Мобильное изображение */}
            <Image
                src={mobileSrc}
                alt={alt}
                fill
                priority={priority}
                style={{ objectFit: 'cover' }}
                className={styles.mobileImage}
            />
        </>
    );
};

const HomePage = () => {
    const sections = [
        {
            id: 'news',
            title: 'Новости',
            description: 'Последние новости и события спортивного ориентирования',
            desktopImage: '/images/home/desktop/news-hero.jpg',
            mobileImage: '/images/home/mobile/news-hero-mobile.jpg',
            link: '/news',
            large: true
        },
        {
            id: 'travel',
            title: 'Путешествия',
            description: 'Походы, экспедиции и приключения на природе',
            desktopImage: '/images/home/desktop/travel-hero.jpg',
            mobileImage: '/images/home/mobile/travel-hero-mobile.jpg',
            link: '/travel',
            large: false
        },
        {
            id: 'competitions',
            title: 'Соревнования',
            description: 'Календарь соревнований и результаты',
            desktopImage: '/images/home/desktop/competitions-hero.jpg',
            mobileImage: '/images/home/mobile/main-competitions-mobile.jpg',
            link: '/competitions',
            large: false
        },
        {
            id: 'training',
            title: 'Тренировки',
            description: 'Расписание тренировок и обучающие материалы',
            desktopImage: '/images/home/desktop/training-hero.jpg',
            mobileImage: '/images/home/mobile/training-hero-mobile.jpg',
            link: '/training',
            large: false
        },
        {
            id: 'contacts',
            title: 'Контакты',
            description: 'Свяжитесь с нами и найдите нас',
            desktopImage: '/images/home/desktop/contacts-hero.jpg',
            mobileImage: '/images/home/mobile/contacts-hero-mobile.jpg',
            link: '/contacts',
            large: false
        }
    ];

    return (
        <div className={styles.homePage}>
            {/* Hero секция */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}>
                    <ResponsiveImage
                        desktopSrc="/images/home/desktop/main-hero.jpg"
                        mobileSrc="/images/home/mobile/main-hero-mobile.jpg"
                        alt="Шахматы на бегу"
                        priority
                    />
                </div>
                <div className={styles.heroOverlay}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>
                            <span className={styles.heroTitleLine}>Шахматы на бегу</span>
                            <span className={`${styles.heroTitleLine} ${styles.heroSubtitle}`}>Клуб спортивного ориентирования</span>
                        </h1>
                    </div>
                </div>
            </section>

            {/* Секции */}
            <section className={styles.sectionsContainer}>
                <div className={styles.container}>
                    <div className={styles.sectionsGrid}>
                        {sections.map((section) => (
                            <Link 
                                key={section.id} 
                                href={section.link} 
                                className={`${styles.sectionCard} ${section.large ? styles.sectionCardLarge : ''}`}
                            >
                                <div className={styles.sectionImage}>
                                    <ResponsiveImage
                                        desktopSrc={section.desktopImage}
                                        mobileSrc={section.mobileImage}
                                        alt={section.title}
                                    />
                                    <div className={styles.sectionOverlay}>
                                        <div className={styles.sectionContent}>
                                            <h2 className={styles.sectionTitle}>{section.title}</h2>
                                            <div className={styles.sectionButton}>
                                                Перейти
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                    <path
                                                        d="M5 12h14M12 5l7 7-7 7"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;