import "@/styles/globals.scss";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { PrivateRoutes } from "@/components/templates";
import DashboardLayout from "@/layouts/DashboardLayout";
import { RecoilRoot } from "recoil";

type TNextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type TAppPropsWithLayout = AppProps & {
    Component: TNextPageWithLayout;
};

export default function App({ Component, pageProps }: TAppPropsWithLayout) {
    const getLayout =
        Component.getLayout ?? ((page) => <DashboardLayout>{page}</DashboardLayout>);
    return (
        <PrivateRoutes>
            <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
        </PrivateRoutes>
    );
}
