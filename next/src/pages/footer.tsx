import React from 'react';
import Head from 'next/head';
import Footer from '../shared/components/Footer';

const FooterDemo: React.FC = () => {
    return (
        <>
            <Head>
                <title>Footer Demo - TravelBlog</title>
                <meta name="description" content="Демонстрация футера" />
            </Head>
            
            <div style={{ 
                minHeight: '100vh', 
                display: 'flex', 
                flexDirection: 'column',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
            }}>
                {/* Контент для демонстрации */}
                <div style={{ 
                    flex: 1, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <div>
                        <h1 style={{ 
                            fontSize: '3rem', 
                            color: '#2c3e50', 
                            marginBottom: '1rem',
                            fontWeight: '700'
                        }}>
                            🎨 Footer Demo
                        </h1>
                        <p style={{ 
                            fontSize: '1.2rem', 
                            color: '#7f8c8d', 
                            maxWidth: '600px',
                            lineHeight: '1.6'
                        }}>
                            Прокрутите вниз, чтобы увидеть новый стильный футер с градиентным фоном, 
                            анимациями и адаптивным дизайном!
                        </p>
                        <div style={{ 
                            marginTop: '2rem',
                            fontSize: '2rem'
                        }}>
                            ⬇️ Скролл вниз ⬇️
                        </div>
                    </div>
                </div>
                
                {/* Дополнительный контент для создания скролла */}
                <div style={{ 
                    padding: '4rem 2rem',
                    background: 'white',
                    textAlign: 'center'
                }}>
                    <h2 style={{ 
                        fontSize: '2rem', 
                        color: '#2c3e50', 
                        marginBottom: '2rem'
                    }}>
                        ✨ Особенности футера
                    </h2>
                    
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '2rem',
                        maxWidth: '1000px',
                        margin: '0 auto'
                    }}>
                        <div style={{ 
                            padding: '1.5rem',
                            background: '#f8f9fa',
                            borderRadius: '12px',
                            border: '1px solid #e9ecef'
                        }}>
                            <h3 style={{ color: '#495057', marginBottom: '1rem' }}>🎨 Современный дизайн</h3>
                            <p style={{ color: '#6c757d', lineHeight: '1.5' }}>
                                Градиентный фон, стеклянные эффекты и плавные анимации
                            </p>
                        </div>
                        
                        <div style={{ 
                            padding: '1.5rem',
                            background: '#f8f9fa',
                            borderRadius: '12px',
                            border: '1px solid #e9ecef'
                        }}>
                            <h3 style={{ color: '#495057', marginBottom: '1rem' }}>📱 Адаптивность</h3>
                            <p style={{ color: '#6c757d', lineHeight: '1.5' }}>
                                Отлично выглядит на всех устройствах и экранах
                            </p>
                        </div>
                        
                        <div style={{ 
                            padding: '1.5rem',
                            background: '#f8f9fa',
                            borderRadius: '12px',
                            border: '1px solid #e9ecef'
                        }}>
                            <h3 style={{ color: '#495057', marginBottom: '1rem' }}>🔗 Интерактивность</h3>
                            <p style={{ color: '#6c757d', lineHeight: '1.5' }}>
                                Анимированные ссылки и социальные иконки
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Футер */}
                <Footer />
            </div>
        </>
    );
};

export default FooterDemo;