import "@/styles/globals.scss";
import React, { FC } from "react";
import type { AppProps } from "next/app";
import { wrapper } from "@/shared/store/store";
import { Provider } from "react-redux";
import Navigation from "@/shared/components/Navigation";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
    /** Put your mantine theme override here */
    colors: {
        // Переопределяем цвета Mantine на белые/серые
        gray: [
            "#ffffff",
            "#f8f9fa",
            "#e9ecef",
            "#dee2e6",
            "#ced4da",
            "#adb5bd",
            "#6c757d",
            "#495057",
            "#343a40",
            "#212529",
        ],
    },
    primaryColor: "blue",
    defaultRadius: "md",
});

const App: FC<AppProps> = ({ Component, ...rest }) => {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <MantineProvider theme={theme}>
                <Navigation />
                <Component {...props.pageProps} />
            </MantineProvider>
        </Provider>
    );
};
export default App;
