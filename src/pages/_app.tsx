import { PrivateRoutes } from "@/components/templates";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <PrivateRoutes>
            <Component {...pageProps} />
        </PrivateRoutes>
    );
}
