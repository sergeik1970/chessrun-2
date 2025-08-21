import "@/styles/globals.scss";
import React, { FC } from "react";
import type { AppProps } from "next/app";
import { wrapper } from "@/shared/store/store";
import { Provider } from "react-redux";
import AuthProvider from "@/shared/components/AuthProvider";
import Navigation from "@/shared/components/Navigation";

const App: FC<AppProps> = ({ Component, ...rest }) => {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <AuthProvider>
                <Navigation />
                <Component {...props.pageProps} />
            </AuthProvider>
        </Provider>
    );
};
export default App;
