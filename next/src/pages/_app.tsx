import "@/styles/globals.scss";
import React, { FC } from "react";
import type { AppProps } from "next/app";
import { wrapper } from "@/shared/store/store";
import { Provider } from "react-redux";
import AuthProvider from "@/shared/components/AuthProvider";
import Navigation from "@/shared/components/Navigation";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
    /** Put your mantine theme override here */
});

const App: FC<AppProps> = ({ Component, ...rest }) => {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <MantineProvider theme={theme}>
                <AuthProvider>
                    <Navigation />
                    <Component {...props.pageProps} />
                </AuthProvider>
            </MantineProvider>
        </Provider>
    );
};
export default App;
