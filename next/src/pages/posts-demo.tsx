import React from 'react';
import Head from 'next/head';
import PostsListExample from '../shared/components/PostsList/PostsList.example';

const PostsDemoPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Демо компонентов постов - Федерация спортивного ориентирования</title>
        <meta name="description" content="Демонстрация компонентов для отображения постов" />
      </Head>
      
      <main style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8f9fa',
        paddingTop: '60px' // отступ для навигации
      }}>
        <PostsListExample />
      </main>
    </>
  );
};

export default PostsDemoPage;