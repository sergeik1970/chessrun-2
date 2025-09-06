import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import ContactsPage from "../shared/pages/Contacts";

const Contacts: NextPage = () => {
    return (
        <>
            <Head>
                <title>Контакты | Спортивное ориентирование Костромской области</title>
                <meta
                    name="description"
                    content="Свяжитесь с нами любым удобным способом. Контактная информация федерации спортивного ориентирования Костромской области."
                />
                <meta
                    name="keywords"
                    content="контакты, связаться, федерация, спортивное ориентирование, Кострома, телефон, email, адрес"
                />
                <meta
                    property="og:title"
                    content="Контакты | Спортивное ориентирование Костромской области"
                />
                <meta
                    property="og:description"
                    content="Свяжитесь с нами любым удобным способом. Контактная информация федерации спортивного ориентирования Костромской области."
                />
                <meta property="og:type" content="website" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <ContactsPage />
        </>
    );
};

export default Contacts;
